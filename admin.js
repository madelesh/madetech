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
const productConnectionsPicker = document.getElementById("productConnectionsPicker");
const productConnectionsInput = document.getElementById("productConnections");
const productImagesPreview = document.getElementById("productImagesPreview");
const productImagesJson = document.getElementById("productImagesJson");
const productImageUrlInput = document.getElementById("productImageUrl");
const productImagePreview = document.getElementById("productImagePreview");
const libraryNavCount = document.getElementById("libraryNavCount");
const libraryCategoryFilter = document.getElementById("libraryCategoryFilter");
const adminToast = document.getElementById("adminToast");
const adminToastText = document.getElementById("adminToastText");

const productColorPicker = document.getElementById("productColorPicker");
const customColorInput = document.getElementById("customColorInput");
const storeAmazon = document.getElementById("storeAmazon");
const storeAliExpress = document.getElementById("storeAliExpress");
const extraStores = document.getElementById("extraStores");
const addStoreButton = document.getElementById("addStoreButton");
const universalProductUrl = document.getElementById("universalProductUrl");
const universalImportButton = document.getElementById("universalImportButton");
const universalImportStatus = document.getElementById("universalImportStatus");
const universalSourceLink = document.getElementById("universalSourceLink");

const webSearchCategory = document.getElementById("webSearchCategory");
const webSearchBrand = document.getElementById("webSearchBrand");
const webSearchModel = document.getElementById("webSearchModel");
const webSearchButton = document.getElementById("webSearchButton");
const webSearchStatus = document.getElementById("webSearchStatus");
const webSourceList = document.getElementById("webSourceList");

const eloshapesBrand = document.getElementById("eloshapesBrand");
const eloshapesModel = document.getElementById("eloshapesModel");
const eloshapesImportButton = document.getElementById("eloshapesImportButton");
const eloshapesImportStatus = document.getElementById("eloshapesImportStatus");
const eloshapesSourceLink = document.getElementById("eloshapesSourceLink");

const mechkeysProductUrl = document.getElementById("mechkeysProductUrl");
const mechkeysImportButton = document.getElementById("mechkeysImportButton");
const mechkeysImportStatus = document.getElementById("mechkeysImportStatus");

const keyGeneratorForm = document.getElementById("keyGeneratorForm");
const generatedKeyBox = document.getElementById("generatedKeyBox");
const generatedKeyValue = document.getElementById("generatedKeyValue");
const copyGeneratedKey = document.getElementById("copyGeneratedKey");
const keysList = document.getElementById("keysList");
const keysCount = document.getElementById("keysCount");

let adminToken = localStorage.getItem("madetech_admin_token") || "";
let products = [];

const PRESET_COLORS = [
  { name: "Negro", hex: "#111111" },
  { name: "Blanco", hex: "#ffffff" },
  { name: "Gris", hex: "#808080" },
  { name: "Rojo", hex: "#ef4444" },
  { name: "Azul", hex: "#3b82f6" },
  { name: "Verde", hex: "#22c55e" },
  { name: "Amarillo", hex: "#facc15" },
  { name: "Naranja", hex: "#f97316" },
  { name: "Rosa", hex: "#ec4899" },
  { name: "Morado", hex: "#8b5cf6" }
];

let selectedColors = [];

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
    field("mcu", "MCU", "text", "Ej. Nordic 54H20"),
    field("pollingRate", "Polling Rate (Hz)", "multichoice", "", [
      ["1000 Hz", "1000 Hz"],
      ["4000 Hz", "4000 Hz"],
      ["8000 Hz", "8000 Hz"]
    ]),
    field("switchType", "Switch", "text", "Ej. OMRON Optical"),
    field("battery", "Battery", "text", "Ej. 300 mAh / 80 h"),
    field("weight", "Peso (g)", "number", "Ej. 50"),
    field("sensor", "Sensor", "text", "Ej. PAW3950"),
    field("material", "Material", "text", "Ej. Aleación de magnesio"),
    field("eloShapesUrl", "Fuente técnica EloShapes", "url", "https://www.eloshapes.com/mouse/compare?p=...")
  ],
  Teclados: [
    field("switchType", "Switch", "text", "Ej. Gateron Jade Pro"),
    field("switchTechnology", "Tecnología de switch", "text", "Ej. Hall Effect / Mecánico"),
    field("layout", "Formato / Layout", "text", "Ej. 75% ANSI"),
    field("hotSwap", "Hot-swap", "boolean"),
    field("rapidTrigger", "Rapid Trigger", "boolean"),
    field("pollingRate", "Polling rate (Hz)", "multichoice", "", [
      ["1000 Hz", "1000 Hz"],
      ["4000 Hz", "4000 Hz"],
      ["8000 Hz", "8000 Hz"]
    ]),
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
  bindSpecChoiceGroups();
}

