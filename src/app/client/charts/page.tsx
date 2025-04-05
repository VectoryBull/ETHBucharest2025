'use client';

import DashboardLayout from "@/components/DashboardLayout";
import ChatAnalytics from "./ChatAnalytics";

export default function ChartsPage() {
    return (
        <DashboardLayout type="client">
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Analytics Chat</h1>
                    <span className="px-3 py-1 rounded-full text-xs bg-gray-600 text-white">
                        AI Assistant
                    </span>
                </div>
                <ChatAnalytics />
            </div>
        </DashboardLayout>
    );
}
