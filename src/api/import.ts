import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const ingestDir = path.join(process.cwd(), '../../data/market-ingest');
    const files = fs.readdirSync(ingestDir);

    const items = files.map(file => {
      const full = path.join(ingestDir, file);
      return JSON.parse(fs.readFileSync(full, 'utf8'));
    });

    return NextResponse.json({ items });

  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
