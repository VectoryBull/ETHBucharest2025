import Link from "next/link";
import Footer from "@/components/Footer";
import Image from 'next/image';

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
      <nav className="p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="/Logo.png"
              alt="Vector Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-xl font-semibold">Vector</span>
          </div>
          <div className="flex gap-4">
            <Link
              href="/client"
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Client Portal
            </Link>
            <Link
              href="/delivery"
              className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors"
            >
              Delivery Portal
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        <Image
          src="/hero.png"
          alt="Supply Chain Management"
          width={1920}
          height={1080}
          className="w-full h-[600px] object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 space-y-6">
            <h1 className="text-5xl font-bold max-w-2xl">
              Smart Supply Chain Management with Blockchain Technology
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Track, monitor, and secure your shipments with real-time IoT data and blockchain verification.
            </p>
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

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-6 py-24 bg-gray-900/50">
        <div className="grid grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Meet Vector</h2>
            <div className="prose prose-invert">
              <p className="text-xl text-gray-300">
                Named after the intelligent and precise Autobot scientist, Vector is a next-generation
                delivery service that combines advanced IoT hardware with blockchain technology.
              </p>
              <p className="text-gray-400">
                Just as Vector Prime safeguards time and space, our smart containers protect and monitor
                your valuable shipments across the global supply chain. Each container is equipped with
                cutting-edge sensors that track:
              </p>
              <ul className="text-gray-400 list-disc list-inside space-y-2">
                <li>Real-time location and movement</li>
                <li>Temperature and humidity levels</li>
                <li>Vibration and impact detection</li>
                <li>Security and tampering attempts</li>
              </ul>
              <p className="text-gray-400 mt-4">
                With the precision of a scientist and the reliability of a guardian, Vector ensures your
                shipments are delivered safely while providing complete transparency through our
                blockchain-verified tracking system.
              </p>
            </div>
            <div className="flex gap-4 pt-4">
              <Link
                href="/client/requests/new"
                className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                Start Shipping
              </Link>
              <a
                href="#features"
                className="px-6 py-3 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur-2xl opacity-20"></div>
            <div className="relative bg-gray-800 rounded-lg p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="text-4xl font-bold text-indigo-400">99.9%</div>
                  <div className="text-sm text-gray-400">Delivery Success Rate</div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="text-4xl font-bold text-purple-400">24/7</div>
                  <div className="text-sm text-gray-400">Real-time Monitoring</div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="text-4xl font-bold text-blue-400">100%</div>
                  <div className="text-sm text-gray-400">Blockchain Verified</div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="text-4xl font-bold text-green-400">IoT</div>
                  <div className="text-sm text-gray-400">Smart Containers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
