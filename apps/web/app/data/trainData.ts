export interface Station {
  code: string;
  name: string;
  city: string;
  state: string;
}

export interface TrainClassInfo {
  code: string;
  name: string;
  price: number;
  available: number;
  status: 'AVAILABLE' | 'RAC' | 'WL';
  statusNumber?: number;
}

export interface RouteStation {
  stationCode: string;
  stationName: string;
  arrivalTime: string;
  departureTime: string;
  haltMinutes: number;
  distanceKm: number;
  day: number;
  platform?: string;
  isPassed?: boolean;
}

export interface Train {
  id: string;
  number: string;
  name: string;
  type: 'Vande Bharat' | 'Rajdhani' | 'Shatabdi' | 'Duronto' | 'Superfast' | 'Express';
  fromCode: string;
  fromName: string;
  toCode: string;
  toName: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  runsOn: string[]; // e.g. ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  rating: number;
  badge?: string;
  classes: TrainClassInfo[];
  route: RouteStation[];
}

export interface Passenger {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Transgender';
  berthPreference: 'No Preference' | 'Lower' | 'Middle' | 'Upper' | 'Side Lower' | 'Side Upper' | 'Window';
  foodPreference?: 'Veg' | 'Non-Veg' | 'Jain' | 'No Meal';
  seatAssigned?: string;
  status?: string;
}

export interface BookingTicket {
  pnr: string;
  bookingId: string;
  trainNumber: string;
  trainName: string;
  fromCode: string;
  fromCity: string;
  toCode: string;
  toCity: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  travelClass: string;
  quota: string;
  passengers: Passenger[];
  totalFare: number;
  paymentMethod: string;
  bookingTime: string;
  status: 'CONFIRMED' | 'CANCELLED';
  coach: string;
  chartStatus: string;
  refundAmount?: number;
}

export const STATIONS: Station[] = [
  { code: 'BCT', name: 'Mumbai Central', city: 'Mumbai', state: 'Maharashtra' },
  { code: 'NDLS', name: 'New Delhi', city: 'New Delhi', state: 'Delhi' },
  { code: 'ADI', name: 'Ahmedabad Junction', city: 'Ahmedabad', state: 'Gujarat' },
  { code: 'SBC', name: 'KSR Bengaluru City', city: 'Bengaluru', state: 'Karnataka' },
  { code: 'MAS', name: 'MGR Chennai Central', city: 'Chennai', state: 'Tamil Nadu' },
  { code: 'PUNE', name: 'Pune Junction', city: 'Pune', state: 'Maharashtra' },
  { code: 'HWH', name: 'Howrah Junction', city: 'Kolkata', state: 'West Bengal' },
  { code: 'HYB', name: 'Hyderabad Deccan', city: 'Hyderabad', state: 'Telangana' },
  { code: 'JP', name: 'Jaipur Junction', city: 'Jaipur', state: 'Rajasthan' },
  { code: 'LKO', name: 'Lucknow Charbagh', city: 'Lucknow', state: 'Uttar Pradesh' },
  { code: 'MAO', name: 'Madgaon Junction', city: 'Goa', state: 'Goa' },
  { code: 'BSB', name: 'Varanasi Junction', city: 'Varanasi', state: 'Uttar Pradesh' },
  { code: 'PNBE', name: 'Patna Junction', city: 'Patna', state: 'Bihar' },
  { code: 'CDG', name: 'Chandigarh Junction', city: 'Chandigarh', state: 'Chandigarh' },
  { code: 'ST', name: 'Surat Junction', city: 'Surat', state: 'Gujarat' },
];

