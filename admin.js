import { API_BASE } from "./config.js";

const adminLogin = document.getElementById("adminLogin");
const adminApp = document.getElementById("adminApp");
const adminLoginForm = document.getElementById("adminLoginForm");
const adminLoginError = document.getElementById("adminLoginError");
const adminIdentity = document.getElementById("adminIdentity");
const adminLogout = document.getElementById("adminLogout");

const productForm = document.getElementById("productForm");
const productFormTitle = document.getElementById("productFormTitle");
const resetProduct = document.getElementById("resetProduct");
const productsList = document.getElementById("productsList");
const productCount = document.getElementById("productCount");
const productCategory = document.getElementById("productCategory");
const categoryFields = document.getElementById("categoryFields");
const categoryFieldsTitle = document.getElementById("categoryFieldsTitle");

const keyGeneratorForm = document.getElementById("keyGeneratorForm");
const generatedKeyBox = document.getElementById("generatedKeyBox");
const generatedKeyValue = document.getElementById("generatedKeyValue");
const copyGeneratedKey = document.getElementById("copyGeneratedKey");
const keysList = document.getElementById("keysList");
const keysCount = document.getElementById("keysCount");

let adminToken = localStorage.getItem("madetech_admin_token") || "";
let products = [];

/* ---------------- API ---------------- */

async function api(path, options = {}, token = adminToken) {
  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  let data = {};
  try { data = await response.json(); } catch {}

  if (!response.ok) {
    const error = new Error(data.message || data.error || `HTTP ${response.status}`);
    error.code = data.error || "request_failed";
    error.status = response.status;
    throw error;
  }

  return data;
}

/* ---------------- CATEGORY FIELDS ---------------- */

const categorySchemas = {
  Mouse: [
    field("sensor", "Tipo de sensor", "text", "Ej. Focus Pro 35K Gen-2"),
    field("weight", "Peso (g)", "number", "54"),
    field("switchType", "Tipo de switch", "text", "Ej. Optical Mouse Switch Gen-3"),
    field("dongle8k", "Dongle 8K", "select", "", [
      ["included", "Incluido"],
      ["separate", "Se compra aparte"],
      ["not_supported", "No compatible"]
    ]),
    field("gripTypes", "Tipos de agarre", "lines", "Palm\nClaw\nFingertip"),
    field("pollingRate", "Polling rate", "text", "Ej. 8000 Hz"),
    field("batteryHours", "Batería (horas)", "number", "95"),
    field("dimensions", "Dimensiones", "text", "Ej. 127.1 × 63.9 × 39.9 mm")
  ],
  Teclados: [
    field("switchType", "Switch", "text", "Ej. Gateron Jade Pro"),
    field("switchTechnology", "Tecnología de switch", "text", "Ej. Hall Effect / Mecánico"),
    field("layout", "Formato / Layout", "text", "Ej. 75% ANSI"),
    field("hotSwap", "Hot-swap", "boolean"),
    field("rapidTrigger", "Rapid Trigger", "boolean"),
    field("pollingRate", "Polling rate", "text", "Ej. 8000 Hz"),
    field("keycaps", "Keycaps", "text", "Ej. PBT Double Shot"),
    field("mount", "Tipo de montaje", "text", "Ej. Gasket"),
    field("batteryHours", "Batería (horas)", "number", "120")
  ],
  IEM: [
    field("driverConfig", "Configuración de drivers", "text", "Ej. 1DD + 2BA"),
    field("soundSignature", "Firma sonora / Tuning", "text", "Ej. Warm Neutral"),
    field("impedance", "Impedancia", "text", "Ej. 32 Ω"),
    field("sensitivity", "Sensibilidad", "text", "Ej. 108 dB/Vrms"),
    field("frequencyResponse", "Respuesta en frecuencia", "text", "Ej. 20 Hz – 20 kHz"),
    field("cableConnector", "Conector del cable", "text", "Ej. 0.78 mm 2-pin"),
    field("plug", "Plug", "text", "Ej. 3.5 mm / 4.4 mm"),
    field("detachableCable", "Cable desmontable", "boolean"),
    field("microphone", "Micrófono", "text", "Ej. No / En cable"),
    field("weightPerSide", "Peso por lado (g)", "number", "5.5")
  ],
  Headsets: [
    field("driver", "Driver", "text", "Ej. 50 mm Dynamic"),
    field("microphone", "Micrófono", "text", "Ej. Cardioide 10 mm"),
    field("detachableMic", "Micrófono desmontable", "boolean"),
    field("weight", "Peso (g)", "number", "280"),
    field("batteryHours", "Autonomía (horas)", "number", "70"),
    field("codec", "Codec principal", "text", "Ej. LC3+ / SBC"),
    field("spatialAudio", "Sonido espacial", "text", "Ej. DTS Headphone:X"),
    field("impedance", "Impedancia", "text", "Ej. 32 Ω"),
    field("frequencyResponse", "Respuesta en frecuencia", "text", "Ej. 20 Hz – 20 kHz"),
    field("earpads", "Material de almohadillas", "text", "Ej. Memory Foam + Tela")
  ],
  DAC: [
    field("dacChip", "Chip DAC", "text", "Ej. ESS ES9039Q2M"),
    field("ampChip", "Amplificador", "text", "Ej. TPA6120A2"),
    field("inputs", "Entradas", "lines", "USB-C\nOptical\nCoaxial"),
    field("outputs", "Salidas", "lines", "3.5 mm\n4.4 mm"),
    field("maxPcm", "PCM máximo", "text", "Ej. 32-bit / 768 kHz"),
    field("maxDsd", "DSD máximo", "text", "Ej. DSD512"),
    field("powerOutput", "Potencia de salida", "text", "Ej. 1.5 W @ 32 Ω"),
    field("balanced", "Salida balanceada", "boolean"),
    field("bluetooth", "Bluetooth", "text", "Ej. 5.4 / No"),
    field("bluetoothCodecs", "Codecs Bluetooth", "lines", "LDAC\naptX Adaptive\nAAC"),
    field("gain", "Ganancia", "text", "Ej. Low / High")
  ]
};

