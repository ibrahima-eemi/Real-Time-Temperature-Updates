import { NextResponse } from 'next/server';


let initialTemperatures = [
  { temperature: '20.00', country: 'France' },
  { temperature: '25.50', country: 'USA' },
  { temperature: '18.00', country: 'Germany' },
  { temperature: '22.00', country: 'Brazil' },
  { temperature: '27.30', country: 'India' },
];


let latestTemperature = initialTemperatures[0];


export async function POST(req: Request) {
  const body = await req.json();
  if (body.temperature && body.country) {
    latestTemperature = body;
    return NextResponse.json({ success: true, latestTemperature });
  } else {
    return NextResponse.json({ success: false, message: "Invalid data" }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  const { index } = await req.json();
  if (index >= 0 && index < initialTemperatures.length) {
    latestTemperature = initialTemperatures[index];
    return NextResponse.json({ success: true, latestTemperature });
  } else {
    return NextResponse.json({ success: false, message: "Index out of range" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json(latestTemperature);
}