export const TRAINS_DATA: Train[] = [
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
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    rating: 4.8,
    badge: 'Premier Rajdhani',
    classes: [
      { code: '1A', name: 'First AC', price: 4750, available: 6, status: 'AVAILABLE' },
      { code: '2A', name: '2 Tier AC', price: 2890, available: 24, status: 'AVAILABLE' },
      { code: '3A', name: '3 Tier AC', price: 2050, available: 68, status: 'AVAILABLE' },
      { code: '3E', name: '3 AC Economy', price: 1890, available: 42, status: 'AVAILABLE' },
    ],
    route: [
      { stationCode: 'BCT', stationName: 'Mumbai Central', arrivalTime: '--', departureTime: '17:00', haltMinutes: 0, distanceKm: 0, day: 1, platform: 'PF 1', isPassed: true },
      { stationCode: 'ST', stationName: 'Surat', arrivalTime: '19:43', departureTime: '19:48', haltMinutes: 5, distanceKm: 263, day: 1, platform: 'PF 1', isPassed: true },
      { stationCode: 'BRC', stationName: 'Vadodara Junction', arrivalTime: '21:16', departureTime: '21:26', haltMinutes: 10, distanceKm: 393, day: 1, platform: 'PF 2', isPassed: true },
      { stationCode: 'RTM', stationName: 'Ratlam Junction', arrivalTime: '00:35', departureTime: '00:38', haltMinutes: 3, distanceKm: 653, day: 2, platform: 'PF 5', isPassed: false },
      { stationCode: 'KOTA', stationName: 'Kota Junction', arrivalTime: '03:15', departureTime: '03:25', haltMinutes: 10, distanceKm: 920, day: 2, platform: 'PF 1', isPassed: false },
      { stationCode: 'NDLS', stationName: 'New Delhi', arrivalTime: '08:32', departureTime: '--', haltMinutes: 0, distanceKm: 1384, day: 2, platform: 'PF 3', isPassed: false },
    ],
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
    runsOn: ['Mon', 'Tue', 'Wed', 'Fri', 'Sat', 'Sun'],
    rating: 4.9,
    badge: 'Fastest 160 km/h',
    classes: [
      { code: 'CC', name: 'AC Chair Car', price: 1420, available: 85, status: 'AVAILABLE' },
      { code: 'EC', name: 'Executive Chair Car', price: 2630, available: 12, status: 'AVAILABLE' },
    ],
    route: [
      { stationCode: 'BCT', stationName: 'Mumbai Central', arrivalTime: '--', departureTime: '06:00', haltMinutes: 0, distanceKm: 0, day: 1, platform: 'PF 5', isPassed: true },
      { stationCode: 'BVI', stationName: 'Borivali', arrivalTime: '06:23', departureTime: '06:25', haltMinutes: 2, distanceKm: 30, day: 1, platform: 'PF 6', isPassed: true },
      { stationCode: 'ST', stationName: 'Surat', arrivalTime: '08:40', departureTime: '08:43', haltMinutes: 3, distanceKm: 263, day: 1, platform: 'PF 1', isPassed: true },
      { stationCode: 'BRC', stationName: 'Vadodara Junction', arrivalTime: '10:00', departureTime: '10:05', haltMinutes: 5, distanceKm: 393, day: 1, platform: 'PF 3', isPassed: false },
      { stationCode: 'ADI', stationName: 'Ahmedabad Junction', arrivalTime: '11:25', departureTime: '--', haltMinutes: 0, distanceKm: 493, day: 1, platform: 'PF 1', isPassed: false },
    ],
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
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun'],
    rating: 4.6,
    badge: 'IRCTC Premium',
    classes: [
      { code: 'CC', name: 'AC Chair Car', price: 1280, available: 110, status: 'AVAILABLE' },
      { code: 'EC', name: 'Executive Chair Car', price: 2390, available: 18, status: 'AVAILABLE' },
    ],
    route: [
      { stationCode: 'BCT', stationName: 'Mumbai Central', arrivalTime: '--', departureTime: '15:45', haltMinutes: 0, distanceKm: 0, day: 1, platform: 'PF 2' },
      { stationCode: 'ST', stationName: 'Surat', arrivalTime: '18:50', departureTime: '18:53', haltMinutes: 3, distanceKm: 263, day: 1, platform: 'PF 1' },
      { stationCode: 'ADI', stationName: 'Ahmedabad Junction', arrivalTime: '22:05', departureTime: '--', haltMinutes: 0, distanceKm: 493, day: 1, platform: 'PF 4' },
    ],
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
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    rating: 4.7,
    classes: [
      { code: '1A', name: 'First AC', price: 4620, available: 3, status: 'AVAILABLE' },
      { code: '2A', name: '2 Tier AC', price: 2780, available: 14, status: 'AVAILABLE' },
      { code: '3A', name: '3 Tier AC', price: 1980, available: 0, status: 'RAC', statusNumber: 12 },
    ],
    route: [
      { stationCode: 'BCT', stationName: 'Mumbai Central', arrivalTime: '--', departureTime: '17:10', haltMinutes: 0, distanceKm: 0, day: 1 },
      { stationCode: 'NDLS', stationName: 'New Delhi', arrivalTime: '09:43', departureTime: '--', haltMinutes: 0, distanceKm: 1377, day: 2 },
    ],
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
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    rating: 4.8,
    badge: 'Historic Iconic',
    classes: [
      { code: 'CC', name: 'AC Chair Car', price: 485, available: 140, status: 'AVAILABLE' },
      { code: '2S', name: 'Second Sitting', price: 175, available: 210, status: 'AVAILABLE' },
    ],
    route: [
      { stationCode: 'CSMT', stationName: 'Mumbai CSMT', arrivalTime: '--', departureTime: '17:10', haltMinutes: 0, distanceKm: 0, day: 1 },
      { stationCode: 'LNL', stationName: 'Lonavala', arrivalTime: '19:00', departureTime: '19:02', haltMinutes: 2, distanceKm: 128, day: 1 },
      { stationCode: 'PUNE', stationName: 'Pune Junction', arrivalTime: '20:25', departureTime: '--', haltMinutes: 0, distanceKm: 192, day: 1 },
    ],
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
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    rating: 4.5,
    classes: [
      { code: '2A', name: '2 Tier AC', price: 3450, available: 18, status: 'AVAILABLE' },
      { code: '3A', name: '3 Tier AC', price: 2380, available: 45, status: 'AVAILABLE' },
      { code: 'SL', name: 'Sleeper Class', price: 890, available: 0, status: 'WL', statusNumber: 28 },
    ],
    route: [
      { stationCode: 'NDLS', stationName: 'New Delhi', arrivalTime: '--', departureTime: '20:10', haltMinutes: 0, distanceKm: 0, day: 1 },
      { stationCode: 'SBC', stationName: 'KSR Bengaluru', arrivalTime: '12:00', departureTime: '--', haltMinutes: 0, distanceKm: 2409, day: 3 },
    ],
  },
];

