export interface MicroserviceItem {
  id: string;
  name: string;
  category: 'Core' | 'Booking' | 'Data & AI' | 'Support & Comms' | 'Platform';
  status: 'HEALTHY' | 'DEGRADED' | 'MAINTENANCE';
  latencyMs: number;
  uptime: string;
  requestsPerSec: number;
  port: number;
  description: string;
}

export interface ECateringItem {
  id: string;
  restaurant: string;
  dishName: string;
  category: 'Veg' | 'Non-Veg' | 'Jain';
  price: number;
  rating: number;
  deliveryStation: string;
  prepTime: string;
  image: string;
}

export interface StationAmenity {
  name: string;
  category: 'Lounge' | 'Transport' | 'Food' | 'Utility';
  description: string;
  location: string;
  available: boolean;
}

export interface TrainReview {
  id: string;
  userName: string;
  userBadge: string;
  rating: number;
  cleanliness: number;
  punctuality: number;
  foodQuality: number;
  comment: string;
  date: string;
  verifiedBooking: boolean;
}

export interface WalletTransaction {
  id: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  title: string;
  date: string;
  referenceId: string;
  status: 'SUCCESS' | 'PENDING';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING';
  read: boolean;
}

export const MICROSERVICES_LIST: MicroserviceItem[] = [
  { id: 'gateway', name: 'Gateway Service', category: 'Platform', status: 'HEALTHY', latencyMs: 8, uptime: '99.99%', requestsPerSec: 1450, port: 8000, description: 'API Gateway & SSL Termination' },
  { id: 'discovery', name: 'Discovery Service', category: 'Platform', status: 'HEALTHY', latencyMs: 5, uptime: '100%', requestsPerSec: 920, port: 8761, description: 'Service Registry & Heartbeat' },
  { id: 'auth', name: 'Auth Service', category: 'Core', status: 'HEALTHY', latencyMs: 12, uptime: '99.98%', requestsPerSec: 480, port: 8001, description: 'JWT Authentication & OAuth2' },
  { id: 'user', name: 'User Service', category: 'Core', status: 'HEALTHY', latencyMs: 10, uptime: '99.95%', requestsPerSec: 350, port: 8002, description: 'UserProfile & IRCTC Master List' },
  { id: 'train', name: 'Train Service', category: 'Core', status: 'HEALTHY', latencyMs: 14, uptime: '99.99%', requestsPerSec: 890, port: 8003, description: 'Train Timetables & Schedules' },
  { id: 'station', name: 'Station Service', category: 'Core', status: 'HEALTHY', latencyMs: 9, uptime: '99.99%', requestsPerSec: 760, port: 8004, description: 'Station Master & Platform Guide' },
  { id: 'route', name: 'Route Service', category: 'Core', status: 'HEALTHY', latencyMs: 11, uptime: '99.96%', requestsPerSec: 540, port: 8005, description: 'Route Distance & Halt Calculator' },
  { id: 'search', name: 'Search Service', category: 'Booking', status: 'HEALTHY', latencyMs: 18, uptime: '99.97%', requestsPerSec: 2100, port: 8006, description: 'High-speed Elastic Train Search' },
  { id: 'availability', name: 'Availability Service', category: 'Booking', status: 'HEALTHY', latencyMs: 15, uptime: '99.99%', requestsPerSec: 1800, port: 8007, description: 'Real-time Quota Availability' },
  { id: 'pricing', name: 'Pricing Service', category: 'Booking', status: 'HEALTHY', latencyMs: 14, uptime: '99.98%', requestsPerSec: 950, port: 8008, description: 'Dynamic Fares & Tatkal Pricing' },
  { id: 'seat-inventory', name: 'Seat Inventory Service', category: 'Booking', status: 'HEALTHY', latencyMs: 16, uptime: '99.99%', requestsPerSec: 1650, port: 8009, description: 'Coach Layout & Seat Allocator' },
  { id: 'booking', name: 'Booking Service', category: 'Booking', status: 'HEALTHY', latencyMs: 22, uptime: '99.95%', requestsPerSec: 720, port: 8010, description: '2PC Reservation Engine' },
  { id: 'ticket', name: 'Ticket Service', category: 'Booking', status: 'HEALTHY', latencyMs: 13, uptime: '99.99%', requestsPerSec: 680, port: 8011, description: 'PDF & QR Code E-Ticket Generator' },
  { id: 'pnr', name: 'PNR Service', category: 'Booking', status: 'HEALTHY', latencyMs: 10, uptime: '99.99%', requestsPerSec: 2400, port: 8012, description: '10-digit PNR State Machine' },
  { id: 'payment', name: 'Payment Service', category: 'Booking', status: 'HEALTHY', latencyMs: 35, uptime: '99.92%', requestsPerSec: 410, port: 8013, description: 'UPI & Card Payment Gateway' },
  { id: 'wallet', name: 'Wallet Service', category: 'Booking', status: 'HEALTHY', latencyMs: 8, uptime: '100%', requestsPerSec: 310, port: 8014, description: 'RailGo Fast-Pay Wallet' },
  { id: 'cancellation', name: 'Cancellation Service', category: 'Booking', status: 'HEALTHY', latencyMs: 19, uptime: '99.95%', requestsPerSec: 220, port: 8015, description: 'Instant Ticket Cancellation' },
  { id: 'refund', name: 'Refund Service', category: 'Booking', status: 'HEALTHY', latencyMs: 25, uptime: '99.90%', requestsPerSec: 180, port: 8016, description: 'Instant Refund Ledger Dispatcher' },
  { id: 'ai', name: 'AI Service', category: 'Data & AI', status: 'HEALTHY', latencyMs: 45, uptime: '99.85%', requestsPerSec: 520, port: 8017, description: 'LLM Assistant & Natural Queries' },
  { id: 'recommendation', name: 'Recommendation Service', category: 'Data & AI', status: 'HEALTHY', latencyMs: 28, uptime: '99.90%', requestsPerSec: 640, port: 8018, description: 'PNR Confirmation Probability Engine' },
  { id: 'analytics', name: 'Analytics Service', category: 'Data & AI', status: 'HEALTHY', latencyMs: 30, uptime: '99.99%', requestsPerSec: 1100, port: 8019, description: 'Passenger Surge & Heatmaps' },
  { id: 'review', name: 'Review Service', category: 'Data & AI', status: 'HEALTHY', latencyMs: 12, uptime: '99.94%', requestsPerSec: 290, port: 8020, description: 'Cleanliness & Food Ratings' },
  { id: 'notification', name: 'Notification Service', category: 'Support & Comms', status: 'HEALTHY', latencyMs: 15, uptime: '99.99%', requestsPerSec: 1950, port: 8021, description: 'SMS, Email & Push Alerts' },
  { id: 'audit', name: 'Audit Service', category: 'Support & Comms', status: 'HEALTHY', latencyMs: 7, uptime: '100%', requestsPerSec: 870, port: 8022, description: 'Security Log & Compliance' },
  { id: 'logging', name: 'Logging Service', category: 'Support & Comms', status: 'HEALTHY', latencyMs: 6, uptime: '100%', requestsPerSec: 3200, port: 8023, description: 'Centralized Log Aggregator' },
  { id: 'support', name: 'Support Service', category: 'Support & Comms', status: 'HEALTHY', latencyMs: 14, uptime: '99.95%', requestsPerSec: 430, port: 8024, description: 'Dispute & FAQ Resolution' },
  { id: 'admin', name: 'Admin Service', category: 'Platform', status: 'HEALTHY', latencyMs: 11, uptime: '99.99%', requestsPerSec: 120, port: 8025, description: 'System Dashboard & Override' },
  { id: 'configuration', name: 'Configuration Service', category: 'Platform', status: 'HEALTHY', latencyMs: 4, uptime: '100%', requestsPerSec: 510, port: 8026, description: 'Centralized Spring Cloud Config' },
];

