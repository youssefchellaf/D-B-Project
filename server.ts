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
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

const defaultSettings = {
  location: "الفنيدق، المغرب",
  statusTag: "قريباً...",
  title: "شيء مميز قيد التحضير",
  description: "نعمل على إطلاق تجربة فاخرة تليق بكم لعرض أشهى العصائر الطبيعية والتحليات الفاخرة بلمسات نسائية مغربية متقنة وبكل حب وشغف.",
  pageTitle: "دعاء و بسمة | الصفحة الرسمية لعلامتنا التجارية",
  whatsapp: "212705908383",
  whatsappMsg: "مرحبا! اريد مشاهدة الكتالوج 📋",
  instagram: "https://instagram.com/douaabasma75",
  facebook: "https://facebook.com/douaabasma75",
};

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), "utf-8");
  }
}

function ensureSettingsFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(SETTINGS_FILE)) {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(defaultSettings, null, 2), "utf-8");
  }
}

function getSettings() {
  ensureSettingsFile();
  try {
    const raw = fs.readFileSync(SETTINGS_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    
    // Check if faviconSvg is present. If not, read from public/favicon.svg if it exists
    if (!parsed.faviconSvg) {
      const publicFaviconPath = path.join(process.cwd(), "public", "favicon.svg");
      if (fs.existsSync(publicFaviconPath)) {
        parsed.faviconSvg = fs.readFileSync(publicFaviconPath, "utf-8");
      } else {
        parsed.faviconSvg = "";
      }
    }
    return parsed;
  } catch (err) {
    console.error("Error reading settings file:", err);
    return defaultSettings;
  }
}

function saveSettings(settings: any) {
  ensureSettingsFile();
  try {
    // Write the faviconSvg to /public/favicon.svg and /dist/favicon.svg
    if (settings.faviconSvg) {
      const publicDir = path.join(process.cwd(), "public");
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      fs.writeFileSync(path.join(publicDir, "favicon.svg"), settings.faviconSvg, "utf-8");
      
      const distDir = path.join(process.cwd(), "dist");
      if (fs.existsSync(distDir)) {
        fs.writeFileSync(path.join(distDir, "favicon.svg"), settings.faviconSvg, "utf-8");
      }
    }
    
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing settings file:", err);
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
function getExpectedPassword(): string {
  let pw = process.env.ADMIN_PASSWORD || "basmadouaa2026";
  if (pw.startsWith('"') && pw.endsWith('"')) {
    pw = pw.slice(1, -1);
  } else if (pw.startsWith("'") && pw.endsWith("'")) {
    pw = pw.slice(1, -1);
  }
  return pw;
}

// --- API Endpoints ---

// 0. Get all public settings
app.get("/api/settings", (req, res) => {
  res.json({ success: true, settings: getSettings() });
});

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
