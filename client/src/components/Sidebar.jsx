import React, { useState } from 'react';
import { FaTachometerAlt, FaCar, FaUser, FaRoute, FaChartBar, FaCog } from 'react-icons/fa';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-gray-900 text-white p-4 flex justify-between items-center">
        <button onClick={toggleSidebar}>
          {/* Hamburger Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 z-40 bg-gray-900 text-white w-64 p-4 min-h-screen
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        transition-transform duration-300 ease-in-out flex flex-col`}
      >
        {/* Dashboard Icon at very top with tooltip */}
        <div className="relative group mb-8">
          <div className="flex items-center gap-3 text-xl font-semibold">
            <FaTachometerAlt className="text-blue-400" />
            <span className="hidden md:inline text-white text-xl font-semibold">Dashboard</span>
          </div>
          {/* Tooltip on hover for small screens */}
          <span className="absolute left-12 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 md:hidden">
            Dashboard
          </span>
        </div>

        {/* Sidebar Links */}
        <ul className="space-y-4 text-lg">
          <SidebarItem icon={<FaCar />} label="Vehicles" />
          <SidebarItem icon={<FaUser />} label="Drivers" />
          <SidebarItem icon={<FaRoute />} label="Trips" />
          <SidebarItem icon={<FaChartBar />} label="Reports" />
          <SidebarItem icon={<FaCog />} label="Settings" />
        </ul>
      </aside>

      {/* Backdrop for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={toggleSidebar} />}
    </>
  );
}

const SidebarItem = ({ icon, label }) => (
  <li className="flex items-center gap-3 hover:text-blue-400 cursor-pointer">
    <span className="text-xl">{icon}</span>
    {label}
  </li>
);

export default Sidebar;