function fieldHtml(item, value) {
  const id = `spec_${item.key}`;
  const safeValue = value ?? "";

  if (item.type === "multichoice") {
    const selected = Array.isArray(safeValue)
      ? safeValue.map(String)
      : (String(safeValue || "").trim() ? String(safeValue).split(/[,/]|\s+\+\s+/).map(item => item.trim()).filter(Boolean) : []);
    return `
      <div class="spec-choice-field full-width">
        <span class="spec-choice-label">${item.label.toUpperCase()}</span>
        <div class="spec-choice-group" data-spec-key="${item.key}" data-spec-type="multichoice">
          ${item.options.map(([optionValue, optionLabel]) => {
            const active = selected.includes(String(optionValue));
            return `<button type="button" class="spec-choice ${active ? "active" : ""}"
              data-choice-value="${escapeAttr(optionValue)}" aria-pressed="${active}">
              ${escapeHtml(optionLabel)}
            </button>`;
          }).join("")}
        </div>
      </div>`;
  }

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

function bindSpecChoiceGroups() {
  categoryFields.querySelectorAll(".spec-choice").forEach(button => {
    button.addEventListener("click", () => {
      const active = button.classList.toggle("active");
      button.setAttribute("aria-pressed", String(active));
    });
  });
}

productCategory.addEventListener("change", () => {
  renderCategoryFields(productCategory.value, {});
  if (webSearchCategory) webSearchCategory.value = productCategory.value;
});


/* ---------------- CONNECTION PICKER ---------------- */

const CONNECTION_OPTIONS = [
  ["2.4 GHz Wireless", "2.4 GHz", "⌁"],
  ["Bluetooth", "Bluetooth", "ᛒ"],
  ["USB-C Wired", "USB-C", "↯"],
  ["USB-A Wired", "USB-A", "↯"],
  ["3.5 mm", "3.5 mm", "◉"],
  ["4.4 mm", "4.4 mm", "◉"],
  ["Optical", "Optical", "◇"],
  ["Coaxial", "Coaxial", "◎"],
  ["XLR", "XLR", "◫"],
  ["Cable", "Cable", "—"]
];

function normalizeConnectionValue(value) {
  const raw = String(value || "").trim();
  const lower = raw.toLowerCase();
  if (!raw) return "";
  if (lower.includes("bluetooth")) return "Bluetooth";
  if (/2\.?4/.test(lower)) return "2.4 GHz Wireless";
  if (lower.includes("usb-c") || lower.includes("type-c")) return "USB-C Wired";
  if (lower.includes("usb-a") || lower.includes("type-a")) return "USB-A Wired";
  if (lower.includes("3.5")) return "3.5 mm";
  if (lower.includes("4.4")) return "4.4 mm";
  if (lower.includes("optical") || lower.includes("toslink")) return "Optical";
  if (lower.includes("coax")) return "Coaxial";
  if (lower.includes("xlr")) return "XLR";
  if (lower.includes("cable") || lower.includes("wired")) return "Cable";
  return raw;
}

function setConnections(values = []) {
  const normalized = [...new Set((Array.isArray(values) ? values : []).map(normalizeConnectionValue).filter(Boolean))];
  productConnectionsInput.value = normalized.join("\n");
  renderConnectionPicker();
}

function getConnections() {
  return lines(productConnectionsInput.value);
}

function renderConnectionPicker() {
  const selected = new Set(getConnections());
  productConnectionsPicker.innerHTML = CONNECTION_OPTIONS.map(([value, label, icon]) => `
    <button type="button" class="connection-choice ${selected.has(value) ? "active" : ""}"
      data-connection-value="${escapeAttr(value)}" aria-pressed="${selected.has(value)}">
      <span class="connection-choice-icon">${icon}</span>
      <span>${escapeHtml(label)}</span>
    </button>
  `).join("");

  productConnectionsPicker.querySelectorAll(".connection-choice").forEach(button => {
    button.addEventListener("click", () => {
      const value = button.dataset.connectionValue;
      const current = new Set(getConnections());
      if (current.has(value)) current.delete(value); else current.add(value);
      productConnectionsInput.value = [...current].join("\n");
      renderConnectionPicker();
    });
  });
}

/* ---------------- PRODUCT IMAGE PREVIEW ---------------- */

function setProductImages(values = []) {
  const images = [...new Set((Array.isArray(values) ? values : []).map(safeExternalUrl).filter(Boolean))].slice(0, 5);
  productImagesJson.value = JSON.stringify(images);
  if (!productImageUrlInput.value && images[0]) productImageUrlInput.value = images[0];
  renderMainImagePreview();
}

function getProductImages() {
  try {
    const parsed = JSON.parse(productImagesJson.value || "[]");
    return Array.isArray(parsed) ? parsed.slice(0, 5) : [];
  } catch {
    return [];
  }
}

function renderMainImagePreview() {
  const url = safeExternalUrl(productImageUrlInput?.value || "");
  if (!url) {
    productImagePreview.innerHTML = `<div class="admin-image-preview-empty">
      <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"></rect><circle cx="9" cy="10" r="2"></circle><path d="m5 18 5-5 3 3 2-2 4 4"></path></svg>
      <span>Vista previa de la imagen</span>
    </div>`;
    return;
  }
  productImagePreview.innerHTML = `<img src="${escapeAttr(url)}" alt="Vista previa del producto" onerror="this.parentElement.classList.add('image-error')">`;
}

productImageUrlInput?.addEventListener("input", renderMainImagePreview);

/* ---------------- VISUAL PRODUCT EDITORS ---------------- */

function renderColorPicker(colors = selectedColors) {
  selectedColors = normalizeColors(colors);

  const presets = PRESET_COLORS.map(color => {
    const active = selectedColors.some(item => item.hex.toLowerCase() === color.hex.toLowerCase());
    return `
      <button type="button" class="admin-color-option ${active ? "active" : ""}"
              data-color-name="${escapeAttr(color.name)}"
              data-color-hex="${escapeAttr(color.hex)}"
              aria-pressed="${active}" title="${escapeAttr(color.name)}">
        <span class="admin-color-circle" style="background:${escapeAttr(color.hex)}"></span>
        <span>${escapeHtml(color.name)}</span>
      </button>`;
  }).join("");

  const custom = selectedColors
    .filter(item => !PRESET_COLORS.some(preset => preset.hex.toLowerCase() === item.hex.toLowerCase()))
    .map(color => `
      <button type="button" class="admin-color-option active custom-color-option"
              data-color-name="${escapeAttr(color.name)}"
              data-color-hex="${escapeAttr(color.hex)}"
              aria-pressed="true" title="Quitar ${escapeAttr(color.name)}">
        <span class="admin-color-circle" style="background:${escapeAttr(color.hex)}"></span>
        <span>${escapeHtml(color.name)}</span>
      </button>`).join("");

  productColorPicker.innerHTML = `
    ${presets}
    ${custom}
    <button type="button" class="admin-color-option add-color-option" id="addCustomColor" title="Añadir otro color">
      <span class="admin-color-circle add-color-circle">+</span>
      <span>Otro</span>
    </button>`;

  productColorPicker.querySelectorAll("[data-color-hex]").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.colorName;
      const hex = button.dataset.colorHex;
      const exists = selectedColors.some(item => item.hex.toLowerCase() === hex.toLowerCase());

      selectedColors = exists
        ? selectedColors.filter(item => item.hex.toLowerCase() !== hex.toLowerCase())
        : [...selectedColors, { name, hex }];

      renderColorPicker(selectedColors);
    });
  });

  document.getElementById("addCustomColor")?.addEventListener("click", () => {
    customColorInput.click();
  });
}

customColorInput.addEventListener("change", () => {
  const hex = customColorInput.value.toLowerCase();
  if (!selectedColors.some(item => item.hex.toLowerCase() === hex)) {
    selectedColors.push({ name: "Personalizado", hex });
  }
  renderColorPicker(selectedColors);
});

