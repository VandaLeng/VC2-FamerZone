const OrderTableHeader = () => {
  return (
    <thead>
      <tr className="bg-green-50 border-b border-gray-200">
        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Order ID</th>
        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Buyer</th>
        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Address</th>
        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Total Price</th>
        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Quantity</th>
        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Date</th>
        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>

      </tr>
    </thead>
  )
}

export default OrderTableHeader
