'use client';

import { useState } from 'react';
import { Flight } from '@/lib/mockData';
import { searchFlightsAction } from './actions';
import { generateGoogleCalendarLink } from '@/utils/calendar';
import styles from './page.module.css';

export default function Home() {
  const [query, setQuery] = useState('');
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setFlights([]);
    setHasSearched(true);

    try {
      const results = await searchFlightsAction(query);
      setFlights(results);
      if (results.length === 0) {
        setError('No flights found with that number.');
      }
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });
  };

  return (
    <main className={styles.container}>
      <div className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>Flight Tracker</h1>
          <p className={styles.subtitle}>
            Real-time flight status and details
          </p>
        </header>

        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter flight number (e.g., AA123)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
            />
          </div>
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.results}>
          {flights.map((flight) => (
            <a
              key={flight.flightNumber}
              href={generateGoogleCalendarLink(flight)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <div className={styles.flightHeader}>
                <div>
                  <div className={styles.flightNumber}>{flight.flightNumber}</div>
                  <div className={styles.airline}>{flight.airline}</div>
                </div>
                <div
                  className={`${styles.status} ${flight.status === 'Delayed' ? styles.delayed : ''
                    }`}
                >
                  {flight.status}
                </div>
              </div>

              <div className={styles.route}>
                <div className={styles.location}>
                  <span className={styles.code}>{flight.origin.code}</span>
                  <span className={styles.city}>{flight.origin.city}</span>
                  <div className={styles.time}>
                    {formatTime(flight.departureTime)}
                  </div>
                </div>

                <div className={styles.duration}>
                  <span>{flight.duration}</span>
                  <div className={styles.line}></div>
                </div>

                <div className={`${styles.location} ${styles.end}`}>
                  <span className={styles.code}>{flight.destination.code}</span>
                  <span className={styles.city}>{flight.destination.city}</span>
                  <div className={styles.time}>
                    {formatTime(flight.arrivalTime)}
                  </div>
                </div>
              </div>

              <div className={styles.details}>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Terminal</span>
                  <span className={styles.value}>{flight.origin.terminal}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Gate</span>
                  <span className={styles.value}>{flight.origin.gate}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Terminal</span>
                  <span className={styles.value}>
                    {flight.destination.terminal}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Gate</span>
                  <span className={styles.value}>
                    {flight.destination.gate}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
