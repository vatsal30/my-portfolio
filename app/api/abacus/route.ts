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

export async function GET() {
  try {
    ensureDataFile();
    const data = fs.readFileSync(DATA_FILE, "utf8");
    const { count } = JSON.parse(data);
    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error reading abacus data:", error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}

export async function POST() {
  try {
    ensureDataFile();
    const data = fs.readFileSync(DATA_FILE, "utf8");
    const json = JSON.parse(data);

    json.count = (json.count || 0) + 1;

    fs.writeFileSync(DATA_FILE, JSON.stringify(json, null, 2));

    return NextResponse.json({ count: json.count });
  } catch (error) {
    console.error("Error updating abacus data:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
