import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { apiService } from "@/services/api";
import UpdateRequestButton from "@/components/UpdateRequestButton";
import ContainerVisualization from "@/components/ContainerVisualization";
import SensorTimeline from "@/components/SensorTimeline";
import { NETWORKS } from "@/config/networks";

interface Props {
    params: Promise<{ address: string }>;
}

export default async function RequestDetail({ params }: Props) {
    const { address } = await params;
    const request = await apiService.getRequest(address);
    const lastSensorData = request?.sensorData?.[request.sensorData.length - 1];


    const formatSensorData = (data: any) => {
        return {
            temperature: (Number(data.temperature) / 100).toFixed(2),
            humidity: (Number(data.humidity) / 100).toFixed(2),
            vibration1: (Number(data.vibration1) / 100).toFixed(2),
            vibration2: (Number(data.vibration2) / 100).toFixed(2),
            gyro: (Number(data.gyro) / 100).toFixed(2),
            lat: (Number(data.lat) / 1000000).toFixed(6),
            lng: (Number(data.lng) / 1000000).toFixed(6),
        };
    };
    if (!request) {
        return (
            <DashboardLayout type="client">
                <div className="p-6">
                    <div className="text-red-500">Request not found</div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout type="client">
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/client/requests"
                            className="text-gray-400 hover:text-white"
                        >
                            ← Back to Requests
                        </Link>
                        <h1 className="text-2xl font-semibold">
                            Request {request.address.slice(0, 6)}...
                            {request.address.slice(-4)}
                        </h1>
                    </div>
                    <span
                        className={`px-3 py-1 rounded-full text-xs ${request.status === "Pending"
                            ? "bg-yellow-500"
                            : request.status === "Accepted"
                                ? "bg-green-500"
                                : request.status === "In Transit"
                                    ? "bg-blue-500"
                                    : "bg-gray-500"
                            }`}
                    >
                        {request.status}
                    </span>
                </div>

                <div className="flex items-center gap-4 mb-6">
                    <a
                        href={`${NETWORKS.ARBITRUM_SEPOLIA.explorer}/address/${address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-300 bg-gray-800/50 px-3 py-2 rounded-lg transition-colors group"
                    >
                        <span className="font-mono">{address}</span>
                        <div className="flex items-center gap-1 text-indigo-400 group-hover:text-indigo-300">
                            <span>View on Block Explorer</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                                    clipRule="evenodd"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </a>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    {/* Main Info */}
                    <div className="space-y-6">
                        <div className="bg-gray-900 rounded-lg p-6 space-y-4">
                            <h2 className="text-xl font-semibold">Shipment Details</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-400">Type</p>
                                    <p>{request.type}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Weight</p>
                                    <p>{request.weight}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Temperature Range</p>
                                    <p>{request.temperature}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Deadline</p>
                                    <p>{request.deadline}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900 rounded-lg p-6 space-y-4">
                            <h2 className="text-xl font-semibold">Route</h2>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-gray-400">Pickup Location</p>
                                    <p>{request.pickup}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Delivery Location</p>
                                    <p>{request.delivery}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="space-y-6">
                        <div className="bg-gray-900 rounded-lg p-6 space-y-4">
                            <h2 className="text-xl font-semibold">Payment</h2>
                            <div className="text-2xl text-indigo-400">{request.amount}</div>
                        </div>

                        {request.sensorData && (
                            <div className="bg-gray-900 rounded-lg p-6 space-y-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold">Sensor Data</h2>
                                    <span className="text-sm text-gray-400">
                                        Last updated:{" "}
                                        {new Date(lastSensorData?.timestamp || 0).toLocaleString()}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gray-400">Temperature</p>
                                        <p className="text-xl">{lastSensorData?.temperature}°C</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">Humidity</p>
                                        <p className="text-xl">{lastSensorData?.humidity}%</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">Vibrations</p>
                                        <p className="text-xl">{lastSensorData?.vibrations}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">Acceleration</p>
                                        <p>X: {lastSensorData?.acceleration.x}</p>
                                        <p>Y: {lastSensorData?.acceleration.y}</p>
                                        <p>Z: {lastSensorData?.acceleration.z}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Container Visualization - Full width */}
                {request.sensorData && (
                    <div className="bg-gray-900 rounded-lg p-6 space-y-4">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-4">
                                <h2 className="text-xl font-semibold">Container Position</h2>
                                <UpdateRequestButton address={address} />
                            </div>
                            <span className="text-sm text-gray-400">
                                Last updated:{" "}
                                {new Date(lastSensorData?.timestamp || 0).toLocaleString()}
                            </span>
                        </div>
                        <ContainerVisualization sensorData={request.sensorData} />
                    </div>
                )}

                <iframe
                    src="/maps.html"
                    width="100%"
                    height="500px"
                    className="rounded-lg"
                ></iframe>

                {request.sensorData && (
                    <div className="bg-gray-900 rounded-lg p-6 space-y-4">
                        <h2 className="text-xl font-semibold">Sensor History</h2>
                        <SensorTimeline
                            data={request.sensorData.map((data) => ({
                                timestamp: data.timestamp,
                                temperature: data.temperature,
                                humidity: data.humidity,
                                vibrations: data.vibrations,
                                x: data.acceleration.x,
                                y: data.acceleration.y,
                                z: data.acceleration.z,
                            }))}
                        />
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
