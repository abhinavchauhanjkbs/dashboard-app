import React from 'react';
import Sidebar from './components/Sidebar';
import HeaderCards from './components/HeaderCards';
import VehicleStatusChart from './components/VehicleStatusChart';
import Map from './components/Map';
import RecentActivity from './components/RecentActivity';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';

function App() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 px-6 py-6 space-y-6 w-full">

        {/* ✅ Dashboard + Login/Signup Buttons in same line */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="space-x-2">
            <button
              onClick={() => document.getElementById('loginModal')?.showModal()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </button>
            <button
              onClick={() => document.getElementById('signupModal')?.showModal()}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Signup
            </button>
          </div>
        </div>

        {/* Cards */}
        <HeaderCards />

        {/* Charts and Map side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <VehicleStatusChart />
          <Map />
        </div>

        {/* Recent Activity */}
        <RecentActivity />

        {/* Modals */}
        <LoginModal />
        <SignupModal />
      </main>
    </div>
  );
}

export default App;