function field(key, label, type, placeholder = "", options = []) {
  return { key, label, type, placeholder, options };
}

function renderCategoryFields(category, values = {}) {
  const schema = categorySchemas[category] || [];
  categoryFieldsTitle.textContent = category === "IEM" ? "IEM / In-Ears" : category;
  categoryFields.innerHTML = schema.map(item => fieldHtml(item, values[item.key])).join("");
}

function fieldHtml(item, value) {
  const id = `spec_${item.key}`;
  const safeValue = value ?? "";

  if (item.type === "boolean") {
    return `
      <label>${item.label.toUpperCase()}
        <select id="${id}" data-spec-key="${item.key}" data-spec-type="boolean">
          <option value="">Sin especificar</option>
          <option value="true" ${safeValue === true ? "selected" : ""}>Sí</option>
          <option value="false" ${safeValue === false ? "selected" : ""}>No</option>
        </select>
      </label>`;
  }

  if (item.type === "select") {
    return `
      <label>${item.label.toUpperCase()}
        <select id="${id}" data-spec-key="${item.key}" data-spec-type="select">
          <option value="">Sin especificar</option>
          ${item.options.map(([value, label]) =>
            `<option value="${escapeAttr(value)}" ${String(safeValue) === value ? "selected" : ""}>${escapeHtml(label)}</option>`
          ).join("")}
        </select>
      </label>`;
  }

  if (item.type === "lines") {
    const text = Array.isArray(safeValue) ? safeValue.join("\n") : safeValue;
    return `
      <label class="full-width">${item.label.toUpperCase()}
        <textarea id="${id}" data-spec-key="${item.key}" data-spec-type="lines" rows="4"
          placeholder="${escapeAttr(item.placeholder)}">${escapeHtml(text)}</textarea>
      </label>`;
  }

  return `
    <label>${item.label.toUpperCase()}
      <input id="${id}" data-spec-key="${item.key}" data-spec-type="${item.type}"
        type="${item.type}" value="${escapeAttr(safeValue)}" placeholder="${escapeAttr(item.placeholder)}">
    </label>`;
}

