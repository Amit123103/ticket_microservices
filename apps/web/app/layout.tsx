import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Train Ticket Booking Platform',
  description: 'Enterprise train booking microservices platform',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
