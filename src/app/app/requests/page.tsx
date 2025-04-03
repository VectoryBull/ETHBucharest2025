import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";

export default function Requests() {
    const requests = [
        {
            id: "REQ001",
            type: "Vehicle",
            pickup: "New York, NY",
            delivery: "Los Angeles, CA",
            weight: "2500kg",
            temperature: "15-25°C",
            deadline: "2024-02-15",
            payment: "$2500"
        },
        // ... more requests
    ];

    return (
        <DashboardLayout type="client">
            <main className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                        <button className="px-4 py-2 rounded-lg bg-indigo-600">All Requests</button>
                        <button className="px-4 py-2 rounded-lg bg-gray-800">Urgent</button>
                        <button className="px-4 py-2 rounded-lg bg-gray-800">Normal</button>
                    </div>
                    <Link
                        href="/requests/new"
                        className="px-4 py-2 rounded-lg bg-indigo-600"
                    >
                        New Request
                    </Link>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <div className="bg-gray-900 rounded-lg p-6">
                        <h3 className="text-gray-400 mb-2">Pending Requests</h3>
                        <p className="text-3xl font-semibold">3</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-6">
                        <h3 className="text-gray-400 mb-2">Active Deliveries</h3>
                        <p className="text-3xl font-semibold">0</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-6">
                        <h3 className="text-gray-400 mb-2">Total Value</h3>
                        <p className="text-3xl font-semibold">$6500</p>
                    </div>
                </div>

                <div className="bg-gray-900 rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="p-4 text-left">Request ID</th>
                                <th className="p-4 text-left">Type</th>
                                <th className="p-4 text-left">Pickup</th>
                                <th className="p-4 text-left">Delivery</th>
                                <th className="p-4 text-left">Weight</th>
                                <th className="p-4 text-left">Temperature</th>
                                <th className="p-4 text-left">Deadline</th>
                                <th className="p-4 text-left">Payment</th>
                                <th className="p-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr key={request.id} className="border-t border-gray-800">
                                    <td className="p-4">{request.id}</td>
                                    <td className="p-4">{request.type}</td>
                                    <td className="p-4">{request.pickup}</td>
                                    <td className="p-4">{request.delivery}</td>
                                    <td className="p-4">{request.weight}</td>
                                    <td className="p-4">{request.temperature}</td>
                                    <td className="p-4">{request.deadline}</td>
                                    <td className="p-4">{request.payment}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button className="px-3 py-1 rounded bg-indigo-600">Accept</button>
                                            <button className="px-3 py-1 rounded bg-red-600">Decline</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </DashboardLayout>
    );
} 