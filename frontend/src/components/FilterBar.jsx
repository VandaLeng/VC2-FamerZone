"use client"

// Using Lucide React icons for better visual fidelity, as seen in the image.
// Please ensure you have 'lucide-react' installed: npm install lucide-react
import { Search } from "lucide-react"

const FilterBar = ({ setFilterStatus, setSearchTerm, currentTexts }) => {
  return (
    <div className="bg-white p-6 border-b border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          Reset Data
        </button>
      </div>

      <div className="flex items-center space-x-4 flex-wrap gap-2">
        <div className="flex-1 relative min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder={currentTexts?.searchPlaceholder || "Search orders..."}
            onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <select
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[120px] outline-none"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </div>
  )
}

export default FilterBar
