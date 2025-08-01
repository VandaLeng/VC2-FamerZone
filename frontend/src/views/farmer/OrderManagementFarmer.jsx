import { useEffect, useState } from "react"
import FilterBar from "../../components/FilterBar"
import OrderTableHeader from "../../components/OrderTableHeader"
import OrderRow from "../../components/OrderRow"
import { fetchOrders } from "../../services/orderService"

const currentTexts = {
  searchPlaceholder: "ស្វែងរកការបញ្ជាទិញ...",
  filterLabel: "តម្រៀបតាមស្ថានភាព៖",
}

const OrderManagementFarmer = () => {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true)
        const data = await fetchOrders()
        setOrders(data)
        setFilteredOrders(data)
      } catch (error) {
        console.error("មិនអាចទាញយកការបញ្ជាទិញ:", error)
      } finally {
        setLoading(false)
      }
    }

    getOrders()
  }, [])

  useEffect(() => {
    let filtered = orders

    if (filterStatus !== "all") {
      filtered = filtered.filter((order) => order.status === filterStatus)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.address?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredOrders(filtered)
  }, [filterStatus, searchTerm, orders])

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("បរាជ័យក្នុងការធ្វើបច្ចុប្បន្នភាពស្ថានភាព:", error);
      alert("បរាជ័យក្នុងការធ្វើបច្ចុប្បន្នភាពស្ថានភាព។");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">កំពុងផ្ទុកការបញ្ជាទិញ...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <FilterBar setFilterStatus={setFilterStatus} setSearchTerm={setSearchTerm} currentTexts={currentTexts} />

      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <OrderTableHeader />
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <OrderRow key={order.id} order={order} onStatusChange={handleStatusChange} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                      {searchTerm || filterStatus !== "all"
                        ? "រកមិនឃើញការបញ្ជាទិញដែលត្រូវនឹងលក្ខណៈណែនាំរបស់អ្នកទេ។"
                        : "មិនមានការបញ្ជាទិញនៅឡើយទេ។"}
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