export const MOCK_PNRS: Record<string, BookingTicket> = {
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
      { name: 'Amit Kumar', age: 28, gender: 'Male', berthPreference: 'Window', seatAssigned: 'C3 - 14 (Window)', status: 'CNF (Confirmed)' },
      { name: 'Priya Sharma', age: 26, gender: 'Female', berthPreference: 'No Preference', seatAssigned: 'C3 - 15 (Aisle)', status: 'CNF (Confirmed)' },
    ],
    totalFare: 2840,
    paymentMethod: 'UPI (GPay)',
    bookingTime: '2026-08-04 14:20',
    status: 'CONFIRMED',
    coach: 'C3',
    chartStatus: 'CHART PREPARED',
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
      { name: 'Rohan Verma', age: 34, gender: 'Male', berthPreference: 'Lower', seatAssigned: 'B2 - 07 (Lower)', status: 'CNF (Confirmed)' },
    ],
    totalFare: 2250,
    paymentMethod: 'Credit Card',
    bookingTime: '2026-08-03 10:02',
    status: 'CONFIRMED',
    coach: 'B2',
    chartStatus: 'CHART NOT PREPARED',
  },
};

export const INITIAL_USER_TRIPS: BookingTicket[] = [
  MOCK_PNRS['8492049182'],
  MOCK_PNRS['2184910482'],
];

/** Alias for backward-compat imports */
export const USER_TRIPS = INITIAL_USER_TRIPS;

export interface LiveRouteStation {
  stationCode: string;
  stationName: string;
  arrivalTime: string;
  departureTime: string;
  isPassed: boolean;
}

export interface LiveTrainStatus {
  trainNumber: string;
  trainName: string;
  fromCode: string;
  toCode: string;
  currentStation: string;
  currentState: string;
  speed: number;
  delay: number;
  lastUpdated: string;
  nextStation: string;
  stations: LiveRouteStation[];
}

export const LIVE_TRAINS: Record<string, LiveTrainStatus> = {
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
      { stationCode: 'NDLS', stationName: 'New Delhi', arrivalTime: '--', departureTime: '17:05', isPassed: true },
      { stationCode: 'CNB', stationName: 'Kanpur Central', arrivalTime: '21:45', departureTime: '21:50', isPassed: true },
      { stationCode: 'MGS', stationName: 'Mughal Sarai Jn', arrivalTime: '01:28', departureTime: '01:33', isPassed: false },
      { stationCode: 'PNBE', stationName: 'Patna Junction', arrivalTime: '04:00', departureTime: '04:10', isPassed: false },
      { stationCode: 'HWH', stationName: 'Howrah Junction', arrivalTime: '09:55', departureTime: '--', isPassed: false },
    ],
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
      { stationCode: 'BCT', stationName: 'Mumbai Central', arrivalTime: '--', departureTime: '17:00', isPassed: true },
      { stationCode: 'ST', stationName: 'Surat', arrivalTime: '19:43', departureTime: '19:48', isPassed: true },
      { stationCode: 'BRC', stationName: 'Vadodara Junction', arrivalTime: '21:16', departureTime: '21:26', isPassed: true },
      { stationCode: 'KOTA', stationName: 'Kota Junction', arrivalTime: '03:15', departureTime: '03:25', isPassed: false },
      { stationCode: 'NDLS', stationName: 'New Delhi', arrivalTime: '08:32', departureTime: '--', isPassed: false },
    ],
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
      { stationCode: 'BCT', stationName: 'Mumbai Central', arrivalTime: '--', departureTime: '06:00', isPassed: true },
      { stationCode: 'BVI', stationName: 'Borivali', arrivalTime: '06:23', departureTime: '06:25', isPassed: true },
      { stationCode: 'ST', stationName: 'Surat', arrivalTime: '08:40', departureTime: '08:43', isPassed: false },
      { stationCode: 'BRC', stationName: 'Vadodara Junction', arrivalTime: '10:00', departureTime: '10:05', isPassed: false },
      { stationCode: 'ADI', stationName: 'Ahmedabad Junction', arrivalTime: '11:25', departureTime: '--', isPassed: false },
    ],
  },
};
