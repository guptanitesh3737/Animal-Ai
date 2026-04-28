import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Wildlife Monitoring API
  app.get("/api/wildlife/stats", (req, res) => {
    res.json({
      activeCameras: 42,
      detectionsToday: 156,
      criticalAlerts: 3,
      protectedSpeciesCovered: 12
    });
  });

  // Risk Zones API
  app.get("/api/wildlife/zones", (req, res) => {
    res.json([
      { lat: 27.52, lng: 84.34, level: "high", radius: 500, label: "Tiger Movement Corridor" },
      { lat: 27.55, lng: 84.30, level: "medium", radius: 800, label: "Elephant Corridor" },
      { lat: 27.48, lng: 84.38, level: "low", radius: 1000, label: "Deere Foraging Ground" },
    ]);
  });

  // Alert History
  app.get("/api/wildlife/alerts", (req, res) => {
    res.json([
      { id: "1", type: "Tiger", timestamp: new Date(Date.now() - 3600000).toISOString(), location: "Sector 4-B", status: "Active", risk: "Critical" },
      { id: "2", type: "Elephant", timestamp: new Date(Date.now() - 7200000).toISOString(), location: "Buffer Zone South", status: "Resolved", risk: "Medium" },
      { id: "3", type: "Rhino", timestamp: new Date(Date.now() - 10800000).toISOString(), location: "Grassland C", status: "Resolved", risk: "Low" },
    ]);
  });

  // Vite middleware for development
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
