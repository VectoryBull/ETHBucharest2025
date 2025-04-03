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
            payment: "$2500",
            status: "Pending",
            deliveryCompany: null
        },
        {
            id: "REQ002",
            type: "Electronics",
            pickup: "Miami, FL",
            delivery: "Chicago, IL",
            weight: "500kg",
            temperature: "10-20°C",
            deadline: "2024-02-20",
            payment: "$1800",
            status: "Accepted",
            deliveryCompany: {
                name: "FastTrack Logistics",
                rating: 4.8,
                completedDeliveries: 1250
            }
        }
    ];

    return (
        <DashboardLayout type="client">
            <main className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                        <button className="px-4 py-2 rounded-lg bg-indigo-600">All Requests</button>
                        <button className="px-4 py-2 rounded-lg bg-gray-800">Pending</button>
                        <button className="px-4 py-2 rounded-lg bg-gray-800">Accepted</button>
                    </div>
                    <Link
                        href="/app/requests/new"
                        className="px-4 py-2 rounded-lg bg-indigo-600"
                    >
                        New Request
                    </Link>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <div className="bg-gray-900 rounded-lg p-6">
                        <h3 className="text-gray-400 mb-2">Total Requests</h3>
                        <p className="text-3xl font-semibold">5</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-6">
                        <h3 className="text-gray-400 mb-2">Pending</h3>
                        <p className="text-3xl font-semibold">2</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-6">
                        <h3 className="text-gray-400 mb-2">Total Spent</h3>
                        <p className="text-3xl font-semibold">$6500</p>
                    </div>
                </div>

                <div className="bg-gray-900 rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="p-4 text-left">Request ID</th>
                                <th className="p-4 text-left">Type</th>
                                <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-left">Delivery Company</th>
                                <th className="p-4 text-left">Pickup</th>
                                <th className="p-4 text-left">Delivery</th>
                                <th className="p-4 text-left">Weight</th>
                                <th className="p-4 text-left">Temperature</th>
                                <th className="p-4 text-left">Deadline</th>
                                <th className="p-4 text-left">Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr
                                    key={request.id}
                                    className="border-t border-gray-800 hover:bg-gray-800 transition-colors"
                                >
                                    <td className="p-4">
                                        <Link
                                            href={`/app/requests/${request.id}`}
                                            className="block text-indigo-400 hover:text-indigo-300"
                                        >
                                            {request.id}
                                        </Link>
                                    </td>
                                    <td className="p-4">{request.type}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${request.status === 'Pending' ? 'bg-yellow-500' :
                                            request.status === 'Accepted' ? 'bg-green-500' :
                                                'bg-red-500'
                                            }`}>
                                            {request.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        {request.deliveryCompany ? (
                                            <div>
                                                <p className="font-medium">{request.deliveryCompany.name}</p>
                                                <p className="text-sm text-gray-400">
                                                    ⭐ {request.deliveryCompany.rating} • {request.deliveryCompany.completedDeliveries} deliveries
                                                </p>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="p-4">{request.pickup}</td>
                                    <td className="p-4">{request.delivery}</td>
                                    <td className="p-4">{request.weight}</td>
                                    <td className="p-4">{request.temperature}</td>
                                    <td className="p-4">{request.deadline}</td>
                                    <td className="p-4">{request.payment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </DashboardLayout>
    );
} 