console.info("MadeLesh Admin build 5.25");
import { API_BASE } from "./config.js";

const adminLogin = document.getElementById("adminLogin");
const adminApp = document.getElementById("adminApp");
const adminLoginForm = document.getElementById("adminLoginForm");
const staffKeyLoginForm = document.getElementById("staffKeyLoginForm");
const staffAccessKey = document.getElementById("staffAccessKey");
const adminLoginError = document.getElementById("adminLoginError");
const adminIdentity = document.getElementById("adminIdentity");
const adminLogout = document.getElementById("adminLogout");
const adminSiteFavicon = document.getElementById("siteFavicon");
const adminBrandLogos = [...document.querySelectorAll(".site-brand-logo")];
const adminBrandFallbacks = [...document.querySelectorAll(".brand-fallback")];
const brandingLogoLightFile = document.getElementById("brandingLogoLightFile");
const brandingLogoDarkFile = document.getElementById("brandingLogoDarkFile");
const brandingFaviconLightFile = document.getElementById("brandingFaviconLightFile");
const brandingFaviconDarkFile = document.getElementById("brandingFaviconDarkFile");
const brandingLogoLightPreview = document.getElementById("brandingLogoLightPreview");
const brandingLogoDarkPreview = document.getElementById("brandingLogoDarkPreview");
const brandingFaviconLightPreview = document.getElementById("brandingFaviconLightPreview");
const brandingFaviconDarkPreview = document.getElementById("brandingFaviconDarkPreview");
const clearBrandingLogoLight = document.getElementById("clearBrandingLogoLight");
const clearBrandingLogoDark = document.getElementById("clearBrandingLogoDark");
const clearBrandingFaviconLight = document.getElementById("clearBrandingFaviconLight");
const clearBrandingFaviconDark = document.getElementById("clearBrandingFaviconDark");
const saveBrandingSettings = document.getElementById("saveBrandingSettings");

const contactsSettingsForm = document.getElementById("contactsSettingsForm");
const contactDiscord = document.getElementById("contactDiscord");
const contactSteam = document.getElementById("contactSteam");
const contactX = document.getElementById("contactX");
const contactYoutube = document.getElementById("contactYoutube");
const contactTiktok = document.getElementById("contactTiktok");
const contactEmail = document.getElementById("contactEmail");
const saveContactsSettings = document.getElementById("saveContactsSettings");
const colorImageEditor = document.getElementById("colorImageEditor");

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
const productImageFile = document.getElementById("productImageFile");
const clearProductImage = document.getElementById("clearProductImage");
const productGalleryFiles = document.getElementById("productGalleryFiles");
const productGalleryUrl = document.getElementById("productGalleryUrl");
const addProductGalleryUrl = document.getElementById("addProductGalleryUrl");
const productGalleryList = document.getElementById("productGalleryList");
const productVideoUrl = document.getElementById("productVideoUrl");
const keyboardSoundBlock = document.getElementById("keyboardSoundBlock");
const keyboardSoundUrl = document.getElementById("keyboardSoundUrl");
const keyboardSoundFile = document.getElementById("keyboardSoundFile");
const keyboardSoundPreview = document.getElementById("keyboardSoundPreview");
const loadAudioUrlForTrim = document.getElementById("loadAudioUrlForTrim");
const audioTrimmer = document.getElementById("audioTrimmer");
const audioTrimPlayer = document.getElementById("audioTrimPlayer");
const audioTrimFileName = document.getElementById("audioTrimFileName");
const audioTrimDuration = document.getElementById("audioTrimDuration");
const audioTrimStart = document.getElementById("audioTrimStart");
const audioTrimEnd = document.getElementById("audioTrimEnd");
const audioTrimLength = document.getElementById("audioTrimLength");
const audioTrimRangeFill = document.getElementById("audioTrimRangeFill");
const previewAudioTrim = document.getElementById("previewAudioTrim");
const applyAudioTrim = document.getElementById("applyAudioTrim");
const clearAudioTrim = document.getElementById("clearAudioTrim");
const audioTrimStatus = document.getElementById("audioTrimStatus");
const productLivePreviewCard = document.getElementById("productLivePreviewCard");
const productLivePreviewImage = document.getElementById("productLivePreviewImage");
const productLivePreviewEmpty = document.getElementById("productLivePreviewEmpty");
const productLivePreviewName = document.getElementById("productLivePreviewName");
const productLivePreviewConnections = document.getElementById("productLivePreviewConnections");
const productLivePreviewPrice = document.getElementById("productLivePreviewPrice");
const productLivePreviewSpecs = document.getElementById("productLivePreviewSpecs");
const proPlayerNames = [1,2,3].map(i => document.getElementById(`proPlayerName${i}`));
const proPlayerSocials = [1,2,3].map(i => document.getElementById(`proPlayerSocial${i}`));
const productDriverUrl = document.getElementById("productDriverUrl");
const productSoftwareUrl = document.getElementById("productSoftwareUrl");
const storeAmazonIconFile = document.getElementById("storeAmazonIconFile");
const storeAliExpressIconFile = document.getElementById("storeAliExpressIconFile");
const storeAmazonIconPreview = document.getElementById("storeAmazonIconPreview");
const storeAliExpressIconPreview = document.getElementById("storeAliExpressIconPreview");
const announcementsSettingsForm = document.getElementById("announcementsSettingsForm");
const announcementMessage1 = document.getElementById("announcementMessage1");
const announcementMessage2 = document.getElementById("announcementMessage2");
const announcementMessage3 = document.getElementById("announcementMessage3");
const announcementMode = document.getElementById("announcementMode");
const profileAvatarFiles = document.getElementById("profileAvatarFiles");
const uploadProfileAvatars = document.getElementById("uploadProfileAvatars");
const profileAvatarsList = document.getElementById("profileAvatarsList");
const profileAvatarsCount = document.getElementById("profileAvatarsCount");
const profileAvatarUploadStatus = document.getElementById("profileAvatarUploadStatus");
const releaseSettingsForm = document.getElementById("releaseSettingsForm");
const releaseVersion = document.getElementById("releaseVersion");
const releaseDate = document.getElementById("releaseDate");
const releaseTitle = document.getElementById("releaseTitle");
const releaseNotes = document.getElementById("releaseNotes");
const releaseAddedPreview = document.getElementById("releaseAddedPreview");
const releaseRemovedPreview = document.getElementById("releaseRemovedPreview");
const releaseFixedPreview = document.getElementById("releaseFixedPreview");
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

const webSearchCategory = document.getElementById("webSearchCategory");
const webSearchBrand = document.getElementById("webSearchBrand");
const webSearchModel = document.getElementById("webSearchModel");
const webSearchButton = document.getElementById("webSearchButton");
const webSearchStatus = document.getElementById("webSearchStatus");
const webSourceList = document.getElementById("webSourceList");



const keyGeneratorForm = document.getElementById("keyGeneratorForm");
const generatedKeyBox = document.getElementById("generatedKeyBox");
const generatedKeyValue = document.getElementById("generatedKeyValue");
const copyGeneratedKey = document.getElementById("copyGeneratedKey");
const keysList = document.getElementById("keysList");
const keysCount = document.getElementById("keysCount");
const archivedKeysList = document.getElementById("archivedKeysList");
const archivedKeysCount = document.getElementById("archivedKeysCount");
const rolesList = document.getElementById("rolesList");
const roleEditor = document.getElementById("roleEditor");
const roleEditorEmpty = document.getElementById("roleEditorEmpty");
const roleEditorTitle = document.getElementById("roleEditorTitle");
const createRoleButton = document.getElementById("createRoleButton");
const deleteRoleButton = document.getElementById("deleteRoleButton");
const saveRoleButton = document.getElementById("saveRoleButton");
const clearRolePermissions = document.getElementById("clearRolePermissions");
const roleName = document.getElementById("roleName");
const roleDescription = document.getElementById("roleDescription");
const roleColor = document.getElementById("roleColor");
const roleColorValue = document.getElementById("roleColorValue");
const rolePermissionsList = document.getElementById("rolePermissionsList");
const roleUnsavedState = document.getElementById("roleUnsavedState");
const staffUsersList = document.getElementById("staffUsersList");
const staffUsersCount = document.getElementById("staffUsersCount");
const staffUsersSearch = document.getElementById("staffUsersSearch");
const reloadStaffUsers = document.getElementById("reloadStaffUsers");
const auditList = document.getElementById("auditList");
const auditSearch = document.getElementById("auditSearch");
const auditTypeFilter = document.getElementById("auditTypeFilter");
const reloadAudit = document.getElementById("reloadAudit");

let adminToken = localStorage.getItem("madetech_admin_token") || "";
let adminSession = null;
let products = [];
let adminRoles = [];
let permissionDefinitions = [];
let staffUsers = [];
let auditEntries = [];
let adminProfileAvatars = [];
let selectedRoleId = null;
let audioTrimBuffer = null;
let audioTrimObjectUrl = "";
let audioPreviewStopTimer = null;
let fixedStoreIcons = { amazon: "", aliexpress: "" };
let brandingLogoLightDataUrl = "";
let brandingLogoDarkDataUrl = "";
let brandingFaviconLightDataUrl = "";
let brandingFaviconDarkDataUrl = "";
let contactIconDataUrls = { discord:"", steam:"", x:"", youtube:"", tiktok:"", email:"" };
let colorImagesByHex = {};
const ADMIN_BUILD_RELEASE = {
  version: "5.25",
  title: "Favoritos, avatares y comparador mejorado",
  date: "2026-09-24",
  changes: {
    added: [
      "Roles personalizables con permisos individuales.",
      "Asignación de roles a usuarios registrados y registro de auditoría.",
      "Editor para recortar audio de teclados desde audio o video.",
      "Comparador con selección visual de productos."
    ],
    removed: [],
    fixed: [
      "Animación del perfil invertida: avatar a la izquierda y nombre a la derecha.",
      "Comparativas rediseñadas con resultado visual más dinámico."
    ]
  }
};

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
    error.path = path;
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
    field("material", "Material", "text", "Ej. Aleación de magnesio")
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
  renderProductLivePreview();
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
      renderProductLivePreview();
    });
  });
}

productCategory.addEventListener("change", () => {
  renderCategoryFields(productCategory.value, {});
  renderKeyboardSoundVisibility();
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
  renderProductLivePreview();
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
      renderProductLivePreview();
    });
  });
}

/* ---------------- LIVE PRODUCT PREVIEW ---------------- */

const LIVE_PREVIEW_SPEC_KEYS = {
  Mouse: [["sensor","Sensor"],["weight","Peso"],["pollingRate","Polling"]],
  Teclados: [["switchType","Switch"],["layout","Formato"],["pollingRate","Polling"]],
  IEM: [["driverConfig","Drivers"],["impedance","Impedancia"],["soundSignature","Firma"]],
  Headsets: [["driver","Driver"],["weight","Peso"],["batteryHours","Autonomía"]],
  DAC: [["dacChip","Chip DAC"],["maxPcm","PCM"],["outputs","Salidas"]]
};

