import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { Request } from "@/types/request";
import { apiService } from "@/services/api";


export default async function RequestDetail({ params }: any) {
    const request = await apiService.getRequest(params.address);

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
                        <h1 className="text-2xl font-semibold">Request {request.address.slice(0, 6)}...{request.address.slice(-4)}</h1>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${request.status === 'Pending' ? 'bg-yellow-500' :
                        request.status === 'Accepted' ? 'bg-green-500' :
                            request.status === 'In Transit' ? 'bg-blue-500' :
                                'bg-gray-500'
                        }`}>
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
                            <div className="text-2xl text-indigo-400">{request.amount}</div>
                        </div>

                        <div className="bg-gray-900 rounded-lg p-6 space-y-4">
                            <h2 className="text-xl font-semibold">Timeline</h2>
                            <div className="space-y-2">
                                <div>
                                    <p className="text-gray-400">Created</p>
                                    <p>{new Date(request.created).toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Last Updated</p>
                                    <p>{new Date(request.lastUpdated).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
} 