productCategory.addEventListener("change", () => renderCategoryFields(productCategory.value, {}));

/* ---------------- ADMIN SESSION ---------------- */

async function restoreAdminSession() {
  if (!adminToken) {
    adminLogin.hidden = false;
    adminApp.hidden = true;
    return;
  }

  try {
    const me = await api("/session/me");
    if (me.role !== "admin") throw new Error("not admin");

    adminIdentity.textContent = "Administrador";
    adminLogin.hidden = true;
    adminApp.hidden = false;
    renderCategoryFields(productCategory.value, {});
    await Promise.all([loadProducts(), loadKeys()]);
  } catch {
    localStorage.removeItem("madetech_admin_token");
    adminToken = "";
    adminLogin.hidden = false;
    adminApp.hidden = true;
  }
}

adminLoginForm.addEventListener("submit", async event => {
  event.preventDefault();
  adminLoginError.hidden = true;

  const email = document.getElementById("adminEmail").value.trim();
  const password = document.getElementById("adminPassword").value;

  try {
    const result = await api("/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    }, null);

    adminToken = result.token;
    localStorage.setItem("madetech_admin_token", result.token);

    adminIdentity.textContent = email;
    adminLogin.hidden = true;
    adminApp.hidden = false;

    renderCategoryFields(productCategory.value, {});
    await Promise.all([loadProducts(), loadKeys()]);
  } catch {
    adminLoginError.textContent = "Correo o contraseña incorrectos.";
    adminLoginError.hidden = false;
  }
});

adminLogout.addEventListener("click", async () => {
  try { await api("/session/logout", { method: "POST" }); } catch {}
  localStorage.removeItem("madetech_admin_token");
  adminToken = "";
  adminApp.hidden = true;
  adminLogin.hidden = false;
});

/* ---------------- PANELS ---------------- */

document.querySelectorAll(".admin-nav button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".admin-nav button").forEach(item => item.classList.remove("active"));
    document.querySelectorAll(".admin-panel").forEach(panel => panel.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(button.dataset.panel).classList.add("active");
    document.getElementById("adminTitle").textContent =
      button.dataset.panel === "productsPanel" ? "Productos" : "Access Keys";
  });
});

/* ---------------- PRODUCTS ---------------- */

async function loadProducts() {
  const data = await api("/products");
  products = Array.isArray(data.products) ? data.products : [];
  productCount.textContent = String(products.length);

  productsList.innerHTML = products.length
    ? products.map(product => `
      <article class="admin-list-item">
        <div>
          <h3>${escapeHtml(product.brand || "")} ${escapeHtml(product.name || "")}</h3>
          <p>
            ${escapeHtml(product.category || "")}
            ${product.model ? ` · ${escapeHtml(product.model)}` : ""}
            · ${Number(product.score || 0).toFixed(1)}/10
            · <span class="${product.status === "draft" ? "draft-badge" : "published-badge"}">
              ${product.status === "draft" ? "BORRADOR" : "PUBLICADO"}
            </span>
          </p>
        </div>
        <div class="item-actions">
          <button data-edit-product="${product.id}">EDITAR</button>
          <button class="danger" data-delete-product="${product.id}">ELIMINAR</button>
        </div>
      </article>`).join("")
    : `<p style="color:#777">Todavía no hay productos.</p>`;

  bindProductActions();
}

function bindProductActions() {
  document.querySelectorAll("[data-edit-product]").forEach(button =>
    button.addEventListener("click", () => editProduct(Number(button.dataset.editProduct)))
  );

  document.querySelectorAll("[data-delete-product]").forEach(button =>
    button.addEventListener("click", () => removeProduct(Number(button.dataset.deleteProduct)))
  );
}

