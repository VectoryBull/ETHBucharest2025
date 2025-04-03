import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";
import { RequestSummary } from "@/types/request";
import { apiService } from "@/services/api";

export default async function Requests() {
    const requests: RequestSummary[] = await apiService.getRequests();

    // Calculate stats
    const totalRequests = requests.length;
    const pendingRequests = requests.filter(r => r.status === 'Pending').length;
    const totalAmount = requests.reduce((sum, r) => sum + parseInt(r.amount.replace(/\D/g, '')), 0);

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
                        href="/client/requests/new"
                        className="px-4 py-2 rounded-lg bg-indigo-600"
                    >
                        New Request
                    </Link>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <div className="bg-gray-900 rounded-lg p-6">
                        <h3 className="text-gray-400 mb-2">Total Requests</h3>
                        <p className="text-3xl font-semibold">{totalRequests}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-6">
                        <h3 className="text-gray-400 mb-2">Pending</h3>
                        <p className="text-3xl font-semibold">{pendingRequests}</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-6">
                        <h3 className="text-gray-400 mb-2">Total Spent</h3>
                        <p className="text-3xl font-semibold">${totalAmount}</p>
                    </div>
                </div>

                <div className="bg-gray-900 rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="p-4 text-left">Contract Address</th>
                                <th className="p-4 text-left">Type</th>
                                <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-left">Delivery</th>
                                <th className="p-4 text-left">Deadline</th>
                                <th className="p-4 text-left">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr
                                    key={request.address}
                                    className="border-t border-gray-800 hover:bg-gray-800 transition-colors"
                                >
                                    <td className="p-4">
                                        <Link
                                            href={`/client/requests/${request.address}`}
                                            className="block text-indigo-400 hover:text-indigo-300"
                                        >
                                            {request.address.slice(0, 6)}...{request.address.slice(-4)}
                                        </Link>
                                    </td>
                                    <td className="p-4">{request.type}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${request.status === 'Pending' ? 'bg-yellow-500' :
                                            request.status === 'Accepted' ? 'bg-green-500' :
                                                request.status === 'In Transit' ? 'bg-blue-500' :
                                                    'bg-gray-500'
                                            }`}>
                                            {request.status}
                                        </span>
                                    </td>
                                    <td className="p-4">{request.delivery}</td>
                                    <td className="p-4">{request.deadline}</td>
                                    <td className="p-4">{request.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </DashboardLayout>
    );
} 