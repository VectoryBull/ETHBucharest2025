import DashboardLayout from "@/components/DashboardLayout";
import ShipmentCard from "@/components/ShipmentCard";

export default function DeliveryDashboard() {
  const stats = [
    { label: "Active Deliveries", value: "5" },
    { label: "Pending Requests", value: "3" },
    { label: "Completed Today", value: "12" },
  ];

  return (
    <DashboardLayout type="delivery">
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-gray-400 mb-2">{stat.label}</h3>
              <p className="text-3xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <ShipmentCard
            id="SHIP001"
            type="Vehicle"
            status="In Transit"
            from="New York, NY"
            to="Los Angeles, CA"
            temperature="23.5°C"
            humidity="45%"
            lastUpdate="10 mins ago"
          />
          {/* Add more shipment cards */}
        </div>
      </div>
    </DashboardLayout>
  );
} 