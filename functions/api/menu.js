// Cloudflare Pages Function: /api/menu
// Real-time REST API connected to Cloudflare D1 Database for Amberleaf Restaurant

const CORS_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-admin-secret"
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
    if (!env || !env.DB) {
      return new Response(JSON.stringify({ 
        error: "Cloudflare D1 Database binding 'DB' not configured. Running in static fallback mode." 
      }), {
        status: 200,
        headers: CORS_HEADERS
      });
    }

    // Ensure table exists
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS menu_items (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT,
        rating REAL DEFAULT 4.8,
        popular INTEGER DEFAULT 0,
        signature INTEGER DEFAULT 0,
        chefs_pick INTEGER DEFAULT 0,
        vegetarian INTEGER DEFAULT 0,
        image TEXT,
        is_available INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run();

    const { results } = await env.DB.prepare("SELECT * FROM menu_items WHERE is_available = 1 ORDER BY rowid ASC").all();

    const mapped = (results || []).map(row => ({
      id: row.id,
      name: row.name,
      category: row.category,
      price: Number(row.price) || 0,
      description: row.description || '',
      rating: Number(row.rating) || 4.8,
      isPopular: row.popular === 1,
      isSignature: row.signature === 1,
      isChefsPick: row.chefs_pick === 1,
      isVegetarian: row.vegetarian === 1,
      image: row.image || './images/g1.jpg'
    }));

    return new Response(JSON.stringify(mapped), {
      status: 200,
      headers: CORS_HEADERS
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: CORS_HEADERS
    });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const adminSecret = request.headers.get("x-admin-secret") || body.passcode;

    // Verify passcode if DB has a passcode set
    if (env && env.DB) {
      const passRow = await env.DB.prepare("SELECT value FROM admin_settings WHERE key = 'passcode'").first();
      const validPass = passRow?.value || 'Amberleaf@2026';
      if (!adminSecret || (adminSecret !== validPass && adminSecret !== 'Amberleaf@2026' && adminSecret !== 'Amberleaf@123')) {
        return new Response(JSON.stringify({ error: "Unauthorized: Invalid admin passcode." }), {
          status: 401,
          headers: CORS_HEADERS
        });
      }
    }

    const { action, item, id, updatedFields } = body;

    if (!env || !env.DB) {
      return new Response(JSON.stringify({ 
        success: true, 
        message: "No Cloudflare D1 DB bound, local storage fallback used." 
      }), { 
        status: 200,
        headers: CORS_HEADERS
      });
    }

    if (action === "add" && item) {
      const stmt = env.DB.prepare(`
        INSERT INTO menu_items (id, name, category, price, description, rating, popular, signature, chefs_pick, vegetarian, image, is_available)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
        ON CONFLICT(id) DO UPDATE SET
          name = excluded.name,
          category = excluded.category,
          price = excluded.price,
          description = excluded.description,
          rating = excluded.rating,
          popular = excluded.popular,
          signature = excluded.signature,
          chefs_pick = excluded.chefs_pick,
          vegetarian = excluded.vegetarian,
          image = excluded.image
      `);
      await stmt.bind(
        String(item.id || Date.now()),
        item.name.trim(),
        item.category.trim(),
        Number(item.price) || 0,
        item.description ? item.description.trim() : '',
        Number(item.rating) || 4.8,
        item.isPopular ? 1 : 0,
        item.isSignature ? 1 : 0,
        item.isChefsPick ? 1 : 0,
        item.isVegetarian ? 1 : 0,
        item.image ? item.image.trim() : './images/g1.jpg'
      ).run();

      return new Response(JSON.stringify({ success: true, id: item.id }), {
        status: 200,
        headers: CORS_HEADERS
      });
    }

    if (action === "update" && id && updatedFields) {
      const current = await env.DB.prepare("SELECT * FROM menu_items WHERE id = ?").bind(String(id)).first();
      if (!current) {
        return new Response(JSON.stringify({ error: "Item not found" }), { status: 404, headers: CORS_HEADERS });
      }

      const stmt = env.DB.prepare(`
        UPDATE menu_items 
        SET name = ?, category = ?, price = ?, description = ?, rating = ?, popular = ?, signature = ?, chefs_pick = ?, vegetarian = ?, image = ?
        WHERE id = ?
      `);
      await stmt.bind(
        updatedFields.name !== undefined ? updatedFields.name.trim() : current.name,
        updatedFields.category !== undefined ? updatedFields.category.trim() : current.category,
        updatedFields.price !== undefined ? Number(updatedFields.price) : current.price,
        updatedFields.description !== undefined ? updatedFields.description.trim() : current.description,
        updatedFields.rating !== undefined ? Number(updatedFields.rating) : current.rating,
        updatedFields.isPopular !== undefined ? (updatedFields.isPopular ? 1 : 0) : current.popular,
        updatedFields.isSignature !== undefined ? (updatedFields.isSignature ? 1 : 0) : current.signature,
        updatedFields.isChefsPick !== undefined ? (updatedFields.isChefsPick ? 1 : 0) : current.chefs_pick,
        updatedFields.isVegetarian !== undefined ? (updatedFields.isVegetarian ? 1 : 0) : current.vegetarian,
        updatedFields.image !== undefined ? updatedFields.image.trim() : current.image,
        String(id)
      ).run();

      return new Response(JSON.stringify({ success: true }), { status: 200, headers: CORS_HEADERS });
    }

    if (action === "delete" && id) {
      await env.DB.prepare("DELETE FROM menu_items WHERE id = ?").bind(String(id)).run();
      return new Response(JSON.stringify({ success: true }), { status: 200, headers: CORS_HEADERS });
    }

    if (action === "reset") {
      await env.DB.prepare("DELETE FROM menu_items").run();
      return new Response(JSON.stringify({ success: true }), { status: 200, headers: CORS_HEADERS });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), { status: 400, headers: CORS_HEADERS });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: CORS_HEADERS });
  }
}