export const E_CATERING_ITEMS: ECateringItem[] = [
  {
    id: 'food-1',
    restaurant: "Domino's Pizza",
    dishName: 'Paneer Makhani Cheese Burst Pizza',
    category: 'Veg',
    price: 389,
    rating: 4.8,
    deliveryStation: 'Surat Junction (ST)',
    prepTime: '25 mins',
    image: '🍕',
  },
  {
    id: 'food-2',
    restaurant: "Haldiram's",
    dishName: 'Deluxe Thali (Paneer Butter Masala, Dal Makhani, Naan, Rice, Sweet)',
    category: 'Veg',
    price: 299,
    rating: 4.9,
    deliveryStation: 'Vadodara Junction (BRC)',
    prepTime: '20 mins',
    image: '🍱',
  },
  {
    id: 'food-3',
    restaurant: 'Comesum Restaurant',
    dishName: 'Butter Chicken Meal Box with Garlic Naan',
    category: 'Non-Veg',
    price: 349,
    rating: 4.7,
    deliveryStation: 'Kota Junction (KOTA)',
    prepTime: '30 mins',
    image: '🍗',
  },
  {
    id: 'food-4',
    restaurant: 'Bikanervala',
    dishName: 'Jain Special Thali (No Onion & Garlic)',
    category: 'Jain',
    price: 279,
    rating: 4.8,
    deliveryStation: 'Ratlam Junction (RTM)',
    prepTime: '15 mins',
    image: '🍛',
  },
];

