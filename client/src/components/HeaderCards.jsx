import React from 'react';

const cards = [
  {
    label: 'Total Vehicles',
    value: 120,
    bg: 'bg-blue-500',
  },
  {
    label: 'Active Vehicles',
    value: 85,
    bg: 'bg-teal-500',
  },
  {
    label: 'Drivers',
    value: 64,
    bg: 'bg-purple-500',
  },
  {
    label: 'Scheduled Trips',
    value: 23,
    bg: 'bg-orange-400',
  },
];

function HeaderCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 w-full">
      {cards.map((card, index) => 
        <div
          key={index}
          className={`p-6 text-white rounded-xl shadow-md flex flex-col items-center justify-center ${card.bg}`}
        >
          <div className="text-sm">{card.label}</div>
          <div className="text-2xl font-bold">{card.value}</div>
        </div>
      )}

      {/* Enhanced Car Icon Card */}
      <div className="p-6 bg-yellow-100 rounded-xl shadow-md flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-yellow-700"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M5.5 16a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm13 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11v5a1 1 0 0 1-1 1h-.5a2.5 2.5 0 0 0-5 0h-2a2.5 2.5 0 0 0-5 0H6a1 1 0 0 1-1-1v-5zM7 9h10l-.9-2.7a.5.5 0 0 0-.5-.3H8.4a.5.5 0 0 0-.5.3L7 9z" />
        </svg>
      </div>
    </div>
  );
}

export default HeaderCards;
