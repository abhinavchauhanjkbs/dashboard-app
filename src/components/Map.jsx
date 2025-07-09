import React from 'react';

function Map() {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Vehicles Map</h2>
      <div className="rounded-md overflow-hidden">
        <img
          src="/vehicles-map.png"
          alt="Vehicles Map"
          className="w-full h-[250px] object-cover"
        />
      </div>
    </div>
  );
}

export default Map;