function editProduct(id) {
  const product = products.find(item => Number(item.id) === id);
  if (!product) return;

  document.getElementById("productId").value = product.id;
  document.getElementById("productCategory").value = product.category || "Mouse";
  document.getElementById("productStatus").value = product.status || "published";
  document.getElementById("productBrand").value = product.brand || "";
  document.getElementById("productName").value = product.name || "";
  document.getElementById("productModel").value = product.model || "";
  document.getElementById("productScore").value = product.score ?? "";
  document.getElementById("productPrice").value = product.price || "";
  document.getElementById("productDate").value = product.date || "";
  document.getElementById("productImageUrl").value = product.imageUrl || "";
  document.getElementById("productOfficialUrl").value = product.officialUrl || "";
  document.getElementById("productFeatured").value = product.featured === true ? "true" : "false";
  document.getElementById("productTrustedStores").value = storesToText(product.trustedStores);
  document.getElementById("productColors").value = colorsToText(product.colors);
  document.getElementById("productConnections").value = (product.connections || []).join("\n");
  document.getElementById("productYoutube").value = product.reviewLinks?.youtube || "";
  document.getElementById("productTiktok").value = product.reviewLinks?.tiktok || "";
  document.getElementById("productSummary").value = product.summary || "";
  document.getElementById("productPros").value = (product.pros || []).join("\n");
  document.getElementById("productCons").value = (product.cons || []).join("\n");

  renderCategoryFields(product.category || "Mouse", product.specs || {});
  productFormTitle.textContent = "Editar producto";
  productForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetProductForm() {
  productForm.reset();
  document.getElementById("productId").value = "";
  productFormTitle.textContent = "Nuevo producto";
  productCategory.value = "Mouse";
  document.getElementById("productStatus").value = "published";
  document.getElementById("productFeatured").value = "false";
  renderCategoryFields("Mouse", {});
}

resetProduct.addEventListener("click", resetProductForm);

productForm.addEventListener("submit", async event => {
  event.preventDefault();

  const id = document.getElementById("productId").value.trim();

  const payload = {
    category: productCategory.value,
    status: document.getElementById("productStatus").value,
    brand: document.getElementById("productBrand").value.trim(),
    name: document.getElementById("productName").value.trim(),
    model: document.getElementById("productModel").value.trim(),
    score: Number(document.getElementById("productScore").value),
    price: document.getElementById("productPrice").value.trim(),
    date: document.getElementById("productDate").value.trim(),
    imageUrl: document.getElementById("productImageUrl").value.trim(),
    officialUrl: document.getElementById("productOfficialUrl").value.trim(),
    featured: document.getElementById("productFeatured").value === "true",
    trustedStores: parseStores(document.getElementById("productTrustedStores").value),
    colors: parseColors(document.getElementById("productColors").value),
    connections: lines(document.getElementById("productConnections").value),
    reviewLinks: {
      youtube: document.getElementById("productYoutube").value.trim(),
      tiktok: document.getElementById("productTiktok").value.trim()
    },
    summary: document.getElementById("productSummary").value.trim(),
    specs: collectCategorySpecs(),
    pros: lines(document.getElementById("productPros").value),
    cons: lines(document.getElementById("productCons").value)
  };

  const saveButton = document.getElementById("saveProduct");
  const oldText = saveButton.textContent;
  saveButton.disabled = true;
  saveButton.textContent = "GUARDANDO...";

  try {
    if (id) {
      await api(`/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload)
      });
    } else {
      await api("/products", {
        method: "POST",
        body: JSON.stringify(payload)
      });
    }

    resetProductForm();
    await loadProducts();
  } catch (error) {
    alert(`No se pudo guardar: ${error.code || error.message}`);
  } finally {
    saveButton.disabled = false;
    saveButton.textContent = oldText;
  }
});

function collectCategorySpecs() {
  const result = {};

  categoryFields.querySelectorAll("[data-spec-key]").forEach(input => {
    const key = input.dataset.specKey;
    const type = input.dataset.specType;
    let value = input.value;

    if (type === "boolean") {
      if (value === "") return;
      value = value === "true";
    } else if (type === "number") {
      if (value === "") return;
      value = Number(value);
    } else if (type === "lines") {
      value = lines(value);
      if (!value.length) return;
    } else if (value === "") {
      return;
    }

    result[key] = value;
  });

  return result;
}

async function removeProduct(id) {
  const product = products.find(item => Number(item.id) === id);
  const name = product ? `${product.brand || ""} ${product.name || ""}`.trim() : "este producto";

  if (!confirm(`¿Eliminar ${name}? Esta acción no se puede deshacer.`)) return;

  try {
    await api(`/products/${id}`, { method: "DELETE" });
    await loadProducts();
  } catch {
    alert("No se pudo eliminar el producto.");
  }
}

/* ---------------- KEYS ---------------- */

keyGeneratorForm.addEventListener("submit", async event => {
  event.preventDefault();

  const label = document.getElementById("keyLabel").value.trim();
  const expiresAt = document.getElementById("keyExpiry").value || null;

  try {
    const result = await api("/admin/keys", {
      method: "POST",
      body: JSON.stringify({ label, expiresAt })
    });

    generatedKeyValue.textContent = result.key;
    generatedKeyBox.hidden = false;
    keyGeneratorForm.reset();

    await loadKeys();
  } catch (error) {
    alert(`No se pudo generar la key: ${error.code || error.message}`);
  }
});

copyGeneratedKey.addEventListener("click", async () => {
  const value = generatedKeyValue.textContent.trim();
  if (!value) return;

  await navigator.clipboard.writeText(value);
  copyGeneratedKey.textContent = "COPIADA ✓";
  setTimeout(() => copyGeneratedKey.textContent = "COPIAR KEY", 1500);
});

async function loadKeys() {
  const data = await api("/admin/keys");
  const keys = Array.isArray(data.keys) ? data.keys : [];

  keysCount.textContent = String(keys.length);

  keysList.innerHTML = keys.length
    ? keys.map(key => {
      const active = Number(key.active) === 1;
      const expiry = key.expires_at ? ` · expira ${escapeHtml(String(key.expires_at).slice(0,10))}` : "";
      return `
        <article class="admin-list-item">
          <div>
            <h3>${escapeHtml(key.label || "Sin nombre")}</h3>
            <p class="${active ? "status-active" : "status-revoked"}">
              ${active ? "ACTIVA" : "REVOCADA"} · ${Number(key.uses || 0)} usos${expiry}
              ${key.last_used_at ? ` · último acceso ${escapeHtml(key.last_used_at)}` : ""}
            </p>
          </div>
          <div class="item-actions">
            ${active ? `<button class="danger" data-revoke-key="${key.id}">REVOCAR</button>` : ""}
          </div>
        </article>`;
    }).join("")
    : `<p style="color:#777">Todavía no has generado ninguna key.</p>`;

  document.querySelectorAll("[data-revoke-key]").forEach(button => {
    button.addEventListener("click", () => revokeAccessKey(Number(button.dataset.revokeKey)));
  });
}

async function revokeAccessKey(id) {
  if (!confirm("¿Revocar esta key? Las sesiones creadas con ella se cerrarán.")) return;

  try {
    await api(`/admin/keys/${id}/revoke`, { method: "POST" });
    await loadKeys();
  } catch {
    alert("No se pudo revocar la key.");
  }
}

/* ---------------- HELPERS ---------------- */

function parseStores(value) {
  return lines(value)
    .map(row => {
      const [name, ...urlParts] = row.split("|");
      return { name: String(name || "").trim(), url: urlParts.join("|").trim() };
    })
    .filter(item => item.name && item.url);
}

function parseColors(value) {
  return lines(value)
    .map(row => {
      const [name, hex = ""] = row.split("|");
      return { name: String(name || "").trim(), hex: String(hex || "").trim() };
    })
    .filter(item => item.name);
}

function storesToText(stores) {
  return Array.isArray(stores)
    ? stores.map(item => `${item.name || ""} | ${item.url || ""}`).join("\n")
    : "";
}

function colorsToText(colors) {
  return Array.isArray(colors)
    ? colors.map(item => `${item.name || ""} | ${item.hex || ""}`).join("\n")
    : "";
}

function lines(value) {
  return String(value || "").split("\n").map(item => item.trim()).filter(Boolean);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

restoreAdminSession();
