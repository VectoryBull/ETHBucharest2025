interface SensorDataProps {
    temperature: string;
    humidity: string;
    shock: string;
}

export default function SensorData({ temperature, humidity, shock }: SensorDataProps) {
    return (
        <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl mb-4">Sensor Data</h2>
            <div className="space-y-3">
                <div className="flex justify-between">
                    <span>Temperature</span>
                    <span className="text-purple-500">{temperature}</span>
                </div>
                <div className="flex justify-between">
                    <span>Humidity</span>
                    <span className="text-purple-500">{humidity}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shock</span>
                    <span className="text-purple-500">{shock}</span>
                </div>
            </div>
        </div>
    );
} 