function normalizeColors(colors) {
  if (!Array.isArray(colors)) return [];
  const seen = new Set();
  return colors
    .map(item => {
      const hex = String(item?.hex || "").trim();
      if (!/^#[0-9a-f]{6}$/i.test(hex)) return null;
      const preset = PRESET_COLORS.find(p => p.hex.toLowerCase() === hex.toLowerCase());
      return {
        name: String(item?.name || preset?.name || "Personalizado").trim(),
        hex: hex.toLowerCase()
      };
    })
    .filter(Boolean)
    .filter(item => {
      if (seen.has(item.hex)) return false;
      seen.add(item.hex);
      return true;
    });
}

function renderTrustedStores(stores = []) {
  const list = Array.isArray(stores) ? stores : [];

  const amazon = list.find(item => normalizeStoreName(item?.name) === "amazon");
  const aliexpress = list.find(item => normalizeStoreName(item?.name) === "aliexpress");

  storeAmazon.value = amazon?.url || "";
  storeAliExpress.value = aliexpress?.url || "";

  const extras = list.filter(item => {
    const name = normalizeStoreName(item?.name);
    return name !== "amazon" && name !== "aliexpress";
  });

  extraStores.innerHTML = "";
  extras.forEach(store => addExtraStoreRow(store));
}

function normalizeStoreName(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace("ali-express", "aliexpress");
}

function addExtraStoreRow(store = {}) {
  const row = document.createElement("div");
  row.className = "store-row store-row-extra";
  row.innerHTML = `
    <input class="store-name-input" type="text" placeholder="Nombre de la tienda"
           value="${escapeAttr(store.name || "")}" aria-label="Nombre de la tienda" />
    <input class="store-url-input" type="url" placeholder="https://..."
           value="${escapeAttr(store.url || "")}" aria-label="Link de la tienda" />
    <button class="remove-store-btn" type="button" title="Eliminar tienda" aria-label="Eliminar tienda">×</button>
  `;
  row.querySelector(".remove-store-btn").addEventListener("click", () => row.remove());
  extraStores.appendChild(row);
}

addStoreButton.addEventListener("click", () => {
  addExtraStoreRow();
  const rows = extraStores.querySelectorAll(".store-row-extra");
  rows[rows.length - 1]?.querySelector(".store-name-input")?.focus();
});

function collectTrustedStores() {
  const stores = [];

  if (storeAmazon.value.trim()) {
    stores.push({ name: "Amazon", url: storeAmazon.value.trim() });
  }

  if (storeAliExpress.value.trim()) {
    stores.push({ name: "AliExpress", url: storeAliExpress.value.trim() });
  }

  extraStores.querySelectorAll(".store-row-extra").forEach(row => {
    const name = row.querySelector(".store-name-input").value.trim();
    const url = row.querySelector(".store-url-input").value.trim();
    if (name && url) stores.push({ name, url });
  });

  return stores;
}

renderColorPicker([]);
renderTrustedStores([]);


/* ---------------- UNIVERSAL URL AUTO-IMPORT ---------------- */

universalImportButton.addEventListener("click", importFromUniversalUrl);

universalProductUrl.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    event.preventDefault();
    importFromUniversalUrl();
  }
});

