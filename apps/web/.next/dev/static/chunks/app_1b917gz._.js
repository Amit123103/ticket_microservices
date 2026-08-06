(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/data/microservicesData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "E_CATERING_ITEMS",
    ()=>E_CATERING_ITEMS,
    "INITIAL_NOTIFICATIONS",
    ()=>INITIAL_NOTIFICATIONS,
    "INITIAL_WALLET_TRANSACTIONS",
    ()=>INITIAL_WALLET_TRANSACTIONS,
    "MICROSERVICES_LIST",
    ()=>MICROSERVICES_LIST,
    "STATION_AMENITIES",
    ()=>STATION_AMENITIES,
    "TRAIN_REVIEWS",
    ()=>TRAIN_REVIEWS
]);
const MICROSERVICES_LIST = [
    {
        id: 'gateway',
        name: 'Gateway Service',
        category: 'Platform',
        status: 'HEALTHY',
        latencyMs: 8,
        uptime: '99.99%',
        requestsPerSec: 1450,
        port: 8000,
        description: 'API Gateway & SSL Termination'
    },
    {
        id: 'discovery',
        name: 'Discovery Service',
        category: 'Platform',
        status: 'HEALTHY',
        latencyMs: 5,
        uptime: '100%',
        requestsPerSec: 920,
        port: 8761,
        description: 'Service Registry & Heartbeat'
    },
    {
        id: 'auth',
        name: 'Auth Service',
        category: 'Core',
        status: 'HEALTHY',
        latencyMs: 12,
        uptime: '99.98%',
        requestsPerSec: 480,
        port: 8001,
        description: 'JWT Authentication & OAuth2'
    },
    {
        id: 'user',
        name: 'User Service',
        category: 'Core',
        status: 'HEALTHY',
        latencyMs: 10,
        uptime: '99.95%',
        requestsPerSec: 350,
        port: 8002,
        description: 'UserProfile & IRCTC Master List'
    },
    {
        id: 'train',
        name: 'Train Service',
        category: 'Core',
        status: 'HEALTHY',
        latencyMs: 14,
        uptime: '99.99%',
        requestsPerSec: 890,
        port: 8003,
        description: 'Train Timetables & Schedules'
    },
    {
        id: 'station',
        name: 'Station Service',
        category: 'Core',
        status: 'HEALTHY',
        latencyMs: 9,
        uptime: '99.99%',
        requestsPerSec: 760,
        port: 8004,
        description: 'Station Master & Platform Guide'
    },
    {
        id: 'route',
        name: 'Route Service',
        category: 'Core',
        status: 'HEALTHY',
        latencyMs: 11,
        uptime: '99.96%',
        requestsPerSec: 540,
        port: 8005,
        description: 'Route Distance & Halt Calculator'
    },
    {
        id: 'search',
        name: 'Search Service',
        category: 'Booking',
        status: 'HEALTHY',
        latencyMs: 18,
        uptime: '99.97%',
        requestsPerSec: 2100,
        port: 8006,
        description: 'High-speed Elastic Train Search'
    },
    {
        id: 'availability',
        name: 'Availability Service',
        category: 'Booking',
        status: 'HEALTHY',
        latencyMs: 15,
        uptime: '99.99%',
        requestsPerSec: 1800,
        port: 8007,
        description: 'Real-time Quota Availability'
    },
    {
        id: 'pricing',
        name: 'Pricing Service',
        category: 'Booking',
        status: 'HEALTHY',
        latencyMs: 14,
        uptime: '99.98%',
        requestsPerSec: 950,
        port: 8008,
        description: 'Dynamic Fares & Tatkal Pricing'
    },
    {
        id: 'seat-inventory',
        name: 'Seat Inventory Service',
        category: 'Booking',
        status: 'HEALTHY',
        latencyMs: 16,
        uptime: '99.99%',
        requestsPerSec: 1650,
        port: 8009,
        description: 'Coach Layout & Seat Allocator'
    },
    {
        id: 'booking',
        name: 'Booking Service',
        category: 'Booking',
        status: 'HEALTHY',
        latencyMs: 22,
        uptime: '99.95%',
        requestsPerSec: 720,
        port: 8010,
        description: '2PC Reservation Engine'
    },
    {
        id: 'ticket',
        name: 'Ticket Service',
        category: 'Booking',
        status: 'HEALTHY',
        latencyMs: 13,
        uptime: '99.99%',
        requestsPerSec: 680,
        port: 8011,
        description: 'PDF & QR Code E-Ticket Generator'
    },
    {
        id: 'pnr',
        name: 'PNR Service',
        category: 'Booking',
        status: 'HEALTHY',
        latencyMs: 10,
        uptime: '99.99%',
        requestsPerSec: 2400,
        port: 8012,
        description: '10-digit PNR State Machine'
    },
    {
        id: 'payment',
        name: 'Payment Service',
        category: 'Booking',
        status: 'HEALTHY',
        latencyMs: 35,
        uptime: '99.92%',
        requestsPerSec: 410,
        port: 8013,
        description: 'UPI & Card Payment Gateway'
    },
    {
        id: 'wallet',
        name: 'Wallet Service',
        category: 'Booking',
        status: 'HEALTHY',
        latencyMs: 8,
        uptime: '100%',
        requestsPerSec: 310,
        port: 8014,
        description: 'RailGo Fast-Pay Wallet'
    },
    {
        id: 'cancellation',
        name: 'Cancellation Service',
        category: 'Booking',
        status: 'HEALTHY',
        latencyMs: 19,
        uptime: '99.95%',
        requestsPerSec: 220,
        port: 8015,
        description: 'Instant Ticket Cancellation'
    },
    {
        id: 'refund',
        name: 'Refund Service',
        category: 'Booking',
        status: 'HEALTHY',
        latencyMs: 25,
        uptime: '99.90%',
        requestsPerSec: 180,
        port: 8016,
        description: 'Instant Refund Ledger Dispatcher'
    },
    {
        id: 'ai',
        name: 'AI Service',
        category: 'Data & AI',
        status: 'HEALTHY',
        latencyMs: 45,
        uptime: '99.85%',
        requestsPerSec: 520,
        port: 8017,
        description: 'LLM Assistant & Natural Queries'
    },
    {
        id: 'recommendation',
        name: 'Recommendation Service',
        category: 'Data & AI',
        status: 'HEALTHY',
        latencyMs: 28,
        uptime: '99.90%',
        requestsPerSec: 640,
        port: 8018,
        description: 'PNR Confirmation Probability Engine'
    },
    {
        id: 'analytics',
        name: 'Analytics Service',
        category: 'Data & AI',
        status: 'HEALTHY',
        latencyMs: 30,
        uptime: '99.99%',
        requestsPerSec: 1100,
        port: 8019,
        description: 'Passenger Surge & Heatmaps'
    },
    {
        id: 'review',
        name: 'Review Service',
        category: 'Data & AI',
        status: 'HEALTHY',
        latencyMs: 12,
        uptime: '99.94%',
        requestsPerSec: 290,
        port: 8020,
        description: 'Cleanliness & Food Ratings'
    },
    {
        id: 'notification',
        name: 'Notification Service',
        category: 'Support & Comms',
        status: 'HEALTHY',
        latencyMs: 15,
        uptime: '99.99%',
        requestsPerSec: 1950,
        port: 8021,
        description: 'SMS, Email & Push Alerts'
    },
    {
        id: 'audit',
        name: 'Audit Service',
        category: 'Support & Comms',
        status: 'HEALTHY',
        latencyMs: 7,
        uptime: '100%',
        requestsPerSec: 870,
        port: 8022,
        description: 'Security Log & Compliance'
    },
    {
        id: 'logging',
        name: 'Logging Service',
        category: 'Support & Comms',
        status: 'HEALTHY',
        latencyMs: 6,
        uptime: '100%',
        requestsPerSec: 3200,
        port: 8023,
        description: 'Centralized Log Aggregator'
    },
    {
        id: 'support',
        name: 'Support Service',
        category: 'Support & Comms',
        status: 'HEALTHY',
        latencyMs: 14,
        uptime: '99.95%',
        requestsPerSec: 430,
        port: 8024,
        description: 'Dispute & FAQ Resolution'
    },
    {
        id: 'admin',
        name: 'Admin Service',
        category: 'Platform',
        status: 'HEALTHY',
        latencyMs: 11,
        uptime: '99.99%',
        requestsPerSec: 120,
        port: 8025,
        description: 'System Dashboard & Override'
    },
    {
        id: 'configuration',
        name: 'Configuration Service',
        category: 'Platform',
        status: 'HEALTHY',
        latencyMs: 4,
        uptime: '100%',
        requestsPerSec: 510,
        port: 8026,
        description: 'Centralized Spring Cloud Config'
    }
];
const E_CATERING_ITEMS = [
    {
        id: 'food-1',
        restaurant: "Domino's Pizza",
        dishName: 'Paneer Makhani Cheese Burst Pizza',
        category: 'Veg',
        price: 389,
        rating: 4.8,
        deliveryStation: 'Surat Junction (ST)',
        prepTime: '25 mins',
        image: '🍕'
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
        image: '🍱'
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
        image: '🍗'
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
        image: '🍛'
    }
];
const STATION_AMENITIES = {
    BCT: [
        {
            name: 'IRCTC Executive Lounge',
            category: 'Lounge',
            description: 'Air-conditioned luxury waiting lounge with buffet meals and reclining chairs.',
            location: 'Platform 1',
            available: true
        },
        {
            name: 'High-Speed RailWire Wi-Fi',
            category: 'Utility',
            description: 'Complimentary 100 Mbps Wi-Fi for 45 minutes.',
            location: 'All Platforms',
            available: true
        },
        {
            name: 'Cloak Room & Baggage Storage',
            category: 'Utility',
            description: 'Safe baggage storage at ₹30/24 hours.',
            location: 'Near Gate 2',
            available: true
        },
        {
            name: 'EV Charging Station',
            category: 'Transport',
            description: 'Fast electric vehicle charging ports.',
            location: 'East Parking Lot',
            available: true
        }
    ],
    NDLS: [
        {
            name: 'Plaza Executive Lounge',
            category: 'Lounge',
            description: 'Premium lounge with shower cubicles, hot meals, and high-speed Wi-Fi.',
            location: 'Platform 16',
            available: true
        },
        {
            name: '24/7 Food Plaza',
            category: 'Food',
            description: 'Multi-cuisine food court with Subway, KFC, and Haldiram.',
            location: 'Pahar Ganj Entrance',
            available: true
        },
        {
            name: 'Escalators & Lifts',
            category: 'Utility',
            description: 'Full accessibility across all platforms.',
            location: 'Platforms 1-16',
            available: true
        }
    ]
};
const TRAIN_REVIEWS = [
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
        verifiedBooking: true
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
        verifiedBooking: true
    }
];
const INITIAL_WALLET_TRANSACTIONS = [
    {
        id: 'TXN-9021',
        type: 'CREDIT',
        amount: 500,
        title: 'Cashback Bonus - Tatkal Fest',
        date: '2026-08-02 11:30',
        referenceId: 'CB9021',
        status: 'SUCCESS'
    },
    {
        id: 'TXN-8492',
        type: 'DEBIT',
        amount: 1420,
        title: 'Ticket Booking - Vande Bharat',
        date: '2026-08-04 14:20',
        referenceId: 'PNR8492049182',
        status: 'SUCCESS'
    },
    {
        id: 'TXN-7721',
        type: 'CREDIT',
        amount: 2000,
        title: 'UPI Top-Up via PhonePe',
        date: '2026-08-01 09:15',
        referenceId: 'UPI7721',
        status: 'SUCCESS'
    }
];
const INITIAL_NOTIFICATIONS = [
    {
        id: 'notif-1',
        title: 'Chart Prepared for PNR 8492049182',
        message: 'Coach C3 Seat 14 & 15 confirmed. Platform 5 at Mumbai Central.',
        time: '10 mins ago',
        type: 'SUCCESS',
        read: false
    },
    {
        id: 'notif-2',
        title: 'Vande Bharat Running On Time',
        message: 'Train #20901 is approaching Surat Junction (PF 1). Expected 08:40 AM.',
        time: '1 hour ago',
        type: 'INFO',
        read: false
    },
    {
        id: 'notif-3',
        title: 'Tatkal Booking Open Tomorrow',
        message: 'AC Tatkal opens at 10:00 AM. Keep your passenger master list ready.',
        time: '3 hours ago',
        type: 'WARNING',
        read: true
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/data/trainData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INITIAL_USER_TRIPS",
    ()=>INITIAL_USER_TRIPS,
    "LIVE_TRAINS",
    ()=>LIVE_TRAINS,
    "MOCK_PNRS",
    ()=>MOCK_PNRS,
    "STATIONS",
    ()=>STATIONS,
    "TRAINS_DATA",
    ()=>TRAINS_DATA,
    "USER_TRIPS",
    ()=>USER_TRIPS
]);
const STATIONS = [
    {
        code: 'BCT',
        name: 'Mumbai Central',
        city: 'Mumbai',
        state: 'Maharashtra'
    },
    {
        code: 'NDLS',
        name: 'New Delhi',
        city: 'New Delhi',
        state: 'Delhi'
    },
    {
        code: 'ADI',
        name: 'Ahmedabad Junction',
        city: 'Ahmedabad',
        state: 'Gujarat'
    },
    {
        code: 'SBC',
        name: 'KSR Bengaluru City',
        city: 'Bengaluru',
        state: 'Karnataka'
    },
    {
        code: 'MAS',
        name: 'MGR Chennai Central',
        city: 'Chennai',
        state: 'Tamil Nadu'
    },
    {
        code: 'PUNE',
        name: 'Pune Junction',
        city: 'Pune',
        state: 'Maharashtra'
    },
    {
        code: 'HWH',
        name: 'Howrah Junction',
        city: 'Kolkata',
        state: 'West Bengal'
    },
    {
        code: 'HYB',
        name: 'Hyderabad Deccan',
        city: 'Hyderabad',
        state: 'Telangana'
    },
    {
        code: 'JP',
        name: 'Jaipur Junction',
        city: 'Jaipur',
        state: 'Rajasthan'
    },
    {
        code: 'LKO',
        name: 'Lucknow Charbagh',
        city: 'Lucknow',
        state: 'Uttar Pradesh'
    },
    {
        code: 'MAO',
        name: 'Madgaon Junction',
        city: 'Goa',
        state: 'Goa'
    },
    {
        code: 'BSB',
        name: 'Varanasi Junction',
        city: 'Varanasi',
        state: 'Uttar Pradesh'
    },
    {
        code: 'PNBE',
        name: 'Patna Junction',
        city: 'Patna',
        state: 'Bihar'
    },
    {
        code: 'CDG',
        name: 'Chandigarh Junction',
        city: 'Chandigarh',
        state: 'Chandigarh'
    },
    {
        code: 'ST',
        name: 'Surat Junction',
        city: 'Surat',
        state: 'Gujarat'
    }
];
const TRAINS_DATA = [
    {
        id: 'rajdhani-12951',
        number: '12951',
        name: 'Mumbai Central - New Delhi Rajdhani Express',
        type: 'Rajdhani',
        fromCode: 'BCT',
        fromName: 'Mumbai Central',
        toCode: 'NDLS',
        toName: 'New Delhi',
        departureTime: '17:00',
        arrivalTime: '08:32',
        duration: '15h 32m',
        runsOn: [
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
            'Sun'
        ],
        rating: 4.8,
        badge: 'Premier Rajdhani',
        classes: [
            {
                code: '1A',
                name: 'First AC',
                price: 4750,
                available: 6,
                status: 'AVAILABLE'
            },
            {
                code: '2A',
                name: '2 Tier AC',
                price: 2890,
                available: 24,
                status: 'AVAILABLE'
            },
            {
                code: '3A',
                name: '3 Tier AC',
                price: 2050,
                available: 68,
                status: 'AVAILABLE'
            },
            {
                code: '3E',
                name: '3 AC Economy',
                price: 1890,
                available: 42,
                status: 'AVAILABLE'
            }
        ],
        route: [
            {
                stationCode: 'BCT',
                stationName: 'Mumbai Central',
                arrivalTime: '--',
                departureTime: '17:00',
                haltMinutes: 0,
                distanceKm: 0,
                day: 1,
                platform: 'PF 1',
                isPassed: true
            },
            {
                stationCode: 'ST',
                stationName: 'Surat',
                arrivalTime: '19:43',
                departureTime: '19:48',
                haltMinutes: 5,
                distanceKm: 263,
                day: 1,
                platform: 'PF 1',
                isPassed: true
            },
            {
                stationCode: 'BRC',
                stationName: 'Vadodara Junction',
                arrivalTime: '21:16',
                departureTime: '21:26',
                haltMinutes: 10,
                distanceKm: 393,
                day: 1,
                platform: 'PF 2',
                isPassed: true
            },
            {
                stationCode: 'RTM',
                stationName: 'Ratlam Junction',
                arrivalTime: '00:35',
                departureTime: '00:38',
                haltMinutes: 3,
                distanceKm: 653,
                day: 2,
                platform: 'PF 5',
                isPassed: false
            },
            {
                stationCode: 'KOTA',
                stationName: 'Kota Junction',
                arrivalTime: '03:15',
                departureTime: '03:25',
                haltMinutes: 10,
                distanceKm: 920,
                day: 2,
                platform: 'PF 1',
                isPassed: false
            },
            {
                stationCode: 'NDLS',
                stationName: 'New Delhi',
                arrivalTime: '08:32',
                departureTime: '--',
                haltMinutes: 0,
                distanceKm: 1384,
                day: 2,
                platform: 'PF 3',
                isPassed: false
            }
        ]
    },
    {
        id: 'vande-bharat-20901',
        number: '20901',
        name: 'Mumbai Central - Gandhinagar Capital Vande Bharat Express',
        type: 'Vande Bharat',
        fromCode: 'BCT',
        fromName: 'Mumbai Central',
        toCode: 'ADI',
        toName: 'Ahmedabad Junction',
        departureTime: '06:00',
        arrivalTime: '11:25',
        duration: '5h 25m',
        runsOn: [
            'Mon',
            'Tue',
            'Wed',
            'Fri',
            'Sat',
            'Sun'
        ],
        rating: 4.9,
        badge: 'Fastest 160 km/h',
        classes: [
            {
                code: 'CC',
                name: 'AC Chair Car',
                price: 1420,
                available: 85,
                status: 'AVAILABLE'
            },
            {
                code: 'EC',
                name: 'Executive Chair Car',
                price: 2630,
                available: 12,
                status: 'AVAILABLE'
            }
        ],
        route: [
            {
                stationCode: 'BCT',
                stationName: 'Mumbai Central',
                arrivalTime: '--',
                departureTime: '06:00',
                haltMinutes: 0,
                distanceKm: 0,
                day: 1,
                platform: 'PF 5',
                isPassed: true
            },
            {
                stationCode: 'BVI',
                stationName: 'Borivali',
                arrivalTime: '06:23',
                departureTime: '06:25',
                haltMinutes: 2,
                distanceKm: 30,
                day: 1,
                platform: 'PF 6',
                isPassed: true
            },
            {
                stationCode: 'ST',
                stationName: 'Surat',
                arrivalTime: '08:40',
                departureTime: '08:43',
                haltMinutes: 3,
                distanceKm: 263,
                day: 1,
                platform: 'PF 1',
                isPassed: true
            },
            {
                stationCode: 'BRC',
                stationName: 'Vadodara Junction',
                arrivalTime: '10:00',
                departureTime: '10:05',
                haltMinutes: 5,
                distanceKm: 393,
                day: 1,
                platform: 'PF 3',
                isPassed: false
            },
            {
                stationCode: 'ADI',
                stationName: 'Ahmedabad Junction',
                arrivalTime: '11:25',
                departureTime: '--',
                haltMinutes: 0,
                distanceKm: 493,
                day: 1,
                platform: 'PF 1',
                isPassed: false
            }
        ]
    },
    {
        id: 'tejas-express-82901',
        number: '82901',
        name: 'Mumbai Central - Ahmedabad Tejas Express',
        type: 'Superfast',
        fromCode: 'BCT',
        fromName: 'Mumbai Central',
        toCode: 'ADI',
        toName: 'Ahmedabad Junction',
        departureTime: '15:45',
        arrivalTime: '22:05',
        duration: '6h 20m',
        runsOn: [
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sun'
        ],
        rating: 4.6,
        badge: 'IRCTC Premium',
        classes: [
            {
                code: 'CC',
                name: 'AC Chair Car',
                price: 1280,
                available: 110,
                status: 'AVAILABLE'
            },
            {
                code: 'EC',
                name: 'Executive Chair Car',
                price: 2390,
                available: 18,
                status: 'AVAILABLE'
            }
        ],
        route: [
            {
                stationCode: 'BCT',
                stationName: 'Mumbai Central',
                arrivalTime: '--',
                departureTime: '15:45',
                haltMinutes: 0,
                distanceKm: 0,
                day: 1,
                platform: 'PF 2'
            },
            {
                stationCode: 'ST',
                stationName: 'Surat',
                arrivalTime: '18:50',
                departureTime: '18:53',
                haltMinutes: 3,
                distanceKm: 263,
                day: 1,
                platform: 'PF 1'
            },
            {
                stationCode: 'ADI',
                stationName: 'Ahmedabad Junction',
                arrivalTime: '22:05',
                departureTime: '--',
                haltMinutes: 0,
                distanceKm: 493,
                day: 1,
                platform: 'PF 4'
            }
        ]
    },
    {
        id: 'august-kranti-12953',
        number: '12953',
        name: 'August Kranti Rajdhani Express',
        type: 'Rajdhani',
        fromCode: 'BCT',
        fromName: 'Mumbai Central',
        toCode: 'NDLS',
        toName: 'New Delhi',
        departureTime: '17:10',
        arrivalTime: '09:43',
        duration: '16h 33m',
        runsOn: [
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
            'Sun'
        ],
        rating: 4.7,
        classes: [
            {
                code: '1A',
                name: 'First AC',
                price: 4620,
                available: 3,
                status: 'AVAILABLE'
            },
            {
                code: '2A',
                name: '2 Tier AC',
                price: 2780,
                available: 14,
                status: 'AVAILABLE'
            },
            {
                code: '3A',
                name: '3 Tier AC',
                price: 1980,
                available: 0,
                status: 'RAC',
                statusNumber: 12
            }
        ],
        route: [
            {
                stationCode: 'BCT',
                stationName: 'Mumbai Central',
                arrivalTime: '--',
                departureTime: '17:10',
                haltMinutes: 0,
                distanceKm: 0,
                day: 1
            },
            {
                stationCode: 'NDLS',
                stationName: 'New Delhi',
                arrivalTime: '09:43',
                departureTime: '--',
                haltMinutes: 0,
                distanceKm: 1377,
                day: 2
            }
        ]
    },
    {
        id: 'deccan-queen-12123',
        number: '12123',
        name: 'Deccan Queen Superfast Express',
        type: 'Express',
        fromCode: 'BCT',
        fromName: 'Mumbai CSMT',
        toCode: 'PUNE',
        toName: 'Pune Junction',
        departureTime: '17:10',
        arrivalTime: '20:25',
        duration: '3h 15m',
        runsOn: [
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
            'Sun'
        ],
        rating: 4.8,
        badge: 'Historic Iconic',
        classes: [
            {
                code: 'CC',
                name: 'AC Chair Car',
                price: 485,
                available: 140,
                status: 'AVAILABLE'
            },
            {
                code: '2S',
                name: 'Second Sitting',
                price: 175,
                available: 210,
                status: 'AVAILABLE'
            }
        ],
        route: [
            {
                stationCode: 'CSMT',
                stationName: 'Mumbai CSMT',
                arrivalTime: '--',
                departureTime: '17:10',
                haltMinutes: 0,
                distanceKm: 0,
                day: 1
            },
            {
                stationCode: 'LNL',
                stationName: 'Lonavala',
                arrivalTime: '19:00',
                departureTime: '19:02',
                haltMinutes: 2,
                distanceKm: 128,
                day: 1
            },
            {
                stationCode: 'PUNE',
                stationName: 'Pune Junction',
                arrivalTime: '20:25',
                departureTime: '--',
                haltMinutes: 0,
                distanceKm: 192,
                day: 1
            }
        ]
    },
    {
        id: 'karnataka-express-12627',
        number: '12627',
        name: 'Karnataka Superfast Express',
        type: 'Superfast',
        fromCode: 'NDLS',
        fromName: 'New Delhi',
        toCode: 'SBC',
        toName: 'KSR Bengaluru City',
        departureTime: '20:10',
        arrivalTime: '12:00',
        duration: '39h 50m',
        runsOn: [
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
            'Sun'
        ],
        rating: 4.5,
        classes: [
            {
                code: '2A',
                name: '2 Tier AC',
                price: 3450,
                available: 18,
                status: 'AVAILABLE'
            },
            {
                code: '3A',
                name: '3 Tier AC',
                price: 2380,
                available: 45,
                status: 'AVAILABLE'
            },
            {
                code: 'SL',
                name: 'Sleeper Class',
                price: 890,
                available: 0,
                status: 'WL',
                statusNumber: 28
            }
        ],
        route: [
            {
                stationCode: 'NDLS',
                stationName: 'New Delhi',
                arrivalTime: '--',
                departureTime: '20:10',
                haltMinutes: 0,
                distanceKm: 0,
                day: 1
            },
            {
                stationCode: 'SBC',
                stationName: 'KSR Bengaluru',
                arrivalTime: '12:00',
                departureTime: '--',
                haltMinutes: 0,
                distanceKm: 2409,
                day: 3
            }
        ]
    }
];
const MOCK_PNRS = {
    '8492049182': {
        pnr: '8492049182',
        bookingId: 'TKT849204',
        trainNumber: '20901',
        trainName: 'Vande Bharat Express',
        fromCode: 'BCT',
        fromCity: 'Mumbai',
        toCode: 'ADI',
        toCity: 'Ahmedabad',
        departureDate: '2026-08-15',
        departureTime: '06:00',
        arrivalTime: '11:25',
        travelClass: 'AC Chair Car (CC)',
        quota: 'General',
        passengers: [
            {
                name: 'Amit Kumar',
                age: 28,
                gender: 'Male',
                berthPreference: 'Window',
                seatAssigned: 'C3 - 14 (Window)',
                status: 'CNF (Confirmed)'
            },
            {
                name: 'Priya Sharma',
                age: 26,
                gender: 'Female',
                berthPreference: 'No Preference',
                seatAssigned: 'C3 - 15 (Aisle)',
                status: 'CNF (Confirmed)'
            }
        ],
        totalFare: 2840,
        paymentMethod: 'UPI (GPay)',
        bookingTime: '2026-08-04 14:20',
        status: 'CONFIRMED',
        coach: 'C3',
        chartStatus: 'CHART PREPARED'
    },
    '2184910482': {
        pnr: '2184910482',
        bookingId: 'TKT218491',
        trainNumber: '12951',
        trainName: 'Rajdhani Express',
        fromCode: 'BCT',
        fromCity: 'Mumbai',
        toCode: 'NDLS',
        toCity: 'New Delhi',
        departureDate: '2026-08-20',
        departureTime: '17:00',
        arrivalTime: '08:32',
        travelClass: '3 Tier AC (3A)',
        quota: 'Tatkal',
        passengers: [
            {
                name: 'Rohan Verma',
                age: 34,
                gender: 'Male',
                berthPreference: 'Lower',
                seatAssigned: 'B2 - 07 (Lower)',
                status: 'CNF (Confirmed)'
            }
        ],
        totalFare: 2250,
        paymentMethod: 'Credit Card',
        bookingTime: '2026-08-03 10:02',
        status: 'CONFIRMED',
        coach: 'B2',
        chartStatus: 'CHART NOT PREPARED'
    }
};
const INITIAL_USER_TRIPS = [
    MOCK_PNRS['8492049182'],
    MOCK_PNRS['2184910482']
];
const USER_TRIPS = INITIAL_USER_TRIPS;
const LIVE_TRAINS = {
    '12301': {
        trainNumber: '12301',
        trainName: 'Howrah Rajdhani Express',
        fromCode: 'NDLS',
        toCode: 'HWH',
        currentStation: 'Mughal Sarai Junction',
        currentState: 'Uttar Pradesh',
        speed: 110,
        delay: 15,
        lastUpdated: '2 min ago',
        nextStation: 'Patna Junction',
        stations: [
            {
                stationCode: 'NDLS',
                stationName: 'New Delhi',
                arrivalTime: '--',
                departureTime: '17:05',
                isPassed: true
            },
            {
                stationCode: 'CNB',
                stationName: 'Kanpur Central',
                arrivalTime: '21:45',
                departureTime: '21:50',
                isPassed: true
            },
            {
                stationCode: 'MGS',
                stationName: 'Mughal Sarai Jn',
                arrivalTime: '01:28',
                departureTime: '01:33',
                isPassed: false
            },
            {
                stationCode: 'PNBE',
                stationName: 'Patna Junction',
                arrivalTime: '04:00',
                departureTime: '04:10',
                isPassed: false
            },
            {
                stationCode: 'HWH',
                stationName: 'Howrah Junction',
                arrivalTime: '09:55',
                departureTime: '--',
                isPassed: false
            }
        ]
    },
    '12951': {
        trainNumber: '12951',
        trainName: 'Mumbai Rajdhani Express',
        fromCode: 'BCT',
        toCode: 'NDLS',
        currentStation: 'Kota Junction',
        currentState: 'Rajasthan',
        speed: 130,
        delay: 0,
        lastUpdated: '1 min ago',
        nextStation: 'New Delhi',
        stations: [
            {
                stationCode: 'BCT',
                stationName: 'Mumbai Central',
                arrivalTime: '--',
                departureTime: '17:00',
                isPassed: true
            },
            {
                stationCode: 'ST',
                stationName: 'Surat',
                arrivalTime: '19:43',
                departureTime: '19:48',
                isPassed: true
            },
            {
                stationCode: 'BRC',
                stationName: 'Vadodara Junction',
                arrivalTime: '21:16',
                departureTime: '21:26',
                isPassed: true
            },
            {
                stationCode: 'KOTA',
                stationName: 'Kota Junction',
                arrivalTime: '03:15',
                departureTime: '03:25',
                isPassed: false
            },
            {
                stationCode: 'NDLS',
                stationName: 'New Delhi',
                arrivalTime: '08:32',
                departureTime: '--',
                isPassed: false
            }
        ]
    },
    '20901': {
        trainNumber: '20901',
        trainName: 'Vande Bharat Express',
        fromCode: 'BCT',
        toCode: 'ADI',
        currentStation: 'Surat',
        currentState: 'Gujarat',
        speed: 160,
        delay: 0,
        lastUpdated: 'Just now',
        nextStation: 'Vadodara Junction',
        stations: [
            {
                stationCode: 'BCT',
                stationName: 'Mumbai Central',
                arrivalTime: '--',
                departureTime: '06:00',
                isPassed: true
            },
            {
                stationCode: 'BVI',
                stationName: 'Borivali',
                arrivalTime: '06:23',
                departureTime: '06:25',
                isPassed: true
            },
            {
                stationCode: 'ST',
                stationName: 'Surat',
                arrivalTime: '08:40',
                departureTime: '08:43',
                isPassed: false
            },
            {
                stationCode: 'BRC',
                stationName: 'Vadodara Junction',
                arrivalTime: '10:00',
                departureTime: '10:05',
                isPassed: false
            },
            {
                stationCode: 'ADI',
                stationName: 'Ahmedabad Junction',
                arrivalTime: '11:25',
                departureTime: '--',
                isPassed: false
            }
        ]
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Navbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/Navbar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$LandingPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/LandingPage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$AuthModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/AuthModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$HeroSearch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/HeroSearch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TrainList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/TrainList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TrainRouteModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/TrainRouteModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$SeatMapModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/SeatMapModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$BookingCheckout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/BookingCheckout.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ETicketModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ETicketModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PNRStatusView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/PNRStatusView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$LiveStatusView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/LiveStatusView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$MyTripsView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/MyTripsView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PaymentHistoryView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/PaymentHistoryView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$RefundHistoryView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/RefundHistoryView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$HelpChatView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/HelpChatView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$MicroservicesDashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/MicroservicesDashboard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$AITravelAssistant$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/AITravelAssistant.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$StationExplorer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/StationExplorer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TrainReviews$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/TrainReviews.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ECateringModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ECateringModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$WalletModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/WalletModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$NotificationsDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/NotificationsDrawer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$trainData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/data/trainData.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function Page() {
    _s();
    // Auth State — DEFAULT TO NOT LOGGED IN SO LANDING PAGE OPENS FIRST!
    const [isLoggedIn, setIsLoggedIn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showAuthModal, setShowAuthModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showLandingPage, setShowLandingPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Navigation Tab State
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('search');
    // Search Engine Form State
    const [fromCode, setFromCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('BCT');
    const [toCode, setToCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('NDLS');
    const [travelDate, setTravelDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('2026-08-15');
    const [passengerCount, setPassengerCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [quota, setQuota] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('General');
    const [classFilter, setClassFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('ALL');
    const [hasSearched, setHasSearched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Active Modals State
    const [routeTrain, setRouteTrain] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [seatTrainInfo, setSeatTrainInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedSeats, setSelectedSeats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [checkoutInfo, setCheckoutInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [viewTicket, setViewTicket] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showWalletModal, setShowWalletModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showNotificationsDrawer, setShowNotificationsDrawer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showECateringModal, setShowECateringModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showAiAssistantModal, setShowAiAssistantModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // User Trips State
    const [userTrips, setUserTrips] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$trainData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_USER_TRIPS"]);
    // Filtered Trains
    const filteredTrains = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$trainData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRAINS_DATA"].filter((t)=>{
        const matchesFrom = t.fromCode === fromCode || fromCode === 'BCT';
        const matchesTo = t.toCode === toCode || toCode === 'NDLS';
        const matchesClass = classFilter === 'ALL' || t.classes.some((c)=>c.code === classFilter);
        return matchesFrom && matchesTo && matchesClass;
    });
    const displayTrains = filteredTrains.length > 0 ? filteredTrains : __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$trainData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRAINS_DATA"];
    const handleSearchSubmit = (e)=>{
        e.preventDefault();
        if (!isLoggedIn) {
            setShowAuthModal(true);
            return;
        }
        setHasSearched(true);
        setActiveTab('search');
    };
    const handleSelectTrain = (train, travelClass)=>{
        if (!isLoggedIn) {
            setShowAuthModal(true);
            return;
        }
        setSeatTrainInfo({
            train,
            travelClass
        });
    };
    const handleConfirmSeats = (seats)=>{
        setSelectedSeats(seats);
        if (seatTrainInfo) {
            setCheckoutInfo({
                train: seatTrainInfo.train,
                travelClass: seatTrainInfo.travelClass
            });
            setSeatTrainInfo(null);
        }
    };
    const handleBookingSuccess = (newTicket)=>{
        setUserTrips([
            newTicket,
            ...userTrips
        ]);
        setCheckoutInfo(null);
        setViewTicket(newTicket);
        setActiveTab('trips');
    };
    const handleCancelTicket = (pnr)=>{
        setUserTrips((prev)=>prev.map((t)=>t.pnr === pnr ? {
                    ...t,
                    status: 'CANCELLED'
                } : t));
    };
    const handleLoginSuccess = (loggedInUser)=>{
        setUser(loggedInUser);
        setIsLoggedIn(true);
        setShowAuthModal(false);
        setShowLandingPage(false);
    };
    const handleLogout = ()=>{
        setUser(null);
        setIsLoggedIn(false);
        setShowLandingPage(true);
    };
    const getStationCity = (code)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$trainData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATIONS"].find((s)=>s.code === code)?.city || code;
    };
    // IF NOT LOGGED IN OR LANDING PAGE IS ACTIVE -> RENDER LANDING PAGE FIRST!
    if (showLandingPage || !isLoggedIn) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen bg-white text-stone-900",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$LandingPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LandingPage"], {
                    onLogin: ()=>setShowAuthModal(true)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 140,
                    columnNumber: 9
                }, this),
                showAuthModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$AuthModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthModal"], {
                    onClose: ()=>setShowAuthModal(false),
                    onSuccess: handleLoginSuccess
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 145,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 139,
            columnNumber: 7
        }, this);
    }
    // ONCE LOGGED IN -> RENDER FULL APP & TICKET BOOKING DASHBOARD
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen antialiased selection:bg-purple-500 selection:text-white bg-purple-900/10 text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Navbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageNavbar"], {
                activeTab: activeTab,
                setActiveTab: setActiveTab,
                tripCount: userTrips.filter((t)=>t.status === 'CONFIRMED').length
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 158,
                columnNumber: 7
            }, this),
            showAiAssistantModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b border-stone-200 bg-white/90 backdrop-blur-xl",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$AITravelAssistant$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AITravelAssistant"], {}, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 167,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 166,
                columnNumber: 9
            }, this),
            activeTab === 'search' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$HeroSearch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeroSearch"], {
                        fromCode: fromCode,
                        setFromCode: setFromCode,
                        toCode: toCode,
                        setToCode: setToCode,
                        travelDate: travelDate,
                        setTravelDate: setTravelDate,
                        passengerCount: passengerCount,
                        setPassengerCount: setPassengerCount,
                        quota: quota,
                        setQuota: setQuota,
                        classFilter: classFilter,
                        setClassFilter: setClassFilter,
                        onSearch: handleSearchSubmit
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 174,
                        columnNumber: 11
                    }, this),
                    hasSearched && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TrainList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrainList"], {
                        trains: displayTrains,
                        fromCity: getStationCity(fromCode),
                        toCity: getStationCity(toCode),
                        travelDate: travelDate,
                        quota: quota,
                        passengerCount: passengerCount,
                        onSelectTrain: handleSelectTrain,
                        onViewRoute: (t)=>setRouteTrain(t),
                        onOpenECatering: ()=>setShowECateringModal(true)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 191,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 173,
                columnNumber: 9
            }, this),
            activeTab === 'pnr' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PNRStatusView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PNRStatusView"], {
                onOpenETicket: (t)=>setViewTicket(t)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 208,
                columnNumber: 9
            }, this),
            activeTab === 'live' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$LiveStatusView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiveStatusView"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 212,
                columnNumber: 32
            }, this),
            activeTab === 'trips' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$MyTripsView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MyTripsView"], {
                trips: userTrips,
                onOpenETicket: (t)=>setViewTicket(t),
                onCancelTicket: handleCancelTicket
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 216,
                columnNumber: 9
            }, this),
            activeTab === 'payments' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PaymentHistoryView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PaymentHistoryView"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 224,
                columnNumber: 36
            }, this),
            activeTab === 'refunds' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$RefundHistoryView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RefundHistoryView"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 227,
                columnNumber: 35
            }, this),
            activeTab === 'help' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$HelpChatView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HelpChatView"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 230,
                columnNumber: 32
            }, this),
            activeTab === 'station' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$StationExplorer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StationExplorer"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 233,
                columnNumber: 35
            }, this),
            activeTab === 'reviews' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TrainReviews$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrainReviews"], {
                train: displayTrains[0] || __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$trainData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRAINS_DATA"][0],
                onClose: ()=>{}
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 236,
                columnNumber: 35
            }, this),
            activeTab === 'microservices' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$MicroservicesDashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MicroservicesDashboard"], {}, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 239,
                columnNumber: 41
            }, this),
            showAuthModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$AuthModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthModal"], {
                onClose: ()=>setShowAuthModal(false),
                onSuccess: handleLoginSuccess
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 243,
                columnNumber: 9
            }, this),
            routeTrain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TrainRouteModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrainRouteModal"], {
                train: routeTrain,
                onClose: ()=>setRouteTrain(null)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 250,
                columnNumber: 9
            }, this),
            seatTrainInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$SeatMapModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SeatMapModal"], {
                train: seatTrainInfo.train,
                travelClass: seatTrainInfo.travelClass,
                passengerCount: passengerCount,
                onClose: ()=>setSeatTrainInfo(null),
                onConfirmSeats: handleConfirmSeats
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 254,
                columnNumber: 9
            }, this),
            checkoutInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$BookingCheckout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BookingCheckout"], {
                train: checkoutInfo.train,
                selectedClass: checkoutInfo.travelClass,
                passengerCount: passengerCount,
                selectedSeats: selectedSeats,
                travelDate: travelDate,
                quota: quota,
                onClose: ()=>setCheckoutInfo(null),
                onBookingSuccess: handleBookingSuccess
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 264,
                columnNumber: 9
            }, this),
            viewTicket && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ETicketModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ETicketModal"], {
                ticket: viewTicket,
                onClose: ()=>setViewTicket(null)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 277,
                columnNumber: 9
            }, this),
            showWalletModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$WalletModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletModal"], {
                onClose: ()=>setShowWalletModal(false)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 281,
                columnNumber: 9
            }, this),
            showNotificationsDrawer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$NotificationsDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NotificationsDrawer"], {
                onClose: ()=>setShowNotificationsDrawer(false)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 285,
                columnNumber: 9
            }, this),
            showECateringModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ECateringModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ECateringModal"], {
                onClose: ()=>setShowECateringModal(false)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 289,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "mt-16 border-t border-stone-200 bg-white py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:text-left sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-bold text-stone-800",
                                    style: {
                                        fontFamily: 'Outfit, sans-serif'
                                    },
                                    children: "© 2026 RailGo IRCTC Express Services Inc."
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 296,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-stone-400 mt-1",
                                    children: "Official 28 microservices train ticket booking & status platform."
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 299,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 295,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center gap-6 text-sm font-medium text-stone-500",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowLandingPage(true),
                                    className: "hover:text-orange-600 transition-colors",
                                    children: "Landing Overview"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 304,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab('microservices'),
                                    className: "hover:text-orange-600 transition-colors",
                                    children: "Microservices Mesh (28)"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 307,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab('payments'),
                                    className: "hover:text-orange-600 transition-colors",
                                    children: "Payments"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 310,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab('refunds'),
                                    className: "hover:text-orange-600 transition-colors",
                                    children: "Refunds"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 313,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab('help'),
                                    className: "hover:text-orange-600 transition-colors",
                                    children: "Help & Chat"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 316,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 303,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 294,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 293,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 156,
        columnNumber: 5
    }, this);
}
_s(Page, "7ebnalsAg+fKk9wv3IncKkBn4Xo=");
_c = Page;
var _c;
__turbopack_context__.k.register(_c, "Page");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_1b917gz._.js.map