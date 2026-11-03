// Simple Node.js + Express server for the CLASSROOT Scheduling Portal.
// Development: npm run dev (Vite)
// Production/local preview: npm run build && npm start

import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, "dist");

app.disable("x-powered-by");
app.use(express.static(distPath));

// Health endpoint so you can verify that the Node.js server is running.
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    application: "CLASSROOT Scheduling Portal",
    runtime: "Node.js + Express"
  });
});

// Send the Vite-built frontend for all app routes.
app.get("/{*path}", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`CLASSROOT Scheduling Portal is running at http://localhost:${PORT}`);
});
