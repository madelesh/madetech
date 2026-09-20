import { API_BASE } from "./config.js";

const accessGate = document.getElementById("accessGate");
const appRoot = document.getElementById("appRoot");
const keyLoginForm = document.getElementById("keyLoginForm");
const accessKey = document.getElementById("accessKey");
const gateError = document.getElementById("gateError");
const logoutButton = document.getElementById("logoutButton");
const adminShortcut = document.getElementById("adminShortcut");
const profileMenuWrap = document.getElementById("profileMenuWrap");
const profileButton = document.getElementById("profileButton");
const profilePopover = document.getElementById("profilePopover");
const profileName = document.getElementById("profileName");
const profileRole = document.getElementById("profileRole");
const profileButtonLabel = document.getElementById("profileButtonLabel");
const profileSessionLabel = document.getElementById("profileSessionLabel");
const profileExpiryText = document.getElementById("profileExpiryText");

const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.getElementById("themeLabel");
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const reviewsGrid = document.getElementById("reviewsGrid");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const emptyMessage = document.getElementById("emptyMessage");
const modal = document.getElementById("reviewModal");
const modalCard = modal.querySelector(".modal-card");
const modalContent = document.getElementById("modalContent");

let reviews = [];
let currentRole = null;
let currentToken = null;
let currentProfileName = "";
let currentKeyExpiresAt = null;
let keyCountdownTimer = null;

document.getElementById("year").textContent = new Date().getFullYear();

/* ---------------- API ---------------- */

async function api(path, options = {}, token = currentToken) {
  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  let data = {};
  try {
    data = await response.json();
  } catch {}

  if (!response.ok) {
    const error = new Error(data.message || data.error || `HTTP ${response.status}`);
    error.code = data.error || "request_failed";
    error.status = response.status;
    throw error;
  }

  return data;
}

/* ---------------- THEME ---------------- */

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("madetech-theme", theme);

  const dark = theme === "dark";
  themeLabel.textContent = dark ? "Claro" : "Oscuro";
  document.querySelector('meta[name="theme-color"]').setAttribute(
    "content",
    dark ? "#0b0b0c" : "#f4f4f0"
  );
}

