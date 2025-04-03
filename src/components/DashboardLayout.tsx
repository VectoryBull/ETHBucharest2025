import Link from "next/link";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  type: 'client' | 'delivery';
}

export default function DashboardLayout({ children, type }: DashboardLayoutProps) {
  const clientMenuItems = [
    { label: "Dashboard", href: "/client", icon: "📊" },
    { label: "New Request", href: "/client/requests/new", icon: "📦" },
    { label: "My Requests", href: "/client/requests", icon: "📋" },
    { label: "Track Shipments", href: "/client/track", icon: "🚚" },
    { label: "Settings", href: "/client/settings", icon: "⚙️" },
  ];

  const deliveryMenuItems = [
    { label: "Available Requests", href: "/delivery", icon: "📦" },
    { label: "My Deliveries", href: "/delivery/active", icon: "🚚" },
    { label: "Completed", href: "/delivery/completed", icon: "✅" },
    { label: "Company Profile", href: "/delivery/profile", icon: "🏢" },
    { label: "Settings", href: "/delivery/settings", icon: "⚙️" },
  ];

  const menuItems = type === 'client' ? clientMenuItems : deliveryMenuItems;
  const portalName = type === 'client' ? "Client Portal" : "Delivery Portal";
  const actionButton = type === 'client'
    ? { text: "New Request", href: "/client/requests/new" }
    : { text: "View Requests", href: "/delivery" };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <aside className="w-64 bg-gray-900 p-6 space-y-8">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
              <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
            </svg>
          </Link>
          <div>
            <h1 className="text-xl font-semibold">SmartTrack</h1>
            <p className="text-sm text-gray-400">{portalName}</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="pt-4 border-t border-gray-800">
          <Link href="/" className="text-sm text-gray-400 hover:text-white">
            Switch Portal
          </Link>
        </div>
      </aside>

      <div className="flex-1">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 