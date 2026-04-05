import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "content/data");
const DATA_FILE = path.join(DATA_DIR, "abacus.json");

// Helper to ensure data directory and file exist
function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ count: 0 }));
  }
}

function readCount(): number {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    const count = Number(parsed?.count);
    return Number.isFinite(count) ? count : 0;
  } catch {
    return 0;
  }
}

export async function GET() {
  try {
    ensureDataFile();
    return NextResponse.json({ count: readCount() });
  } catch (error) {
    console.error("Error reading abacus data:", error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}

export async function POST() {
  try {
    ensureDataFile();
    const count = readCount() + 1;
    fs.writeFileSync(DATA_FILE, JSON.stringify({ count }, null, 2));
    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error updating abacus data:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