async function importFromUniversalUrl() {
  const url = universalProductUrl.value.trim();

  if (!url) {
    showUniversalImportStatus("Pega primero la URL del producto.", "error");
    universalProductUrl.focus();
    return;
  }

  const oldText = universalImportButton.textContent;
  universalImportButton.disabled = true;
  universalImportButton.textContent = "EXTRAYENDO FICHA...";
  universalSourceLink.hidden = true;
  universalSourceLink.innerHTML = "";
  showUniversalImportStatus("Leyendo la página y detectando la fuente...", "loading");

  try {
    const result = await api("/admin/import/url", {
      method: "POST",
      body: JSON.stringify({ url })
    });

    applyUniversalImportedProduct(result.product || {}, result.source || "");

    const detected = Array.isArray(result.detected) ? result.detected : [];
    const warnings = Array.isArray(result.warnings) ? result.warnings : [];

    const detectedText = detected.length
      ? `<strong>Encontrado:</strong> ${detected.map(escapeHtml).join(", ")}.`
      : "La página respondió, pero pocos campos pudieron reconocerse automáticamente.";

    const warningsHtml = warnings.length
      ? `<ul>${warnings.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
      : "";

    showUniversalImportStatus(
      `✓ Ficha extraída desde ${escapeHtml(result.source || "la URL")}. ${detectedText}${warningsHtml}`,
      "success",
      true
    );

    const sourceUrl = safeExternalUrl(result.sourceUrl || url);
    if (sourceUrl) {
      universalSourceLink.hidden = false;
      universalSourceLink.innerHTML = `
        <a href="${escapeAttr(sourceUrl)}" target="_blank" rel="noopener noreferrer">
          Ver página utilizada como fuente ↗
        </a>`;
    }

    productForm.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    const messages = {
      product_url_required: "Pega la URL del producto.",
      invalid_product_url: "La URL no es válida.",
      private_url_not_allowed: "Esa dirección no se puede usar.",
      invalid_eloshapes_product_url: "Pega una ficha individual de mouse de EloShapes.",
      eloshapes_not_found: "No pude reconocer la ficha de EloShapes.",
      mechkeys_product_url_required: "Pega el enlace individual del producto de MechKeys.",
      mechkeys_fetch_failed: "No pude leer MechKeys en este momento.",
      tavily_not_configured: "Falta TAVILY_API_KEY en Cloudflare.",
      url_extract_failed: "No pude leer esa página. Prueba con otra URL del mismo producto.",
      url_product_not_found: "La página no tiene suficiente información para generar una ficha."
    };

    showUniversalImportStatus(
      messages[error.code] || `No se pudo extraer la ficha: ${error.message}`,
      "error"
    );
  } finally {
    universalImportButton.disabled = false;
    universalImportButton.textContent = oldText;
  }
}

function applyUniversalImportedProduct(product, sourceName = "") {
  document.getElementById("productId").value = "";
  document.getElementById("productStatus").value = "draft";
  productFormTitle.textContent = `Nuevo producto · importado desde ${sourceName || "URL"}`;

  const allowedCategories = ["Mouse", "Teclados", "IEM", "Headsets", "DAC"];
  if (allowedCategories.includes(product.category)) {
    productCategory.value = product.category;
    if (webSearchCategory) webSearchCategory.value = product.category;
  }

  document.getElementById("productBrand").value = product.brand || "";
  document.getElementById("productName").value = product.name || product.model || "";
  document.getElementById("productModel").value = product.model || "";
  document.getElementById("productScore").value =
    Number.isFinite(Number(product.score)) ? Number(product.score) : 0;
  document.getElementById("productPrice").value = product.price || "";
  document.getElementById("productDate").value = "";
  document.getElementById("productImageUrl").value = product.imageUrl || "";
  renderMainImagePreview();
  document.getElementById("productOfficialUrl").value = product.officialUrl || "";
  document.getElementById("productFeatured").value = "false";

  setConnections(Array.isArray(product.connections) ? product.connections : []);
  setProductImages(
    Array.isArray(product.images) && product.images.length
      ? product.images
      : (product.imageUrl ? [product.imageUrl] : [])
  );

  document.getElementById("productYoutube").value = product.reviewLinks?.youtube || "";
  document.getElementById("productTiktok").value = product.reviewLinks?.tiktok || "";
  document.getElementById("productSummary").value = product.summary || "";
  document.getElementById("productPros").value =
    Array.isArray(product.pros) ? product.pros.join("\n") : "";
  document.getElementById("productCons").value =
    Array.isArray(product.cons) ? product.cons.join("\n") : "";

  renderTrustedStores(Array.isArray(product.trustedStores) ? product.trustedStores : []);
  renderColorPicker(Array.isArray(product.colors) ? product.colors : []);
  renderCategoryFields(productCategory.value, product.specs || {});

  if (product.category === "Mouse") {
    if (eloshapesBrand) eloshapesBrand.value = product.brand || "";
    if (eloshapesModel) eloshapesModel.value = product.model || product.name || "";
  }
}

function showUniversalImportStatus(message, type = "", allowHtml = false) {
  universalImportStatus.hidden = false;
  universalImportStatus.className = `url-import-status ${type}`.trim();

  if (allowHtml) universalImportStatus.innerHTML = message;
  else universalImportStatus.textContent = message;
}


/* ---------------- INTERNET AUTO-IMPORT ---------------- */

webSearchButton.addEventListener("click", importFromWeb);

[webSearchBrand, webSearchModel].forEach(input => {
  input.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      importFromWeb();
    }
  });
});

webSearchCategory.addEventListener("change", () => {
  productCategory.value = webSearchCategory.value;
  renderCategoryFields(productCategory.value, {});
});

async function importFromWeb() {
  const brand = webSearchBrand.value.trim();
  const model = webSearchModel.value.trim();
  const category = webSearchCategory.value;

  if (!brand) {
    showWebSearchStatus("Escribe primero la marca del producto.", "error");
    webSearchBrand.focus();
    return;
  }

  if (!model) {
    showWebSearchStatus("Escribe primero el modelo del producto.", "error");
    webSearchModel.focus();
    return;
  }

  const oldText = webSearchButton.textContent;
  webSearchButton.disabled = true;
  webSearchButton.textContent = "BUSCANDO EN INTERNET...";
  webSourceList.hidden = true;
  webSourceList.innerHTML = "";
  showWebSearchStatus("Buscando página oficial, documentación y tiendas especializadas...", "loading");

  try {
    const result = await api("/admin/import/web", {
      method: "POST",
      body: JSON.stringify({ brand, model, category })
    });

    applyImportedWebProduct(result.product || {});

    const detected = Array.isArray(result.detected) ? result.detected : [];
    const warnings = Array.isArray(result.warnings) ? result.warnings : [];
    const sources = Array.isArray(result.sources) ? result.sources : [];

    const detectedText = detected.length
      ? `<strong>Encontrado:</strong> ${detected.map(escapeHtml).join(", ")}.`
      : "Encontré páginas del producto, pero pocos campos pudieron reconocerse automáticamente.";

    const warningHtml = warnings.length
      ? `<ul>${warnings.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
      : "";

    showWebSearchStatus(`✓ Búsqueda terminada. ${detectedText}${warningHtml}`, "success", true);
    renderWebSources(sources);
    productForm.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    const messages = {
      tavily_not_configured: "TAVILY_API_KEY todavía no está configurada en Cloudflare.",
      tavily_search_failed: "Tavily no pudo completar la búsqueda. Intenta nuevamente.",
      web_product_not_found: "No encontré suficientes resultados para ese producto.",
      brand_required: "Escribe la marca del producto.",
      model_required: "Escribe el modelo del producto.",
      invalid_category: "Selecciona una categoría válida."
    };

    showWebSearchStatus(messages[error.code] || `No se pudo buscar: ${error.message}`, "error");
  } finally {
    webSearchButton.disabled = false;
    webSearchButton.textContent = oldText;
  }
}

function applyImportedWebProduct(product) {
  document.getElementById("productId").value = "";
  productFormTitle.textContent = "Nuevo producto · encontrado en Internet";
  document.getElementById("productStatus").value = "draft";

  const allowedCategories = ["Mouse", "Teclados", "IEM", "Headsets", "DAC"];
  if (allowedCategories.includes(product.category)) {
    productCategory.value = product.category;
    webSearchCategory.value = product.category;
  }

  document.getElementById("productBrand").value = product.brand || "";
  document.getElementById("productName").value = product.name || "";
  document.getElementById("productModel").value = product.model || "";
  if (product.category === "Mouse") {
    eloshapesBrand.value = product.brand || "";
    eloshapesModel.value = product.model || product.name || "";
  }
  document.getElementById("productScore").value =
    Number.isFinite(Number(product.score)) ? Number(product.score) : 0;
  document.getElementById("productPrice").value = product.price || "";
  document.getElementById("productDate").value = "";
  document.getElementById("productImageUrl").value = product.imageUrl || "";
  renderMainImagePreview();
  document.getElementById("productOfficialUrl").value = product.officialUrl || "";
  document.getElementById("productFeatured").value = "false";
  setConnections(Array.isArray(product.connections) ? product.connections : []);
  setProductImages(Array.isArray(product.images) && product.images.length ? product.images : (product.imageUrl ? [product.imageUrl] : []));
  document.getElementById("productYoutube").value = product.reviewLinks?.youtube || "";
  document.getElementById("productTiktok").value = product.reviewLinks?.tiktok || "";
  document.getElementById("productSummary").value = product.summary || "";
  document.getElementById("productPros").value =
    Array.isArray(product.pros) ? product.pros.join("\n") : "";
  document.getElementById("productCons").value =
    Array.isArray(product.cons) ? product.cons.join("\n") : "";

  renderTrustedStores(Array.isArray(product.trustedStores) ? product.trustedStores : []);
  renderColorPicker(Array.isArray(product.colors) ? product.colors : []);
  renderCategoryFields(productCategory.value, product.specs || {});
}

function showWebSearchStatus(message, type = "", allowHtml = false) {
  webSearchStatus.hidden = false;
  webSearchStatus.className = `web-import-status ${type}`.trim();

  if (allowHtml) webSearchStatus.innerHTML = message;
  else webSearchStatus.textContent = message;
}

function renderWebSources(sources) {
  if (!Array.isArray(sources) || !sources.length) {
    webSourceList.hidden = true;
    webSourceList.innerHTML = "";
    return;
  }

  webSourceList.hidden = false;
  webSourceList.innerHTML = `
    <span>FUENTES CONSULTADAS</span>
    <div class="web-source-chips">
      ${sources.slice(0, 6).map(source => {
        const url = safeExternalUrl(source.url);
        if (!url) return "";
        return `
          <a href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer"
             class="${source.official ? "official" : ""}">
            ${source.official ? "✓ " : ""}${escapeHtml(source.title || new URL(url).hostname)}
          </a>`;
      }).join("")}
    </div>
  `;
}


/* ---------------- ELOSHAPES MOUSE IMPORT ---------------- */

eloshapesImportButton.addEventListener("click", importFromEloShapes);

[eloshapesBrand, eloshapesModel].forEach(input => {
  input.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      importFromEloShapes();
    }
  });
});

