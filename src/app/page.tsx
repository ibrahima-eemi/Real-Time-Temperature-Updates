'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
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
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 text-gray-800">
      <header className="py-8 bg-blue-600 text-white text-center">
        <h1 className="text-4xl font-bold">🌍 Real-Time Temperature Updates</h1>
        <p className="mt-2 text-lg">Manage temperatures for countries with ease.</p>
      </header>

      <section className="py-10">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Current Temperature</h2>
            {latestData ? (
              <div className="text-center">
                <p className="text-lg">
                  Temperature: <span className="font-bold">{latestData.temperature}°C</span>
                </p>
                <p className="text-lg">
                  Country: <span className="font-bold">{latestData.country}</span>
                </p>
              </div>
            ) : (
              <p className="text-center text-gray-500">Loading...</p>
            )}
          </div>
        </div>
      </section>

      <section className="py-10 bg-blue-50">
        <div className="container mx-auto max-w-4xl px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Submit New Temperature</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Temperature (°C)"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={submitTemperature}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Switch Initial Temperature</h2>
            <div className="space-y-4">
              <input
                type="number"
                placeholder="Index"
                value={index}
                onChange={(e) => setIndex(parseInt(e.target.value, 10))}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={switchInitialTemperature}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Switch
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-6 bg-blue-600 text-white text-center">
        <p>© 2024 Temperature Management. All rights reserved.</p>
      </footer>
    </main>
  );
}
