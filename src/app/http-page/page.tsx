'use client';

import { useState } from 'react';

export default function HTTPPage() {
  const [temperature, setTemperature] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = async () => {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ temperature, country }),
    });
    const data = await response.json();
    console.log('Submitted:', data);
  };

  return (
    <main style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Submit Temperature and Country</h1>
      <div>
        <input
          type="text"
          placeholder="Temperature"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </main>
  );
}
