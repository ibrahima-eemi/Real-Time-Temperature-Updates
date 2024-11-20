'use client';

import { useState, useEffect } from 'react';

export default function TestInterface() {
  const [latestData, setLatestData] = useState<{ temperature: string; country: string } | null>(null);
  const [temperature, setTemperature] = useState('');
  const [country, setCountry] = useState('');
  const [index, setIndex] = useState(0);

  // Fonction pour récupérer la dernière valeur via GET
  const fetchLatestTemperature = async () => {
    const response = await fetch('/api/sse', { method: 'GET' });
    if (response.ok) {
      const data = await response.json();
      setLatestData(data);
    }
  };

  // Fonction pour envoyer une nouvelle température via POST
  const submitTemperature = async () => {
    const response = await fetch('/api/sse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ temperature, country }),
    });

    if (response.ok) {
      fetchLatestTemperature(); // Actualise les données affichées
    }
  };

  // Fonction pour basculer entre les valeurs initiales via PUT
  const switchInitialTemperature = async () => {
    const response = await fetch('/api/sse', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ index }),
    });

    if (response.ok) {
      fetchLatestTemperature(); // Actualise les données affichées
    }
  };

  // Récupérer les données initiales lors du montage du composant
  useEffect(() => {
    fetchLatestTemperature();
  }, []);

  return (
    <main style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Test Interface for API</h1>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Current Temperature</h2>
        {latestData ? (
          <p>
            Temperature: <strong>{latestData.temperature}°C</strong> <br />
            Country: <strong>{latestData.country}</strong>
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Submit New Temperature</h2>
        <input
          type="text"
          placeholder="Temperature"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <button onClick={submitTemperature}>Submit</button>
      </section>

      <section>
        <h2>Switch Initial Temperature</h2>
        <input
          type="number"
          placeholder="Index"
          value={index}
          onChange={(e) => setIndex(parseInt(e.target.value, 10))}
          style={{ marginRight: '0.5rem' }}
        />
        <button onClick={switchInitialTemperature}>Switch</button>
      </section>
    </main>
  );
}
