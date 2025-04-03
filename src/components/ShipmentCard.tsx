interface ShipmentCardProps {
  id: string;
  type: string;
  status: string;
  from: string;
  to: string;
  temperature: string;
  humidity: string;
  lastUpdate: string;
  alert?: string;
}

export default function ShipmentCard({
  id,
  type,
  status,
  from,
  to,
  temperature,
  humidity,
  lastUpdate,
  alert
}: ShipmentCardProps) {
  const isDelayed = status === "Delayed";
  const statusColor = isDelayed ? "bg-red-500" : "bg-indigo-600";

  return (
    <div className="bg-gray-900 rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">{id}</h3>
          <p className="text-gray-400">{type}</p>
        </div>
        <span className={`${statusColor} px-3 py-1 rounded-full text-sm`}>
          {status}
        </span>
      </div>

      <div className="space-y-2">
        <div>
          <p className="text-gray-400 text-sm">From:</p>
          <p>{from}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">To:</p>
          <p>{to}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-gray-400 text-sm">Temperature</p>
          <p>{temperature}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Humidity</p>
          <p>{humidity}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Last Update</p>
          <p>{lastUpdate}</p>
        </div>
      </div>

      {alert && (
        <div className="bg-red-500/10 text-red-500 p-4 rounded-lg">
          Alert: {alert}
        </div>
      )}
    </div>
  );
} 