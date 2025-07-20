import React from "react";

const activityData = [
  {
    vehicle: "Truck 12",
    driver: "John Smith",
    trip: "Chicago to Dallas",
    tripStatus: "Completed",
    generalStatus: "Completed",
  },
  {
    vehicle: "Truck 14",
    driver: "Robert Johnson",
    trip: "New York to Miami",
    tripStatus: "In Progress",
    generalStatus: "In Progress",
  },
  {
    vehicle: "Truck 19",
    driver: "Michael Brown",
    trip: "Los Angeles to Seattle",
    tripStatus: "Completed",
    generalStatus: "Completed",
  },
  {
    vehicle: "Truck 13",
    driver: "James Wilson",
    trip: "Houston to Denver",
    tripStatus: "San Francisco",
    generalStatus: "Completed",
  },
  {
    vehicle: "Truck 15",
    driver: "David Lee",
    trip: "San Francisco to Phoniix",
    tripStatus: "San Francisco",
    generalStatus: "Stausen",
  },
];

const RecentActivity = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mt-6 w-full">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-sm text gray-800">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Vehicle</th>
              <th className="p-3">Driver</th>
              <th className="p-3">Trip</th>
              <th className="p-3">Status</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {activityData.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-3 text-gray-800">{item.vehicle}</td>
                <td className="p-3 text-gray-800">{item.driver}</td>
                <td className="p-3 text-gray-800">{item.trip}</td>
                <td className="p-3 text-gray-800">{item.tripStatus}</td>
                <td className="p-3 text-gray-800">{item.generalStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivity;
