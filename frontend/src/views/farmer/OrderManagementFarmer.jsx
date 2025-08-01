"use client"

import { useEffect, useState, useCallback } from "react"
import FilterBar from "../../components/FilterBar"
import OrderTableHeader from "../../components/OrderTableHeader"
import OrderRow from "../../components/OrderRow"
import { fetchOrders, updateOrderStatus } from "../../services/orderService"

const currentTexts = {
  searchPlaceholder: "Search orders...",
  filterLabel: "Filter by status:",
}

const OrderManagementFarmer = () => {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [updatingOrderIds, setUpdatingOrderIds] = useState(new Set())

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true)
      const data = await fetchOrders()
      setOrders(data)
      setFilteredOrders(data)
    } catch (error) {
      console.error("Failed to fetch orders:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadOrders()
  }, [loadOrders])

  useEffect(() => {
    let filtered = orders

    if (filterStatus !== "all") {
      filtered = filtered.filter((order) => order.status === filterStatus)
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (order) =>
          order.id?.toString().toLowerCase().includes(term) ||
          order.user?.name?.toLowerCase().includes(term) ||
          order.address?.toLowerCase().includes(term),
      )
    }

    setFilteredOrders(filtered)
  }, [filterStatus, searchTerm, orders])

  const handleStatusChange = async (orderId, newStatus) => {
    // Optimistic update
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    )
    setUpdatingOrderIds((prev) => new Set(prev).add(orderId))

    try {
      const updatedOrder = await updateOrderStatus(orderId, newStatus)
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, ...updatedOrder } : order
        )
      )
    } catch (error) {
      console.error("Failed to update order status:", error)
      alert("Failed to update order status. Reverting change.")
      await loadOrders()
    } finally {
      setUpdatingOrderIds((prev) => {
        const copy = new Set(prev)
        copy.delete(orderId)
        return copy
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <FilterBar
        setFilterStatus={setFilterStatus}
        setSearchTerm={setSearchTerm}
        currentTexts={currentTexts}
      />

      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <OrderTableHeader />
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <OrderRow
                      key={order.id}
                      order={order}
                      onStatusChange={handleStatusChange}
                      disabled={updatingOrderIds.has(order.id)}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                      {searchTerm || filterStatus !== "all"
                        ? "No orders found matching your criteria."
                        : "No orders available."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderManagementFarmer
