// MadeTech API — Cloudflare Worker + D1
// Required binding: DB -> madetech-db
// Recommended Worker variables/secrets:
//   BOOTSTRAP_TOKEN  (Secret)
//   ALLOWED_ORIGIN   (Text, e.g. https://madelesh.github.io)
// Optional:
//   SESSION_DAYS     (Text, default 30)

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store"
};

export default {
  async fetch(request, env) {
    const cors = corsHeaders(request, env);

    try {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: cors });
      }

      const url = new URL(request.url);
      const path = url.pathname.replace(/\/+$/, "") || "/";

      // Public health/info endpoints
      if (request.method === "GET" && path === "/") {
        return json({
          ok: true,
          service: "MadeTech API",
          version: "v5.3"
        }, 200, cors);
      }

      if (request.method === "GET" && path === "/health") {
        const dbCheck = await env.DB.prepare("SELECT 1 AS ok").first();
        return json({
          ok: dbCheck?.ok === 1,
          service: "madetech-api",
          database: "connected"
        }, 200, cors);
      }

      // One-time administrator bootstrap
      if (request.method === "POST" && path === "/admin/bootstrap") {
        return adminBootstrap(request, env, cors);
      }

      // Login endpoints
      if (request.method === "POST" && path === "/admin/login") {
        return adminLogin(request, env, cors);
      }

      if (request.method === "POST" && path === "/access/login") {
        return accessLogin(request, env, cors);
      }

      // Everything below requires a valid session token
      const session = await getSession(request, env);
      if (!session) {
        return json({ ok: false, error: "unauthorized" }, 401, cors);
      }

      if (request.method === "GET" && path === "/session/me") {
        return json({
          ok: true,
          role: session.principal_type,
          principalId: session.principal_id,
          profileName: session.profile_name || (session.principal_type === "admin" ? "Administrador" : "Usuario MadeTech"),
          keyExpiresAt: session.key_expires_at || null,
          expiresAt: session.expires_at
        }, 200, cors);
      }

      if (request.method === "POST" && path === "/session/logout") {
        await env.DB.prepare(
          "UPDATE sessions SET revoked_at = CURRENT_TIMESTAMP WHERE token_hash = ?"
        ).bind(session.token_hash).run();

        return json({ ok: true }, 200, cors);
      }

      // Products collection
      if (path === "/products") {
        if (request.method === "GET") {
          return listProducts(request, env, session, cors);
        }

        if (request.method === "POST") {
          requireAdmin(session);
          return createProduct(request, env, cors);
        }
      }

      // Single product
      const productMatch = path.match(/^\/products\/(\d+)$/);
      if (productMatch) {
        const productId = Number(productMatch[1]);

        if (request.method === "GET") {
          return getProduct(productId, env, session, cors);
        }

        if (request.method === "PUT") {
          requireAdmin(session);
          return updateProduct(productId, request, env, cors);
        }

        if (request.method === "DELETE") {
          requireAdmin(session);
          return deleteProduct(productId, env, cors);
        }
      }

      // Ratings
      const ratingMatch = path.match(/^\/products\/(\d+)\/rating$/);
      if (ratingMatch) {
        const productId = Number(ratingMatch[1]);

        if (request.method === "GET") {
          return getRating(productId, env, session, cors);
        }

        if (request.method === "PUT") {
          if (session.principal_type !== "user") {
            throw new HttpError(403, "user_session_required");
          }
          return setRating(productId, request, env, session, cors);
        }
      }

      // Key management
      if (path === "/admin/keys") {
        requireAdmin(session);

        if (request.method === "GET") {
          return listKeys(env, cors);
        }

        if (request.method === "POST") {
          return generateAccessKey(request, env, session, cors);
        }
      }

      const revokeMatch = path.match(/^\/admin\/keys\/(\d+)\/revoke$/);
      if (revokeMatch && request.method === "POST") {
        requireAdmin(session);
        return revokeAccessKey(Number(revokeMatch[1]), env, cors);
      }

      return json({ ok: false, error: "not_found" }, 404, cors);
    } catch (error) {
      if (error instanceof HttpError) {
        return json(
          { ok: false, error: error.code, message: error.message },
          error.status,
          cors
        );
      }

      console.error("Unhandled MadeTech API error:", error);
      return json({ ok: false, error: "internal_error" }, 500, cors);
    }
  }
};

