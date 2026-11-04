// Verifies a Google Sign-In ID token (a signed JWT) using only Node's built-in crypto.
// Checks the RS256 signature against Google's published signing keys, plus issuer,
// audience (your OAuth client ID) and expiry. No extra npm dependency needed.

import crypto from "node:crypto";

const CERTS_URL = "https://www.googleapis.com/oauth2/v3/certs";
const ISSUERS = ["accounts.google.com", "https://accounts.google.com"];
let cache = { keys: [], expires: 0 };

async function fetchGoogleKeys() {
  if (cache.keys.length && Date.now() < cache.expires) return cache.keys;
  const response = await fetch(CERTS_URL);
  if (!response.ok) throw new Error("Could not fetch Google signing keys");
  const maxAge = /max-age=(\d+)/.exec(response.headers.get("cache-control") || "");
  const { keys } = await response.json();
  cache = { keys: keys || [], expires: Date.now() + (maxAge ? Number(maxAge[1]) : 3600) * 1000 };
  return cache.keys;
}

const decode = part => Buffer.from(part, "base64url");

export async function verifyGoogleIdToken(idToken, { clientId, getSigningKeys = fetchGoogleKeys, now = Date.now() }) {
  const parts = String(idToken || "").split(".");
  if (parts.length !== 3) throw new Error("Malformed token");
  const header = JSON.parse(decode(parts[0]).toString("utf8"));
  const payload = JSON.parse(decode(parts[1]).toString("utf8"));
  if (header.alg !== "RS256") throw new Error("Unexpected signing algorithm");

  const jwk = (await getSigningKeys()).find(key => key.kid === header.kid);
  if (!jwk) throw new Error("Unknown signing key");
  const signatureOk = crypto.verify(
    "RSA-SHA256",
    Buffer.from(`${parts[0]}.${parts[1]}`),
    crypto.createPublicKey({ key: jwk, format: "jwk" }),
    decode(parts[2])
  );
  if (!signatureOk) throw new Error("Bad signature");

  if (!ISSUERS.includes(payload.iss)) throw new Error("Wrong issuer");
  if (!clientId || payload.aud !== clientId) throw new Error("Wrong audience");
  if (!payload.exp || payload.exp * 1000 < now) throw new Error("Token expired");
  return payload;
}
