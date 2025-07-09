import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import HeaderCards from './components/HeaderCards';
import VehicleStatusChart from './components/VehicleStatusChart';
import Map from './components/Map';
import RecentActivity from './components/RecentActivity';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Modal from './components/Modal';

function App() {
  const [modalType, setModalType] = useState(null); // 'login' | 'signup' | null

  const openLogin = () => setModalType('login');
  const openSignup = () => setModalType('signup');
  const closeModal = () => setModalType(null);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 px-6 py-6 space-y-6 w-full">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">Dashboard</div>
          <div className="flex gap-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={openLogin}
            >
              Login
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={openSignup}
            >
              Signup
            </button>
          </div>
        </div>

        {/* Modal */}
        {modalType === 'login' && (
          <Modal title="Login" onClose={closeModal}>
            <LoginForm
              onClose={closeModal}
              onSwitchToSignup={() => setModalType('signup')}
            />
          </Modal>
        )}
        {modalType === 'signup' && (
          <Modal title="Signup" onClose={closeModal}>
            <SignupForm
              onClose={closeModal}
              onSwitchToLogin={() => setModalType('login')}
            />
          </Modal>
        )}

        {/* Dashboard */}
        <HeaderCards />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <VehicleStatusChart />
          <Map />
        </div>
        <RecentActivity />
      </main>
    </div>
  );
}

export default App;
