import Link from "next/link";
import Footer from "@/components/Footer";

export default function Home() {
  const features = [
    {
      icon: "🌐",
      title: "Decentralized Network",
      description: "Connect directly with shipping providers worldwide without intermediaries"
    },
    {
      icon: "🤝",
      title: "Direct Negotiations",
      description: "Get the best rates by dealing directly with transport companies"
    },
    {
      icon: "📱",
      title: "Real-time Tracking",
      description: "Monitor your shipments with advanced IoT sensors and live updates"
    },
    {
      icon: "🔐",
      title: "Secure & Transparent",
      description: "Every transaction and tracking data is secured and verifiable"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg"></div>
              <span className="text-xl font-bold">SmartTrack</span>
            </div>
            <div className="flex gap-4">
              <Link href="/about" className="hover:text-gray-300">About</Link>
              <Link href="/contact" className="hover:text-gray-300">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center space-y-8">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            Decentralized Shipping Platform
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Connect directly with shipping providers worldwide. Get better rates,
            real-time tracking, and complete transparency in your logistics.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/app"
              className="px-8 py-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors font-semibold"
            >
              Ship Now
            </Link>
            <Link
              href="/delivery"
              className="px-8 py-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors font-semibold"
            >
              Become a Provider
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-gray-900 rounded-lg p-6 space-y-4 hover:bg-gray-800 transition-colors"
            >
              <div className="text-4xl">{feature.icon}</div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-500">500+</div>
              <div className="text-gray-400 mt-2">Shipping Providers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-500">50K+</div>
              <div className="text-gray-400 mt-2">Successful Deliveries</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-500">30+</div>
              <div className="text-gray-400 mt-2">Countries Covered</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