async function importFromEloShapes() {
  const brand = eloshapesBrand.value.trim() || document.getElementById("productBrand").value.trim();
  const model = eloshapesModel.value.trim() || document.getElementById("productModel").value.trim();

  if (!brand) {
    showEloShapesStatus("Escribe la marca del mouse.", "error");
    eloshapesBrand.focus();
    return;
  }

  if (!model) {
    showEloShapesStatus("Escribe el modelo del mouse.", "error");
    eloshapesModel.focus();
    return;
  }

  eloshapesBrand.value = brand;
  eloshapesModel.value = model;

  const oldText = eloshapesImportButton.textContent;
  eloshapesImportButton.disabled = true;
  eloshapesImportButton.textContent = "CONSULTANDO ELOSHAPES...";
  eloshapesSourceLink.hidden = true;
  eloshapesSourceLink.innerHTML = "";
  showEloShapesStatus("Buscando la ficha técnica exacta del mouse...", "loading");

  try {
    const result = await api("/admin/import/eloshapes", {
      method: "POST",
      body: JSON.stringify({ brand, model })
    });

    applyImportedEloShapesProduct(result.product || {});

    const detected = Array.isArray(result.detected) ? result.detected : [];
    const warnings = Array.isArray(result.warnings) ? result.warnings : [];
    const detectedText = detected.length
      ? `<strong>Datos encontrados:</strong> ${detected.map(escapeHtml).join(", ")}.`
      : "La ficha fue encontrada, pero no pude reconocer muchos campos.";

    const warningsHtml = warnings.length
      ? `<ul>${warnings.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
      : "";

    showEloShapesStatus(`✓ EloShapes completó la ficha. ${detectedText}${warningsHtml}`, "success", true);

    const sourceUrl = safeExternalUrl(result.sourceUrl);
    if (sourceUrl) {
      eloshapesSourceLink.hidden = false;
      eloshapesSourceLink.innerHTML = `
        <a href="${escapeAttr(sourceUrl)}" target="_blank" rel="noopener noreferrer">
          Ver ficha original en EloShapes ↗
        </a>`;
    }

    productForm.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    const messages = {
      tavily_not_configured: "Falta TAVILY_API_KEY en Cloudflare.",
      eloshapes_not_found: "No encontré una ficha exacta de ese mouse en EloShapes.",
      eloshapes_search_failed: "No pude consultar EloShapes en este momento.",
      brand_required: "Escribe la marca del mouse.",
      model_required: "Escribe el modelo del mouse."
    };

    showEloShapesStatus(messages[error.code] || `No se pudo consultar EloShapes: ${error.message}`, "error");
  } finally {
    eloshapesImportButton.disabled = false;
    eloshapesImportButton.textContent = oldText;
  }
}

function applyImportedEloShapesProduct(product) {
  const previousMouseSpecs = productCategory.value === "Mouse"
    ? collectCategorySpecs()
    : {};

  productCategory.value = "Mouse";
  if (webSearchCategory) webSearchCategory.value = "Mouse";

  document.getElementById("productBrand").value = product.brand || document.getElementById("productBrand").value;
  document.getElementById("productName").value = product.name || document.getElementById("productName").value || product.model || "";
  document.getElementById("productModel").value = product.model || document.getElementById("productModel").value;

  const currentConnections = getConnections();
  const importedConnections = Array.isArray(product.connections) ? product.connections : [];
  setConnections([...new Set([...currentConnections, ...importedConnections])]);

  const mergedSpecs = {
    ...previousMouseSpecs,
    ...(product.specs || {})
  };
  renderCategoryFields("Mouse", mergedSpecs);

  const summaryInput = document.getElementById("productSummary");
  if (!summaryInput.value.trim() && product.summary) {
    summaryInput.value = product.summary;
  }

  if (!document.getElementById("productId").value) {
    document.getElementById("productStatus").value = "draft";
    productFormTitle.textContent = "Nuevo producto · ficha técnica de EloShapes";
  }
}

function showEloShapesStatus(message, type = "", allowHtml = false) {
  eloshapesImportStatus.hidden = false;
  eloshapesImportStatus.className = `eloshapes-import-status ${type}`.trim();
  if (allowHtml) eloshapesImportStatus.innerHTML = message;
  else eloshapesImportStatus.textContent = message;
}


/* ---------------- MECHKEYS AUTO-IMPORT ---------------- */

mechkeysImportButton.addEventListener("click", importFromMechKeys);
mechkeysProductUrl.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    event.preventDefault();
    importFromMechKeys();
  }
});

async function importFromMechKeys() {
  const url = mechkeysProductUrl.value.trim();
  if (!url) {
    showMechKeysStatus("Pega primero el enlace individual del producto.", "error");
    mechkeysProductUrl.focus();
    return;
  }

  const oldText = mechkeysImportButton.textContent;
  mechkeysImportButton.disabled = true;
  mechkeysImportButton.textContent = "EXTRAYENDO...";
  showMechKeysStatus("Conectando con MechKeys y leyendo la ficha técnica...", "loading");

  try {
    const result = await api("/admin/import/mechkeys", {
      method: "POST",
      body: JSON.stringify({ url })
    });

    applyImportedMechKeysProduct(result.product || {});

    const detected = Array.isArray(result.detected) ? result.detected : [];
    const warnings = Array.isArray(result.warnings) ? result.warnings : [];
    const detectedText = detected.length
      ? `<strong>Encontrado:</strong> ${detected.map(escapeHtml).join(", ")}.`
      : "La página respondió, pero no pude reconocer campos automáticamente.";
    const warningHtml = warnings.length
      ? `<ul>${warnings.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
      : "";

    showMechKeysStatus(`✓ Ficha extraída. ${detectedText}${warningHtml}`, "success", true);
    productForm.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    const messages = {
      mechkeys_url_required: "Pega un enlace de producto de MechKeys.",
      invalid_mechkeys_url: "El enlace debe pertenecer a https://mechkeys.com/.",
      mechkeys_product_url_required: "Pega el enlace individual del producto, por ejemplo https://mechkeys.com/products/zaopin-z2. No uses el enlace de una colección.",
      mechkeys_fetch_failed: "No pude leer MechKeys en este momento. Prueba nuevamente en unos segundos."
    };
    showMechKeysStatus(messages[error.code] || `No se pudo importar: ${error.message}`, "error");
  } finally {
    mechkeysImportButton.disabled = false;
    mechkeysImportButton.textContent = oldText;
  }
}

function applyImportedMechKeysProduct(product) {
  // Nunca sobrescribimos un producto ya guardado; la importación prepara una ficha nueva.
  document.getElementById("productId").value = "";
  productFormTitle.textContent = "Nuevo producto · importado de MechKeys";
  document.getElementById("productStatus").value = "draft";

  const allowedCategories = ["Mouse", "Teclados", "IEM", "Headsets", "DAC"];
  if (allowedCategories.includes(product.category)) {
    productCategory.value = product.category;
  }

  document.getElementById("productBrand").value = product.brand || "";
  document.getElementById("productName").value = product.name || "";
  document.getElementById("productModel").value = product.model || "";
  if (product.category === "Mouse") {
    eloshapesBrand.value = product.brand || "";
    eloshapesModel.value = product.model || product.name || "";
  }
  document.getElementById("productScore").value = Number.isFinite(Number(product.score)) ? Number(product.score) : 0;
  document.getElementById("productPrice").value = product.price || "";
  document.getElementById("productDate").value = "";
  document.getElementById("productImageUrl").value = product.imageUrl || "";
  renderMainImagePreview();
  document.getElementById("productOfficialUrl").value = product.officialUrl || "";
  document.getElementById("productFeatured").value = "false";
  setConnections(Array.isArray(product.connections) ? product.connections : []);
  setProductImages(Array.isArray(product.images) && product.images.length ? product.images : (product.imageUrl ? [product.imageUrl] : []));
  document.getElementById("productYoutube").value = product.reviewLinks?.youtube || "";
  document.getElementById("productTiktok").value = product.reviewLinks?.tiktok || "";
  document.getElementById("productSummary").value = product.summary || "";
  document.getElementById("productPros").value = Array.isArray(product.pros) ? product.pros.join("\n") : "";
  document.getElementById("productCons").value = Array.isArray(product.cons) ? product.cons.join("\n") : "";

  renderTrustedStores(Array.isArray(product.trustedStores) ? product.trustedStores : []);
  renderColorPicker(Array.isArray(product.colors) ? product.colors : []);
  renderCategoryFields(productCategory.value, product.specs || {});
}

function showMechKeysStatus(message, type = "", allowHtml = false) {
  mechkeysImportStatus.hidden = false;
  mechkeysImportStatus.className = `mechkeys-import-status ${type}`.trim();
  if (allowHtml) mechkeysImportStatus.innerHTML = message;
  else mechkeysImportStatus.textContent = message;
}

/* ---------------- ADMIN SESSION ---------------- */

async function restoreAdminSession() {
  if (!adminToken) {
    document.body.classList.remove("admin-authenticated");
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
    document.body.classList.add("admin-authenticated");
    renderCategoryFields(productCategory.value, {});
    await Promise.all([loadProducts(), loadKeys()]);
  } catch {
    localStorage.removeItem("madetech_admin_token");
    adminToken = "";
    document.body.classList.remove("admin-authenticated");
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
    document.body.classList.add("admin-authenticated");

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
  document.body.classList.remove("admin-authenticated");
  adminApp.hidden = true;
  adminLogin.hidden = false;
});

/* ---------------- PANELS ---------------- */

function activateAdminPanel(panelId) {
  const titles = {
    productsPanel: "Agregar producto",
    libraryPanel: "Biblioteca",
    keysPanel: "Access Keys"
  };
  document.querySelectorAll(".admin-nav button").forEach(item => item.classList.toggle("active", item.dataset.panel === panelId));
  document.querySelectorAll(".admin-panel").forEach(panel => panel.classList.toggle("active", panel.id === panelId));
  document.getElementById("adminTitle").textContent = titles[panelId] || "MadeTech Control";
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

document.querySelectorAll(".admin-nav button").forEach(button => {
  button.addEventListener("click", () => activateAdminPanel(button.dataset.panel));
});

/* ---------------- PRODUCTS ---------------- */

async function loadProducts() {
  const data = await api("/products");
  products = Array.isArray(data.products) ? data.products : [];

  if (libraryNavCount) libraryNavCount.textContent = String(products.length);
  renderLibraryProducts();
}

function renderLibraryProducts() {
  const category = libraryCategoryFilter?.value || "Todos";
  const visibleProducts = category === "Todos"
    ? products
    : products.filter(product => product.category === category);

  productCount.textContent = String(visibleProducts.length);

  productsList.innerHTML = visibleProducts.length
    ? visibleProducts.map(product => {
        const image = safeExternalUrl(product.imageUrl) ||
          safeExternalUrl(Array.isArray(product.images) ? product.images[0] : "");

        return `
          <article class="admin-list-item admin-product-library-item">
            <div class="admin-product-thumb">
              ${
                image
                  ? `<img src="${escapeAttr(image)}" alt="${escapeAttr(product.name || "Producto")}" loading="lazy">`
                  : `<div class="admin-product-thumb-empty" aria-label="Sin imagen">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                        <circle cx="9" cy="10" r="2"></circle>
                        <path d="m5 18 5-5 3 3 2-2 4 4"></path>
                      </svg>
                    </div>`
              }
            </div>

            <div class="admin-library-product-copy">
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
          </article>`;
      }).join("")
    : `<div class="library-empty-state">
        <strong>No hay productos en esta categoría.</strong>
        <span>Cambia el filtro o agrega un producto nuevo.</span>
      </div>`;

  bindProductActions();
}

libraryCategoryFilter?.addEventListener("change", renderLibraryProducts);

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
  activateAdminPanel("productsPanel");

  document.getElementById("productId").value = product.id;
  document.getElementById("productCategory").value = product.category || "Mouse";
  document.getElementById("productStatus").value = product.status || "published";
  document.getElementById("productBrand").value = product.brand || "";
  document.getElementById("productName").value = product.name || "";
  document.getElementById("productModel").value = product.model || "";
  if (product.category === "Mouse") {
    eloshapesBrand.value = product.brand || "";
    eloshapesModel.value = product.model || product.name || "";
  } else {
    eloshapesBrand.value = "";
    eloshapesModel.value = "";
  }
  document.getElementById("productScore").value = product.score ?? "";
  document.getElementById("productPrice").value = product.price || "";
  document.getElementById("productDate").value = product.date || "";
  document.getElementById("productImageUrl").value = product.imageUrl || "";
  renderMainImagePreview();
  document.getElementById("productOfficialUrl").value = product.officialUrl || "";
  document.getElementById("productFeatured").value = product.featured === true ? "true" : "false";
  renderTrustedStores(product.trustedStores || []);
  renderColorPicker(product.colors || []);
  setConnections(product.connections || []);
  setProductImages(Array.isArray(product.images) && product.images.length ? product.images : (product.imageUrl ? [product.imageUrl] : []));
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
  renderTrustedStores([]);
  renderColorPicker([]);
  setConnections([]);
  setProductImages([]);
  renderCategoryFields("Mouse", {});
  eloshapesBrand.value = "";
  eloshapesModel.value = "";
  eloshapesImportStatus.hidden = true;
  eloshapesSourceLink.hidden = true;
  renderMainImagePreview();
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
    trustedStores: collectTrustedStores(),
    colors: selectedColors.map(item => ({ name: item.name, hex: item.hex })),
    connections: getConnections(),
    images: getProductImages(),
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

  const wasEditing = Boolean(id);

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
    showAdminToast(wasEditing ? "El producto ha sido actualizado correctamente" : "Este producto ha sido agregado correctamente");
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
    let value;

    if (type === "multichoice") {
      value = [...input.querySelectorAll(".spec-choice.active")]
        .map(button => button.dataset.choiceValue)
        .filter(Boolean);
      if (!value.length) return;
    } else {
      value = input.value;

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
    }

    result[key] = value;
  });

  return result;
}

