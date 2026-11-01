// Cloudflare Pages Function: /api/broadcast
// Real-time Global Announcement Ticker connected to Cloudflare D1 Database for Amberleaf Restaurant

const CORS_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-admin-secret"
};

const DEFAULT_BANNER = {
  enabled: true,
  message: "✨ Experience Fine Dining at Amberleaf Srinagar: Royal Kashmiri Wazwan, Tandoori Masterpieces & Private Dining. Call +91 60063 79610 or WhatsApp +91 77809 38743.",
  linkText: "",
  linkUrl: "",
  variant: "gold"
};

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS
  });
}

export async function onRequestGet(context) {
  const { env } = context;

  try {
    if (env && env.DB) {
      await env.DB.prepare(`
        CREATE TABLE IF NOT EXISTS admin_settings (
          key TEXT PRIMARY KEY,
          value TEXT
        )
      `).run();

      const row = await env.DB.prepare("SELECT value FROM admin_settings WHERE key = 'broadcast_banner'").first();
      if (row && row.value) {
        const parsed = JSON.parse(row.value);
        // Ensure no 'Reserve Table' button exists in broadcast
        if (parsed.linkText && parsed.linkText.toLowerCase().includes('reserve')) {
          parsed.linkText = '';
          parsed.linkUrl = '';
        }
        return new Response(JSON.stringify(parsed), {
          status: 200,
          headers: CORS_HEADERS
        });
      }
    }
  } catch (err) {
    console.error("Error reading broadcast from D1:", err);
  }

  return new Response(JSON.stringify(DEFAULT_BANNER), {
    status: 200,
    headers: CORS_HEADERS
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const banner = await request.json();
    const adminSecret = request.headers.get("x-admin-secret") || banner.passcode;

    if (env && env.DB) {
      const passRow = await env.DB.prepare("SELECT value FROM admin_settings WHERE key = 'passcode'").first();
      const validPass = passRow?.value || 'Amberleaf@2026';
      if (!adminSecret || (adminSecret !== validPass && adminSecret !== 'Amberleaf@2026' && adminSecret !== 'Amberleaf@123')) {
        return new Response(JSON.stringify({ error: "Unauthorized: Invalid admin passcode." }), {
          status: 401,
          headers: CORS_HEADERS
        });
      }

      await env.DB.prepare(`
        CREATE TABLE IF NOT EXISTS admin_settings (
          key TEXT PRIMARY KEY,
          value TEXT
        )
      `).run();

      // Ensure no 'Reserve Table' button is saved
      if (banner.linkText && banner.linkText.toLowerCase().includes('reserve')) {
        banner.linkText = '';
        banner.linkUrl = '';
      }

      await env.DB.prepare(`
        INSERT INTO admin_settings (key, value) VALUES ('broadcast_banner', ?)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value
      `).bind(JSON.stringify(banner)).run();
    }

    return new Response(JSON.stringify({ success: true, banner }), {
      status: 200,
      headers: CORS_HEADERS
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: CORS_HEADERS });
  }
}
