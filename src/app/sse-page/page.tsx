'use client';

import { useEffect, useState } from 'react';

export default function SSEPage() {
  const [data, setData] = useState<{ temperature: string; country: string } | null>(null);

  useEffect(() => {
    const eventSource = new EventSource('/api/sse');

    eventSource.addEventListener('temperature', (event) => {
      const parsedData = JSON.parse(event.data);
      setData(parsedData);
    });

    eventSource.onerror = () => {
      console.error('SSE connection failed.');
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <main style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>SSE Temperature Updates</h1>
      {data ? (
        <p>
          Temperature: <strong>{data.temperature}°C</strong> <br />
          Country: <strong>{data.country}</strong>
        </p>
      ) : (
        <p>Waiting for updates...</p>
      )}
    </main>
  );
}
