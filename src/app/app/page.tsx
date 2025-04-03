import DashboardLayout from "@/components/DashboardLayout";
import ShipmentCard from "@/components/ShipmentCard";
import RequestSummary from "@/components/RequestSummary";

export default function ClientDashboard() {
  const stats = [
    { label: "Active Shipments", value: "2" },
    { label: "Pending Requests", value: "1" },
    { label: "Total Spent", value: "$6,500" },
  ];

  const activeShipments = [
    {
      id: "SHIP001",
      type: "Vehicle",
      status: "In Transit",
      from: "New York, NY",
      to: "Los Angeles, CA",
      temperature: "23.5°C",
      humidity: "45%",
      lastUpdate: "10 mins ago"
    },
    {
      id: "SHIP002",
      type: "Electronics",
      status: "Delayed",
      from: "Miami, FL",
      to: "Chicago, IL",
      temperature: "28.2°C",
      humidity: "52%",
      lastUpdate: "25 mins ago",
      alert: "Temperature above threshold"
    }
  ];

  const recentRequests = [
    {
      id: "REQ003",
      type: "Food",
      status: "Pending",
      destination: "Denver, CO",
      price: "$2,200",
      date: "2024-02-12"
    },
    {
      id: "REQ002",
      type: "Electronics",
      status: "Accepted",
      destination: "Chicago, IL",
      price: "$1,800",
      date: "2024-02-10"
    }
  ];

  return (
    <DashboardLayout type="client">
      <div className="space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-gray-400 mb-2">{stat.label}</h3>
              <p className="text-3xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex gap-4">
            <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors">
              New Request
            </button>
            <button className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
              Track Shipment
            </button>
            <button className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
              View History
            </button>
          </div>
        </div>

        {/* Active Shipments */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Active Shipments</h2>
          <div className="grid grid-cols-2 gap-6">
            {activeShipments.map((shipment) => (
              <ShipmentCard key={shipment.id} {...shipment} />
            ))}
          </div>
        </div>

        {/* Recent Requests */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Requests</h2>
          <div className="space-y-4">
            {recentRequests.map((request) => (
              <RequestSummary key={request.id} {...request} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 