import { Flight } from '@/lib/mockData';

export const generateGoogleCalendarLink = (flight: Flight): string => {
    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const start = formatDateTime(flight.departureTime);
    const end = formatDateTime(flight.arrivalTime);

    const title = `Flight ${flight.flightNumber}: ${flight.origin.code} to ${flight.destination.code}`;
    const details = `Flight: ${flight.airline} ${flight.flightNumber}
From: ${flight.origin.city} (${flight.origin.code})
To: ${flight.destination.city} (${flight.destination.code})
Status: ${flight.status}

Terminal: ${flight.origin.terminal}, Gate: ${flight.origin.gate} -> Terminal: ${flight.destination.terminal}, Gate: ${flight.destination.gate}`;

    const location = `${flight.origin.city} to ${flight.destination.city}`;

    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: title,
        dates: `${start}/${end}`,
        details: details,
        location: location,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
};
