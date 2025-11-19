export interface Flight {
  flightNumber: string;
  airline: string;
  origin: {
    code: string;
    city: string;
    terminal: string;
    gate: string;
  };
  destination: {
    code: string;
    city: string;
    terminal: string;
    gate: string;
  };
  departureTime: string; // ISO string
  arrivalTime: string; // ISO string
  status: 'On Time' | 'Delayed' | 'Cancelled' | 'Arrived';
  duration: string;
}

const FLIGHTS: Flight[] = [
  {
    flightNumber: 'AA123',
    airline: 'American Airlines',
    origin: {
      code: 'JFK',
      city: 'New York',
      terminal: '8',
      gate: 'B12',
    },
    destination: {
      code: 'LHR',
      city: 'London',
      terminal: '5',
      gate: 'A10',
    },
    departureTime: '2025-11-20T18:30:00Z',
    arrivalTime: '2025-11-21T06:30:00Z',
    status: 'On Time',
    duration: '7h 00m',
  },
  {
    flightNumber: 'BA456',
    airline: 'British Airways',
    origin: {
      code: 'LHR',
      city: 'London',
      terminal: '5',
      gate: 'C42',
    },
    destination: {
      code: 'JFK',
      city: 'New York',
      terminal: '7',
      gate: '12',
    },
    departureTime: '2025-11-20T10:15:00Z',
    arrivalTime: '2025-11-20T13:15:00Z',
    status: 'Delayed',
    duration: '8h 00m',
  },
  {
    flightNumber: 'UA789',
    airline: 'United Airlines',
    origin: {
      code: 'SFO',
      city: 'San Francisco',
      terminal: '3',
      gate: 'F11',
    },
    destination: {
      code: 'NRT',
      city: 'Tokyo',
      terminal: '1',
      gate: '33',
    },
    departureTime: '2025-11-21T11:00:00Z',
    arrivalTime: '2025-11-22T15:30:00Z',
    status: 'On Time',
    duration: '11h 30m',
  },
  {
    flightNumber: 'DL101',
    airline: 'Delta Air Lines',
    origin: {
      code: 'ATL',
      city: 'Atlanta',
      terminal: 'S',
      gate: 'A1',
    },
    destination: {
      code: 'CDG',
      city: 'Paris',
      terminal: '2E',
      gate: 'K45',
    },
    departureTime: '2025-11-20T17:45:00Z',
    arrivalTime: '2025-11-21T08:10:00Z',
    status: 'On Time',
    duration: '8h 25m',
  },
];

export async function searchFlights(query: string): Promise<Flight[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (!query) return [];

  const normalizedQuery = query.toUpperCase().trim();
  return FLIGHTS.filter((flight) =>
    flight.flightNumber.includes(normalizedQuery)
  );
}
