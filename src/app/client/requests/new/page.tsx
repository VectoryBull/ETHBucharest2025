import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

export default function NewRequest() {
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
                        <h1 className="text-2xl font-semibold">New Request</h1>
                    </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-6">
                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-gray-400">Type</label>
                                <select className="w-full bg-gray-800 rounded-lg p-2 border border-gray-700">
                                    <option value="Vehicle">Vehicle</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Food">Food</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-gray-400">Weight (kg)</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-800 rounded-lg p-2 border border-gray-700"
                                    placeholder="Enter weight"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-gray-400">Temperature Range</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-800 rounded-lg p-2 border border-gray-700"
                                    placeholder="e.g. 15-25°C"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-gray-400">Deadline</label>
                                <input
                                    type="date"
                                    className="w-full bg-gray-800 rounded-lg p-2 border border-gray-700"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-gray-400">Pickup Location</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-800 rounded-lg p-2 border border-gray-700"
                                    placeholder="Enter pickup location"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-gray-400">Delivery Location</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-800 rounded-lg p-2 border border-gray-700"
                                    placeholder="Enter delivery location"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            <Link
                                href="/client/requests"
                                className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors"
                            >
                                Create Request
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
} 