async function removeProduct(id) {
  const product = products.find(item => Number(item.id) === id);
  const name = product ? `${product.brand || ""} ${product.name || ""}`.trim() : "este producto";

  const firstConfirm = confirm(
    `¿Quieres eliminar "${name}"?\n\nEsta acción borrará el producto de MadeTech.`
  );
  if (!firstConfirm) return;

  const secondConfirm = confirm(
    `ÚLTIMA CONFIRMACIÓN\n\nEstás a punto de eliminar definitivamente "${name}".\n\n¿Deseas continuar?`
  );
  if (!secondConfirm) return;

  try {
    await api(`/products/${id}`, { method: "DELETE" });
    await loadProducts();
    showAdminToast("El producto ha sido eliminado correctamente");
  } catch {
    alert("No se pudo eliminar el producto.");
  }
}

function showAdminToast(message) {
  if (!adminToast || !adminToastText) return;
  adminToastText.textContent = message;
  adminToast.hidden = false;
  adminToast.classList.remove("show");
  requestAnimationFrame(() => adminToast.classList.add("show"));
  clearTimeout(showAdminToast.timer);
  showAdminToast.timer = setTimeout(() => {
    adminToast.classList.remove("show");
    setTimeout(() => { adminToast.hidden = true; }, 220);
  }, 3600);
}

