import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RailGo — Book Train Tickets Instantly | IRCTC NextGen',
  description: 'India\'s most advanced train booking platform. Real-time seat availability, instant PNR tracking, live GPS, 28 microservices. Book, cancel & refund in seconds.',
  keywords: 'train ticket booking, IRCTC, PNR status, live train status, Indian Railways',
  openGraph: {
    title: 'RailGo — Smart Train Booking',
    description: 'Book, track and manage train journeys with AI-powered assistance.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-stone-50 text-stone-900">
        {children}
      </body>
    </html>
  );
}