class HttpError extends Error {
  constructor(status, code, message = code) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

function requireAdmin(session) {
  if (session.principal_type !== "admin") {
    throw new HttpError(403, "admin_required");
  }
}

function corsHeaders(request, env) {
  const origin = request.headers.get("Origin") || "";
  const configured = String(env.ALLOWED_ORIGIN || "https://madelesh.github.io")
    .split(",")
    .map(v => v.trim())
    .filter(Boolean);

  const headers = {
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };

  if (origin && configured.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  return headers;
}

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...JSON_HEADERS, ...extraHeaders }
  });
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    throw new HttpError(400, "invalid_json");
  }
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeAccessKey(value) {
  return String(value || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

function nullableString(value) {
  const text = String(value ?? "").trim();
  return text || null;
}

function nowPlusDays(days) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString();
}

function randomBytes(count) {
  const bytes = new Uint8Array(count);
  crypto.getRandomValues(bytes);
  return bytes;
}

function base64url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function bytesToHex(bytes) {
  return [...new Uint8Array(bytes)]
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function sha256(value) {
  const bytes = new TextEncoder().encode(String(value));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return bytesToHex(digest);
}

async function hashPassword(password, saltHex) {
  const passwordBytes = new TextEncoder().encode(String(password));
  const salt = Uint8Array.from(
    saltHex.match(/.{1,2}/g).map(pair => parseInt(pair, 16))
  );

  const material = await crypto.subtle.importKey(
    "raw",
    passwordBytes,
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    material,
    256
  );

  return bytesToHex(bits);
}

function timingSafeEqual(a, b) {
  const left = new TextEncoder().encode(String(a));
  const right = new TextEncoder().encode(String(b));

  if (left.length !== right.length) return false;

  let difference = 0;
  for (let i = 0; i < left.length; i++) {
    difference |= left[i] ^ right[i];
  }
  return difference === 0;
}

async function createSession(env, principalType, principalId) {
  const token = base64url(randomBytes(32));
  const tokenHash = await sha256(token);

  const configuredDays = Number(env.SESSION_DAYS || 30);
  const days = Number.isFinite(configuredDays)
    ? Math.max(1, Math.min(90, configuredDays))
    : 30;

  const expiresAt = nowPlusDays(days);

  await env.DB.prepare(`
    INSERT INTO sessions (
      token_hash,
      principal_type,
      principal_id,
      expires_at
    ) VALUES (?, ?, ?, ?)
  `).bind(
    tokenHash,
    principalType,
    principalId,
    expiresAt
  ).run();

  return { token, expiresAt };
}

async function getSession(request, env) {
  const authorization = request.headers.get("Authorization") || "";
  if (!authorization.startsWith("Bearer ")) return null;

  const rawToken = authorization.slice(7).trim();
  if (!rawToken) return null;

  const tokenHash = await sha256(rawToken);

  const session = await env.DB.prepare(`
    SELECT
      token_hash,
      principal_type,
      principal_id,
      expires_at,
      revoked_at
    FROM sessions
    WHERE token_hash = ?
    LIMIT 1
  `).bind(tokenHash).first();

  if (!session || session.revoked_at) return null;
  if (new Date(session.expires_at) <= new Date()) return null;

  // A user session is valid only while its access key is still active
  // and has not reached its own expiration date.
  if (session.principal_type === "user") {
    const key = await env.DB.prepare(`
      SELECT label, active, expires_at
      FROM access_keys
      WHERE id = ?
      LIMIT 1
    `).bind(session.principal_id).first();

    if (!key || Number(key.active) !== 1) return null;
    if (key.expires_at && new Date(key.expires_at) <= new Date()) return null;

    session.profile_name = String(key.label || "").trim() || "Usuario MadeTech";
    session.key_expires_at = key.expires_at || null;
  } else if (session.principal_type === "admin") {
    const admin = await env.DB.prepare(`
      SELECT email, active
      FROM admins
      WHERE id = ?
      LIMIT 1
    `).bind(session.principal_id).first();

    if (!admin || Number(admin.active) !== 1) return null;

    session.profile_name = String(admin.email || "").trim() || "Administrador";
    session.key_expires_at = null;
  }

  return session;
}

// ============================================================
// ADMIN
// ============================================================

async function adminBootstrap(request, env, cors) {
  if (!env.BOOTSTRAP_TOKEN) {
    throw new HttpError(503, "bootstrap_not_configured");
  }

  const body = await readJson(request);
  const suppliedToken = String(body.bootstrapToken || "");

  if (!timingSafeEqual(suppliedToken, env.BOOTSTRAP_TOKEN)) {
    throw new HttpError(403, "invalid_bootstrap_token");
  }

  const existing = await env.DB.prepare(
    "SELECT COUNT(*) AS total FROM admins"
  ).first();

  if (Number(existing?.total || 0) > 0) {
    throw new HttpError(409, "admin_already_exists");
  }

  const email = normalizeEmail(body.email);
  const password = String(body.password || "");

  if (!email || !email.includes("@")) {
    throw new HttpError(400, "invalid_email");
  }

  if (password.length < 12) {
    throw new HttpError(
      400,
      "password_too_short",
      "La contraseña debe tener al menos 12 caracteres."
    );
  }

  const salt = bytesToHex(randomBytes(16));
  const passwordHash = await hashPassword(password, salt);

  const result = await env.DB.prepare(`
    INSERT INTO admins (
      email,
      password_hash,
      password_salt,
      active
    ) VALUES (?, ?, ?, 1)
  `).bind(
    email,
    passwordHash,
    salt
  ).run();

  return json({
    ok: true,
    adminId: result.meta.last_row_id
  }, 201, cors);
}

async function adminLogin(request, env, cors) {
  const body = await readJson(request);
  const email = normalizeEmail(body.email);
  const password = String(body.password || "");

  const admin = await env.DB.prepare(`
    SELECT
      id,
      email,
      password_hash,
      password_salt,
      active
    FROM admins
    WHERE email = ?
    LIMIT 1
  `).bind(email).first();

  if (!admin || Number(admin.active) !== 1) {
    throw new HttpError(401, "invalid_credentials");
  }

  const candidateHash = await hashPassword(
    password,
    admin.password_salt
  );

  if (!timingSafeEqual(candidateHash, admin.password_hash)) {
    throw new HttpError(401, "invalid_credentials");
  }

  const session = await createSession(env, "admin", admin.id);

  return json({
    ok: true,
    role: "admin",
    ...session
  }, 200, cors);
}

// ============================================================
// USER ACCESS KEYS
// ============================================================

function randomAccessKey() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const random = randomBytes(20);
  let body = "";

  for (let i = 0; i < random.length; i++) {
    body += alphabet[random[i] % alphabet.length];
  }

  return [
    "MT",
    body.slice(0, 5),
    body.slice(5, 10),
    body.slice(10, 15),
    body.slice(15, 20)
  ].join("-");
}

async function accessLogin(request, env, cors) {
  const body = await readJson(request);
  const normalized = normalizeAccessKey(body.key);

  if (normalized.length < 16) {
    throw new HttpError(401, "invalid_key");
  }

  const keyHash = await sha256(normalized);

  const key = await env.DB.prepare(`
    SELECT
      id,
      label,
      active,
      expires_at
    FROM access_keys
    WHERE key_hash = ?
    LIMIT 1
  `).bind(keyHash).first();

  if (!key || Number(key.active) !== 1) {
    throw new HttpError(401, "invalid_key");
  }

  if (key.expires_at && new Date(key.expires_at) <= new Date()) {
    throw new HttpError(401, "expired_key");
  }

  await env.DB.prepare(`
    UPDATE access_keys
    SET
      uses = uses + 1,
      last_used_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(key.id).run();

  const session = await createSession(env, "user", key.id);

  return json({
    ok: true,
    role: "user",
    profileName: String(key.label || "").trim() || "Usuario MadeTech",
    keyExpiresAt: key.expires_at || null,
    ...session
  }, 200, cors);
}

async function listKeys(env, cors) {
  const result = await env.DB.prepare(`
    SELECT
      id,
      label,
      active,
      expires_at,
      created_at,
      last_used_at,
      uses
    FROM access_keys
    ORDER BY created_at DESC
  `).all();

  return json({
    ok: true,
    keys: result.results || []
  }, 200, cors);
}

async function generateAccessKey(request, env, session, cors) {
  const body = await readJson(request);

  const label = String(body.label || "").trim();
  if (!label) throw new HttpError(400, "label_required");

  let expiresAt = nullableString(
    body.expiresAt ?? body.expires_at
  );

  // Accept YYYY-MM-DD and convert it to end-of-day UTC.
  if (expiresAt && /^\d{4}-\d{2}-\d{2}$/.test(expiresAt)) {
    expiresAt = `${expiresAt}T23:59:59.999Z`;
  }

  if (expiresAt && Number.isNaN(new Date(expiresAt).getTime())) {
    throw new HttpError(400, "invalid_expiration");
  }

  let generatedKey = "";
  let keyHash = "";
  let collision = null;

  for (let attempt = 0; attempt < 5; attempt++) {
    generatedKey = randomAccessKey();
    keyHash = await sha256(normalizeAccessKey(generatedKey));

    collision = await env.DB.prepare(
      "SELECT id FROM access_keys WHERE key_hash = ?"
    ).bind(keyHash).first();

    if (!collision) break;
  }

  if (collision) {
    throw new HttpError(500, "key_generation_failed");
  }

  const result = await env.DB.prepare(`
    INSERT INTO access_keys (
      key_hash,
      label,
      active,
      expires_at,
      created_by
    ) VALUES (?, ?, 1, ?, ?)
  `).bind(
    keyHash,
    label,
    expiresAt,
    session.principal_id
  ).run();

  // Important: plaintext key is returned only once.
  return json({
    ok: true,
    id: result.meta.last_row_id,
    key: generatedKey,
    label,
    expiresAt
  }, 201, cors);
}

async function revokeAccessKey(id, env, cors) {
  await env.DB.prepare(
    "UPDATE access_keys SET active = 0 WHERE id = ?"
  ).bind(id).run();

  // Immediately revoke sessions created with this key.
  await env.DB.prepare(`
    UPDATE sessions
    SET revoked_at = CURRENT_TIMESTAMP
    WHERE principal_type = 'user'
      AND principal_id = ?
      AND revoked_at IS NULL
  `).bind(id).run();

  return json({ ok: true }, 200, cors);
}

// ============================================================
// PRODUCTS
// ============================================================

async function listProducts(request, env, session, cors) {
  const url = new URL(request.url);
  const category = nullableString(url.searchParams.get("category"));

  let sql = `
    SELECT
      id,
      category,
      status,
      brand,
      name,
      model,
      score,
      price,
      review_date,
      image_url,
      official_url,
      featured,
      summary,
      colors_json,
      connections_json,
      trusted_stores_json,
      review_links_json,
      specs_json,
      pros_json,
      cons_json,
      created_at,
      updated_at
    FROM products
  `;

  const conditions = [];
  const params = [];

  if (session.principal_type !== "admin") {
    conditions.push("status = 'published'");
  }

  if (category) {
    conditions.push("category = ?");
    params.push(category);
  }

  if (conditions.length) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  sql += " ORDER BY featured DESC, created_at DESC";

  let result;
  if (params.length) {
    result = await env.DB.prepare(sql).bind(...params).all();
  } else {
    result = await env.DB.prepare(sql).all();
  }

  return json({
    ok: true,
    products: (result.results || []).map(decodeProduct)
  }, 200, cors);
}

async function getProduct(id, env, session, cors) {
  const row = await env.DB.prepare(
    "SELECT * FROM products WHERE id = ? LIMIT 1"
  ).bind(id).first();

  if (!row) {
    throw new HttpError(404, "product_not_found");
  }

  if (
    session.principal_type !== "admin" &&
    row.status !== "published"
  ) {
    throw new HttpError(404, "product_not_found");
  }

  const rating = await ratingSummary(id, env, session);

  return json({
    ok: true,
    product: decodeProduct(row),
    rating
  }, 200, cors);
}

async function createProduct(request, env, cors) {
  const product = sanitizeProduct(await readJson(request));

  const result = await env.DB.prepare(`
    INSERT INTO products (
      category,
      status,
      brand,
      name,
      model,
      score,
      price,
      review_date,
      image_url,
      official_url,
      featured,
      summary,
      colors_json,
      connections_json,
      trusted_stores_json,
      review_links_json,
      specs_json,
      pros_json,
      cons_json,
      created_at,
      updated_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
      CURRENT_TIMESTAMP,
      CURRENT_TIMESTAMP
    )
  `).bind(
    product.category,
    product.status,
    product.brand,
    product.name,
    product.model,
    product.score,
    product.price,
    product.review_date,
    product.image_url,
    product.official_url,
    product.featured ? 1 : 0,
    product.summary,
    JSON.stringify(product.colors),
    JSON.stringify(product.connections),
    JSON.stringify(product.trustedStores),
    JSON.stringify(product.reviewLinks),
    JSON.stringify(product.specs),
    JSON.stringify(product.pros),
    JSON.stringify(product.cons)
  ).run();

  return json({
    ok: true,
    id: result.meta.last_row_id
  }, 201, cors);
}

async function updateProduct(id, request, env, cors) {
  const existing = await env.DB.prepare(
    "SELECT id FROM products WHERE id = ? LIMIT 1"
  ).bind(id).first();

  if (!existing) {
    throw new HttpError(404, "product_not_found");
  }

  const product = sanitizeProduct(await readJson(request));

  await env.DB.prepare(`
    UPDATE products
    SET
      category = ?,
      status = ?,
      brand = ?,
      name = ?,
      model = ?,
      score = ?,
      price = ?,
      review_date = ?,
      image_url = ?,
      official_url = ?,
      featured = ?,
      summary = ?,
      colors_json = ?,
      connections_json = ?,
      trusted_stores_json = ?,
      review_links_json = ?,
      specs_json = ?,
      pros_json = ?,
      cons_json = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(
    product.category,
    product.status,
    product.brand,
    product.name,
    product.model,
    product.score,
    product.price,
    product.review_date,
    product.image_url,
    product.official_url,
    product.featured ? 1 : 0,
    product.summary,
    JSON.stringify(product.colors),
    JSON.stringify(product.connections),
    JSON.stringify(product.trustedStores),
    JSON.stringify(product.reviewLinks),
    JSON.stringify(product.specs),
    JSON.stringify(product.pros),
    JSON.stringify(product.cons),
    id
  ).run();

  return json({ ok: true }, 200, cors);
}

async function deleteProduct(id, env, cors) {
  await env.DB.prepare(
    "DELETE FROM products WHERE id = ?"
  ).bind(id).run();

  return json({ ok: true }, 200, cors);
}

function sanitizeProduct(body) {
  const validCategories = [
    "Mouse",
    "Teclados",
    "IEM",
    "Headsets",
    "DAC"
  ];

  const category = String(body.category || "");
  if (!validCategories.includes(category)) {
    throw new HttpError(400, "invalid_category");
  }

  const brand = String(body.brand || "").trim();
  const name = String(body.name || "").trim();

  if (!brand || !name) {
    throw new HttpError(400, "brand_and_name_required");
  }

  const score = Number(body.score ?? 0);
  if (!Number.isFinite(score) || score < 0 || score > 10) {
    throw new HttpError(400, "invalid_score");
  }

  return {
    category,
    status: body.status === "published" ? "published" : "draft",
    brand,
    name,
    model: nullableString(body.model),
    score,
    price: nullableString(body.price),
    review_date: nullableString(body.date ?? body.review_date),
    image_url: validateOptionalUrl(body.imageUrl ?? body.image_url),
    official_url: validateOptionalUrl(body.officialUrl ?? body.official_url),
    featured: Boolean(body.featured),
    summary: nullableString(body.summary),
    colors: Array.isArray(body.colors) ? body.colors : [],
    connections: Array.isArray(body.connections)
      ? body.connections
      : [],
    trustedStores: Array.isArray(body.trustedStores)
      ? body.trustedStores
      : [],
    reviewLinks:
      body.reviewLinks && typeof body.reviewLinks === "object"
        ? body.reviewLinks
        : {},
    specs:
      body.specs && typeof body.specs === "object"
        ? body.specs
        : {},
    pros: Array.isArray(body.pros) ? body.pros : [],
    cons: Array.isArray(body.cons) ? body.cons : []
  };
}

function validateOptionalUrl(value) {
  const text = String(value ?? "").trim();
  if (!text) return null;

  try {
    const url = new URL(text);
    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error("invalid protocol");
    }
    return url.href;
  } catch {
    throw new HttpError(400, "invalid_url");
  }
}

function decodeProduct(row) {
  return {
    id: row.id,
    category: row.category,
    status: row.status,
    brand: row.brand,
    name: row.name,
    model: row.model,
    score: Number(row.score || 0),
    price: row.price,
    date: row.review_date,
    imageUrl: row.image_url,
    officialUrl: row.official_url,
    featured: Number(row.featured) === 1,
    summary: row.summary,
    colors: parseJson(row.colors_json, []),
    connections: parseJson(row.connections_json, []),
    trustedStores: parseJson(row.trusted_stores_json, []),
    reviewLinks: parseJson(row.review_links_json, {}),
    specs: parseJson(row.specs_json, {}),
    pros: parseJson(row.pros_json, []),
    cons: parseJson(row.cons_json, []),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function parseJson(value, fallback) {
  try {
    return JSON.parse(value || "");
  } catch {
    return fallback;
  }
}

// ============================================================
// RATINGS
// ============================================================

async function getRating(productId, env, session, cors) {
  return json({
    ok: true,
    rating: await ratingSummary(productId, env, session)
  }, 200, cors);
}

async function ratingSummary(productId, env, session) {
  const summary = await env.DB.prepare(`
    SELECT
      COUNT(*) AS count,
      COALESCE(AVG(rating), 0) AS average
    FROM ratings
    WHERE product_id = ?
  `).bind(productId).first();

  let mine = 0;

  if (session.principal_type === "user") {
    const own = await env.DB.prepare(`
      SELECT rating
      FROM ratings
      WHERE product_id = ?
        AND access_key_id = ?
      LIMIT 1
    `).bind(
      productId,
      session.principal_id
    ).first();

    mine = Number(own?.rating || 0);
  }

  return {
    count: Number(summary?.count || 0),
    average: Number(summary?.average || 0),
    mine
  };
}

async function setRating(productId, request, env, session, cors) {
  const body = await readJson(request);
  const rating = Number(body.rating);

  if (
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5
  ) {
    throw new HttpError(400, "invalid_rating");
  }

  const product = await env.DB.prepare(`
    SELECT id, status
    FROM products
    WHERE id = ?
    LIMIT 1
  `).bind(productId).first();

  if (!product || product.status !== "published") {
    throw new HttpError(404, "product_not_found");
  }

  await env.DB.prepare(`
    INSERT INTO ratings (
      product_id,
      access_key_id,
      rating,
      created_at,
      updated_at
    ) VALUES (
      ?, ?, ?,
      CURRENT_TIMESTAMP,
      CURRENT_TIMESTAMP
    )
    ON CONFLICT(product_id, access_key_id)
    DO UPDATE SET
      rating = excluded.rating,
      updated_at = CURRENT_TIMESTAMP
  `).bind(
    productId,
    session.principal_id,
    rating
  ).run();

  return json({
    ok: true,
    rating: await ratingSummary(productId, env, session)
  }, 200, cors);
}
