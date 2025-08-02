import React, { useState } from 'react';
import { MoreVertical, CheckCircle, Clock, XCircle, Truck } from 'lucide-react';
import axios from 'axios';

const OrderRow = ({ order, onStatusUpdate }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleStatusChange = async (newStatus) => {
    try {
      setLoading(true);
      await axios.put(`/api/orders/${order.id}/status`, {
        status: newStatus,
      });
      onStatusUpdate(order.id, newStatus); // Update parent state
      setShowDropdown(false);
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr className="border-b border-gray-200">
      <td className="p-2">{order.id}</td>
      <td className="p-2">{order.user?.name || 'N/A'}</td>
      <td className="p-2">{order.address}</td>
      <td className="p-2">{order.total_price}</td>
      <td className="p-2">{order.quantity}</td>
      <td className="p-2">{new Date(order.created_at).toLocaleString()}</td>
      <td className="p-2 capitalize">{order.status}</td>
      <td className="p-2 relative">
        <button
          onClick={toggleDropdown}
          className="text-gray-600 hover:text-black"
          disabled={loading}
        >
          <MoreVertical size={18} />
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow z-20">
            <button
              className="w-full text-left px-4 py-2 hover:bg-green-100"
              onClick={() => handleStatusChange('pending')}
              disabled={loading}
            >
              <Clock size={14} className="inline mr-2" />
              Set to Pending
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-green-100"
              onClick={() => handleStatusChange('confirmed')}
              disabled={loading}
            >
              <CheckCircle size={14} className="inline mr-2" />
              Set to Confirmed
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-green-100"
              onClick={() => handleStatusChange('delivered')}
              disabled={loading}
            >
              <Truck size={14} className="inline mr-2" />
              Set to Delivered
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-700"
              onClick={() => handleStatusChange('cancelled')}
              disabled={loading}
            >
              <XCircle size={14} className="inline mr-2" />
              Set to Cancelled
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default OrderRow;