/* ---------------- KEYS ---------------- */

keyGeneratorForm.addEventListener("submit", async event => {
  event.preventDefault();

  const label = document.getElementById("keyLabel").value.trim();
  const expiryInput = document.getElementById("keyExpiry").value;

  if (!label || !expiryInput) {
    alert("Escribe el nombre del dueño y la fecha/hora de expiración.");
    return;
  }

  const expiresAt = localDateTimeToIso(expiryInput);

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
    const messages = {
      expiration_required: "Debes elegir una fecha y hora de expiración.",
      expiration_must_be_future: "La fecha de expiración debe ser futura.",
      key_encryption_not_configured: "Falta configurar KEY_ENCRYPTION_SECRET en Cloudflare."
    };
    alert(messages[error.code] || `No se pudo generar la key: ${error.code || error.message}`);
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
      const canReveal = Number(key.can_reveal) === 1;
      const expiryText = key.expires_at
        ? formatKeyExpiry(key.expires_at)
        : "SIN EXPIRACIÓN CONFIGURADA";

      return `
        <article class="admin-list-item key-admin-card" data-key-card="${key.id}">
          <div class="key-admin-main">
            <div class="key-admin-title-row">
              <div>
                <span class="key-owner-caption">DUEÑO DE LA KEY</span>
                <h3>${escapeHtml(key.label || "Sin nombre")}</h3>
              </div>
              <span class="${active ? "status-active" : "status-revoked"}">
                ${active ? "ACTIVA" : "REVOCADA"}
              </span>
            </div>

            <div class="key-secret-row">
              <code id="keyRevealValue_${key.id}">${canReveal ? "MT-•••••-•••••-•••••-•••••" : "NO RECUPERABLE"}</code>
              ${canReveal ? `<button type="button" data-reveal-key="${key.id}">VER KEY</button>` : ""}
              ${canReveal ? `<button type="button" data-copy-key="${key.id}" hidden>COPIAR</button>` : ""}
              ${!canReveal && active ? `<button type="button" data-regenerate-key="${key.id}">REGENERAR KEY</button>` : ""}
            </div>

            <p class="key-meta-line">
              ${Number(key.uses || 0)} usos · ${escapeHtml(expiryText)}
              ${key.last_used_at ? ` · último acceso ${escapeHtml(key.last_used_at)}` : ""}
            </p>

            <div class="key-edit-grid">
              <label>
                NOMBRE DEL DUEÑO
                <input data-key-owner="${key.id}" type="text" value="${escapeAttr(key.label || "")}" />
              </label>
              <label>
                FECHA Y HORA DE EXPIRACIÓN
                <input data-key-expiry="${key.id}" type="datetime-local" value="${escapeAttr(isoToLocalDateTime(key.expires_at))}" />
              </label>
              <button class="key-save-btn" type="button" data-save-key="${key.id}">GUARDAR DATOS</button>
            </div>
          </div>

          <div class="item-actions key-admin-actions">
            ${active ? `<button class="danger" data-revoke-key="${key.id}">REVOCAR</button>` : ""}
          </div>
        </article>`;
    }).join("")
    : `<p style="color:#777">Todavía no has generado ninguna key.</p>`;

  bindKeyActions();
}

