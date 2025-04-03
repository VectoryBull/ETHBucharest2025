import DashboardLayout from "@/components/DashboardLayout";

export default function NewRequest() {
    return (
        <DashboardLayout type="client">
            <main className="p-6 max-w-4xl mx-auto">
                <h1 className="text-2xl font-semibold mb-6">New Shipping Request</h1>

                <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h2 className="text-xl">Shipment Details</h2>

                            <div className="space-y-2">
                                <label className="block">Shipment Title</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-800 rounded-lg p-2"
                                    placeholder="Enter shipment title"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block">Cargo Type</label>
                                <select className="w-full bg-gray-800 rounded-lg p-2">
                                    <option>Select type</option>
                                    <option>Vehicle</option>
                                    <option>Electronics</option>
                                    <option>Food</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block">Container Size</label>
                                    <select className="w-full bg-gray-800 rounded-lg p-2">
                                        <option>20ft</option>
                                        <option>40ft</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="block">Weight (kg)</label>
                                    <input
                                        type="number"
                                        className="w-full bg-gray-800 rounded-lg p-2"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl">Requirements</h2>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block">Min Temperature (°C)</label>
                                    <input
                                        type="number"
                                        className="w-full bg-gray-800 rounded-lg p-2"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block">Max Temperature (°C)</label>
                                    <input
                                        type="number"
                                        className="w-full bg-gray-800 rounded-lg p-2"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block">Humidity (%)</label>
                                <input
                                    type="range"
                                    className="w-full"
                                    min="0"
                                    max="100"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block">Shock Sensitivity</label>
                                <select className="w-full bg-gray-800 rounded-lg p-2">
                                    <option>Medium</option>
                                    <option>Low</option>
                                    <option>High</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="sunlight" />
                                <label htmlFor="sunlight">Avoid direct sunlight</label>
                            </div>

                            <div className="space-y-2">
                                <label className="block">Special Requirements</label>
                                <textarea
                                    className="w-full bg-gray-800 rounded-lg p-2"
                                    rows={4}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl">Pickup & Delivery</h2>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block">Pickup Address</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-800 rounded-lg p-2"
                                    placeholder="Enter pickup address"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block">Delivery Address</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-800 rounded-lg p-2"
                                    placeholder="Enter delivery address"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block">Delivery Date</label>
                                <input
                                    type="date"
                                    className="w-full bg-gray-800 rounded-lg p-2"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block">Shipping Method</label>
                                <select className="w-full bg-gray-800 rounded-lg p-2">
                                    <option>Air</option>
                                    <option>Sea</option>
                                    <option>Land</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl">Additional Services</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="insurance" />
                                <label htmlFor="insurance">Insurance Coverage</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="tracking" />
                                <label htmlFor="tracking">Live GPS Tracking</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="monitoring" />
                                <label htmlFor="monitoring">Temperature & Humidity Monitoring</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="priority" />
                                <label htmlFor="priority">Priority Shipping</label>
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                            <div className="flex justify-between items-center">
                                <span>Estimated Cost</span>
                                <span className="text-xl text-indigo-400">$1000.00</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            className="px-4 py-2 rounded-lg bg-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-indigo-600"
                        >
                            Submit Request
                        </button>
                    </div>
                </form>
            </main>
        </DashboardLayout>
    );
} 