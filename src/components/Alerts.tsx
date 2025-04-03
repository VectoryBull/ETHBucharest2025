interface Alert {
  message: string;
  time: string;
}

interface AlertsProps {
  alerts: Alert[];
}

export default function Alerts({ alerts }: AlertsProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h2 className="text-xl mb-4">Alerts</h2>
      <div className="space-y-2">
        {alerts.map((alert, index) => (
          <div key={index} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
            <div>
              <p>{alert.message}</p>
              <p className="text-sm text-gray-400">{alert.time}</p>
            </div>
            <button className="text-gray-400 hover:text-gray-300">×</button>
          </div>
        ))}
      </div>
    </div>
  );
} 