function livePreviewSpecValue(value, key) {
  if (Array.isArray(value)) return value.join(" · ");
  if (typeof value === "boolean") return value ? "Sí" : "No";
  if (value === undefined || value === null || value === "") return "";
  if (key === "weight") return `${value} g`;
  if (key === "batteryHours") return `${value} h`;
  return String(value);
}

function renderProductLivePreview() {
  if (!productLivePreviewCard) return;

  const name = String(document.getElementById("productName")?.value || "").trim() || "Nombre del producto";
  const price = String(document.getElementById("productPrice")?.value || "").trim() || "Precio";
  const category = productCategory?.value || "Mouse";
  const image = safeImageSource(productImageUrlInput?.value || "") || safeImageSource(getProductImages()[0] || "");
  const connections = getConnections().slice(0, 2);

  productLivePreviewName.textContent = name;
  productLivePreviewPrice.textContent = price;
  productLivePreviewCard.dataset.category = category;

  if (image) {
    productLivePreviewImage.src = image;
    productLivePreviewImage.hidden = false;
    productLivePreviewEmpty.hidden = true;
  } else {
    productLivePreviewImage.removeAttribute("src");
    productLivePreviewImage.hidden = true;
    productLivePreviewEmpty.hidden = false;
  }

  productLivePreviewConnections.innerHTML = connections.length
    ? connections.map(value => `<span>${escapeHtml(value)}</span>`).join("")
    : `<span class="preview-empty-chip">No disponible</span>`;

  let specs = {};
  try { specs = collectCategorySpecs(); } catch {}
  const specRows = (LIVE_PREVIEW_SPEC_KEYS[category] || [])
    .map(([key,label]) => [label, livePreviewSpecValue(specs[key], key)])
    .filter(([,value]) => value)
    .slice(0, 3);

  productLivePreviewSpecs.innerHTML = specRows.length
    ? specRows.map(([label,value]) => `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("")
    : `<small>Completa la ficha técnica y aparecerá aquí.</small>`;
}

productForm?.addEventListener("input", renderProductLivePreview);
productForm?.addEventListener("change", renderProductLivePreview);

/* ---------------- PRODUCT IMAGE PREVIEW ---------------- */

function setProductImages(values = []) {
  const images = [...new Set((Array.isArray(values) ? values : []).map(safeImageSource).filter(Boolean))].slice(0, 12);
  productImagesJson.value = JSON.stringify(images);
  if (!productImageUrlInput.value && images[0]) productImageUrlInput.value = images[0];
  renderProductGalleryList();
  renderMainImagePreview();
}

function getProductImages() {
  try {
    const parsed = JSON.parse(productImagesJson.value || "[]");
    return Array.isArray(parsed) ? parsed.slice(0, 12) : [];
  } catch {
    return [];
  }
}

function renderProductGalleryList() {
  if (!productGalleryList) return;
  const images = getProductImages();
  if (!images.length) {
    productGalleryList.innerHTML = `<div class="gallery-empty-admin">Aún no hay imágenes adicionales.</div>`;
    return;
  }

  productGalleryList.innerHTML = images.map((src,index) => `
    <div class="gallery-admin-item">
      <img src="${escapeAttr(src)}" alt="Imagen ${index+1}">
      <div>
        <button type="button" data-gallery-main="${index}">PRINCIPAL</button>
        <button type="button" data-gallery-remove="${index}">×</button>
      </div>
    </div>`).join("");

  productGalleryList.querySelectorAll("[data-gallery-main]").forEach(button => {
    button.addEventListener("click", () => {
      const src = images[Number(button.dataset.galleryMain)];
      if (!src) return;
      productImageUrlInput.value = src;
      renderMainImagePreview();
    });
  });

  productGalleryList.querySelectorAll("[data-gallery-remove]").forEach(button => {
    button.addEventListener("click", () => {
      setProductImages(images.filter((_,i) => i !== Number(button.dataset.galleryRemove)));
    });
  });
}

function renderMainImagePreview() {
  const url = safeImageSource(productImageUrlInput?.value || "");
  if (!url) {
    productImagePreview.innerHTML = `<div class="admin-image-preview-empty">
      <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"></rect><circle cx="9" cy="10" r="2"></circle><path d="m5 18 5-5 3 3 2-2 4 4"></path></svg>
      <span>Vista previa de la imagen</span>
    </div>`;
    renderProductLivePreview();
    return;
  }
  productImagePreview.innerHTML = `<div class="admin-image-neutral-frame"><img src="${escapeAttr(url)}" alt="Vista previa del producto" onerror="this.parentElement.classList.add('image-error')"></div>`;
  renderProductLivePreview();
}


productImageUrlInput?.addEventListener("input", renderMainImagePreview);

async function imageFileToWebpDataUrl(file, { maxSize = 1200, quality = 0.84, maxChars = 850000 } = {}) {
  if (!file || !String(file.type || "").startsWith("image/")) {
    throw new Error("Selecciona una imagen válida.");
  }

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { alpha: true });
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();

  let q = quality;
  let result = canvas.toDataURL("image/webp", q);
  while (result.length > maxChars && q > 0.48) {
    q -= 0.08;
    result = canvas.toDataURL("image/webp", q);
  }

  if (result.length > maxChars) {
    throw new Error("La imagen sigue siendo demasiado pesada. Usa una imagen más pequeña.");
  }

  return result;
}

productImageFile?.addEventListener("change", async () => {
  try {
    const dataUrl = await imageFileToWebpDataUrl(productImageFile.files?.[0]);
    productImageUrlInput.value = dataUrl;
    setProductImages([dataUrl, ...getProductImages()]);
    renderMainImagePreview();
  } catch (error) {
    alert(error.message);
    productImageFile.value = "";
  }
});

clearProductImage?.addEventListener("click", () => {
  productImageUrlInput.value = "";
  if (productImageFile) productImageFile.value = "";
  setProductImages([]);
  renderMainImagePreview();
});

productGalleryFiles?.addEventListener("change", async () => {
  const files = [...(productGalleryFiles.files || [])];
  if (!files.length) return;
  try {
    const current = getProductImages();
    const room = Math.max(0, 12 - current.length);
    const converted = [];
    for (const file of files.slice(0,room)) {
      converted.push(await imageFileToWebpDataUrl(file,{maxSize:1000,quality:.78,maxChars:310000}));
    }
    setProductImages([...current,...converted]);
    if (files.length > room) alert("MadeLesh permite hasta 12 imágenes por producto.");
  } catch (error) {
    alert(error.message);
  } finally {
    productGalleryFiles.value = "";
  }
});

addProductGalleryUrl?.addEventListener("click", () => {
  const url = safeImageSource(productGalleryUrl?.value || "");
  if (!url) return alert("Escribe una URL de imagen válida.");
  const images = getProductImages();
  if (images.length >= 12) return alert("MadeLesh permite hasta 12 imágenes por producto.");
  setProductImages([...images,url]);
  productGalleryUrl.value = "";
});

function renderKeyboardSoundVisibility() {
  if (keyboardSoundBlock) keyboardSoundBlock.hidden = productCategory.value !== "Teclados";
}

function safeAudioSource(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  if (/^data:audio\/(?:mpeg|mp3|ogg|wav|webm|mp4|aac|x-m4a|m4a);base64,/i.test(text)) return text;
  return safeExternalUrl(text);
}

function renderKeyboardSoundPreview() {
  if (!keyboardSoundPreview) return;
  const src = safeAudioSource(keyboardSoundUrl?.value || "");
  keyboardSoundPreview.innerHTML = src
    ? `<div class="published-audio-preview"><span>AUDIO PUBLICADO</span><audio controls preload="metadata" src="${escapeAttr(src)}"></audio></div>`
    : `<span>Sin audio publicado.</span>`;
}

function formatAudioTime(seconds) {
  const value = Math.max(0, Number(seconds || 0));
  const mins = Math.floor(value / 60);
  const secs = Math.floor(value % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function revokeAudioObjectUrl() {
  if (audioTrimObjectUrl) URL.revokeObjectURL(audioTrimObjectUrl);
  audioTrimObjectUrl = "";
}

function clearAudioEditor() {
  if (audioPreviewStopTimer) clearTimeout(audioPreviewStopTimer);
  audioPreviewStopTimer = null;
  if (audioTrimPlayer) { audioTrimPlayer.pause(); audioTrimPlayer.removeAttribute("src"); audioTrimPlayer.load(); }
  revokeAudioObjectUrl();
  audioTrimBuffer = null;
  if (audioTrimmer) audioTrimmer.hidden = true;
  if (audioTrimStatus) audioTrimStatus.textContent = "El fragmento final debe durar entre 5 y 10 segundos.";
}

function updateAudioTrimUi() {
  if (!audioTrimBuffer) return;
  let start = Math.max(0, Number(audioTrimStart?.value || 0));
  let end = Math.min(audioTrimBuffer.duration, Number(audioTrimEnd?.value || audioTrimBuffer.duration));
  if (end < start) [start, end] = [end, start];
  const len = Math.max(0, end - start);
  if (audioTrimStart) audioTrimStart.value = start.toFixed(1);
  if (audioTrimEnd) audioTrimEnd.value = end.toFixed(1);
  if (audioTrimLength) audioTrimLength.textContent = `${len.toFixed(1)} s`;
  if (audioTrimRangeFill) {
    const total = Math.max(.001, audioTrimBuffer.duration);
    audioTrimRangeFill.style.left = `${(start / total) * 100}%`;
    audioTrimRangeFill.style.width = `${(len / total) * 100}%`;
  }
  const valid = len >= 5 && len <= 10;
  if (audioTrimStatus) {
    audioTrimStatus.textContent = valid
      ? `Recorte válido · ${len.toFixed(1)} segundos.`
      : `Ajusta el recorte: ahora dura ${len.toFixed(1)} s y debe quedar entre 5 y 10 s.`;
    audioTrimStatus.classList.toggle("valid", valid);
  }
  if (applyAudioTrim) applyAudioTrim.disabled = !valid;
}

async function decodeAudioArrayBuffer(arrayBuffer) {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) throw new Error("Tu navegador no permite editar audio.");
  const ctx = new AudioCtx();
  try {
    return await ctx.decodeAudioData(arrayBuffer.slice(0));
  } finally {
    await ctx.close().catch(() => {});
  }
}

async function loadAudioIntoEditor(blob, label = "Audio cargado") {
  if (!blob) throw new Error("No se recibió ningún archivo.");
  if (blob.size > 25 * 1024 * 1024) throw new Error("El archivo supera 25 MB. Usa un audio o video más corto.");
  const buffer = await decodeAudioArrayBuffer(await blob.arrayBuffer());
  if (!Number.isFinite(buffer.duration) || buffer.duration < 5) throw new Error("El archivo debe contener al menos 5 segundos de audio.");
  audioTrimBuffer = buffer;
  revokeAudioObjectUrl();
  audioTrimObjectUrl = URL.createObjectURL(blob);
  if (audioTrimPlayer) { audioTrimPlayer.src = audioTrimObjectUrl; audioTrimPlayer.load(); }
  if (audioTrimFileName) audioTrimFileName.textContent = label;
  if (audioTrimDuration) audioTrimDuration.textContent = `${formatAudioTime(buffer.duration)} · ${buffer.duration.toFixed(1)} s`;
  if (audioTrimStart) { audioTrimStart.min = "0"; audioTrimStart.max = String(buffer.duration); audioTrimStart.value = "0.0"; }
  if (audioTrimEnd) { audioTrimEnd.min = "0"; audioTrimEnd.max = String(buffer.duration); audioTrimEnd.value = Math.min(10, buffer.duration).toFixed(1); }
  if (audioTrimmer) audioTrimmer.hidden = false;
  updateAudioTrimUi();
}

function audioBufferToTrimmedMonoWavDataUrl(buffer, startSeconds, endSeconds, targetRate = 22050) {
  const sourceRate = buffer.sampleRate;
  const startFrame = Math.max(0, Math.floor(startSeconds * sourceRate));
  const endFrame = Math.min(buffer.length, Math.floor(endSeconds * sourceRate));
  const sourceLength = Math.max(1, endFrame - startFrame);
  const outputLength = Math.max(1, Math.floor(sourceLength * targetRate / sourceRate));
  const mono = new Float32Array(outputLength);
  const channels = Array.from({ length: buffer.numberOfChannels }, (_, i) => buffer.getChannelData(i));

  for (let i = 0; i < outputLength; i++) {
    const srcPos = startFrame + (i * sourceRate / targetRate);
    const idx = Math.min(endFrame - 1, Math.floor(srcPos));
    const next = Math.min(endFrame - 1, idx + 1);
    const frac = srcPos - idx;
    let sample = 0;
    for (const channel of channels) sample += channel[idx] * (1 - frac) + channel[next] * frac;
    mono[i] = Math.max(-1, Math.min(1, sample / Math.max(1, channels.length)));
  }

  const bytesPerSample = 2;
  const dataSize = mono.length * bytesPerSample;
  const ab = new ArrayBuffer(44 + dataSize);
  const view = new DataView(ab);
  const writeString = (offset, text) => { for (let i = 0; i < text.length; i++) view.setUint8(offset + i, text.charCodeAt(i)); };
  writeString(0, "RIFF"); view.setUint32(4, 36 + dataSize, true); writeString(8, "WAVE"); writeString(12, "fmt ");
  view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true); view.setUint32(24, targetRate, true);
  view.setUint32(28, targetRate * bytesPerSample, true); view.setUint16(32, bytesPerSample, true); view.setUint16(34, 16, true);
  writeString(36, "data"); view.setUint32(40, dataSize, true);
  let offset = 44;
  for (let i = 0; i < mono.length; i++, offset += 2) view.setInt16(offset, mono[i] < 0 ? mono[i] * 0x8000 : mono[i] * 0x7fff, true);
  const bytes = new Uint8Array(ab);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  return `data:audio/wav;base64,${btoa(binary)}`;
}

keyboardSoundUrl?.addEventListener("input", renderKeyboardSoundPreview);
[audioTrimStart, audioTrimEnd].filter(Boolean).forEach(input => input.addEventListener("input", updateAudioTrimUi));

keyboardSoundFile?.addEventListener("change", async () => {
  const file = keyboardSoundFile.files?.[0];
  if (!file) return;
  try {
    if (audioTrimStatus) audioTrimStatus.textContent = "Procesando audio del archivo...";
    await loadAudioIntoEditor(file, `${file.name}${String(file.type || "").startsWith("video/") ? " · audio extraído del video" : ""}`);
  } catch (error) {
    clearAudioEditor();
    alert(`No se pudo abrir ese formato en el navegador: ${error.message}`);
  } finally {
    keyboardSoundFile.value = "";
  }
});

loadAudioUrlForTrim?.addEventListener("click", async () => {
  const url = safeExternalUrl(keyboardSoundUrl?.value || "");
  if (!url) return alert("Escribe primero una URL de audio válida.");
  try {
    loadAudioUrlForTrim.disabled = true;
    loadAudioUrlForTrim.textContent = "CARGANDO...";
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const blob = await response.blob();
    await loadAudioIntoEditor(blob, "Audio desde URL");
  } catch (error) {
    alert("No se pudo cargar esa URL en el editor. El servidor del audio debe permitir CORS. Puedes descargar el archivo y subirlo desde tu PC.");
  } finally {
    loadAudioUrlForTrim.disabled = false;
    loadAudioUrlForTrim.textContent = "EDITAR URL";
  }
});

previewAudioTrim?.addEventListener("click", () => {
  if (!audioTrimBuffer || !audioTrimPlayer) return;
  updateAudioTrimUi();
  const start = Number(audioTrimStart.value || 0);
  const end = Number(audioTrimEnd.value || 0);
  audioTrimPlayer.currentTime = start;
  audioTrimPlayer.play().catch(() => {});
  if (audioPreviewStopTimer) clearTimeout(audioPreviewStopTimer);
  audioPreviewStopTimer = setTimeout(() => audioTrimPlayer.pause(), Math.max(0, end - start) * 1000);
});

applyAudioTrim?.addEventListener("click", () => {
  if (!audioTrimBuffer) return;
  const start = Number(audioTrimStart.value || 0);
  const end = Number(audioTrimEnd.value || 0);
  const duration = end - start;
  if (duration < 5 || duration > 10) return alert("El recorte final debe durar entre 5 y 10 segundos.");
  try {
    applyAudioTrim.disabled = true;
    applyAudioTrim.textContent = "GENERANDO...";
    keyboardSoundUrl.value = audioBufferToTrimmedMonoWavDataUrl(audioTrimBuffer, start, end);
    renderKeyboardSoundPreview();
    showAdminToast(`Audio recortado a ${duration.toFixed(1)} segundos`);
  } catch (error) {
    alert(`No se pudo generar el recorte: ${error.message}`);
  } finally {
    applyAudioTrim.disabled = false;
    applyAudioTrim.textContent = "USAR ESTE RECORTE ↗";
  }
});

clearAudioTrim?.addEventListener("click", clearAudioEditor);

function parseProPlayers() {
  return proPlayerNames.map((input, index) => ({
    name: String(input?.value || "").trim(),
    url: String(proPlayerSocials[index]?.value || "").trim()
  })).filter(item => item.name).slice(0, 3);
}

function fillProPlayers(players = []) {
  const clean = Array.isArray(players) ? players.slice(0, 3) : [];
  proPlayerNames.forEach((input, index) => {
    if (input) input.value = clean[index]?.name || "";
  });
  proPlayerSocials.forEach((input, index) => {
    if (input) input.value = clean[index]?.url || "";
  });
}

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

  renderColorImageEditor();
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

function normalizeProductImageSource(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  if (/^data:image\/(?:png|jpeg|webp);base64,/i.test(text)) return text;
  return safeExternalUrl(text);
}

function setColorImages(values = []) {
  colorImagesByHex = {};
  for (const item of Array.isArray(values) ? values : []) {
    const hex = String(item?.hex || "").trim().toLowerCase();
    const image = normalizeProductImageSource(item?.image || item?.imageUrl || "");
    if (/^#[0-9a-f]{6}$/i.test(hex) && image) {
      colorImagesByHex[hex] = { name: String(item?.name || "Color"), hex, image };
    }
  }
  renderColorImageEditor();
}

function getColorImages() {
  return selectedColors.flatMap(color => {
    const entry = colorImagesByHex[color.hex.toLowerCase()];
    const image = normalizeProductImageSource(entry?.image || "");
    return image ? [{ name: color.name, hex: color.hex.toLowerCase(), image }] : [];
  }).slice(0, 8);
}

function renderColorImageEditor() {
  if (!colorImageEditor) return;
  const activeHex = new Set(selectedColors.map(item => item.hex.toLowerCase()));
  Object.keys(colorImagesByHex).forEach(hex => { if (!activeHex.has(hex)) delete colorImagesByHex[hex]; });

  if (!selectedColors.length) {
    colorImageEditor.innerHTML = `<div class="color-image-empty">Selecciona uno o más colores para asignar una imagen a cada variante.</div>`;
    return;
  }

  colorImageEditor.innerHTML = selectedColors.map(color => {
    const hex = color.hex.toLowerCase();
    const current = normalizeProductImageSource(colorImagesByHex[hex]?.image || "");
    const externalValue = /^https?:/i.test(current) ? current : "";
    return `<div class="color-image-row" data-color-image-row="${escapeAttr(hex)}">
      <div class="color-image-identity"><span style="background:${escapeAttr(hex)}"></span><strong>${escapeHtml(color.name)}</strong></div>
      <div class="color-image-preview">${current ? `<img src="${escapeAttr(current)}" alt="${escapeAttr(color.name)}">` : `<span>Sin imagen</span>`}</div>
      <input class="color-image-url" data-color-image-url="${escapeAttr(hex)}" type="url" value="${escapeAttr(externalValue)}" placeholder="URL de imagen para ${escapeAttr(color.name)}">
      <label class="color-image-file-button"><input data-color-image-file="${escapeAttr(hex)}" type="file" accept="image/png,image/jpeg,image/webp"><span>SUBIR</span></label>
      <button class="ghost-btn color-image-clear" data-color-image-clear="${escapeAttr(hex)}" type="button">Quitar</button>
    </div>`;
  }).join("");

  colorImageEditor.querySelectorAll("[data-color-image-url]").forEach(input => {
    input.addEventListener("input", () => {
      const hex = input.dataset.colorImageUrl;
      const image = safeExternalUrl(input.value);
      const color = selectedColors.find(item => item.hex.toLowerCase() === hex);
      if (image && color) colorImagesByHex[hex] = { ...color, image };
      else delete colorImagesByHex[hex];
      const preview = input.closest(".color-image-row")?.querySelector(".color-image-preview");
      if (preview) preview.innerHTML = image ? `<img src="${escapeAttr(image)}" alt="Vista previa">` : `<span>Sin imagen</span>`;
    });
  });

  colorImageEditor.querySelectorAll("[data-color-image-file]").forEach(input => {
    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const allowed = ["image/png","image/jpeg","image/webp"];
        if (!allowed.includes(file.type)) throw new Error("Usa PNG, JPG o WEBP.");
        if (file.size > 180 * 1024) throw new Error("La imagen por color debe pesar máximo 180 KB.");
        const dataUrl = await new Promise((resolve,reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result || ""));
          reader.onerror = () => reject(new Error("No se pudo leer la imagen."));
          reader.readAsDataURL(file);
        });
        const hex = input.dataset.colorImageFile;
        const color = selectedColors.find(item => item.hex.toLowerCase() === hex);
        if (color) colorImagesByHex[hex] = { ...color, image: dataUrl };
        renderColorImageEditor();
      } catch (error) {
        alert(error.message);
        input.value = "";
      }
    });
  });

  colorImageEditor.querySelectorAll("[data-color-image-clear]").forEach(button => {
    button.addEventListener("click", () => {
      delete colorImagesByHex[button.dataset.colorImageClear];
      renderColorImageEditor();
    });
  });
}

function renderTrustedStores(stores = []) {
  const list = Array.isArray(stores) ? stores : [];

  const amazon = list.find(item => normalizeStoreName(item?.name) === "amazon");
  const aliexpress = list.find(item => normalizeStoreName(item?.name) === "aliexpress");

  storeAmazon.value = amazon?.url || "";
  storeAliExpress.value = aliexpress?.url || "";
  fixedStoreIcons.amazon = safeImageSource(amazon?.icon || "");
  fixedStoreIcons.aliexpress = safeImageSource(aliexpress?.icon || "");
  renderFixedStoreIconPreviews();

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

function renderFixedStoreIconPreviews() {
  const render = (target, value, fallback) => {
    if (!target) return;
    target.innerHTML = value
      ? `<img src="${escapeAttr(value)}" alt="">`
      : `<span>${fallback}</span>`;
  };
  render(storeAmazonIconPreview, fixedStoreIcons.amazon, "A");
  render(storeAliExpressIconPreview, fixedStoreIcons.aliexpress, "A");
}

async function readStoreIcon(file) {
  return await imageFileToWebpDataUrl(file, { maxSize: 256, quality: .82, maxChars: 220000 });
}

storeAmazonIconFile?.addEventListener("change", async () => {
  try {
    fixedStoreIcons.amazon = await readStoreIcon(storeAmazonIconFile.files?.[0]);
    renderFixedStoreIconPreviews();
  } catch (error) { alert(error.message); storeAmazonIconFile.value = ""; }
});

storeAliExpressIconFile?.addEventListener("change", async () => {
  try {
    fixedStoreIcons.aliexpress = await readStoreIcon(storeAliExpressIconFile.files?.[0]);
    renderFixedStoreIconPreviews();
  } catch (error) { alert(error.message); storeAliExpressIconFile.value = ""; }
});

function addExtraStoreRow(store = {}) {
  const row = document.createElement("div");
  row.className = "store-row store-row-extra";
  row.dataset.icon = safeImageSource(store.icon || "");
  row.innerHTML = `
    <div class="store-icon-slot store-extra-icon-preview">${row.dataset.icon ? `<img src="${escapeAttr(row.dataset.icon)}" alt="">` : `<span>+</span>`}</div>
    <input class="store-name-input" type="text" placeholder="Nombre de la tienda"
           value="${escapeAttr(store.name || "")}" aria-label="Nombre de la tienda" />
    <input class="store-url-input" type="url" placeholder="https://..."
           value="${escapeAttr(store.url || "")}" aria-label="Link de la tienda" />
    <label class="store-icon-upload"><input class="store-icon-file" type="file" accept="image/*" /><span>ICONO</span></label>
    <button class="remove-store-btn" type="button" title="Eliminar tienda" aria-label="Eliminar tienda">×</button>
  `;

  row.querySelector(".remove-store-btn").addEventListener("click", () => row.remove());
  row.querySelector(".store-icon-file").addEventListener("change", async event => {
    try {
      row.dataset.icon = await readStoreIcon(event.currentTarget.files?.[0]);
      const preview = row.querySelector(".store-extra-icon-preview");
      preview.innerHTML = `<img src="${escapeAttr(row.dataset.icon)}" alt="">`;
    } catch (error) {
      alert(error.message);
      event.currentTarget.value = "";
    }
  });
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
    stores.push({ name: "Amazon", url: storeAmazon.value.trim(), ...(fixedStoreIcons.amazon ? { icon: fixedStoreIcons.amazon } : {}) });
  }

  if (storeAliExpress.value.trim()) {
    stores.push({ name: "AliExpress", url: storeAliExpress.value.trim(), ...(fixedStoreIcons.aliexpress ? { icon: fixedStoreIcons.aliexpress } : {}) });
  }

  extraStores.querySelectorAll(".store-row-extra").forEach(row => {
    const name = row.querySelector(".store-name-input").value.trim();
    const url = row.querySelector(".store-url-input").value.trim();
    const icon = safeImageSource(row.dataset.icon || "");
    if (name && url) stores.push({ name, url, ...(icon ? { icon } : {}) });
  });

  return stores;
}

renderColorPicker([]);
renderTrustedStores([]);


/* ---------------- INTERNET AUTO-IMPORT ---------------- */

webSearchButton?.addEventListener("click", importFromWeb);

[webSearchBrand, webSearchModel].filter(Boolean).forEach(input => {
  input.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      importFromWeb();
    }
  });
});

webSearchCategory?.addEventListener("change", () => {
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
  if (productVideoUrl) productVideoUrl.value = product.specs?.productVideo || "";
  if (keyboardSoundUrl) keyboardSoundUrl.value = product.specs?.keyboardSound || "";
  fillProPlayers(product.specs?.proPlayers || []);
  if (productDriverUrl) productDriverUrl.value = product.specs?.driverDownloadUrl || "";
  if (productSoftwareUrl) productSoftwareUrl.value = product.specs?.softwareDownloadUrl || "";
  renderKeyboardSoundVisibility();
  renderKeyboardSoundPreview();
  document.getElementById("productYoutube").value = product.reviewLinks?.youtube || "";
  document.getElementById("productTiktok").value = product.reviewLinks?.tiktok || "";
  document.getElementById("productSummary").value = product.summary || "";
  document.getElementById("productPros").value =
    Array.isArray(product.pros) ? product.pros.join("\n") : "";
  document.getElementById("productCons").value =
    Array.isArray(product.cons) ? product.cons.join("\n") : "";

  renderTrustedStores(Array.isArray(product.trustedStores) ? product.trustedStores : []);
  setColorImages(product.specs?.colorImages || []);
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


/* ---------------- BRANDING + CONTACTS ---------------- */

async function loadBrandingSettings() {
  try {
    const data = await api("/settings", { method: "GET" }, null);
    const b = data.branding || {};
    brandingLogoLightDataUrl = String(b.logoLightDataUrl || b.logoDataUrl || "");
    brandingLogoDarkDataUrl = String(b.logoDarkDataUrl || b.logoDataUrl || brandingLogoLightDataUrl || "");
    brandingFaviconLightDataUrl = String(b.faviconLightDataUrl || b.faviconDataUrl || "");
    brandingFaviconDarkDataUrl = String(b.faviconDarkDataUrl || b.faviconDataUrl || brandingFaviconLightDataUrl || "");
    renderBrandingPreviews();
    applyAdminBranding();
    fillContactsSettings(data.contacts || {});
    fillAnnouncementSettings(data.announcements || [], data.announcementMode || announcementMode?.value || "scroll");
    fillReleaseSettings(data.release || { version: data.appVersion || "5.18" });
  } catch (error) {
    console.warn("No se pudo cargar apariencia/contactos", error);
  }
}

function applyAdminBranding() {
  // El panel admin es oscuro; usa preferentemente el logo/icono oscuro.
  const logo = brandingLogoDarkDataUrl || brandingLogoLightDataUrl;
  const favicon = brandingFaviconDarkDataUrl || brandingFaviconLightDataUrl || logo;
  adminBrandLogos.forEach(img => {
    if (logo) { img.src = logo; img.hidden = false; }
    else { img.removeAttribute("src"); img.hidden = true; }
  });
  adminBrandFallbacks.forEach(el => { el.hidden = Boolean(logo); });
  if (adminSiteFavicon) {
    if (favicon) adminSiteFavicon.href = favicon;
    else adminSiteFavicon.removeAttribute("href");
  }
}

function previewBranding(target, dataUrl, emptyText) {
  if (!target) return;
  target.innerHTML = dataUrl
    ? `<img src="${dataUrl}" alt="Vista previa">`
    : `<span>${emptyText}</span>`;
}

function renderBrandingPreviews() {
  previewBranding(brandingLogoLightPreview, brandingLogoLightDataUrl, "Sin logo para modo claro");
  previewBranding(brandingLogoDarkPreview, brandingLogoDarkDataUrl, "Sin logo para modo oscuro");
  previewBranding(brandingFaviconLightPreview, brandingFaviconLightDataUrl, "Sin favicon claro");
  previewBranding(brandingFaviconDarkPreview, brandingFaviconDarkDataUrl, "Sin favicon oscuro");
}

async function readBrandingFile(file) {
  if (!file) return "";
  const allowed = ["image/png", "image/jpeg", "image/webp"];
  if (!allowed.includes(file.type)) throw new Error("Usa PNG, JPG o WEBP.");
  if (file.size > 220 * 1024) throw new Error("La imagen supera 220 KB. Usa una imagen más ligera.");
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("No se pudo leer la imagen."));
    reader.readAsDataURL(file);
  });
}

function bindBrandFile(input, setter) {
  input?.addEventListener("change", async () => {
    try { setter(await readBrandingFile(input.files?.[0])); renderBrandingPreviews(); }
    catch (error) { alert(error.message); input.value = ""; }
  });
}
bindBrandFile(brandingLogoLightFile, value => { brandingLogoLightDataUrl = value; });
bindBrandFile(brandingLogoDarkFile, value => { brandingLogoDarkDataUrl = value; });
bindBrandFile(brandingFaviconLightFile, value => { brandingFaviconLightDataUrl = value; });
bindBrandFile(brandingFaviconDarkFile, value => { brandingFaviconDarkDataUrl = value; });

clearBrandingLogoLight?.addEventListener("click", () => { brandingLogoLightDataUrl = ""; if (brandingLogoLightFile) brandingLogoLightFile.value = ""; renderBrandingPreviews(); });
clearBrandingLogoDark?.addEventListener("click", () => { brandingLogoDarkDataUrl = ""; if (brandingLogoDarkFile) brandingLogoDarkFile.value = ""; renderBrandingPreviews(); });
clearBrandingFaviconLight?.addEventListener("click", () => { brandingFaviconLightDataUrl = ""; if (brandingFaviconLightFile) brandingFaviconLightFile.value = ""; renderBrandingPreviews(); });
clearBrandingFaviconDark?.addEventListener("click", () => { brandingFaviconDarkDataUrl = ""; if (brandingFaviconDarkFile) brandingFaviconDarkFile.value = ""; renderBrandingPreviews(); });

saveBrandingSettings?.addEventListener("click", async () => {
  const original = saveBrandingSettings.textContent;
  saveBrandingSettings.disabled = true;
  saveBrandingSettings.textContent = "GUARDANDO...";
  try {
    const data = await api("/admin/settings/branding", {
      method: "PUT",
      body: JSON.stringify({
        logoLightDataUrl: brandingLogoLightDataUrl,
        logoDarkDataUrl: brandingLogoDarkDataUrl,
        faviconLightDataUrl: brandingFaviconLightDataUrl,
        faviconDarkDataUrl: brandingFaviconDarkDataUrl
      })
    });
    const b = data.branding || {};
    brandingLogoLightDataUrl = String(b.logoLightDataUrl || "");
    brandingLogoDarkDataUrl = String(b.logoDarkDataUrl || "");
    brandingFaviconLightDataUrl = String(b.faviconLightDataUrl || "");
    brandingFaviconDarkDataUrl = String(b.faviconDarkDataUrl || "");
    renderBrandingPreviews();
    applyAdminBranding();
    showAdminToast("La apariencia de MadeLesh ha sido actualizada");
  } catch (error) {
    alert(`No se pudo guardar la apariencia: ${error.message}`);
  } finally {
    saveBrandingSettings.disabled = false;
    saveBrandingSettings.textContent = original;
  }
});

function renderContactIconPreviews() {
  const keys = ["discord","steam","x","youtube","tiktok","email"];
  keys.forEach(key => {
    const cap = key.charAt(0).toUpperCase() + key.slice(1);
    const preview = document.getElementById(`contactIcon${cap}Preview`);
    if (!preview) return;
    const value = contactIconDataUrls[key] || "";
    preview.innerHTML = value ? `<img src="${escapeAttr(value)}" alt="Icono ${escapeAttr(key)}">` : `<span>Icono</span>`;
  });
}

function fillContactsSettings(contacts) {
  if (contactDiscord) contactDiscord.value = contacts.discord || "";
  if (contactSteam) contactSteam.value = contacts.steam || "";
  if (contactX) contactX.value = contacts.x || "";
  if (contactYoutube) contactYoutube.value = contacts.youtube || "";
  if (contactTiktok) contactTiktok.value = contacts.tiktok || "";
  if (contactEmail) contactEmail.value = contacts.email || "";
  const icons = contacts.icons || {};
  contactIconDataUrls = {
    discord: String(icons.discord || ""), steam: String(icons.steam || ""), x: String(icons.x || ""),
    youtube: String(icons.youtube || ""), tiktok: String(icons.tiktok || ""), email: String(icons.email || "")
  };
  renderContactIconPreviews();
}

["discord","steam","x","youtube","tiktok","email"].forEach(key => {
  const cap = key.charAt(0).toUpperCase() + key.slice(1);
  const fileInput = document.getElementById(`contactIcon${cap}File`);
  const clearButton = document.getElementById(`clearContactIcon${cap}`);
  fileInput?.addEventListener("change", async () => {
    try {
      contactIconDataUrls[key] = await readBrandingFile(fileInput.files?.[0]);
      renderContactIconPreviews();
    } catch (error) {
      alert(error.message);
      fileInput.value = "";
    }
  });
  clearButton?.addEventListener("click", () => {
    contactIconDataUrls[key] = "";
    if (fileInput) fileInput.value = "";
    renderContactIconPreviews();
  });
});

contactsSettingsForm?.addEventListener("submit", async event => {
  event.preventDefault();
  const original = saveContactsSettings?.textContent || "GUARDAR CONTACTOS ↗";
  if (saveContactsSettings) { saveContactsSettings.disabled = true; saveContactsSettings.textContent = "GUARDANDO..."; }
  try {
    const data = await api("/admin/settings/contacts", {
      method: "PUT",
      body: JSON.stringify({
        discord: contactDiscord?.value.trim() || "",
        steam: contactSteam?.value.trim() || "",
        x: contactX?.value.trim() || "",
        youtube: contactYoutube?.value.trim() || "",
        tiktok: contactTiktok?.value.trim() || "",
        email: contactEmail?.value.trim() || "",
        icons: { ...contactIconDataUrls }
      })
    });
    fillContactsSettings(data.contacts || {});
    showAdminToast("Los contactos de MadeLesh han sido actualizados");
  } catch (error) {
    const messages = {
      invalid_contact_url: "Revisa que los enlaces de las redes sean URLs válidas.",
      invalid_contact_email: "Revisa el correo electrónico."
    };
    alert(messages[error.code] || `No se pudieron guardar los contactos: ${error.message}`);
  } finally {
    if (saveContactsSettings) { saveContactsSettings.disabled = false; saveContactsSettings.textContent = original; }
  }
});

/* ---------------- ADMIN / STAFF SESSION ---------------- */

function sessionPermissions() {
  return Array.isArray(adminSession?.permissions) ? adminSession.permissions : [];
}

function can(permission) {
  return adminSession?.role === "admin" || sessionPermissions().includes("*") || sessionPermissions().includes(permission);
}

function canAny(...permissions) {
  return adminSession?.role === "admin" || permissions.some(can);
}

function configurePanelPermissions() {
  document.querySelectorAll(".admin-nav button[data-permission]").forEach(button => {
    button.hidden = !can(button.dataset.permission);
  });
  document.querySelectorAll(".admin-nav button[data-permission-any]").forEach(button => {
    const permissions = String(button.dataset.permissionAny || "").split(",").map(v => v.trim()).filter(Boolean);
    button.hidden = !permissions.some(can);
  });

  const importer = document.querySelector(".admin-import-grid");
  if (importer) importer.hidden = !can("products.import");
  const saveProduct = document.getElementById("saveProduct");
  if (saveProduct) saveProduct.hidden = !(can("products.create") || can("products.edit"));
  const keyGeneratorCard = keyGeneratorForm?.closest(".admin-card");
  if (keyGeneratorCard) keyGeneratorCard.hidden = !can("keys.manage");

  const active = document.querySelector(".admin-nav button.active:not([hidden])");
  if (!active) {
    const first = document.querySelector(".admin-nav button:not([hidden])");
    if (first) activateAdminPanel(first.dataset.panel);
  }
}

async function restoreAdminSession() {
  if (!adminToken) { showAdminLogin(); return; }
  try {
    const me = await api("/session/me");
    const staffAllowed = me.role === "admin" || (me.role === "user" && Array.isArray(me.permissions) && me.permissions.length > 0);
    if (!staffAllowed) throw Object.assign(new Error("staff access required"), { status: 403 });
    adminSession = me;
    showAdminDashboard(me);
    await loadAdminDashboardData();
  } catch (error) {
    console.warn("No se pudo restaurar la sesión del panel:", error);
    if (error?.status === 401 || error?.status === 403) {
      localStorage.removeItem("madetech_admin_token");
      adminToken = "";
      adminSession = null;
      showAdminLogin(error?.status === 403 ? "Tu usuario no tiene un rol con permisos para entrar al panel." : "Tu sesión expiró. Inicia sesión nuevamente.");
      return;
    }
    showAdminLogin(`No se pudo comprobar la sesión: ${error?.message || "error de conexión"}.`);
  }
}

function showAdminLogin(message = "") {
  document.body.classList.remove("admin-authenticated");
  adminLogin.hidden = false;
  adminApp.hidden = true;
  if (message) { adminLoginError.textContent = message; adminLoginError.hidden = false; }
  else adminLoginError.hidden = true;
}

function showAdminDashboard(me = {}) {
  adminSession = me;
  const roleName = me.role === "admin" ? "Administrador" : (me.staffRole?.name || "Colaborador");
  adminIdentity.textContent = `${me.profileName || "Usuario"} · ${roleName}`;
  adminLogin.hidden = true;
  adminApp.hidden = false;
  adminLoginError.hidden = true;
  document.body.classList.add("admin-authenticated");
  configurePanelPermissions();
  if (productCategory) renderCategoryFields(productCategory.value, {});
}

async function loadAdminDashboardData() {
  const tasks = [];
  if (canAny("products.view_drafts","products.create","products.edit","products.delete","products.import")) tasks.push(["productos", loadProducts]);
  if (canAny("keys.view","keys.manage")) tasks.push(["access keys", loadKeys]);
  if (can("settings.branding")) tasks.push(["apariencia", loadBrandingSettings]);
  if (can("profiles.manage_avatars")) tasks.push(["fotos de perfil", loadProfileAvatarsAdmin]);
  if (can("roles.manage")) tasks.push(["roles", loadRolesAdmin]);
  if (can("users.manage_roles")) tasks.push(["usuarios", loadStaffUsers]);
  if (can("audit.view")) tasks.push(["auditoría", loadAudit]);
  if (!tasks.length) return;
  const results = await Promise.allSettled(tasks.map(([, task]) => Promise.resolve().then(() => task())));
  const failures = results.map((result,index)=>({result,label:tasks[index][0]})).filter(item=>item.result.status==="rejected");
  if (failures.length) {
    console.warn("El panel abrió, pero algunas secciones fallaron:", failures);
    showAdminToast(`No se pudo cargar: ${failures.map(item=>item.label).join(", ")}`);
  }
}

adminLoginForm?.addEventListener("submit", async event => {
  event.preventDefault();
  adminLoginError.hidden = true;
  const email = document.getElementById("adminEmail").value.trim();
  const password = document.getElementById("adminPassword").value;
  const submitButton = adminLoginForm.querySelector('button[type="submit"]');
  const originalText = submitButton?.textContent || "INICIAR SESIÓN";
  if (submitButton) { submitButton.disabled = true; submitButton.textContent = "ENTRANDO..."; }
  try {
    const result = await api("/admin/login", { method:"POST", body:JSON.stringify({ email, password }) }, null);
    if (!result?.token || result.role !== "admin") throw Object.assign(new Error("invalid admin login response"), { code:"invalid_login_response" });
    adminToken = result.token;
    localStorage.setItem("madetech_admin_token", result.token);
    const me = await api("/session/me");
    showAdminDashboard(me);
    await loadAdminDashboardData();
  } catch (error) {
    localStorage.removeItem("madetech_admin_token"); adminToken = ""; adminSession = null;
    showAdminLogin(error?.code === "invalid_credentials" ? "Correo o contraseña incorrectos." : `No se pudo iniciar sesión: ${error?.message || "error desconocido"}`);
  } finally {
    if (submitButton) { submitButton.disabled = false; submitButton.textContent = originalText; }
  }
});

staffKeyLoginForm?.addEventListener("submit", async event => {
  event.preventDefault();
  adminLoginError.hidden = true;
  const key = staffAccessKey?.value.trim() || "";
  const button = staffKeyLoginForm.querySelector('button[type="submit"]');
  const old = button?.textContent || "ENTRAR CON MI ROL ↗";
  if (!key) return showAdminLogin("Escribe tu Access Key.");
  try {
    if (button) { button.disabled = true; button.textContent = "COMPROBANDO ROL..."; }
    const result = await api("/access/login", { method:"POST", body:JSON.stringify({ key }) }, null);
    const me = await api("/session/me", {}, result.token);
    if (!Array.isArray(me.permissions) || me.permissions.length === 0) throw Object.assign(new Error("Este usuario no tiene un rol asignado."), { status:403 });
    adminToken = result.token;
    localStorage.setItem("madetech_admin_token", result.token);
    showAdminDashboard(me);
    await loadAdminDashboardData();
  } catch (error) {
    adminToken = ""; adminSession = null; localStorage.removeItem("madetech_admin_token");
    showAdminLogin(error?.status === 403 ? "Esta Access Key no tiene un rol con permisos asignados." : "Access Key inválida o vencida.");
  } finally {
    if (button) { button.disabled = false; button.textContent = old; }
  }
});

adminLogout?.addEventListener("click", async () => {
  try { await api("/session/logout", { method:"POST" }); } catch {}
  localStorage.removeItem("madetech_admin_token");
  adminToken = ""; adminSession = null;
  showAdminLogin();
});

function fillAnnouncementSettings(messages = [], mode = "scroll") {
  const values = Array.isArray(messages) ? messages : [];
  if (announcementMessage1) announcementMessage1.value = values[0] || "";
  if (announcementMessage2) announcementMessage2.value = values[1] || "";
  if (announcementMessage3) announcementMessage3.value = values[2] || "";
  if (announcementMode) announcementMode.value = mode === "static" ? "static" : "scroll";
}

announcementsSettingsForm?.addEventListener("submit", async event => {
  event.preventDefault();
  const button = announcementsSettingsForm.querySelector('button[type="submit"]');
  const original = button?.textContent || "GUARDAR MENSAJES ↗";
  if (button) { button.disabled = true; button.textContent = "GUARDANDO..."; }
  try {
    const data = await api("/admin/settings/announcements", {
      method: "PUT",
      body: JSON.stringify({
        message1: announcementMessage1?.value.trim() || "",
        message2: announcementMessage2?.value.trim() || "",
        message3: announcementMessage3?.value.trim() || "",
        mode: announcementMode?.value || "scroll"
      })
    });
    fillAnnouncementSettings(data.announcements || [], data.announcementMode || "scroll");
    showAdminToast("Los mensajes del encabezado han sido actualizados");
  } catch (error) {
    alert(`No se pudieron guardar los mensajes: ${error.message}`);
  } finally {
    if (button) { button.disabled = false; button.textContent = original; }
  }
});


async function loadProfileAvatarsAdmin() {
  if (!profileAvatarsList) return;
  const data = await api("/admin/profile-avatars");
  adminProfileAvatars = Array.isArray(data.avatars) ? data.avatars : [];
  renderProfileAvatarsAdmin();
}

function renderProfileAvatarsAdmin() {
  if (!profileAvatarsList) return;
  if (profileAvatarsCount) profileAvatarsCount.textContent = String(adminProfileAvatars.length);
  profileAvatarsList.innerHTML = adminProfileAvatars.length ? adminProfileAvatars.map(avatar => `
    <article class="profile-avatar-admin-item">
      <img src="${escapeAttr(avatar.imageDataUrl || "")}" alt="${escapeAttr(avatar.label || "Foto de perfil")}">
      <div><strong>${escapeHtml(avatar.label || `Foto ${avatar.id}`)}</strong><small>ID ${avatar.id}</small></div>
      <button class="danger" type="button" data-delete-profile-avatar="${avatar.id}">ELIMINAR</button>
    </article>`).join("") : `<div class="empty-admin-state">Todavía no hay fotos de perfil disponibles.</div>`;
  profileAvatarsList.querySelectorAll("[data-delete-profile-avatar]").forEach(button => {
    button.addEventListener("click", async () => {
      if (!confirm("¿Eliminar esta foto de perfil? Los usuarios que la tengan volverán al avatar predeterminado.")) return;
      try { button.disabled = true; await api(`/admin/profile-avatars/${button.dataset.deleteProfileAvatar}`, { method:"DELETE" }); await loadProfileAvatarsAdmin(); showAdminToast("Foto de perfil eliminada"); }
      catch (error) { alert(error.message || "No se pudo eliminar la foto."); }
      finally { button.disabled = false; }
    });
  });
}

uploadProfileAvatars?.addEventListener("click", async () => {
  const files = [...(profileAvatarFiles?.files || [])];
  if (!files.length) return alert("Selecciona una o más imágenes.");
  const old = uploadProfileAvatars.textContent;
  uploadProfileAvatars.disabled = true;
  uploadProfileAvatars.textContent = "SUBIENDO...";
  let uploaded = 0;
  try {
    for (const file of files) {
      const imageDataUrl = await imageFileToWebpDataUrl(file, { maxSize:320, quality:.82, maxChars:220000 });
      const label = String(file.name || "Foto de perfil").replace(/\.[^.]+$/, "").slice(0,80);
      await api("/admin/profile-avatars", { method:"POST", body:JSON.stringify({ label, imageDataUrl }) });
      uploaded++;
    }
    if (profileAvatarUploadStatus) profileAvatarUploadStatus.textContent = `${uploaded} foto${uploaded===1?"":"s"} subida${uploaded===1?"":"s"} correctamente.`;
    if (profileAvatarFiles) profileAvatarFiles.value = "";
    await loadProfileAvatarsAdmin();
    showAdminToast("Fotos de perfil actualizadas");
  } catch (error) {
    alert(error.message || "No se pudieron subir las fotos.");
  } finally {
    uploadProfileAvatars.disabled = false;
    uploadProfileAvatars.textContent = old;
  }
});

function classifyReleaseNotesAdmin(notes = []) {
  const result = { added: [], removed: [], fixed: [] };
  for (const raw of Array.isArray(notes) ? notes : []) {
    const note = String(raw || "").trim();
    if (!note) continue;
    const lower = note.toLowerCase();
    if (/(elimin|quit|remov|retir|desactiv|borr)/i.test(lower)) result.removed.push(note);
    else if (/(arreg|correg|solucion|repar|fix|ajust|mejor|optim)/i.test(lower)) result.fixed.push(note);
    else result.added.push(note);
  }
  return result;
}

function releaseChangesFromTextarea() {
  return classifyReleaseNotesAdmin(
    String(releaseNotes?.value || "")
      .split("\n")
      .map(value => value.trim())
      .filter(Boolean)
      .slice(0, 24)
  );
}

function updateReleaseAutoPreview() {
  const changes = releaseChangesFromTextarea();
  const preview = (element, values) => {
    if (!element) return;
    element.textContent = values.length ? values.join(" · ") : "Sin cambios";
  };
  preview(releaseAddedPreview, changes.added);
  preview(releaseRemovedPreview, changes.removed);
  preview(releaseFixedPreview, changes.fixed);
}

function fillReleaseSettings(release = {}) {
  if (String(release.version || "") !== ADMIN_BUILD_RELEASE.version) release = ADMIN_BUILD_RELEASE;
  if (releaseVersion) releaseVersion.value = String(release.version || "5.25").replace(/^v/i, "");
  if (releaseDate) releaseDate.value = String(release.date || "");
  if (releaseTitle) releaseTitle.value = String(release.title || "");

  const changes = release.changes && typeof release.changes === "object"
    ? release.changes
    : classifyReleaseNotesAdmin(release.notes || []);

  if (releaseNotes) {
    releaseNotes.value = [
      ...(Array.isArray(changes.added) ? changes.added : []),
      ...(Array.isArray(changes.removed) ? changes.removed : []),
      ...(Array.isArray(changes.fixed) ? changes.fixed : [])
    ].join("\n");
  }
  updateReleaseAutoPreview();
}

releaseNotes?.addEventListener("input", updateReleaseAutoPreview);

releaseSettingsForm?.addEventListener("submit", async event => {
  event.preventDefault();

  const changes = releaseChangesFromTextarea();
  const button = releaseSettingsForm.querySelector('button[type="submit"]');
  const original = button?.textContent || "GUARDAR ACTUALIZACIÓN ↗";

  if (button) {
    button.disabled = true;
    button.textContent = "GUARDANDO...";
  }

  try {
    const data = await api("/admin/settings/release", {
      method: "PUT",
      body: JSON.stringify({
        version: releaseVersion?.value.trim() || "",
        date: releaseDate?.value || "",
        title: releaseTitle?.value.trim() || "",
        changes
      })
    });

    fillReleaseSettings(data.release || {});
    showAdminToast(`MadeLesh v${String(data.appVersion || "").replace(/^v/i, "")} guardada correctamente`);
  } catch (error) {
    alert(`No se pudo guardar la actualización: ${error.message}`);
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = original;
    }
  }
});


/* ---------------- ROLES / USERS / AUDIT ---------------- */

async function loadRolesAdmin() {
  if (!can("roles.manage") || !rolesList) return;
  const data = await api("/admin/roles");
  adminRoles = Array.isArray(data.roles) ? data.roles : [];
  permissionDefinitions = Array.isArray(data.permissions) ? data.permissions : [];
  renderRolesList();
  if (selectedRoleId && !adminRoles.some(role => Number(role.id) === Number(selectedRoleId))) selectedRoleId = null;
  if (selectedRoleId) selectRoleForEdit(selectedRoleId);
}

function renderRolesList() {
  if (!rolesList) return;
  rolesList.innerHTML = adminRoles.length ? adminRoles.map(role => `
    <button type="button" class="role-list-item ${Number(role.id)===Number(selectedRoleId)?"active":""}" data-role-id="${role.id}">
      <span class="role-dot" style="--role-color:${escapeAttr(role.color || "#5865F2")}"></span>
      <span><strong>${escapeHtml(role.name)}</strong><small>${role.usersCount || 0} usuario${Number(role.usersCount||0)===1?"":"s"}</small></span>
      <b>›</b>
    </button>`).join("") : `<div class="empty-admin-state">No hay roles creados.</div>`;
  rolesList.querySelectorAll("[data-role-id]").forEach(btn => btn.addEventListener("click", () => selectRoleForEdit(Number(btn.dataset.roleId))));
}

function selectRoleForEdit(id) {
  const role = adminRoles.find(item => Number(item.id) === Number(id));
  if (!role) return;
  selectedRoleId = Number(role.id);
  if (roleEditorEmpty) roleEditorEmpty.hidden = true;
  if (roleEditor) roleEditor.hidden = false;
  if (roleEditorTitle) roleEditorTitle.textContent = role.name;
  if (roleName) roleName.value = role.name || "";
  if (roleDescription) roleDescription.value = role.description || "";
  if (roleColor) roleColor.value = role.color || "#5865F2";
  if (roleColorValue) roleColorValue.textContent = roleColor.value.toUpperCase();
  renderPermissionToggles(role.permissions || []);
  renderRolesList();
  if (deleteRoleButton) deleteRoleButton.hidden = false;
}

function startNewRole() {
  selectedRoleId = null;
  if (roleEditorEmpty) roleEditorEmpty.hidden = true;
  if (roleEditor) roleEditor.hidden = false;
  if (roleEditorTitle) roleEditorTitle.textContent = "Nuevo rol";
  if (roleName) roleName.value = "";
  if (roleDescription) roleDescription.value = "";
  if (roleColor) roleColor.value = "#5865F2";
  if (roleColorValue) roleColorValue.textContent = "#5865F2";
  if (deleteRoleButton) deleteRoleButton.hidden = true;
  renderPermissionToggles([]);
  renderRolesList();
}

function renderPermissionToggles(enabledPermissions = []) {
  if (!rolePermissionsList) return;
  const enabled = new Set(enabledPermissions);
  const groups = new Map();
  for (const permission of permissionDefinitions) {
    const key = permission.group || "General";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(permission);
  }
  rolePermissionsList.innerHTML = [...groups.entries()].map(([group, items]) => `
    <section class="permission-group">
      <div class="permission-group-title">${escapeHtml(group)}</div>
      ${items.map(item => `
        <label class="discord-permission-row">
          <span><strong>${escapeHtml(item.label)}</strong><small>${escapeHtml(item.description || "")}</small></span>
          <input type="checkbox" data-role-permission="${escapeAttr(item.key)}" ${enabled.has(item.key)?"checked":""}>
          <i class="discord-toggle"></i>
        </label>`).join("")}
    </section>`).join("");
  rolePermissionsList.querySelectorAll("input").forEach(input => input.addEventListener("change", () => { if (roleUnsavedState) roleUnsavedState.textContent = "Cambios sin guardar"; }));
}

function selectedRolePermissions() {
  return [...document.querySelectorAll("[data-role-permission]:checked")].map(input => input.dataset.rolePermission);
}

createRoleButton?.addEventListener("click", startNewRole);
roleColor?.addEventListener("input", () => { if (roleColorValue) roleColorValue.textContent = roleColor.value.toUpperCase(); if (roleUnsavedState) roleUnsavedState.textContent = "Cambios sin guardar"; });
[roleName, roleDescription].filter(Boolean).forEach(el => el.addEventListener("input", () => { if (roleUnsavedState) roleUnsavedState.textContent = "Cambios sin guardar"; }));
clearRolePermissions?.addEventListener("click", () => { document.querySelectorAll("[data-role-permission]").forEach(input => input.checked = false); if (roleUnsavedState) roleUnsavedState.textContent = "Cambios sin guardar"; });

saveRoleButton?.addEventListener("click", async () => {
  const payload = { name: roleName?.value.trim() || "", description: roleDescription?.value.trim() || "", color: roleColor?.value || "#5865F2", permissions: selectedRolePermissions() };
  if (!payload.name) return alert("Escribe el nombre del rol.");
  try {
    saveRoleButton.disabled = true;
    if (selectedRoleId) await api(`/admin/roles/${selectedRoleId}`, { method:"PUT", body:JSON.stringify(payload) });
    else {
      const data = await api("/admin/roles", { method:"POST", body:JSON.stringify(payload) });
      selectedRoleId = data.id;
    }
    if (roleUnsavedState) roleUnsavedState.textContent = "Guardado";
    await loadRolesAdmin();
    if (can("users.manage_roles")) await loadStaffUsers();
    showAdminToast("Rol guardado correctamente");
  } catch (error) { alert(`No se pudo guardar el rol: ${error.message}`); }
  finally { saveRoleButton.disabled = false; }
});

deleteRoleButton?.addEventListener("click", async () => {
  if (!selectedRoleId || !confirm("¿Eliminar este rol? Los usuarios asignados quedarán sin rol.")) return;
  try { await api(`/admin/roles/${selectedRoleId}`, { method:"DELETE" }); selectedRoleId = null; startNewRole(); await loadRolesAdmin(); if (can("users.manage_roles")) await loadStaffUsers(); showAdminToast("Rol eliminado"); }
  catch (error) { alert(`No se pudo eliminar: ${error.message}`); }
});

async function loadStaffUsers() {
  if (!can("users.manage_roles") || !staffUsersList) return;
  if (!adminRoles.length && can("roles.manage")) await loadRolesAdmin();
  if (!adminRoles.length) {
    try { const roleData = await api("/admin/roles"); adminRoles = roleData.roles || []; permissionDefinitions = roleData.permissions || []; } catch {}
  }
  const data = await api("/admin/users");
  staffUsers = Array.isArray(data.users) ? data.users : [];
  if (staffUsersCount) staffUsersCount.textContent = String(staffUsers.length);
  renderStaffUsers();
}

function renderStaffUsers() {
  if (!staffUsersList) return;
  const q = String(staffUsersSearch?.value || "").trim().toLowerCase();
  const visible = staffUsers.filter(user => !q || String(user.label || "").toLowerCase().includes(q) || String(user.role?.name || "").toLowerCase().includes(q));
  staffUsersList.innerHTML = visible.length ? visible.map(user => `
    <article class="staff-user-row">
      <span class="staff-user-avatar">${escapeHtml((user.label || "U").charAt(0).toUpperCase())}</span>
      <div class="staff-user-copy"><strong>${escapeHtml(user.label || "Usuario")}</strong><small>${user.expiresAt ? `Expira ${escapeHtml(new Date(user.expiresAt).toLocaleString("es-EC"))}` : "Sin fecha de expiración"} · ${user.uses || 0} usos</small></div>
      <label class="staff-role-select"><span>ROL</span><select data-user-role="${user.id}"><option value="">Sin rol</option>${adminRoles.map(role => `<option value="${role.id}" ${Number(user.role?.id)===Number(role.id)?"selected":""}>${escapeHtml(role.name)}</option>`).join("")}</select></label>
      <span class="staff-role-chip" style="--role-color:${escapeAttr(user.role?.color || "#555")}">${escapeHtml(user.role?.name || "Sin acceso al panel")}</span>
    </article>`).join("") : `<div class="empty-admin-state">No hay usuarios que coincidan.</div>`;
  staffUsersList.querySelectorAll("[data-user-role]").forEach(select => select.addEventListener("change", async () => {
    const id = Number(select.dataset.userRole);
    const roleId = select.value ? Number(select.value) : null;
    select.disabled = true;
    try { await api(`/admin/users/${id}/role`, { method:"PUT", body:JSON.stringify({ roleId }) }); await loadStaffUsers(); if (can("audit.view")) loadAudit().catch(()=>{}); showAdminToast("Rol del usuario actualizado"); }
    catch (error) { alert(`No se pudo asignar el rol: ${error.message}`); }
    finally { select.disabled = false; }
  }));
}

staffUsersSearch?.addEventListener("input", renderStaffUsers);
reloadStaffUsers?.addEventListener("click", () => loadStaffUsers().catch(error => alert(error.message)));

async function loadAudit() {
  if (!can("audit.view") || !auditList) return;
  const data = await api("/admin/audit?limit=180");
  auditEntries = Array.isArray(data.entries) ? data.entries : [];
  renderAudit();
}

const AUDIT_LABELS = {
  "product.create":"Producto agregado", "product.update":"Producto editado", "product.delete":"Producto eliminado",
  "role.create":"Rol creado", "role.update":"Rol editado", "role.delete":"Rol eliminado", "user.role.assign":"Rol de usuario cambiado",
  "key.create":"Access Key creada", "key.update":"Access Key actualizada", "key.revoke":"Access Key revocada", "key.regenerate":"Access Key regenerada", "key_archive.delete":"Key vencida eliminada"
};

function renderAudit() {
  if (!auditList) return;
  const q = String(auditSearch?.value || "").trim().toLowerCase();
  const type = auditTypeFilter?.value || "all";
  const visible = auditEntries.filter(entry => {
    const matchType = type === "all" || String(entry.entityType || "").includes(type);
    const hay = `${entry.actorLabel||""} ${entry.action||""} ${entry.entityType||""} ${JSON.stringify(entry.details||{})}`.toLowerCase();
    return matchType && (!q || hay.includes(q));
  });
  auditList.innerHTML = visible.length ? visible.map(entry => `
    <article class="audit-row">
      <span class="audit-icon">${String(entry.action||"").startsWith("product")?"▣":String(entry.action||"").startsWith("role")?"◆":String(entry.action||"").startsWith("key")?"⌁":"•"}</span>
      <div class="audit-copy"><strong>${escapeHtml(AUDIT_LABELS[entry.action] || entry.action || "Acción")}</strong><span>${escapeHtml(entry.actorLabel || "Sistema")} · ${escapeHtml(entry.entityType || "general")}${entry.entityId ? ` #${escapeHtml(entry.entityId)}` : ""}</span></div>
      <time>${escapeHtml(entry.createdAt ? new Date(entry.createdAt).toLocaleString("es-EC") : "")}</time>
    </article>`).join("") : `<div class="empty-admin-state">No hay movimientos para mostrar.</div>`;
}

auditSearch?.addEventListener("input", renderAudit);
auditTypeFilter?.addEventListener("change", renderAudit);
reloadAudit?.addEventListener("click", () => loadAudit().catch(error => alert(error.message)));

/* ---------------- PANELS ---------------- */

function activateAdminPanel(panelId) {
  const titles = {
    productsPanel: "Agregar producto",
    libraryPanel: "Biblioteca",
    keysPanel: "Access Keys",
    rolesPanel: "Roles y permisos",
    usersPanel: "Usuarios y roles",
    auditPanel: "Registro de auditoría",
    brandingPanel: "Apariencia",
    avatarsPanel: "Fotos de perfil",
    contactsPanel: "Contactos",
    announcementsPanel: "Noticias",
    updatesPanel: "Actualizaciones"
  };
  document.querySelectorAll(".admin-nav button").forEach(item => item.classList.toggle("active", item.dataset.panel === panelId));
  document.querySelectorAll(".admin-panel").forEach(panel => panel.classList.toggle("active", panel.id === panelId));
  document.getElementById("adminTitle").textContent = titles[panelId] || "MadeLesh Control";
  if (panelId === "rolesPanel" && can("roles.manage")) loadRolesAdmin().catch(console.warn);
  if (panelId === "avatarsPanel" && can("profiles.manage_avatars")) loadProfileAvatarsAdmin().catch(console.warn);
  if (panelId === "usersPanel" && can("users.manage_roles")) loadStaffUsers().catch(console.warn);
  if (panelId === "auditPanel" && can("audit.view")) loadAudit().catch(console.warn);
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
        const image = safeImageSource(product.imageUrl) ||
          safeImageSource(Array.isArray(product.images) ? product.images[0] : "");
        const fallback = categoryPlaceholderDataUrl(product.category);

        return `
          <article class="admin-list-item admin-product-library-item">
            <div class="admin-product-thumb">
              ${
                `<img src="${escapeAttr(image || fallback)}" alt="${escapeAttr(product.name || "Producto")}" loading="lazy">`
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
              ${can("products.edit") ? `<button data-edit-product="${product.id}">EDITAR</button>` : ""}
              ${can("products.delete") ? `<button class="danger" data-delete-product="${product.id}">ELIMINAR</button>` : ""}
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
  document.getElementById("productScore").value = product.score ?? "";
  document.getElementById("productPrice").value = product.price || "";
  document.getElementById("productDate").value = product.date || "";
  document.getElementById("productImageUrl").value = product.imageUrl || "";
  renderMainImagePreview();
  document.getElementById("productOfficialUrl").value = product.officialUrl || "";
  document.getElementById("productFeatured").value = product.featured === true ? "true" : "false";
  renderTrustedStores(product.trustedStores || []);
  setColorImages(product.specs?.colorImages || []);
  renderColorPicker(product.colors || []);
  setConnections(product.connections || []);
  setProductImages(Array.isArray(product.images) && product.images.length ? product.images : (product.imageUrl ? [product.imageUrl] : []));
  document.getElementById("productYoutube").value = product.reviewLinks?.youtube || "";
  document.getElementById("productTiktok").value = product.reviewLinks?.tiktok || "";
  document.getElementById("productSummary").value = product.summary || "";
  document.getElementById("productPros").value = (product.pros || []).join("\n");
  document.getElementById("productCons").value = (product.cons || []).join("\n");

  renderCategoryFields(product.category || "Mouse", product.specs || {});
  renderProductLivePreview();
  productFormTitle.textContent = "Editar producto";
  productForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetProductForm() {
  productForm.reset();
  if (productImageFile) productImageFile.value = "";
  fixedStoreIcons = { amazon: "", aliexpress: "" };
  renderFixedStoreIconPreviews();
  document.getElementById("productId").value = "";
  productFormTitle.textContent = "Nuevo producto";
  productCategory.value = "Mouse";
  document.getElementById("productStatus").value = "published";
  document.getElementById("productFeatured").value = "false";
  renderTrustedStores([]);
  setColorImages([]);
  renderColorPicker([]);
  setConnections([]);
  setProductImages([]);
  if (productVideoUrl) productVideoUrl.value = "";
  if (keyboardSoundUrl) keyboardSoundUrl.value = "";
  fillProPlayers([]);
  if (productDriverUrl) productDriverUrl.value = "";
  if (productSoftwareUrl) productSoftwareUrl.value = "";
  renderCategoryFields("Mouse", {});
  renderKeyboardSoundVisibility();
  renderKeyboardSoundPreview();
  renderMainImagePreview();
  renderProductLivePreview();
}

resetProduct.addEventListener("click", resetProductForm);

productForm.addEventListener("submit", async event => {
  event.preventDefault();

  const id = document.getElementById("productId").value.trim();
  if (id && !can("products.edit")) return alert("Tu rol no permite editar productos.");
  if (!id && !can("products.create")) return alert("Tu rol no permite agregar productos.");

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

  payload.specs.colorImages = getColorImages();
  payload.specs.productVideo = productVideoUrl?.value.trim() || "";
  payload.specs.keyboardSound = productCategory.value === "Teclados" ? (keyboardSoundUrl?.value.trim() || "") : "";
  payload.specs.proPlayers = parseProPlayers();
  payload.specs.driverDownloadUrl = productDriverUrl?.value.trim() || "";
  payload.specs.softwareDownloadUrl = productSoftwareUrl?.value.trim() || "";

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
    `¿Quieres eliminar "${name}"?\n\nEsta acción borrará el producto de MadeLesh.`
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
  const [activeData, archiveData] = await Promise.all([
    api("/admin/keys"),
    api("/admin/keys/archive")
  ]);

  const keys = Array.isArray(activeData.keys) ? activeData.keys : [];
  const archived = Array.isArray(archiveData.keys) ? archiveData.keys : [];
  const manageKeys = can("keys.manage");

  keysCount.textContent = String(keys.length);
  if (archivedKeysCount) archivedKeysCount.textContent = String(archived.length);

  keysList.innerHTML = keys.length
    ? keys.map(key => {
      const active = Number(key.active) === 1;
      const canReveal = Number(key.can_reveal) === 1;
      const expiryText = key.expires_at ? formatKeyExpiry(key.expires_at) : "SIN EXPIRACIÓN CONFIGURADA";

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
              ${manageKeys && canReveal ? `<button type="button" data-reveal-key="${key.id}">VER KEY</button>` : ""}
              ${manageKeys && canReveal ? `<button type="button" data-copy-key="${key.id}" hidden>COPIAR</button>` : ""}
              ${manageKeys && !canReveal && active ? `<button type="button" data-regenerate-key="${key.id}">REGENERAR KEY</button>` : ""}
            </div>

            <p class="key-meta-line">
              ${Number(key.uses || 0)} usos · ${escapeHtml(expiryText)}
              ${key.last_used_at ? ` · último acceso ${escapeHtml(key.last_used_at)}` : ""}
            </p>

            ${manageKeys ? `<div class="key-edit-grid">
              <label>
                NOMBRE DEL DUEÑO
                <input data-key-owner="${key.id}" type="text" value="${escapeAttr(key.label || "")}" />
              </label>
              <label>
                FECHA Y HORA DE EXPIRACIÓN
                <input data-key-expiry="${key.id}" type="datetime-local" value="${escapeAttr(isoToLocalDateTime(key.expires_at))}" />
              </label>
              <button class="key-save-btn" type="button" data-save-key="${key.id}">GUARDAR DATOS</button>
            </div>` : ""}

            ${manageKeys && active ? `
              <div class="key-extension-row">
                <span>EXTENDER TIEMPO</span>
                <button type="button" data-extend-key="${key.id}" data-days="1">+1 día</button>
                <button type="button" data-extend-key="${key.id}" data-days="7">+7 días</button>
                <button type="button" data-extend-key="${key.id}" data-days="30">+30 días</button>
              </div>` : ""}
          </div>

          <div class="item-actions key-admin-actions">
            ${manageKeys && active ? `<button class="danger" data-revoke-key="${key.id}">REVOCAR</button>` : ""}
          </div>
        </article>
      `;
    }).join("")
    : `<div class="empty-admin-state">No hay access keys activas.</div>`;

  if (archivedKeysList) {
    archivedKeysList.innerHTML = archived.length
      ? archived.map(key => `
          <article class="admin-list-item archived-key-card">
            <div>
              <span class="key-owner-caption">KEY VENCIDA</span>
              <h3>${escapeHtml(key.label || "Sin nombre")}</h3>
              <p class="key-meta-line">
                venció ${escapeHtml(key.expired_at ? new Date(key.expired_at).toLocaleString("es-EC") : "sin fecha")}
                · ${Number(key.uses || 0)} usos
              </p>
            </div>
            ${manageKeys ? `<button class="danger" type="button" data-delete-archived-key="${key.archive_id}">ELIMINAR</button>` : ""}
          </article>
        `).join("")
      : `<div class="empty-admin-state">No hay keys vencidas archivadas.</div>`;
  }

  document.querySelectorAll("[data-reveal-key]").forEach(button => {
    button.addEventListener("click", () => revealAccessKey(Number(button.dataset.revealKey)));
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
  document.querySelectorAll("[data-extend-key]").forEach(button => {
    button.addEventListener("click", () => extendAccessKeyTime(
      Number(button.dataset.extendKey),
      Number(button.dataset.days),
      button
    ));
  });
  document.querySelectorAll("[data-delete-archived-key]").forEach(button => {
    button.addEventListener("click", () => deleteArchivedKey(Number(button.dataset.deleteArchivedKey), button));
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

async function extendAccessKeyTime(id, days, button) {
  const ownerInput = document.querySelector(`[data-key-owner="${id}"]`);
  const expiryInput = document.querySelector(`[data-key-expiry="${id}"]`);
  const label = ownerInput?.value.trim() || "";
  const current = expiryInput?.value ? new Date(expiryInput.value) : new Date();
  const base = Number.isNaN(current.getTime()) || current.getTime() < Date.now() ? new Date() : current;
  const next = new Date(base.getTime() + days * 86400000);

  try {
    button.disabled = true;
    await api(`/admin/keys/${id}`, {
      method: "PUT",
      body: JSON.stringify({ label, expiresAt: next.toISOString() })
    });
    showAdminToast(`Key extendida ${days === 1 ? "1 día" : `${days} días`}`);
    await loadKeys();
  } catch (error) {
    alert(`No se pudo extender la key: ${error.code || error.message}`);
  } finally {
    button.disabled = false;
  }
}

async function deleteArchivedKey(archiveId, button) {
  if (!confirm("¿Eliminar definitivamente esta key vencida del archivo?")) return;
  try {
    button.disabled = true;
    await api(`/admin/keys/archive/${archiveId}`, { method: "DELETE" });
    showAdminToast("Key vencida eliminada del archivo");
    await loadKeys();
  } catch (error) {
    alert(`No se pudo eliminar la key archivada: ${error.code || error.message}`);
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

function safeImageSource(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  if (/^data:image\/(?:png|jpeg|webp);base64,[A-Za-z0-9+/=\s]+$/i.test(text)) return text;
  return safeExternalUrl(text);
}

function safeExternalUrl(value) {
  try {
    const url = new URL(String(value || ""));
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function categoryPlaceholderDataUrl(category) {
  const labels = {
    Mouse: ["MOUSE", "⌁"],
    Teclados: ["TECLADO", "⌨"],
    IEM: ["IEM", "◔"],
    Headsets: ["HEADSET", "◉"],
    DAC: ["DAC", "◫"]
  };
  const [label, icon] = labels[category] || ["PRODUCTO", "◇"];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
    <defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#18181b"/><stop offset="1" stop-color="#25270b"/></linearGradient></defs>
    <rect width="800" height="800" rx="64" fill="url(#g)"/>
    <circle cx="400" cy="340" r="150" fill="none" stroke="#eeff00" stroke-width="8" opacity=".28"/>
    <text x="400" y="385" text-anchor="middle" font-family="Arial,sans-serif" font-size="120" fill="#eeff00">${icon}</text>
    <text x="400" y="575" text-anchor="middle" font-family="Arial,sans-serif" font-size="38" font-weight="700" fill="#ffffff">${label}</text>
    <text x="400" y="625" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#92929a">IMAGEN NO DISPONIBLE</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
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
renderProductGalleryList();
renderKeyboardSoundVisibility();
renderKeyboardSoundPreview();
renderMainImagePreview();
renderProductLivePreview();
restoreAdminSession();
