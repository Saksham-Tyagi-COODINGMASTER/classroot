
// Simple Node.js + Express server for the CLASSROOT Scheduling Portal.
// Development: npm run dev (Vite)
// Production/local preview: npm run build && npm start

import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { verifyGoogleIdToken } from "./googleToken.js";

// Load .env when present.
try {
  process.loadEnvFile();
} catch {
  // No .env file - use environment variables.
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, "dist");

const CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ||
  process.env.VITE_GOOGLE_CLIENT_ID ||
  "";

const ALLOWED_DOMAIN = String(
  process.env.ALLOWED_DOMAIN ||
  process.env.VITE_ALLOWED_DOMAIN ||
  "iitdh.ac.in"
).toLowerCase();

const ALLOWED_EMAILS = String(
  process.env.ALLOWED_EMAILS ||
  process.env.VITE_ALLOWED_EMAILS ||
  ""
)
  .split(",")
  .map(email => email.trim().toLowerCase())
  .filter(Boolean);

app.disable("x-powered-by");
app.use(express.json({ limit: "10kb" }));
app.use(express.static(distPath));

// Google sign-in verification and institution access control.
app.post("/api/auth/google", async (req, res) => {
  if (!CLIENT_ID) {
    return res.status(503).json({
      error: "Server is missing GOOGLE_CLIENT_ID."
    });
  }

  try {
    const payload = await verifyGoogleIdToken(
      req.body?.credential,
      { clientId: CLIENT_ID }
    );

    const email = String(payload.email || "").toLowerCase();

    const hostedDomainOk =
      ALLOWED_DOMAIN === "gmail.com" ||
      String(payload.hd || "").toLowerCase() === ALLOWED_DOMAIN;

    const isException = ALLOWED_EMAILS.includes(email);

    if (
      !payload.email_verified ||
      (!isException && (
        !email.endsWith("@" + ALLOWED_DOMAIN) ||
        !hostedDomainOk
      ))
    ) {
      return res.status(403).json({
        error: "This account is not authorized to access CLASSROOT."
      });
    }

    return res.json({
      email,
      name: payload.name || email.split("@")[0]
    });

  } catch (error) {
    console.error("Google authentication error:", error);

    return res.status(401).json({
      error: "Google sign-in could not be verified."
    });
  }
});

// Health endpoint.
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
  console.log(
    `CLASSROOT Scheduling Portal is running at http://localhost:${PORT}`
  );
});