function bindKeyActions() {
  document.querySelectorAll("[data-reveal-key]").forEach(button => {
    button.addEventListener("click", () => revealAccessKey(Number(button.dataset.revealKey), button));
  });

  document.querySelectorAll("[data-copy-key]").forEach(button => {
    button.addEventListener("click", () => copyRevealedKey(Number(button.dataset.copyKey), button));
  });

  document.querySelectorAll("[data-save-key]").forEach(button => {
    button.addEventListener("click", () => saveKeyData(Number(button.dataset.saveKey), button));
  });

  document.querySelectorAll("[data-regenerate-key]").forEach(button => {
    button.addEventListener("click", () => regenerateAccessKey(Number(button.dataset.regenerateKey)));
  });

  document.querySelectorAll("[data-revoke-key]").forEach(button => {
    button.addEventListener("click", () => revokeAccessKey(Number(button.dataset.revokeKey)));
  });
}

async function revealAccessKey(id, button) {
  const output = document.getElementById(`keyRevealValue_${id}`);
  const copyButton = document.querySelector(`[data-copy-key="${id}"]`);

  if (button.dataset.visible === "true") {
    output.textContent = "MT-•••••-•••••-•••••-•••••";
    button.textContent = "VER KEY";
    button.dataset.visible = "false";
    if (copyButton) copyButton.hidden = true;
    return;
  }

  try {
    button.disabled = true;
    button.textContent = "CARGANDO...";
    const result = await api(`/admin/keys/${id}/reveal`, { method: "GET" });
    output.textContent = result.key;
    button.textContent = "OCULTAR";
    button.dataset.visible = "true";
    if (copyButton) copyButton.hidden = false;
  } catch (error) {
    if (error.code === "key_not_recoverable") {
      alert("Esta key fue creada antes de la V5.5 y solo se guardó su hash. No se puede recuperar. Pulsa REGENERAR KEY para sustituirla por una nueva visible para el administrador.");
    } else {
      alert(`No se pudo mostrar la key: ${error.code || error.message}`);
    }
    button.textContent = "VER KEY";
  } finally {
    button.disabled = false;
  }
}

async function copyRevealedKey(id, button) {
  const output = document.getElementById(`keyRevealValue_${id}`);
  const value = output?.textContent?.trim() || "";
  if (!value || value.includes("•") || value === "NO RECUPERABLE") return;

  await navigator.clipboard.writeText(value);
  const oldText = button.textContent;
  button.textContent = "COPIADA ✓";
  setTimeout(() => button.textContent = oldText, 1300);
}

async function saveKeyData(id, button) {
  const ownerInput = document.querySelector(`[data-key-owner="${id}"]`);
  const expiryInput = document.querySelector(`[data-key-expiry="${id}"]`);

  const label = ownerInput?.value.trim() || "";
  const localExpiry = expiryInput?.value || "";

  if (!label) {
    alert("Escribe el nombre del dueño de la key.");
    return;
  }

  if (!localExpiry) {
    alert("Elige la fecha y hora en que debe expirar la key.");
    return;
  }

  try {
    button.disabled = true;
    button.textContent = "GUARDANDO...";
    await api(`/admin/keys/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        label,
        expiresAt: localDateTimeToIso(localExpiry)
      })
    });
    await loadKeys();
  } catch (error) {
    alert(`No se pudieron guardar los datos: ${error.code || error.message}`);
  } finally {
    button.disabled = false;
  }
}

async function regenerateAccessKey(id) {
  if (!confirm("Se generará una key nueva. La key anterior dejará de funcionar y se cerrarán sus sesiones actuales. ¿Continuar?")) return;

  try {
    const result = await api(`/admin/keys/${id}/regenerate`, { method: "POST" });
    generatedKeyValue.textContent = result.key;
    generatedKeyBox.hidden = false;
    generatedKeyBox.scrollIntoView({ behavior: "smooth", block: "center" });
    await loadKeys();
  } catch (error) {
    alert(`No se pudo regenerar la key: ${error.code || error.message}`);
  }
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

function localDateTimeToIso(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString();
}

function isoToLocalDateTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const pad = number => String(number).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function formatKeyExpiry(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "EXPIRACIÓN INVÁLIDA";
  return `expira ${date.toLocaleString("es-EC", { dateStyle: "short", timeStyle: "short" })}`;
}

/* ---------------- HELPERS ---------------- */

function lines(value) {
  return String(value || "").split("\n").map(item => item.trim()).filter(Boolean);
}

function safeExternalUrl(value) {
  try {
    const url = new URL(String(value || ""));
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
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

renderConnectionPicker();
renderMainImagePreview();
restoreAdminSession();
