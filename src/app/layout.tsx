import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { headers } from 'next/headers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vector - Smart Container Delivery Service",
  description: "Secure, track, and deliver with Vector's blockchain-verified smart containers. Real-time IoT monitoring for your valuable shipments.",
  icons: {
    icon: '/Logo.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get current pathname
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const isChartsPage = pathname.includes('/client/charts');

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {!isChartsPage && (
          <script src="https://staging.faq-bot.xyz/chat.js?username=Vector&amp;api_key=fb22fe97-e91e-4c9b-a445-1bed97aadaa7&amp;expanded=0&amp;version=0.001" />
        )}
        {children}
      </body>
    </html>
  );
}
