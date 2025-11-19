const BASE_URL = 'http://api.aviationstack.com/v1/flights';

export interface FlightData {
    flight_date: string;
    flight_status: string;
    departure: {
        airport: string;
        timezone: string;
        iata: string;
        icao: string;
        terminal: string | null;
        gate: string | null;
        delay: number | null;
        scheduled: string;
        estimated: string;
        actual: string | null;
        estimated_runway: string | null;
        actual_runway: string | null;
    };
    arrival: {
        airport: string;
        timezone: string;
        iata: string;
        icao: string;
        terminal: string | null;
        gate: string | null;
        baggage: string | null;
        scheduled: string;
        delay: number | null;
        estimated: string | null;
        actual: string | null;
        estimated_runway: string | null;
        actual_runway: string | null;
    };
    airline: {
        name: string;
        iata: string;
        icao: string;
    };
    flight: {
        number: string;
        iata: string;
        icao: string;
        codeshared: any | null;
    };
    aircraft: any | null;
    live: any | null;
}

export interface AviationStackResponse {
    pagination: {
        limit: number;
        offset: number;
        count: number;
        total: number;
    };
    data: FlightData[];
}

export async function getFlights(flightNumber: string): Promise<FlightData[]> {
    const accessKey = process.env.AVIATION_STACK_ACCESS_KEY;

    if (!accessKey) {
        throw new Error('AVIATION_STACK_ACCESS_KEY is not defined');
    }

    const url = `${BASE_URL}?access_key=${accessKey}&flight_iata=${flightNumber}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Aviation Stack API error: ${response.statusText}`);
        }

        const json: AviationStackResponse = await response.json();
        return json.data;
    } catch (error) {
        console.error('Error fetching flights:', error);
        throw error;
    }
}