export const STATION_AMENITIES: Record<string, StationAmenity[]> = {
  BCT: [
    { name: 'IRCTC Executive Lounge', category: 'Lounge', description: 'Air-conditioned luxury waiting lounge with buffet meals and reclining chairs.', location: 'Platform 1', available: true },
    { name: 'High-Speed RailWire Wi-Fi', category: 'Utility', description: 'Complimentary 100 Mbps Wi-Fi for 45 minutes.', location: 'All Platforms', available: true },
    { name: 'Cloak Room & Baggage Storage', category: 'Utility', description: 'Safe baggage storage at ₹30/24 hours.', location: 'Near Gate 2', available: true },
    { name: 'EV Charging Station', category: 'Transport', description: 'Fast electric vehicle charging ports.', location: 'East Parking Lot', available: true },
  ],
  NDLS: [
    { name: 'Plaza Executive Lounge', category: 'Lounge', description: 'Premium lounge with shower cubicles, hot meals, and high-speed Wi-Fi.', location: 'Platform 16', available: true },
    { name: '24/7 Food Plaza', category: 'Food', description: 'Multi-cuisine food court with Subway, KFC, and Haldiram.', location: 'Pahar Ganj Entrance', available: true },
    { name: 'Escalators & Lifts', category: 'Utility', description: 'Full accessibility across all platforms.', location: 'Platforms 1-16', available: true },
  ],
};

export const TRAIN_REVIEWS: TrainReview[] = [
  {
    id: 'rev-1',
    userName: 'Rajesh Verma',
    userBadge: 'Gold Traveler',
    rating: 4.9,
    cleanliness: 5.0,
    punctuality: 4.8,
    foodQuality: 4.9,
    comment: 'Vande Bharat Express is unbelievably clean and quiet. On-board staff served hot tea and delicious breakfast right on time!',
    date: '2026-08-01',
    verifiedBooking: true,
  },
  {
    id: 'rev-2',
    userName: 'Sneha Patel',
    userBadge: 'Verified Passenger',
    rating: 4.8,
    cleanliness: 4.8,
    punctuality: 4.9,
    foodQuality: 4.6,
    comment: 'Mumbai Rajdhani reached New Delhi 10 minutes before schedule! AC temperature was perfectly maintained throughout the night.',
    date: '2026-07-28',
    verifiedBooking: true,
  },
];

export const INITIAL_WALLET_TRANSACTIONS: WalletTransaction[] = [
  { id: 'TXN-9021', type: 'CREDIT', amount: 500, title: 'Cashback Bonus - Tatkal Fest', date: '2026-08-02 11:30', referenceId: 'CB9021', status: 'SUCCESS' },
  { id: 'TXN-8492', type: 'DEBIT', amount: 1420, title: 'Ticket Booking - Vande Bharat', date: '2026-08-04 14:20', referenceId: 'PNR8492049182', status: 'SUCCESS' },
  { id: 'TXN-7721', type: 'CREDIT', amount: 2000, title: 'UPI Top-Up via PhonePe', date: '2026-08-01 09:15', referenceId: 'UPI7721', status: 'SUCCESS' },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { id: 'notif-1', title: 'Chart Prepared for PNR 8492049182', message: 'Coach C3 Seat 14 & 15 confirmed. Platform 5 at Mumbai Central.', time: '10 mins ago', type: 'SUCCESS', read: false },
  { id: 'notif-2', title: 'Vande Bharat Running On Time', message: 'Train #20901 is approaching Surat Junction (PF 1). Expected 08:40 AM.', time: '1 hour ago', type: 'INFO', read: false },
  { id: 'notif-3', title: 'Tatkal Booking Open Tomorrow', message: 'AC Tatkal opens at 10:00 AM. Keep your passenger master list ready.', time: '3 hours ago', type: 'WARNING', read: true },
];
