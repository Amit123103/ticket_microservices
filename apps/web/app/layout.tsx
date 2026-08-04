import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RailGo | Train Ticket Booking Platform',
  description: 'Enterprise train booking 28 microservices platform',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-[#f8fafc] text-slate-900 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
