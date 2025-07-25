import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  Package, 
  Grid3X3,
  Menu,
  X,
  ChevronRight,
  Bell,
  Settings,
  LogOut,
  User
} from 'lucide-react';

const FarmerSidebar = ({ currentLanguage, setCurrentLanguage }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const location = useLocation();

  const texts = {
    kh: {
      dashboard: 'ផ្ទាំងគ្រប់គ្រង',
      orders: 'ការបញ្ជាទិញ',
      customers: 'ការគ្រប់គ្រងអតិថិជន',
      products: 'ការគ្រប់គ្រងផលិតផល',
      categories: 'ការគ្រប់គ្រងប្រភេទ',
      notifications: 'ការជូនដំណឹង',
      settings: 'ការកំណត់',
      logout: 'ចាកចេញ',
      framerZone: 'FramerZone',
      farmerPanel: 'ផ្ទាំងកសិករ',
      premiumFarmer: 'កសិករពិសេស'
    },
    en: {
      dashboard: 'Dashboard',
      orders: 'Order Management',
      customers: 'Customer Management',
      products: 'Product Management',
      categories: 'Category Management',
      notifications: 'Notifications',
      settings: 'Settings',
      logout: 'Logout',
      framerZone: 'FramerZone',
      farmerPanel: 'Farmer Panel',
      premiumFarmer: 'Premium Farmer'
    }
  };

  const currentTexts = texts[currentLanguage];

  const menuItems = [
    {
      id: 'dashboard',
      label: currentTexts.dashboard,
      icon: LayoutDashboard,
      path: '/farmer/dashboard',
      badge: null
    },
    {
      id: 'orders',
      label: currentTexts.orders,
      icon: ShoppingCart,
      path: '/farmer/orders',
      badge: '3'
    },
    {
      id: 'customers',
      label: currentTexts.customers,
      icon: Users,
      path: '/farmer/customers',
      badge: null
    },
    {
      id: 'products',
      label: currentTexts.products,
      icon: Package,
      path: '/farmer/products',
      badge: null
    },
    {
      id: 'categories',
      label: currentTexts.categories,
      icon: Grid3X3,
      path: '/farmer/categories',
      badge: null
    }
  ];

  const bottomMenuItems = [
    {
      id: 'notifications',
      label: currentTexts.notifications,
      icon: Bell,
      path: '/farmer/notifications',
      badge: '2'
    },
    {
      id: 'settings',
      label: currentTexts.settings,
      icon: Settings,
      path: '/farmer/settings',
      badge: null
    }
  ];

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar bg-white shadow-xl border-r border-gray-200 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-72'
    } min-h-screen flex flex-col`}>
      
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center w-full' : ''}`}>
          <button
            onClick={isCollapsed ? toggleSidebar : undefined}
            className={`w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center transition-all duration-200 ${
              isCollapsed ? 'hover:scale-110 hover:shadow-lg cursor-pointer' : 'cursor-default'
            }`}
          >
            <span className="text-white font-bold text-lg">F</span>
          </button>
          
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold text-gray-800">{currentTexts.framerZone}</h1>
              <p className="text-sm text-gray-500">{currentTexts.farmerPanel}</p>
            </div>
          )}
        </div>
        
        {!isCollapsed && (
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <X size={20} className="text-gray-600" />
          </button>
        )}
      </div>

      {/* Profile Section */}
      {!isCollapsed && (
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="text-white" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">John Farmer</h3>
              <p className="text-sm text-gray-500">{currentTexts.premiumFarmer}</p>
            </div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className="relative"
              onClick={() => handleItemClick(item.id)}
            >
              <div
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon 
                  size={20} 
                  className={`${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`}
                />
                
                {!isCollapsed && (
                  <>
                    <span className="font-medium text-sm flex-1 text-left">{item.label}</span>
                    
                    {item.badge && (
                      <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                        isActive 
                          ? 'bg-white bg-opacity-20 text-white' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    
                    <ChevronRight 
                      size={16} 
                      className={`transition-transform duration-200 ${
                        isActive ? 'rotate-90 text-white' : 'text-gray-400'
                      }`}
                    />
                  </>
                )}
              </div>
              
              {isCollapsed && isActive && (
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-green-500 rounded-l-full"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-gray-100 space-y-2">
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => handleItemClick(item.id)}
            >
              <Icon 
                size={20} 
                className={`${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`}
              />
              
              {!isCollapsed && (
                <>
                  <span className="font-medium text-sm flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                      isActive 
                        ? 'bg-white bg-opacity-20 text-white' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
        
        <button className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-red-600 hover:bg-red-50 group ${
          isCollapsed ? 'justify-center' : ''
        }`}>
          <LogOut size={20} className="text-red-500" />
          {!isCollapsed && <span className="font-medium text-sm">{currentTexts.logout}</span>}
        </button>
      </div>
    </div>
  );
};

export default FarmerSidebar;