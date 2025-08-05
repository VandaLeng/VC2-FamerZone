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
      onStatusUpdate(order.id, newStatus); 
      setShowDropdown(false);
    } catch (error) {
      console.error('បរាជ័យក្នុងការធ្វើបច្ចុប្បន្នភាពស្ថានភាព:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr className="border-b border-gray-200">
      <td className="px-6 py-3 text-sm text-gray-800">{order.id}</td>
      <td className="px-6 py-3 text-sm text-gray-800">{order.user?.name || 'មិនមាន'}</td>
      <td className="px-6 py-3 text-sm text-gray-800">{order.address}</td>
      <td className="px-6 py-3 text-sm text-[#2D5016] font-semibold">{order.total_price}</td>
      <td className="px-6 py-3 text-sm text-[#2D5016]">{order.quantity}</td>
      <td className="px-6 py-3 text-sm text-gray-800">{new Date(order.created_at).toLocaleString()}</td>
      <td className="px-6 py-3 text-sm capitalize text-gray-800">
        {{
          pending: "កំពុងរង់ចាំ",
          confirmed: "បានបញ្ជាក់",
          delivered: "បានដឹកជញ្ជូន",
          cancelled: "បានបោះបង់"
        }[order.status] || order.status}
      </td>
      <td className="px-6 py-3 relative text-sm text-gray-800">
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
              កំណត់ជា​កំពុងរង់ចាំ
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-green-100"
              onClick={() => handleStatusChange('confirmed')}
              disabled={loading}
            >
              <CheckCircle size={14} className="inline mr-2" />
              កំណត់ជា​បានបញ្ជាក់
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-green-100"
              onClick={() => handleStatusChange('delivered')}
              disabled={loading}
            >
              <Truck size={14} className="inline mr-2" />
              កំណត់ជា​បានដឹកជញ្ជូន
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-700"
              onClick={() => handleStatusChange('cancelled')}
              disabled={loading}
            >
              <XCircle size={14} className="inline mr-2" />
              កំណត់ជា​បានបោះបង់
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default OrderRow;
