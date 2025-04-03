import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { apiService } from "@/services/api";
import type { RequestSummary } from "@/types/request";

export default async function ClientDashboard() {
  const requests = await apiService.getRequests() as RequestSummary[];

  // Calculate stats
  const totalRequests = requests.length;
  const pendingRequests = requests.filter((r: RequestSummary) => r.status === 'Pending').length;
  const inTransitRequests = requests.filter((r: RequestSummary) => r.status === 'In Transit').length;
  const totalAmount = requests.reduce((sum: number, r: RequestSummary) =>
    sum + parseInt(r.amount.replace(/\D/g, '')), 0
  );

  // Get recent requests
  const recentRequests = requests.slice(0, 4);

  return (
    <DashboardLayout type="client">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <Link
            href="/client/requests/new"
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            New Request
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-gray-400 mb-2">Total Requests</h3>
            <p className="text-3xl font-semibold">{totalRequests}</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-gray-400 mb-2">Pending</h3>
            <p className="text-3xl font-semibold">{pendingRequests}</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-gray-400 mb-2">In Transit</h3>
            <p className="text-3xl font-semibold">{inTransitRequests}</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-gray-400 mb-2">Total Spent</h3>
            <p className="text-3xl font-semibold">${totalAmount}</p>
          </div>
        </div>

        {/* Recent Requests */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Requests</h2>
            <Link href="/client/requests" className="text-indigo-400 hover:text-indigo-300">
              View All →
            </Link>
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
                {recentRequests.map((request) => (
                  <tr
                    key={request.address}
                    className="border-t border-gray-800 hover:bg-gray-800 transition-colors"
                  >
                    <td className="p-4">
                      <Link
                        href={`/client/requests/${request.address}`}
                        className="text-indigo-400 hover:text-indigo-300"
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
        </div>
      </div>
    </DashboardLayout>
  );
} 