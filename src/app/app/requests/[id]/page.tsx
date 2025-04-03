import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

export default async function RequestDetail({ params }: any) {
    // In a real app, fetch this data based on params.id
    // You would typically await some data here
    const request = {
        id: params.id,
        type: "Vehicle",
        status: "Pending",
        pickup: "New York, NY",
        delivery: "Los Angeles, CA",
        weight: "2500kg",
        temperature: "15-25°C",
        deadline: "2024-02-15",
        payment: "$2500",
        created: "2024-02-01",
        lastUpdated: "2024-02-02",
        details: "Fragile equipment requiring careful handling",
        requirements: [
            "Temperature controlled",
            "No direct sunlight",
            "Shock monitoring"
        ]
    };

    return (
        <DashboardLayout type="client">
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/app/requests"
                            className="text-gray-400 hover:text-white"
                        >
                            ← Back to Requests
                        </Link>
                        <h1 className="text-2xl font-semibold">Request {request.id}</h1>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-yellow-500 text-sm">
                        {request.status}
                    </span>
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
                            <div className="text-2xl text-indigo-400">{request.payment}</div>
                        </div>

                        <div className="bg-gray-900 rounded-lg p-6 space-y-4">
                            <h2 className="text-xl font-semibold">Requirements</h2>
                            <ul className="list-disc list-inside space-y-2">
                                {request.requirements.map((req) => (
                                    <li key={req} className="text-gray-400">{req}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gray-900 rounded-lg p-6 space-y-4">
                            <h2 className="text-xl font-semibold">Additional Details</h2>
                            <p className="text-gray-400">{request.details}</p>
                        </div>

                        <div className="bg-gray-900 rounded-lg p-6 space-y-4">
                            <h2 className="text-xl font-semibold">Timeline</h2>
                            <div className="space-y-2">
                                <div>
                                    <p className="text-gray-400">Created</p>
                                    <p>{request.created}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Last Updated</p>
                                    <p>{request.lastUpdated}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
} 