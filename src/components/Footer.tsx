import Link from "next/link";

export default function Footer() {
  const links = [
    { label: "About", href: "/about" },
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Support", href: "/support" },
    { label: "Contact", href: "/contact" },
  ];

  const socials = [
    { label: "Twitter", href: "https://twitter.com", icon: "𝕏" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "in" },
    { label: "GitHub", href: "https://github.com", icon: "󰊤" },
  ];

  return (
    <footer className="border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg"></div>
              <span className="text-xl font-bold">SmartTrack</span>
            </div>
            <p className="text-gray-400">
              Decentralized shipping platform connecting clients with delivery providers worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              {socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400">© 2024 SmartTrack. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/terms" className="text-gray-400 hover:text-white">Terms</Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy</Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 