const savedTheme = localStorage.getItem("madetech-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
setTheme(savedTheme || preferredTheme);

themeToggle.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

/* ---------------- NAV ---------------- */

menuToggle.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

mobileNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

/* ---------------- SESSION / KEY LOGIN ---------------- */

function showGate(message = "") {
  document.body.classList.remove("session-authenticated");
  appRoot.hidden = true;
  accessGate.hidden = false;

  if (message) {
    gateError.textContent = message;
    gateError.hidden = false;
  } else {
    gateError.hidden = true;
  }
}

function showApp() {
  accessGate.hidden = true;
  appRoot.hidden = false;
  document.body.classList.add("session-authenticated");
  updateProfileMenu();
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

function updateProfileMenu() {
  const isAdmin = currentRole === "admin";
  const displayName = currentProfileName || (isAdmin ? "Administrador" : "Usuario MadeTech");

  profileName.textContent = displayName;
  profileButtonLabel.textContent = displayName;
  profileRole.textContent = isAdmin ? "Cuenta de administrador" : "Acceso por key";

  // Solo una sesión ADMIN puede ver y usar este acceso.
  adminShortcut.hidden = !isAdmin;
  adminShortcut.setAttribute("aria-hidden", String(!isAdmin));
  adminShortcut.tabIndex = isAdmin ? 0 : -1;

  startKeyCountdown();
}

function applySessionProfile(data = {}) {
  currentRole = data.role || currentRole;
  currentProfileName = String(data.profileName || "").trim();
  currentKeyExpiresAt = data.keyExpiresAt || null;
}

function startKeyCountdown() {
  if (keyCountdownTimer) {
    clearInterval(keyCountdownTimer);
    keyCountdownTimer = null;
  }

  updateKeyCountdown();

  if (currentRole === "user" && currentKeyExpiresAt) {
    keyCountdownTimer = setInterval(updateKeyCountdown, 30000);
  }
}

function updateKeyCountdown() {
  if (currentRole === "admin") {
    profileSessionLabel.textContent = "Sesión activa";
    profileExpiryText.textContent = "Cuenta de administrador";
    return;
  }

  profileSessionLabel.textContent = "Key activa";

  if (!currentKeyExpiresAt) {
    profileExpiryText.textContent = "Sin fecha de expiración";
    return;
  }

  const expiration = new Date(currentKeyExpiresAt).getTime();
  const remainingMs = expiration - Date.now();

  if (!Number.isFinite(expiration)) {
    profileExpiryText.textContent = "Expiración no disponible";
    return;
  }

  if (remainingMs <= 0) {
    profileSessionLabel.textContent = "Key expirada";
    profileExpiryText.textContent = "0 h 0 min restantes";
    if (keyCountdownTimer) {
      clearInterval(keyCountdownTimer);
      keyCountdownTimer = null;
    }
    return;
  }

  const totalMinutes = Math.max(0, Math.floor(remainingMs / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  profileExpiryText.textContent = `Expira en ${hours} h ${minutes} min`;
}

function closeProfileMenu() {
  profilePopover.hidden = true;
  profileButton.setAttribute("aria-expanded", "false");
}

function toggleProfileMenu() {
  const willOpen = profilePopover.hidden;
  profilePopover.hidden = !willOpen;
  profileButton.setAttribute("aria-expanded", String(willOpen));
}

profileButton.addEventListener("click", async event => {
  event.stopPropagation();

  // Cada vez que se abre el perfil consultamos D1 otra vez.
  // Así el nombre del dueño y la expiración siempre son los actuales.
  if (profilePopover.hidden && currentToken) {
    try {
      const me = await api("/session/me", { method: "GET" }, currentToken);
      applySessionProfile(me);
      updateProfileMenu();
    } catch {
      // Si la sesión dejó de ser válida, volvemos al acceso por key.
      localStorage.removeItem("madetech_user_token");
      localStorage.removeItem("madetech_admin_token");
      currentToken = null;
      currentRole = null;
      showGate("Tu sesión expiró. Ingresa nuevamente.");
      return;
    }
  }

  toggleProfileMenu();
});

profilePopover.addEventListener("click", event => event.stopPropagation());

// Protección adicional: aunque alguien manipule el HTML, una sesión por key
// no puede usar el acceso del perfil al panel administrativo.
adminShortcut.addEventListener("click", event => {
  if (currentRole !== "admin") {
    event.preventDefault();
    adminShortcut.hidden = true;
    closeProfileMenu();
  }
});

document.addEventListener("click", event => {
  if (!profileMenuWrap.contains(event.target)) closeProfileMenu();
});

async function restoreSession() {
  const userToken = localStorage.getItem("madetech_user_token");
  const adminToken = localStorage.getItem("madetech_admin_token");
  const candidate = userToken || adminToken;

  if (!candidate) {
    showGate();
    return;
  }

  try {
    const me = await api("/session/me", { method: "GET" }, candidate);
    currentToken = candidate;
    applySessionProfile(me);

    adminShortcut.hidden = me.role !== "admin";
    showApp();
    await loadReviews();
  } catch {
    localStorage.removeItem("madetech_user_token");
    if (userToken) currentToken = null;

    if (adminToken && candidate === adminToken) {
      localStorage.removeItem("madetech_admin_token");
    }

    showGate("Tu sesión expiró. Ingresa nuevamente.");
  }
}

keyLoginForm.addEventListener("submit", async event => {
  event.preventDefault();
  gateError.hidden = true;

  const key = accessKey.value.trim();
  if (!key) return;

  const button = keyLoginForm.querySelector("button");
  const original = button.innerHTML;

  button.disabled = true;
  button.textContent = "COMPROBANDO...";

  try {
    const result = await api("/access/login", {
      method: "POST",
      body: JSON.stringify({ key })
    }, null);

    localStorage.setItem("madetech_user_token", result.token);
    currentToken = result.token;

    // Tomamos el perfil directamente desde la base de datos para mostrar
    // el nombre real del dueño y la expiración exacta de la key.
    const me = await api("/session/me", { method: "GET" }, currentToken);
    applySessionProfile(me);

    accessKey.value = "";
    adminShortcut.hidden = true;
    showApp();
    await loadReviews();
  } catch (error) {
    const messages = {
      invalid_key: "La key no es válida o fue revocada.",
      expired_key: "Esta key ha expirado."
    };

    gateError.textContent = messages[error.code] || "No pudimos validar la key.";
    gateError.hidden = false;
  } finally {
    button.disabled = false;
    button.innerHTML = original;
  }
});

logoutButton.addEventListener("click", async () => {
  closeProfileMenu();
  try {
    if (currentToken) {
      await api("/session/logout", { method: "POST" });
    }
  } catch {}

  if (currentRole === "admin") {
    localStorage.removeItem("madetech_admin_token");
  } else {
    localStorage.removeItem("madetech_user_token");
  }

  // Limpiamos cualquier sesión guardada en este navegador.
  localStorage.removeItem("madetech_user_token");
  localStorage.removeItem("madetech_admin_token");

  currentToken = null;
  currentRole = null;
  currentProfileName = "";
  currentKeyExpiresAt = null;

  if (keyCountdownTimer) {
    clearInterval(keyCountdownTimer);
    keyCountdownTimer = null;
  }

  reviews = [];
  adminShortcut.hidden = true;
  closeProfileMenu();
  showGate();
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
});

/* ---------------- PRODUCTS ---------------- */

async function loadReviews() {
  reviewsGrid.innerHTML = `<div class="review-loading">Cargando reviews...</div>`;

  try {
    const data = await api("/products");
    reviews = Array.isArray(data.products) ? data.products : [];
    renderReviews();
    updateFeatured();
  } catch (error) {
    console.error(error);
    reviewsGrid.innerHTML = `<div class="review-loading">No se pudieron cargar las reviews.</div>`;
  }
}

function cardTemplate(review) {
  const score = Number(review.score || 0);
  const category = review.category || "Producto";
  const image = safeUrl(review.imageUrl);

  return `
    <article class="review-card" data-category="${escapeHtml(category)}"
             data-review="${review.id}" tabindex="0" role="button"
             aria-label="Abrir ${escapeHtml(review.name || "")}">
      <div class="review-visual">
        ${
          image
            ? `<img src="${image}" alt="${escapeHtml(review.name || "Producto")}"
                 style="position:absolute;inset:12%;width:76%;height:76%;object-fit:contain;z-index:2;filter:drop-shadow(0 22px 35px rgba(0,0,0,.45));">`
            : `<div class="visual-shape"></div>`
        }
        <div class="score-badge">${score.toFixed(1)}</div>
      </div>

      <div class="review-content">
        <div class="review-meta">
          <span>${escapeHtml(category)}</span>
          <span>${escapeHtml(review.date || "")}</span>
        </div>

        <h3>${escapeHtml(review.brand || "")}<br>${escapeHtml(review.name || "")}</h3>
        <p>${escapeHtml(review.summary || "")}</p>

        <div class="review-read">
          <span>VER PRODUCTO</span>
          <span>${escapeHtml(review.price || "")} ↗</span>
        </div>
      </div>
    </article>
  `;
}

function renderReviews() {
  const text = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;

  const filtered = reviews.filter(review => {
    const categoryOK = category === "Todos" || review.category === category;
    const haystack = `${review.brand || ""} ${review.name || ""} ${review.model || ""} ${review.category || ""} ${review.summary || ""}`.toLowerCase();
    return categoryOK && (!text || haystack.includes(text));
  });

  reviewsGrid.innerHTML = filtered.map(cardTemplate).join("");
  emptyMessage.hidden = filtered.length > 0;
  bindCards();
}

function bindCards() {
  reviewsGrid.querySelectorAll(".review-card").forEach(card => {
    const open = () => openReview(Number(card.dataset.review));

    card.addEventListener("click", open);
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  });
}

function updateFeatured() {
  const featured = reviews.find(item => item.featured === true) || reviews[0];
  if (!featured) return;

  document.getElementById("featuredName").textContent =
    `${featured.brand || ""} ${featured.name || ""}`.trim();
  document.getElementById("featuredText").textContent = featured.summary || "";
  document.getElementById("featuredScore").textContent =
    Number(featured.score || 0).toFixed(1);

  document.getElementById("featuredLink").onclick = event => {
    event.preventDefault();
    openReview(Number(featured.id));
  };
}

/* ---------------- PRODUCT DETAIL ---------------- */

async function openReview(id) {
  try {
    const data = await api(`/products/${id}`);
    const review = data.product;
    const rating = data.rating || { average: 0, count: 0, mine: 0 };

    modalCard.classList.add("product-modal-card");

    modalContent.innerHTML = `
      <section class="product-detail-hero">
        <div class="product-detail-media">
          ${productImageHtml(review)}
        </div>

        <div class="product-detail-copy">
          <div class="product-detail-kicker">
            <span>${escapeHtml(review.category || "")}</span>
            ${review.date ? `<span>· ${escapeHtml(review.date)}</span>` : ""}
            ${review.price ? `<span>· ${escapeHtml(review.price)}</span>` : ""}
          </div>

          <h2 id="modalTitle" class="product-detail-title">${escapeHtml(review.name || "")}</h2>

          <p class="product-detail-model">
            ${review.brand ? escapeHtml(review.brand) : ""}
            ${review.model ? ` · Modelo ${escapeHtml(review.model)}` : ""}
          </p>

          <div class="product-editor-score">
            <strong>${Number(review.score || 0).toFixed(1)}</strong>
            <span>/10 MadeTech Score</span>
          </div>

          <p class="product-detail-summary">${escapeHtml(review.summary || "")}</p>
        </div>
      </section>

      <div class="product-detail-body">
        <section class="product-info-section">
          <div class="product-section-head">
            <h3>Información del producto</h3>
            <p>Datos principales</p>
          </div>

          <div class="product-core-grid">
            ${coreSpec("Nombre", review.name)}
            ${coreSpec("Modelo", review.model)}
            ${coreSpec("Marca", review.brand)}
            ${coreSpec("Categoría", review.category)}
          </div>
        </section>

        ${renderColors(review.colors)}
        ${renderConnections(review.connections)}

        <section class="product-info-section">
          <div class="product-section-head">
            <h3>Especificaciones</h3>
            <p>${escapeHtml(review.category || "")}</p>
          </div>

          <div class="product-spec-grid">
            ${buildSpecs(review).map(renderSpecCard).join("")}
          </div>
        </section>

        ${renderPurchaseLinks(review)}
        ${renderReviewLinks(review)}

        <section class="product-info-section">
          <div class="product-section-head">
            <h3>Calificación de usuarios</h3>
            <p>Una valoración por acceso</p>
          </div>

          <div class="community-rating">
            <div class="community-score">
              <strong id="communityAverage">${Number(rating.average || 0).toFixed(1)}</strong>
              <div class="community-score-meta">
                <span class="stars-static">${starsText(rating.average || 0)}</span>
                <small id="communityCount">${rating.count || 0} ${(rating.count || 0) === 1 ? "persona ha calificado" : "personas han calificado"}</small>
              </div>
            </div>

            <div class="user-rating-box">
              <h4>Tu calificación</h4>
              ${
                currentRole === "user"
                  ? `
                    <p>${rating.mine ? `Tu valoración actual es ${rating.mine}/5.` : "Selecciona de 1 a 5 estrellas."}</p>
                    <div class="star-input" id="starInput">
                      ${[1,2,3,4,5].map(value => `
                        <button type="button" data-rating="${value}" class="${value <= (rating.mine || 0) ? "active" : ""}"
                                aria-label="${value} estrellas">★</button>
                      `).join("")}
                    </div>
                    <div class="rating-status" id="ratingStatus">
                      ${rating.mine ? "Puedes cambiar tu calificación cuando quieras." : "Tu voto quedará asociado a tu key."}
                    </div>
                  `
                  : `<p>La cuenta de administrador no participa en las calificaciones.</p>`
              }
            </div>
          </div>
        </section>

        ${renderProsCons(review)}
      </div>
    `;

    bindProductGallery();
    if (currentRole === "user") bindRatingButtons(id, Number(rating.mine || 0));

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  } catch (error) {
    console.error(error);
    alert("No se pudo abrir este producto.");
  }
}

function productImageHtml(review) {
  const images = [...new Set([
    ...(Array.isArray(review.images) ? review.images : []),
    review.imageUrl
  ].map(safeUrl).filter(Boolean))].slice(0, 5);

  if (!images.length) {
    return `<div class="product-detail-placeholder" aria-label="Imagen no disponible"></div>`;
  }

  return `
    <div class="product-gallery" data-product-gallery>
      <div class="product-gallery-main">
        <img class="product-detail-image" data-gallery-main src="${images[0]}" alt="${escapeHtml(review.name || "Producto")}">
      </div>
      ${images.length > 1 ? `
        <div class="product-gallery-thumbs" aria-label="Galería de imágenes">
          ${images.map((url, index) => `
            <button type="button" class="product-gallery-thumb ${index === 0 ? "active" : ""}"
              data-gallery-image="${escapeHtml(url)}" aria-label="Ver imagen ${index + 1}">
              <img src="${url}" alt="Miniatura ${index + 1}">
            </button>
          `).join("")}
        </div>` : ""}
      ${renderGalleryColors(review.colors)}
    </div>`;
}

function bindProductGallery() {
  const gallery = document.querySelector("[data-product-gallery]");
  if (!gallery) return;
  const main = gallery.querySelector("[data-gallery-main]");
  gallery.querySelectorAll("[data-gallery-image]").forEach(button => {
    button.addEventListener("click", () => {
      const url = safeUrl(button.dataset.galleryImage);
      if (!url || !main) return;
      main.src = url;
      gallery.querySelectorAll("[data-gallery-image]").forEach(item => item.classList.remove("active"));
      button.classList.add("active");
    });
  });
}

function renderGalleryColors(colors) {
  if (!Array.isArray(colors) || !colors.length) return "";
  return `
    <div class="product-gallery-colors">
      <span>Colores</span>
      <div>${colors.slice(0, 8).map(color => `
        <span class="gallery-color-dot" title="${escapeHtml(color.name || "Color")}" style="background:${safeColor(color.hex)}"></span>
      `).join("")}</div>
    </div>`;
}

function coreSpec(label, value) {
  const available = value !== undefined && value !== null && String(value).trim() !== "";
  return `
    <article class="product-spec-card ${available ? "" : "spec-unavailable"}">
      <span>${escapeHtml(label)}</span>
      <strong>${available ? escapeHtml(formatValue(value)) : "No disponible"}</strong>
    </article>
  `;
}

function renderSpecCard(item) {
  if (item.type === "grips") return renderGripSpec(item.value);
  return coreSpec(item.label, item.value);
}

function renderGripSpec(grips) {
  const selected = Array.isArray(grips) ? grips : [];
  const all = ["Palm", "Claw", "Fingertip"];
  return `
    <article class="product-spec-card grip-spec-card ${selected.length ? "" : "spec-unavailable"}">
      <span>Tipos de agarre</span>
      ${selected.length ? `
        <div class="grip-visual-list">
          ${all.filter(type => selected.includes(type)).map(type => `
            <div class="grip-visual-item">
              ${gripIcon(type)}
              <strong>${type}</strong>
            </div>
          `).join("")}
        </div>` : `<strong>No disponible</strong>`}
    </article>`;
}

function gripIcon(type) {
  const cls = String(type || "").toLowerCase();
  if (cls === "palm") {
    return `<svg class="grip-icon" viewBox="0 0 64 44" aria-hidden="true"><rect x="24" y="8" width="18" height="30" rx="9"></rect><path d="M11 24c8-12 16-15 25-11M11 24c7 2 13 6 18 13"></path><circle cx="33" cy="15" r="2"></circle></svg>`;
  }
  if (cls === "claw") {
    return `<svg class="grip-icon" viewBox="0 0 64 44" aria-hidden="true"><rect x="25" y="9" width="17" height="29" rx="8"></rect><path d="M9 29c6-13 11-19 18-20M15 14l7 8 7-11M15 31c6 0 10 2 14 7"></path></svg>`;
  }
  return `<svg class="grip-icon" viewBox="0 0 64 44" aria-hidden="true"><rect x="27" y="9" width="16" height="29" rx="8"></rect><path d="M8 20c9-4 14-5 21-4M8 20l8 4M16 24l8-4"></path><circle cx="35" cy="16" r="2"></circle></svg>`;
}


function buildSpecs(product) {
  const s = product.specs || {};
  const list = [];
  const add = (label, value, type = "normal") => list.push({ label, value, type });

  if (product.category === "Mouse") {
    add("Sensor", s.sensor);
    add("Peso", s.weight ? `${s.weight} g` : "");
    add("Switches", s.switchType);
    add("Dongle 8K", dongleLabel(s.dongle8k));
    add("Agarres", Array.isArray(s.gripTypes) ? s.gripTypes : [], "grips");
    add("Polling rate", s.pollingRate);
    add("Batería", s.batteryHours ? `${s.batteryHours} h` : "");
    add("Dimensiones", s.dimensions);
  }

  if (product.category === "Teclados") {
    add("Switches", s.switchType);
    add("Tecnología", s.switchTechnology);
    add("Formato", s.layout);
    add("Hot-swap", yesNo(s.hotSwap));
    add("Rapid Trigger", yesNo(s.rapidTrigger));
    add("Polling rate", s.pollingRate);
    add("Keycaps", s.keycaps);
    add("Montaje", s.mount);
    add("Batería", s.batteryHours ? `${s.batteryHours} h` : "");
  }

  if (product.category === "IEM") {
    add("Drivers", s.driverConfig);
    add("Firma sonora", s.soundSignature);
    add("Impedancia", s.impedance);
    add("Sensibilidad", s.sensitivity);
    add("Respuesta en frecuencia", s.frequencyResponse);
    add("Conector del cable", s.cableConnector);
    add("Plug", s.plug);
    add("Cable desmontable", yesNo(s.detachableCable));
    add("Micrófono", s.microphone);
    add("Peso por lado", s.weightPerSide ? `${s.weightPerSide} g` : "");
  }

  if (product.category === "Headsets") {
    add("Driver", s.driver);
    add("Micrófono", s.microphone);
    add("Micrófono desmontable", yesNo(s.detachableMic));
    add("Peso", s.weight ? `${s.weight} g` : "");
    add("Autonomía", s.batteryHours ? `${s.batteryHours} h` : "");
    add("Codec", s.codec);
    add("Sonido espacial", s.spatialAudio);
    add("Impedancia", s.impedance);
    add("Respuesta en frecuencia", s.frequencyResponse);
    add("Almohadillas", s.earpads);
  }

  if (product.category === "DAC") {
    add("Chip DAC", s.dacChip);
    add("Amplificador", s.ampChip);
    add("Entradas", arrayLabel(s.inputs));
    add("Salidas", arrayLabel(s.outputs));
    add("PCM máximo", s.maxPcm);
    add("DSD máximo", s.maxDsd);
    add("Potencia", s.powerOutput);
    add("Balanceado", yesNo(s.balanced));
    add("Bluetooth", s.bluetooth);
    add("Codecs Bluetooth", arrayLabel(s.bluetoothCodecs));
    add("Ganancia", s.gain);
  }

  return list;
}

function pushSpec(list, label, value) {
  if (value !== undefined && value !== null && String(value).trim() !== "") {
    list.push({ label, value });
  }
}

function renderColors(colors) {
  if (!Array.isArray(colors) || !colors.length) return "";
  return `
    <section class="product-info-section">
      <div class="product-section-head"><h3>Colores disponibles</h3><p>${colors.length} colores</p></div>
      <div class="product-color-list">
        ${colors.map(item => `
          <span class="product-color">
            <span class="product-color-dot" style="background:${safeColor(item.hex)}"></span>
            ${escapeHtml(item.name || item.hex || "Color")}
          </span>
        `).join("")}
      </div>
    </section>
  `;
}

function renderConnections(connections) {
  if (!Array.isArray(connections) || !connections.length) return "";
  return `
    <section class="product-info-section">
      <div class="product-section-head"><h3>Tipos de conexión</h3><p>${connections.length} opciones</p></div>
      <div class="product-chip-group">
        ${connections.map(item => `<span class="product-chip">${connectionIcon(item)}${escapeHtml(item)}</span>`).join("")}
      </div>
    </section>
  `;
}

function renderPurchaseLinks(product) {
  const official = safeUrl(product.officialUrl);
  const stores = Array.isArray(product.trustedStores) ? product.trustedStores : [];
  if (!official && !stores.length) return "";

  return `
    <section class="product-info-section">
      <div class="product-section-head"><h3>Dónde comprar</h3><p>Enlaces externos</p></div>
      <div class="product-links-grid">
        ${official ? `
          <a class="purchase-card official-purchase" href="${official}" target="_blank" rel="noopener noreferrer">
            <div><span class="link-icon">${storeIcon()}</span><span class="link-copy"><span>PÁGINA OFICIAL</span><strong>Comprar en ${escapeHtml(product.brand || "la marca")}</strong></span></div><span>↗</span>
          </a>` : ""}
        ${stores.map(store => {
          const url = safeUrl(store.url);
          if (!url) return "";
          return `
            <a class="purchase-card" href="${url}" target="_blank" rel="noopener noreferrer">
              <div><span class="link-icon">${storeIcon()}</span><span class="link-copy"><span>TIENDA DE CONFIANZA</span><strong>${escapeHtml(store.name || "Tienda")}</strong></span></div><span>↗</span>
            </a>`;
        }).join("")}
      </div>
    </section>
  `;
}

function renderReviewLinks(product) {
  const youtube = safeUrl(product.reviewLinks?.youtube);
  const tiktok = safeUrl(product.reviewLinks?.tiktok);
  if (!youtube && !tiktok) return "";

  return `
    <section class="product-info-section">
      <div class="product-section-head"><h3>Ver la review</h3><p>Contenido externo</p></div>
      <div class="product-links-grid">
        ${youtube ? `<a class="review-link-card youtube" href="${youtube}" target="_blank" rel="noopener noreferrer"><div><span class="link-icon">${youtubeIcon()}</span><span class="link-copy"><span>YOUTUBE</span><strong>Ver review completa</strong></span></div><span>↗</span></a>` : ""}
        ${tiktok ? `<a class="review-link-card tiktok" href="${tiktok}" target="_blank" rel="noopener noreferrer"><div><span class="link-icon">${tiktokIcon()}</span><span class="link-copy"><span>TIKTOK</span><strong>Ver review corta</strong></span></div><span>↗</span></a>` : ""}
      </div>
    </section>
  `;
}

function renderProsCons(product) {
  const pros = Array.isArray(product.pros) ? product.pros : [];
  const cons = Array.isArray(product.cons) ? product.cons : [];
  if (!pros.length && !cons.length) return "";

  return `
    <section class="product-info-section">
      <div class="product-section-head"><h3>Pros y contras</h3><p>Resumen MadeTech</p></div>
      <div class="procon-rich-grid">
        <article class="procon-rich-card"><h4>Pros</h4><ul>${pros.map(item => `<li>${escapeHtml(item)}</li>`).join("") || "<li>Sin datos</li>"}</ul></article>
        <article class="procon-rich-card"><h4>Contras</h4><ul>${cons.map(item => `<li>${escapeHtml(item)}</li>`).join("") || "<li>Sin datos</li>"}</ul></article>
      </div>
    </section>
  `;
}

/* ---------------- RATINGS ---------------- */

function bindRatingButtons(productId, mine) {
  const buttons = [...document.querySelectorAll("#starInput [data-rating]")];
  const status = document.getElementById("ratingStatus");

  buttons.forEach(button => {
    button.addEventListener("click", async () => {
      const value = Number(button.dataset.rating);
      paintStars(buttons, value);
      status.textContent = "Guardando tu calificación...";

      try {
        const data = await api(`/products/${productId}/rating`, {
          method: "PUT",
          body: JSON.stringify({ rating: value })
        });

        const updated = data.rating;
        document.getElementById("communityAverage").textContent =
          Number(updated.average || 0).toFixed(1);
        document.getElementById("communityCount").textContent =
          `${updated.count || 0} ${(updated.count || 0) === 1 ? "persona ha calificado" : "personas han calificado"}`;

        const staticStars = document.querySelector(".stars-static");
        if (staticStars) staticStars.textContent = starsText(updated.average || 0);

        mine = value;
        status.textContent = `Tu calificación: ${value}/5. Puedes cambiarla cuando quieras.`;
      } catch {
        paintStars(buttons, mine);
        status.textContent = "No se pudo guardar tu calificación.";
      }
    });

    button.addEventListener("mouseenter", () => {
      paintStars(buttons, Number(button.dataset.rating));
    });
  });

  document.getElementById("starInput")?.addEventListener("mouseleave", () => {
    paintStars(buttons, mine);
  });
}

function paintStars(buttons, value) {
  buttons.forEach(button => {
    button.classList.toggle("active", Number(button.dataset.rating) <= value);
  });
}

function starsText(average) {
  const rounded = Math.round(Number(average || 0));
  return "★".repeat(rounded) + "☆".repeat(5 - rounded);
}

/* ---------------- ICONS / HELPERS ---------------- */

function connectionIcon(label) {
  const value = String(label || "").toLowerCase();
  if (value.includes("bluetooth")) return `<svg viewBox="0 0 24 24"><path d="M7 7l10 10-5 4V3l5 4L7 17"></path></svg>`;
  if (value.includes("2.4") || value.includes("wireless") || value.includes("inalámbr")) return `<svg viewBox="0 0 24 24"><path d="M5 9a10 10 0 0 1 14 0M8 12a6 6 0 0 1 8 0M11 15a2 2 0 0 1 2 0"></path><circle cx="12" cy="18" r="1"></circle></svg>`;
  if (value.includes("usb") || value.includes("cable") || value.includes("wired")) return `<svg viewBox="0 0 24 24"><path d="M12 3v13M12 3l-2 2M12 3l2 2M12 10l-4 4H5M8 14h3M12 13l4 4h3"></path><circle cx="19" cy="17" r="1.5"></circle><rect x="3" y="13" width="2" height="2"></rect></svg>`;
  return `<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"></path></svg>`;
}

function storeIcon() {
  return `<svg viewBox="0 0 24 24"><path d="M4 10h16l-1-5H5l-1 5zM6 10v9h12v-9M9 19v-5h6v5"></path></svg>`;
}

function youtubeIcon() {
  return `<svg viewBox="0 0 24 24"><path d="M21 12s0-5-1-6-4-1-8-1-7 0-8 1-1 6-1 6 0 5 1 6 1 7 0 8-1 1-6 1-6z"></path><path d="m10 9 5 3-5 3z"></path></svg>`;
}

function tiktokIcon() {
  return `<svg viewBox="0 0 24 24"><path d="M14 4v10a4 4 0 1 1-4-4M14 4c1 3 3 4 6 4"></path></svg>`;
}

function dongleLabel(value) {
  if (value === "included") return "Incluido";
  if (value === "separate") return "Se compra aparte";
  if (value === "not_supported") return "No compatible";
  return value || "";
}

function yesNo(value) {
  if (value === true || String(value).toLowerCase() === "true") return "Sí";
  if (value === false || String(value).toLowerCase() === "false") return "No";
  return value || "";
}

function arrayLabel(value) {
  return Array.isArray(value) ? value.join(", ") : (value || "");
}

function formatValue(value) {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "Sí" : "No";
  return value;
}

function safeUrl(value) {
  if (!value) return "";
  try {
    const url = new URL(String(value));
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function safeColor(value) {
  const color = String(value || "").trim();
  if (/^#[0-9a-f]{3,8}$/i.test(color)) return color;
  if (/^[a-z]{3,20}$/i.test(color)) return color;
  return "#888888";
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  modalCard.classList.remove("product-modal-card");
}

modal.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if (modal.classList.contains("open")) closeModal();
    closeProfileMenu();
  }
});

searchInput.addEventListener("input", renderReviews);
categorySelect.addEventListener("change", renderReviews);

document.querySelectorAll("[data-filter]").forEach(button => {
  button.addEventListener("click", () => {
    categorySelect.value = button.dataset.filter;
    renderReviews();
    document.getElementById("reviews").scrollIntoView({ behavior: "smooth" });
  });
});

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

restoreSession();
