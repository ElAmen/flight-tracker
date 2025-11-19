'use server';

import { getFlights } from '@/utils/aviationStack';
import { Flight } from '@/lib/mockData';

export async function searchFlightsAction(query: string): Promise<Flight[]> {
    if (!query) return [];

    try {
        const flightDataList = await getFlights(query);

        return flightDataList.map((data) => {
            // Calculate duration
            const departure = new Date(data.departure.scheduled);
            const arrival = new Date(data.arrival.scheduled);
            const durationMs = arrival.getTime() - departure.getTime();
            const hours = Math.floor(durationMs / (1000 * 60 * 60));
            const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
            const duration = `${hours}h ${minutes}m`;

            // Map status
            let status: Flight['status'] = 'On Time';
            if (data.flight_status === 'active') status = 'On Time'; // Or 'In Air' if we had that
            if (data.flight_status === 'landed') status = 'Arrived';
            if (data.flight_status === 'cancelled') status = 'Cancelled';
            if (data.departure.delay && data.departure.delay > 15) status = 'Delayed';

            return {
                flightNumber: data.flight.iata,
                airline: data.airline.name,
                origin: {
                    code: data.departure.iata,
                    city: data.departure.airport, // API doesn't give city name directly in flight object easily, using airport name as fallback
                    terminal: data.departure.terminal || '-',
                    gate: data.departure.gate || '-',
                },
                destination: {
                    code: data.arrival.iata,
                    city: data.arrival.airport, // API doesn't give city name directly in flight object easily, using airport name as fallback
                    terminal: data.arrival.terminal || '-',
                    gate: data.arrival.gate || '-',
                },
                departureTime: data.departure.scheduled,
                arrivalTime: data.arrival.scheduled,
                status: status,
                duration: duration,
            };
        });
    } catch (error) {
        console.error('Error in searchFlightsAction:', error);
        throw new Error('Failed to fetch flight data');
    }
}
