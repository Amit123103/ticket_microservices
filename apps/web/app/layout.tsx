import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RailGo | Train Ticket Booking Platform',
  description: 'Enterprise train booking 28 microservices platform',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0b0f19] text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
