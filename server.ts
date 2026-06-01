import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json());

// Database configuration
const DATA_DIR = path.resolve(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "phones.json");

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), "utf-8");
  }
}

interface PhoneRecord {
  phone: string;
  registeredAt: string;
}

function getPhoneRecords(): PhoneRecord[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading phones file:", err);
    return [];
  }
}

function savePhoneRecords(records: PhoneRecord[]) {
  ensureDataFile();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing phones file:", err);
  }
}

// Security helper: Check admin credentials
function authenticateAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  const expectedPassword = process.env.ADMIN_PASSWORD || "basmadouaa2026";
  
  if (!authHeader) {
    res.status(401).json({ success: false, error: "Authentication required" });
    return;
  }
  
  const token = authHeader.replace("Bearer ", "").trim();
  if (token !== expectedPassword) {
    res.status(401).json({ success: false, error: "Incorrect admin password" });
    return;
  }
  
  next();
}

// --- API Endpoints ---

// 1. Register a new phone number
app.post("/api/register-phone", (req, res) => {
  const { phone } = req.body;
  
  if (!phone) {
    res.status(400).json({ success: false, error: "Phone number is required." });
    return;
  }
  
  // Basic validation
  const cleanedPhone = phone.trim();
  const phoneRegex = /^[0-9+\s-]{8,15}$/;
  if (!phoneRegex.test(cleanedPhone)) {
    res.status(400).json({ success: false, error: "Phone number format is invalid." });
    return;
  }
  
  const records = getPhoneRecords();
  const exists = records.some(r => r.phone === cleanedPhone);
  
  if (!exists) {
    records.push({
      phone: cleanedPhone,
      registeredAt: new Date().toISOString()
    });
    savePhoneRecords(records);
  }
  
  res.json({ success: true, message: "Phone registered successfully." });
});

// 2. Fetch all registered numbers (Admin only)
app.get("/api/registered-phones", authenticateAdmin, (req, res) => {
  const records = getPhoneRecords();
  res.json({ success: true, count: records.length, phones: records });
});

// 3. Delete a phone number (Admin only)
app.delete("/api/delete-phone", authenticateAdmin, (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    res.status(400).json({ success: false, error: "Phone is required for deletion." });
    return;
  }
  
  let records = getPhoneRecords();
  const index = records.findIndex(r => r.phone === phone);
  
  if (index === -1) {
    res.status(404).json({ success: false, error: "Phone number not found." });
    return;
  }
  
  records.splice(index, 1);
  savePhoneRecords(records);
  
  res.json({ success: true, message: "Phone number removed successfully." });
});

// 4. Verify admin password
app.post("/api/verify-admin", (req, res) => {
  const { password } = req.body;
  const expectedPassword = process.env.ADMIN_PASSWORD || "basmadouaa2026";
  
  if (password === expectedPassword) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, error: "كلمة مرور خاطئة" });
  }
});

// --- Server & Vite Setup ---

async function bootstrap() {
  // Vite dev server mounting or static folder serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] running on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error("Bootstrap failed:", err);
});
