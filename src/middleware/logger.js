// src/middleware/logger.js
const AUTH_TOKEN = "nsXDeD"; // Store this securely in real apps

export async function log(stack, level, _package, message) {
  try {
    const body = {
      stack,      // "frontend"
      level,      // "info", "error", etc.
      package: _package,  // "component", "api", etc.
      message,
    };

    const res = await fetch('http://20.244.56.144/evaluation-service/logs', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    console.log("Logged:", data.message);
  } catch (err) {
    console.error("Logging failed:", err);
  }
}export function logEvent(type, details) {
  const log = {
    type,
    timestamp: new Date().toISOString(),
    ...details,
  };
  // Save to sessionStorage or localStorage if required
  const logs = JSON.parse(localStorage.getItem('logs')) || [];
  logs.push(log);
  localStorage.setItem('logs', JSON.stringify(logs));
}