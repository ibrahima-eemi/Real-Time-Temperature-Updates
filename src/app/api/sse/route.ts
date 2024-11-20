import { NextResponse } from 'next/server';

// Liste des températures initiales
const initialTemperatures = [
  { temperature: '20.00', country: 'France' },
  { temperature: '25.50', country: 'USA' },
  { temperature: '18.00', country: 'Germany' },
  { temperature: '22.00', country: 'Brazil' },
  { temperature: '27.30', country: 'India' },
];

// Dernière température mise à jour
let latestTemperature = initialTemperatures[0];

// GET: Renvoie la dernière température
export async function GET() {
  return NextResponse.json(latestTemperature);
}

// POST: Met à jour la température et le pays
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { temperature, country } = body;

    // Validation des données
    if (!temperature || !country || typeof temperature !== 'string' || typeof country !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Invalid data: temperature and country are required.' },
        { status: 400 }
      );
    }

    // Mise à jour de la température
    latestTemperature = { temperature, country };
    return NextResponse.json({ success: true, latestTemperature });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error processing request' },
      { status: 500 }
    );
  }
}

// PUT: Permet de basculer vers une température initiale
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { index } = body;

    // Validation de l'index
    if (typeof index !== 'number' || index < 0 || index >= initialTemperatures.length) {
      return NextResponse.json(
        { success: false, message: 'Invalid index: must be a number within range.' },
        { status: 400 }
      );
    }

    // Basculer sur la température correspondant à l'index
    latestTemperature = initialTemperatures[index];
    return NextResponse.json({ success: true, latestTemperature });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error processing request' },
      { status: 500 }
    );
  }
}
