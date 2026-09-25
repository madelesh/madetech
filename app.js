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
const categoryFilterTrigger = document.getElementById("categoryFilterTrigger");
const categoryFilterText = document.getElementById("categoryFilterText");
const categoryFilterMenu = document.getElementById("categoryFilterMenu");
const colorFilterTrigger = document.getElementById("colorFilterTrigger");
const colorFilterText = document.getElementById("colorFilterText");
const colorFilterMenu = document.getElementById("colorFilterMenu");
const connectionFilterTrigger = document.getElementById("connectionFilterTrigger");
const connectionFilterText = document.getElementById("connectionFilterText");
const connectionFilterMenu = document.getElementById("connectionFilterMenu");
const priceSort = document.getElementById("priceSort");
const brandFilterTrigger = document.getElementById("brandFilterTrigger");
const brandFilterText = document.getElementById("brandFilterText");
const brandFilterMenu = document.getElementById("brandFilterMenu");
const clearFilters = document.getElementById("clearFilters");
const emptyMessage = document.getElementById("emptyMessage");
const modal = document.getElementById("reviewModal");
const modalCard = modal.querySelector(".modal-card");
const modalContent = document.getElementById("modalContent");
const siteFavicon = document.getElementById("siteFavicon");
const siteBrandLogos = [...document.querySelectorAll(".site-brand-logo")];
const brandFallbacks = [...document.querySelectorAll(".brand-fallback")];
const contactSocials = document.getElementById("contactSocials");
const contactEmpty = document.getElementById("contactEmpty");
const monthlyBanner = document.getElementById("destacado");
const featuredBanner = document.getElementById("featuredBanner");
const featuredBannerBrand = document.getElementById("featuredBannerBrand");
const featuredBannerName = document.getElementById("featuredBannerName");
const featuredBannerText = document.getElementById("featuredBannerText");
const featuredBannerPrice = document.getElementById("featuredBannerPrice");
const featuredBannerImage = document.getElementById("featuredBannerImage");
const featuredBannerButton = document.getElementById("featuredBannerButton");
const featuredBannerNav = document.getElementById("featuredBannerNav");
const featuredPrev = document.getElementById("featuredPrev");
const featuredNext = document.getElementById("featuredNext");
const featuredDots = document.getElementById("featuredDots");
const featuredBannerReadMore = document.getElementById("featuredBannerReadMore");
const headerNewsTicker = document.getElementById("headerNewsTicker");
const headerNewsTrack = document.getElementById("headerNewsTrack");
const siteVersionLabel = document.getElementById("siteVersionLabel");
const footerReleaseToggle = document.getElementById("footerReleaseToggle");
const footerReleasePanel = document.getElementById("footerReleasePanel");
const footerReleaseTitle = document.getElementById("footerReleaseTitle");
const footerReleaseDate = document.getElementById("footerReleaseDate");
const footerReleaseChanges = document.getElementById("footerReleaseChanges");
const productNotificationWrap = document.getElementById("productNotificationWrap");
const productNotificationButton = document.getElementById("productNotificationButton");
const productNotificationBadge = document.getElementById("productNotificationBadge");
const productNotificationPopover = document.getElementById("productNotificationPopover");
const productNotificationCount = document.getElementById("productNotificationCount");
const productNotificationList = document.getElementById("productNotificationList");

let reviews = [];
let currentRole = null;
let currentToken = null;
let currentProfileName = "";
let currentKeyExpiresAt = null;
let keyCountdownTimer = null;
let featuredProducts = [];
let featuredIndex = 0;
let featuredTimer = null;
let publicBranding = {};
let publicContacts = {};
let publicAnnouncements = [];
let publicAppVersion = "5.18";
let publicRelease = { version: "5.18", title: "", date: "", notes: [] };
const CURRENT_BUILD_RELEASE = {
  version: "5.24",
  title: "Roles, auditoría, comparación visual y audio",
  date: "2026-09-24",
  changes: {
    added: [
      "Roles personalizables con permisos individuales para colaboradores.",
      "Asignación de roles a usuarios con Access Key y registro de auditoría.",
      "Editor para recortar audio de teclados desde archivos de audio o video.",
      "Selector visual con imágenes dentro del comparador."
    ],
    removed: [],
    fixed: [
      "Comparador rediseñado con resultado visual, métricas y balance dinámico.",
      "Animación del perfil invertida: avatar a la izquierda y nombre hacia la derecha."
    ]
  }
};

const selectedProductFilters = {
  category: new Set(),
  color: new Set(),
  connection: new Set(),
  brand: new Set()
};

const multiFilterConfig = {
  category: {
    trigger: categoryFilterTrigger,
    text: categoryFilterText,
    menu: categoryFilterMenu,
    allLabel: "Todas"
  },
  color: {
    trigger: colorFilterTrigger,
    text: colorFilterText,
    menu: colorFilterMenu,
    allLabel: "Todos"
  },
  connection: {
    trigger: connectionFilterTrigger,
    text: connectionFilterText,
    menu: connectionFilterMenu,
    allLabel: "Todas"
  },
  brand: {
    trigger: brandFilterTrigger,
    text: brandFilterText,
    menu: brandFilterMenu,
    allLabel: "Todas"
  }
};

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


/* ---------------- PUBLIC SETTINGS ---------------- */

async function loadPublicSettings() {
  try {
    const data = await api("/settings", { method: "GET" }, null);
    publicBranding = data.branding || {};
    publicContacts = data.contacts || {};
    publicAnnouncements = Array.isArray(data.announcements) ? data.announcements : [];
    publicAppVersion = String(data.appVersion || data.release?.version || "5.18");
    publicRelease = data.release && typeof data.release === "object" && String(data.release.version || "") === CURRENT_BUILD_RELEASE.version
      ? data.release
      : CURRENT_BUILD_RELEASE;
    applyPublicBranding(publicBranding);
    renderPublicContacts(publicContacts);
    renderHeaderAnnouncements(publicAnnouncements);
    renderPublicRelease(publicRelease, publicAppVersion);
  } catch (error) {
    console.warn("No se pudieron cargar los ajustes públicos de MadeLesh", error);
  }
}


function releaseIcon(type) {
  const icons = {
    added: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg>`,
    removed: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"></path></svg>`,
    fixed: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 13 4 4L19 7"></path></svg>`
  };
  return icons[type] || icons.added;
}

function renderPublicRelease(release = {}, version = "5.20") {
  if (siteVersionLabel) {
    siteVersionLabel.textContent = `MadeLesh v${String(version || "5.20").replace(/^v/i, "")}`;
  }

  if (!footerReleasePanel || !footerReleaseToggle || !footerReleaseChanges) return;

  const fallbackChanges = classifyReleaseNotesClient(release.notes || []);
  const source = release.changes && typeof release.changes === "object" ? release.changes : fallbackChanges;
  const changes = {
    added: Array.isArray(source.added) ? source.added.filter(Boolean).slice(0, 8) : [],
    removed: Array.isArray(source.removed) ? source.removed.filter(Boolean).slice(0, 8) : [],
    fixed: Array.isArray(source.fixed) ? source.fixed.filter(Boolean).slice(0, 8) : []
  };

  footerReleaseTitle.textContent = String(release.title || "Actualización de MadeLesh");

  const groups = [
    ["added", "Se añadió", changes.added],
    ["removed", "Se eliminó", changes.removed],
    ["fixed", "Se arregló", changes.fixed]
  ].filter(([, , items]) => items.length);

  footerReleaseChanges.innerHTML = groups.map(([type, title, items]) => `
    <section class="footer-release-group footer-release-${type}">
      <div class="footer-release-group-title">
        <span class="footer-release-group-icon">${releaseIcon(type)}</span>
        <strong>${title}</strong>
      </div>
      <ul>${items.map(note => `<li>${escapeHtml(note)}</li>`).join("")}</ul>
    </section>
  `).join("");

  const date = String(release.date || "").trim();
  if (date) {
    const parsed = new Date(`${date}T12:00:00`);
    footerReleaseDate.textContent = Number.isNaN(parsed.getTime())
      ? date
      : new Intl.DateTimeFormat("es-EC", { day: "2-digit", month: "short", year: "numeric" }).format(parsed);
  } else {
    footerReleaseDate.textContent = "";
  }

  footerReleaseToggle.hidden = groups.length === 0;
  if (!groups.length) footerReleasePanel.hidden = true;
}

function classifyReleaseNotesClient(notes = []) {
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

footerReleaseToggle?.addEventListener("click", () => {
  const open = footerReleasePanel.hidden;
  footerReleasePanel.hidden = !open;
  footerReleaseToggle.setAttribute("aria-expanded", String(open));
  footerReleaseToggle.textContent = open ? "Ocultar cambios" : "Ver cambios";
});

function applyPublicBranding(branding = publicBranding) {
  publicBranding = branding || {};
  const dark = root.dataset.theme === "dark";
  const logo = String(
    dark
      ? (branding?.logoDarkDataUrl || branding?.logoLightDataUrl || branding?.logoDataUrl || "")
      : (branding?.logoLightDataUrl || branding?.logoDarkDataUrl || branding?.logoDataUrl || "")
  );
  const favicon = String(
    dark
      ? (branding?.faviconDarkDataUrl || branding?.faviconLightDataUrl || branding?.faviconDataUrl || logo)
      : (branding?.faviconLightDataUrl || branding?.faviconDarkDataUrl || branding?.faviconDataUrl || logo)
  );

  siteBrandLogos.forEach(img => {
    if (logo) {
      img.src = logo;
      img.hidden = false;
    } else {
      img.removeAttribute("src");
      img.hidden = true;
    }
  });
  brandFallbacks.forEach(el => { el.hidden = Boolean(logo); });

  if (siteFavicon) {
    if (favicon) siteFavicon.href = favicon;
    else siteFavicon.removeAttribute("href");
  }
}

function renderHeaderAnnouncements(messages = []) {
  if (!headerNewsTicker || !headerNewsTrack) return;
  const clean = (Array.isArray(messages) ? messages : [])
    .map(value => String(value || "").trim())
    .filter(Boolean)
    .slice(0, 3);

  if (!clean.length) {
    headerNewsTicker.hidden = true;
    headerNewsTrack.innerHTML = "";
    return;
  }

  const items = clean.map(message => `<span class="header-news-item">${escapeHtml(message)}</span>`).join('<span class="header-news-separator">•</span>');
  // Duplicate once so the horizontal motion loops without a visible gap.
  headerNewsTrack.innerHTML = `<div class="header-news-group">${items}</div><div class="header-news-group" aria-hidden="true">${items}</div>`;
  headerNewsTicker.hidden = false;
}

function renderPublicContacts(contacts = {}) {
  if (!contactSocials) return;

  const definitions = [
    ["discord", "Discord", socialIcon("discord")],
    ["steam", "Steam", socialIcon("steam")],
    ["x", "X", socialIcon("x")],
    ["youtube", "YouTube", socialIcon("youtube")],
    ["tiktok", "TikTok", socialIcon("tiktok")],
    ["email", "Correo", socialIcon("email")]
  ];

  const customIcons = contacts?.icons || {};
  const links = definitions.flatMap(([key, label, icon]) => {
    const raw = String(contacts?.[key] || "").trim();
    if (!raw) return [];
    const href = key === "email" ? `mailto:${raw}` : safeUrl(raw);
    if (!href) return [];
    const target = key === "email" ? "" : ' target="_blank" rel="noopener noreferrer"';
    const customIcon = safeImageSrc(customIcons?.[key]);
    const iconHtml = customIcon
      ? `<img class="social-contact-custom-icon" src="${escapeHtml(customIcon)}" alt="">`
      : icon;
    return [`<a class="social-contact-card social-${key}" href="${escapeHtml(href)}"${target}>${iconHtml}<span>${escapeHtml(label)}</span><b>↗</b></a>`];
  });

  if (!links.length) {
    contactSocials.innerHTML = `<div class="contact-empty">Aún no hay redes sociales configuradas.</div>`;
    return;
  }

  contactSocials.innerHTML = links.join("");
}

function socialIcon(type) {
  const icons = {
    discord: `<svg viewBox="0 0 24 24"><path d="M8 7c2-1 6-1 8 0l2 9c-2 2-4 3-6 3s-4-1-6-3l2-9Z"></path><circle cx="10" cy="13" r="1"></circle><circle cx="14" cy="13" r="1"></circle></svg>`,
    steam: `<svg viewBox="0 0 24 24"><circle cx="15.5" cy="8.5" r="3.5"></circle><circle cx="6" cy="16.5" r="2.5"></circle><path d="m8 15 5-4M8 18l5 2 3-2"></path></svg>`,
    x: `<svg viewBox="0 0 24 24"><path d="M5 4l14 16M19 4 5 20"></path></svg>`,
    youtube: `<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="4"></rect><path d="m10 9 5 3-5 3Z"></path></svg>`,
    tiktok: `<svg viewBox="0 0 24 24"><path d="M14 4v10a4 4 0 1 1-4-4M14 4c1 3 3 4 6 4"></path></svg>`,
    email: `<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m4 7 8 6 8-6"></path></svg>`
  };
  return icons[type] || "";
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
  applyPublicBranding(publicBranding);
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
  document.body.classList.remove("auth-pending");
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
  document.body.classList.remove("auth-pending");
  accessGate.hidden = true;
  appRoot.hidden = false;
  document.body.classList.add("session-authenticated");
  updateProfileMenu();
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

function updateProfileMenu() {
  const isAdmin = currentRole === "admin";
  const displayName = currentProfileName || (isAdmin ? "Administrador" : "Usuario MadeLesh");

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

async function refreshProfileSession() {
  if (!currentToken) return true;
  try {
    const me = await api("/session/me", { method: "GET" }, currentToken);
    applySessionProfile(me);
    updateProfileMenu();
    return true;
  } catch {
    localStorage.removeItem("madetech_user_token");
    localStorage.removeItem("madetech_admin_token");
    currentToken = null;
    currentRole = null;
    showGate("Tu sesión expiró. Ingresa nuevamente.");
    return false;
  }
}

async function openProfileMenu() {
  if (!await refreshProfileSession()) return;
  profilePopover.hidden = false;
  profileButton.setAttribute("aria-expanded", "true");
}

profileButton.addEventListener("click", async event => {
  event.stopPropagation();
  if (profilePopover.hidden) await openProfileMenu();
  else closeProfileMenu();
});

profilePopover.addEventListener("click", event => event.stopPropagation());

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
    focusProductsHome();
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
    focusProductsHome();
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
    populateProductFilters();
    populateComparisonSelectors();
    renderReviews();
    updateFeatured();
    renderProductNotifications();
  } catch (error) {
    console.error(error);
    reviewsGrid.innerHTML = `<div class="review-loading">No se pudieron cargar las reviews.</div>`;
  }
}

const PRODUCT_SEEN_STORAGE = "madelesh_seen_product_ids_v2";
let currentNewProducts = [];

function storedSeenProductIds() {
  try {
    const parsed = JSON.parse(localStorage.getItem(PRODUCT_SEEN_STORAGE) || "null");
    return Array.isArray(parsed) ? parsed.map(String) : null;
  } catch {
    return null;
  }
}

function saveSeenProductIds(ids) {
  localStorage.setItem(PRODUCT_SEEN_STORAGE, JSON.stringify([...new Set(ids.map(String))]));
}

function renderProductNotifications() {
  if (!productNotificationBadge || !productNotificationList || !productNotificationCount) return;

  const allIds = reviews.map(product => String(product.id));
  let seen = storedSeenProductIds();

  // Primera visita con esta versión: los productos ya existentes son la base.
  if (seen === null) {
    saveSeenProductIds(allIds);
    seen = allIds;
  }

  const seenSet = new Set(seen);
  currentNewProducts = reviews
    .filter(product => !seenSet.has(String(product.id)))
    .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));

  const total = currentNewProducts.length;
  productNotificationBadge.textContent = String(total);
  productNotificationBadge.hidden = total === 0;
  productNotificationCount.textContent = total
    ? `${total} ${total === 1 ? "nuevo" : "nuevos"}`
    : "Sin novedades";

  productNotificationList.innerHTML = total
    ? currentNewProducts.map(product => `
        <button type="button" data-notification-product="${product.id}">
          <img src="${escapeHtml(comparisonImage(product))}" alt="">
          <span>
            <strong>${escapeHtml(product.name || "Producto")}</strong>
            <small>${escapeHtml(product.category || "")} · Nuevo</small>
          </span>
          <b>↗</b>
        </button>
      `).join("")
    : `<div class="notification-empty">No hay productos nuevos desde tu última revisión.</div>`;

  productNotificationList.querySelectorAll("[data-notification-product]").forEach(button => {
    button.addEventListener("click", () => {
      productNotificationPopover.hidden = true;
      productNotificationButton?.setAttribute("aria-expanded", "false");
      openReview(Number(button.dataset.notificationProduct));
    });
  });
}

function markCurrentNotificationsSeen() {
  if (!currentNewProducts.length) return;
  const existing = storedSeenProductIds() || [];
  const next = [...existing, ...currentNewProducts.map(product => String(product.id))];
  saveSeenProductIds(next);
  productNotificationBadge.hidden = true;
  productNotificationBadge.textContent = "0";
}

productNotificationButton?.addEventListener("click", event => {
  event.stopPropagation();
  const open = productNotificationPopover.hidden;
  productNotificationPopover.hidden = !open;
  productNotificationButton.setAttribute("aria-expanded", String(open));

  if (open && currentNewProducts.length) {
    setTimeout(markCurrentNotificationsSeen, 700);
  }
});

document.addEventListener("click", event => {
  if (!productNotificationWrap?.contains(event.target)) {
    if (productNotificationPopover) productNotificationPopover.hidden = true;
    productNotificationButton?.setAttribute("aria-expanded", "false");
  }
});


function cardTemplate(review) {
  const image = safeImageSrc(review.imageUrl) || safeImageSrc(Array.isArray(review.images) ? review.images[0] : "") || categoryPlaceholderDataUrl(review.category);
  const connections = Array.isArray(review.connections) ? review.connections.filter(Boolean).slice(0, 2) : [];
  const price = review.price || "Precio no disponible";

  return `
    <article class="review-card" data-category="${escapeHtml(review.category || "Producto")}" data-review="${review.id}"
             tabindex="0" role="button" aria-label="Abrir ${escapeHtml(review.name || "")}">
      <div class="review-visual">
        <div class="review-image-frame">
          <img src="${image}" alt="${escapeHtml(review.name || "Producto")}" class="review-product-image">
        </div>
      </div>

      <div class="review-content compact-product-card">
        <h3>${escapeHtml(review.name || "Producto")}</h3>

        <div class="card-data-block">
          <span class="card-data-label">Conexión</span>
          <div class="card-connection-list">
            ${connections.length
              ? connections.map(item => `<span class="card-connection-chip">${connectionIcon(item)}${escapeHtml(item)}</span>`).join("")
              : `<span class="card-data-empty">No disponible</span>`}
          </div>
        </div>

        <div class="review-read product-card-footer">
          <span class="product-card-cta"><span>VER PRODUCTO</span><i aria-hidden="true">→</i></span>
          <strong>${escapeHtml(price)}</strong>
        </div>
      </div>
    </article>
  `;
}

function populateProductFilters() {
  const categories = ["Mouse", "Teclados", "IEM", "Headsets", "DAC"];
  const brands = [...new Set(reviews.map(item => String(item.brand || "").trim()).filter(Boolean))]
    .sort((a,b) => a.localeCompare(b, "es"));
  const colors = [...new Set(reviews.flatMap(item =>
    Array.isArray(item.colors)
      ? item.colors.map(color => String(color?.name || color?.hex || "").trim()).filter(Boolean)
      : []
  ))].sort((a,b) => a.localeCompare(b, "es"));
  const connections = [...new Set(reviews.flatMap(item =>
    Array.isArray(item.connections)
      ? item.connections.map(value => String(value || "").trim()).filter(Boolean)
      : []
  ))].sort((a,b) => a.localeCompare(b, "es"));

  buildMultiFilterMenu("category", categories);
  buildMultiFilterMenu("brand", brands);
  buildMultiFilterMenu("color", colors);
  buildMultiFilterMenu("connection", connections);
}

function buildMultiFilterMenu(type, values) {
  const config = multiFilterConfig[type];
  if (!config?.menu) return;

  const selected = selectedProductFilters[type];

  // Elimina selecciones que ya no existen en los productos disponibles.
  for (const value of [...selected]) {
    if (!values.includes(value)) selected.delete(value);
  }

  config.menu.innerHTML = values.length
    ? values.map(value => {
        const checked = selected.has(value);
        return `
          <label class="multi-filter-option">
            <input type="checkbox" value="${escapeHtml(value)}" ${checked ? "checked" : ""}>
            <span class="multi-filter-check" aria-hidden="true">✓</span>
            <span>${escapeHtml(value)}</span>
          </label>`;
      }).join("")
    : `<div class="multi-filter-empty">Sin opciones disponibles</div>`;

  config.menu.querySelectorAll('input[type="checkbox"]').forEach(input => {
    input.addEventListener("change", () => {
      if (input.checked) selected.add(input.value);
      else selected.delete(input.value);

      updateMultiFilterTrigger(type);
      renderReviews();
    });
  });

  updateMultiFilterTrigger(type);
}

function updateMultiFilterTrigger(type) {
  const config = multiFilterConfig[type];
  if (!config) return;

  const values = [...selectedProductFilters[type]];
  if (!values.length) {
    config.text.textContent = config.allLabel;
    config.trigger.classList.remove("has-selection");
    return;
  }

  config.trigger.classList.add("has-selection");
  config.text.textContent = values.length <= 2
    ? values.join(", ")
    : `${values.length} seleccionados`;
}

function closeAllMultiFilters(exceptType = "") {
  Object.entries(multiFilterConfig).forEach(([type, config]) => {
    if (!config?.menu || type === exceptType) return;
    config.menu.hidden = true;
    config.trigger?.setAttribute("aria-expanded", "false");
  });
}

function setupMultiFilterMenus() {
  Object.entries(multiFilterConfig).forEach(([type, config]) => {
    if (!config?.trigger || !config.menu) return;

    config.trigger.addEventListener("click", event => {
      event.stopPropagation();
      const willOpen = config.menu.hidden;
      closeAllMultiFilters(type);
      config.menu.hidden = !willOpen;
      config.trigger.setAttribute("aria-expanded", String(willOpen));
    });

    config.menu.addEventListener("click", event => event.stopPropagation());
  });

  document.addEventListener("click", () => closeAllMultiFilters());
}

function productMatchesSelectedValue(value, selectedSet) {
  if (!selectedSet.size) return true;
  const normalized = String(value || "").toLowerCase();
  return [...selectedSet].some(selected => normalized === selected.toLowerCase());
}

function reviewMatchesAnyColor(review, selectedSet) {
  if (!selectedSet.size) return true;
  if (!Array.isArray(review.colors)) return false;

  return review.colors.some(color => {
    const value = String(color?.name || color?.hex || "").toLowerCase();
    return [...selectedSet].some(selected => value === selected.toLowerCase());
  });
}

function reviewMatchesAnyConnection(review, selectedSet) {
  if (!selectedSet.size) return true;
  if (!Array.isArray(review.connections)) return false;

  return review.connections.some(connection => {
    const value = String(connection || "").toLowerCase();
    return [...selectedSet].some(selected => value === selected.toLowerCase());
  });
}

function parsePriceValue(value) {
  const raw = String(value || "").replace(/,/g, "");
  const match = raw.match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : Number.POSITIVE_INFINITY;
}

function renderReviews() {
  const text = searchInput.value.trim().toLowerCase();
  const sort = priceSort?.value || "default";

  let filtered = reviews.filter(review => {
    const categoryOK = productMatchesSelectedValue(review.category, selectedProductFilters.category);
    const brandOK = productMatchesSelectedValue(review.brand, selectedProductFilters.brand);
    const colorOK = reviewMatchesAnyColor(review, selectedProductFilters.color);
    const connectionOK = reviewMatchesAnyConnection(review, selectedProductFilters.connection);
    const haystack = `${review.brand || ""} ${review.name || ""} ${review.model || ""} ${review.category || ""}`.toLowerCase();
    return categoryOK && brandOK && colorOK && connectionOK && (!text || haystack.includes(text));
  });

  if (sort === "low-high") {
    filtered = [...filtered].sort((a, b) => parsePriceValue(a.price) - parsePriceValue(b.price));
  } else if (sort === "high-low") {
    filtered = [...filtered].sort((a, b) => {
      const av = parsePriceValue(a.price);
      const bv = parsePriceValue(b.price);
      if (!Number.isFinite(av) && !Number.isFinite(bv)) return 0;
      if (!Number.isFinite(av)) return 1;
      if (!Number.isFinite(bv)) return -1;
      return bv - av;
    });
  }

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
  featuredProducts = reviews.filter(item => item.featured === true);
  if (!featuredProducts.length && reviews.length) featuredProducts = [reviews[0]];

  if (!featuredProducts.length || !monthlyBanner) {
    if (monthlyBanner) monthlyBanner.hidden = true;
    return;
  }

  monthlyBanner.hidden = false;
  featuredIndex = Math.min(featuredIndex, featuredProducts.length - 1);
  renderFeaturedBanner();
  startFeaturedRotation();
  applyPageView();
}

function renderFeaturedBanner() {
  const product = featuredProducts[featuredIndex];
  if (!product) return;

  const image = safeImageSrc(product.imageUrl) || safeImageSrc(Array.isArray(product.images) ? product.images[0] : "") || categoryPlaceholderDataUrl(product.category);
  featuredBanner?.classList.add("is-changing");

  setTimeout(() => {
    featuredBannerBrand.textContent = product.brand || "MadeLesh";
    featuredBannerName.textContent = product.name || product.model || "Producto destacado";
    const summary = displaySummary(product) || "Producto destacado del mes en MadeLesh.";
    featuredBannerText.textContent = summary;
    featuredBannerPrice.textContent = product.price || "";
    featuredBanner?.classList.remove("description-expanded");
    if (featuredBannerReadMore) {
      featuredBannerReadMore.hidden = true;
      featuredBannerReadMore.textContent = "Leer más";
      requestAnimationFrame(() => {
        const needsMore = featuredBannerText.scrollHeight > featuredBannerText.clientHeight + 2;
        featuredBannerReadMore.hidden = !needsMore;
      });
    }

    featuredBannerImage.src = image;
    featuredBannerImage.hidden = false;

    featuredBanner.dataset.review = String(product.id);
    featuredBannerButton.onclick = event => {
      event.stopPropagation();
      openReview(Number(product.id));
    };

    const multiple = featuredProducts.length > 1;
    featuredBannerNav.hidden = !multiple;
    featuredDots.innerHTML = multiple
      ? featuredProducts.map((_, index) => `<button type="button" class="${index === featuredIndex ? "active" : ""}" data-featured-index="${index}" aria-label="Ir al destacado ${index + 1}"></button>`).join("")
      : "";

    featuredDots.querySelectorAll("[data-featured-index]").forEach(button => {
      button.addEventListener("click", () => {
        featuredIndex = Number(button.dataset.featuredIndex);
        renderFeaturedBanner();
        startFeaturedRotation();
      });
    });

    featuredBanner?.classList.remove("is-changing");
  }, 120);
}

function startFeaturedRotation() {
  if (featuredTimer) clearInterval(featuredTimer);
  if (featuredProducts.length <= 1) return;
  featuredTimer = setInterval(() => {
    featuredIndex = (featuredIndex + 1) % featuredProducts.length;
    renderFeaturedBanner();
  }, 6500);
}

featuredPrev?.addEventListener("click", () => {
  if (!featuredProducts.length) return;
  featuredIndex = (featuredIndex - 1 + featuredProducts.length) % featuredProducts.length;
  renderFeaturedBanner();
  startFeaturedRotation();
});

featuredNext?.addEventListener("click", event => {
  event.stopPropagation();
  if (!featuredProducts.length) return;
  featuredIndex = (featuredIndex + 1) % featuredProducts.length;
  renderFeaturedBanner();
  startFeaturedRotation();
});

featuredPrev?.addEventListener("click", event => {
  event.stopPropagation();
}, { capture: true });

featuredDots?.addEventListener("click", event => event.stopPropagation());

featuredBannerReadMore?.addEventListener("click", event => {
  event.stopPropagation();
  const expanded = featuredBanner?.classList.toggle("description-expanded");
  featuredBannerReadMore.textContent = expanded ? "Leer menos" : "Leer más";
});

featuredBanner?.addEventListener("click", event => {
  if (event.target.closest("button")) return;
  const id = Number(featuredBanner.dataset.review || 0);
  if (id) openReview(id);
});

/* ---------------- PRODUCT COMPARISON ---------------- */

const compareProductA = document.getElementById("compareProductA");
const compareProductB = document.getElementById("compareProductB");
const compareResult = document.getElementById("compareResult");
const compareCategoryLock = document.getElementById("compareCategoryLock");
const comparePickerAButton = document.getElementById("comparePickerAButton");
const comparePickerBButton = document.getElementById("comparePickerBButton");
const comparePickerAMenu = document.getElementById("comparePickerAMenu");
const comparePickerBMenu = document.getElementById("comparePickerBMenu");

const COMPARISON_TEXT_SPECS = {
  Mouse: [["weight","Peso","weight"],["sensor","Sensor","sensor"],["pollingRate","Polling Rate","pollingRate"],["__connections","Conexión","connection"]],
  Teclados: [["switchType","Switch","switch"],["layout","Formato","layout"],["pollingRate","Polling Rate","pollingRate"],["rapidTrigger","Rapid Trigger","rapid"]],
  IEM: [["driverConfig","Drivers","driver"],["impedance","Impedancia","impedance"],["soundSignature","Firma sonora","sound"],["__connections","Conexión","connection"]],
  Headsets: [["driver","Driver","driver"],["weight","Peso","weight"],["batteryHours","Autonomía","battery"],["__connections","Conexión","connection"]],
  DAC: [["dacChip","Chip DAC","chip"],["outputs","Salidas","output"],["maxPcm","PCM máximo","pcm"],["bluetooth","Bluetooth","bluetooth"]]
};

function comparisonSpecIcon(icon) {
  const icons = {
    weight:`<svg viewBox="0 0 24 24"><path d="M7 9a5 5 0 0 1 10 0"/><path d="M5 9h14l2 11H3z"/><path d="m12 9 2-3"/></svg>`,
    sensor:`<svg viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="16" rx="7"/><path d="M12 4v6"/></svg>`,
    pollingRate:`<svg viewBox="0 0 24 24"><path d="M4 14a8 8 0 1 1 2 4"/><path d="M4 19v-5h5"/></svg>`,
    connection:`<svg viewBox="0 0 24 24"><path d="M8 12h8M12 8v8"/><path d="M5 5h4v4H5zM15 15h4v4h-4z"/></svg>`,
    switch:`<svg viewBox="0 0 24 24"><rect x="5" y="6" width="14" height="12" rx="2"/><path d="M8 10h8M8 14h5"/></svg>`,
    layout:`<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M6 10h2M10 10h2M14 10h2M18 10h1M6 14h12"/></svg>`,
    rapid:`<svg viewBox="0 0 24 24"><path d="m13 2-8 12h7l-1 8 8-12h-7z"/></svg>`,
    driver:`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/></svg>`,
    impedance:`<svg viewBox="0 0 24 24"><path d="M4 12h3l2-4 4 8 2-4h5"/></svg>`,
    sound:`<svg viewBox="0 0 24 24"><path d="M5 9v6h4l5 4V5L9 9z"/><path d="M17 9c2 2 2 4 0 6"/></svg>`,
    battery:`<svg viewBox="0 0 24 24"><rect x="3" y="7" width="17" height="10" rx="2"/><path d="M20 10h2v4h-2M6 10h8"/></svg>`,
    chip:`<svg viewBox="0 0 24 24"><rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M17 9h4M3 15h4M17 15h4"/></svg>`,
    output:`<svg viewBox="0 0 24 24"><path d="M4 12h12"/><path d="m12 8 4 4-4 4"/><path d="M18 6h2v12h-2"/></svg>`,
    pcm:`<svg viewBox="0 0 24 24"><path d="M3 12h3l2-6 4 12 3-8 2 2h4"/></svg>`,
    bluetooth:`<svg viewBox="0 0 24 24"><path d="m7 7 10 10V7L7 17l10-10"/></svg>`,
    score:`<svg viewBox="0 0 24 24"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z"/></svg>`
  };
  return icons[icon] || icons.chip;
}

function comparisonImage(product) {
  return safeImageSrc(product?.imageUrl) || safeImageSrc(Array.isArray(product?.images) ? product.images[0] : "") || categoryPlaceholderDataUrl(product?.category);
}

function parseFirstNumber(value) {
  if (Array.isArray(value)) { const nums=value.map(parseFirstNumber).filter(Number.isFinite); return nums.length?Math.max(...nums):NaN; }
  const match=String(value??"").replace(",", ".").match(/-?\d+(?:\.\d+)?/); return match?Number(match[0]):NaN;
}
function maxPolling(product){const s=product?.specs||{};const source=Array.isArray(s.pollingRate)?s.pollingRate:[s.pollingRate||s.pollingRateMax];const values=source.map(parseFirstNumber).filter(Number.isFinite);return values.length?Math.max(...values):NaN;}
function batteryHours(product){const s=product?.specs||{};const direct=parseFirstNumber(s.batteryHours);if(Number.isFinite(direct))return direct;const text=String(s.battery||"");const hour=text.match(/(\d+(?:[.,]\d+)?)\s*(?:h|hora)/i);return hour?Number(hour[1].replace(",",".")):NaN;}
function featureCount(product,keys){const s=product?.specs||{};return keys.reduce((total,key)=>total+(s[key]===true?1:0),0);}
function pcmRate(product){const text=String(product?.specs?.maxPcm||"");const matches=[...text.matchAll(/(\d+(?:\.\d+)?)\s*(?:k?hz)/ig)].map(m=>Number(m[1]));return matches.length?Math.max(...matches):parseFirstNumber(text);}
function dsdRate(product){const text=String(product?.specs?.maxDsd||"");const match=text.match(/dsd\s*(\d+)/i);return match?Number(match[1]):parseFirstNumber(text);}
function powerOutput(product){const text=String(product?.specs?.powerOutput||"");const value=parseFirstNumber(text);if(!Number.isFinite(value))return NaN;return /\bw\b/i.test(text)&&!/\bmw\b/i.test(text)?value*1000:value;}

function comparisonMetrics(category){
  const score={key:"score",label:"MadeLesh Score",icon:"score",unit:"/10",direction:"high",weight:2,value:p=>Number(p?.score)>0?Number(p.score):NaN};
  const map={
    Mouse:[{key:"polling",label:"Polling Rate",icon:"pollingRate",unit:" Hz",direction:"high",weight:1,value:maxPolling},{key:"weight",label:"Peso",icon:"weight",unit:" g",direction:"low",weight:1,value:p=>parseFirstNumber(p?.specs?.weight)},{key:"battery",label:"Autonomía",icon:"battery",unit:" h",direction:"high",weight:1,value:batteryHours},score],
    Teclados:[{key:"polling",label:"Polling Rate",icon:"pollingRate",unit:" Hz",direction:"high",weight:1,value:maxPolling},{key:"battery",label:"Autonomía",icon:"battery",unit:" h",direction:"high",weight:1,value:batteryHours},{key:"features",label:"Funciones competitivas",icon:"rapid",unit:"/2",direction:"high",weight:1,value:p=>featureCount(p,["hotSwap","rapidTrigger"])},score],
    IEM:[{key:"weight",label:"Peso por lado",icon:"weight",unit:" g",direction:"low",weight:1,value:p=>parseFirstNumber(p?.specs?.weightPerSide)},{key:"detachable",label:"Cable desmontable",icon:"connection",unit:"",direction:"high",weight:1,value:p=>p?.specs?.detachableCable===true?1:(p?.specs?.detachableCable===false?0:NaN),format:v=>v?"Sí":"No"},score],
    Headsets:[{key:"battery",label:"Autonomía",icon:"battery",unit:" h",direction:"high",weight:1,value:batteryHours},{key:"weight",label:"Peso",icon:"weight",unit:" g",direction:"low",weight:1,value:p=>parseFirstNumber(p?.specs?.weight)},score],
    DAC:[{key:"power",label:"Potencia de salida",icon:"output",unit:" mW",direction:"high",weight:1,value:powerOutput},{key:"pcm",label:"PCM máximo",icon:"pcm",unit:" kHz",direction:"high",weight:1,value:pcmRate},{key:"dsd",label:"DSD máximo",icon:"chip",unit:"",direction:"high",weight:1,value:dsdRate,format:v=>`DSD${Math.round(v)}`},score]
  };return map[category]||[score];
}
function metricAdvantage(value,other,direction){if(!Number.isFinite(value)||!Number.isFinite(other))return 0;if(value===other)return 100;if(direction==="low"){const min=Math.min(value,other);return Math.max(10,Math.min(100,(min/Math.max(value,.0001))*100));}const max=Math.max(value,other);return max<=0?0:Math.max(10,Math.min(100,(value/max)*100));}
function metricWinner(a,b,direction){if(!Number.isFinite(a)||!Number.isFinite(b)||a===b)return "tie";return direction==="low"?(a<b?"a":"b"):(a>b?"a":"b");}
function formatMetricValue(metric,value){if(!Number.isFinite(value))return "No disponible";if(typeof metric.format==="function")return metric.format(value);const digits=Number.isInteger(value)?0:1;return `${value.toFixed(digits)}${metric.unit||""}`;}
function comparisonTextValue(product,key){if(key==="__connections")return arrayLabel(product?.connections)||"No disponible";const value=product?.specs?.[key];if(typeof value==="boolean")return value?"Sí":"No";if(Array.isArray(value))return arrayLabel(value)||"No disponible";return value===undefined||value===null||value===""?"No disponible":String(value);}

function comparePickerItem(product){return `<button type="button" class="compare-picker-item" data-compare-pick="${product.id}"><span class="compare-picker-thumb"><img src="${escapeHtml(comparisonImage(product))}" alt=""></span><span><strong>${escapeHtml(product.name||"Producto")}</strong><small>${escapeHtml(`${product.brand||""} · ${product.category||""}`)}</small></span><b>›</b></button>`;}
function updateComparePickerButton(which,product){const button=which==="a"?comparePickerAButton:comparePickerBButton;if(!button)return;if(!product){button.innerHTML=`<span class="compare-picker-empty-icon">${which.toUpperCase()}</span><span><strong>${which==="a"?"Seleccionar producto":"Primero elige el producto A"}</strong><small>${which==="a"?"Ver catálogo compatible":"Misma categoría obligatoria"}</small></span><b>⌄</b>`;return;}button.innerHTML=`<span class="compare-picker-thumb"><img src="${escapeHtml(comparisonImage(product))}" alt=""></span><span><strong>${escapeHtml(product.name||"Producto")}</strong><small>${escapeHtml(`${product.brand||""} · ${product.category||""}`)}</small></span><b>⌄</b>`;}
function closeCompareMenus(){if(comparePickerAMenu)comparePickerAMenu.hidden=true;if(comparePickerBMenu)comparePickerBMenu.hidden=true;comparePickerAButton?.setAttribute("aria-expanded","false");comparePickerBButton?.setAttribute("aria-expanded","false");}
function bindComparePicker(menu,select,which){menu?.querySelectorAll("[data-compare-pick]").forEach(btn=>btn.addEventListener("click",()=>{select.value=btn.dataset.comparePick;closeCompareMenus();select.dispatchEvent(new Event("change",{bubbles:true}));const product=reviews.find(item=>String(item.id)===String(select.value));updateComparePickerButton(which,product);}));}

function populateComparisonSelectors(){if(!compareProductA||!compareProductB)return;const products=[...reviews].sort((a,b)=>String(a.category||"").localeCompare(String(b.category||""))||String(a.name||"").localeCompare(String(b.name||"")));compareProductA.innerHTML=`<option value="">Seleccionar producto</option>${products.map(item=>`<option value="${item.id}">${escapeHtml(`${item.category} · ${item.brand||""} ${item.name||""}`.trim())}</option>`).join("")}`;compareProductB.innerHTML=`<option value="">Primero elige el producto A</option>`;compareProductB.disabled=true;if(comparePickerAMenu){comparePickerAMenu.innerHTML=`<div class="compare-picker-menu-head"><strong>Elegir producto A</strong><small>${products.length} productos</small></div>${products.map(comparePickerItem).join("")}`;bindComparePicker(comparePickerAMenu,compareProductA,"a");}updateComparePickerButton("a",null);updateComparePickerButton("b",null);if(comparePickerBButton)comparePickerBButton.disabled=true;}

function refreshCompareProductB(){if(!compareProductA||!compareProductB)return;const selectedA=reviews.find(item=>String(item.id)===String(compareProductA.value||""));updateComparePickerButton("a",selectedA||null);if(!selectedA){compareProductB.innerHTML=`<option value="">Primero elige el producto A</option>`;compareProductB.disabled=true;if(comparePickerBButton)comparePickerBButton.disabled=true;if(comparePickerBMenu)comparePickerBMenu.innerHTML="";updateComparePickerButton("b",null);if(compareCategoryLock)compareCategoryLock.textContent="Solo se permiten comparaciones entre productos de la misma categoría.";renderComparison();return;}const same=reviews.filter(item=>item.category===selectedA.category&&String(item.id)!==String(selectedA.id));compareProductB.innerHTML=`<option value="">Seleccionar ${escapeHtml(selectedA.category)}</option>${same.map(item=>`<option value="${item.id}">${escapeHtml(`${item.brand||""} ${item.name||""}`.trim())}</option>`).join("")}`;compareProductB.disabled=same.length===0;if(comparePickerBButton)comparePickerBButton.disabled=same.length===0;if(comparePickerBMenu){comparePickerBMenu.innerHTML=`<div class="compare-picker-menu-head"><strong>Elegir rival</strong><small>Solo ${escapeHtml(selectedA.category)}</small></div>${same.map(comparePickerItem).join("")}`;bindComparePicker(comparePickerBMenu,compareProductB,"b");}updateComparePickerButton("b",null);if(compareCategoryLock)compareCategoryLock.innerHTML=`<strong>${escapeHtml(selectedA.category)}</strong> bloqueado como categoría · ${same.length} alternativa${same.length===1?"":"s"}.`;renderComparison();}

function comparisonProductCard(product,isWinner,side){return `<article class="compare-duel-product ${side} ${isWinner?"overall-winner":""}">${isWinner?`<span class="compare-winner-badge">DESTACADO</span>`:""}<div class="compare-duel-image"><img src="${escapeHtml(comparisonImage(product))}" alt="${escapeHtml(product.name||"Producto")}"></div><small>${escapeHtml(product.brand||"")}</small><h3>${escapeHtml(product.name||"")}</h3><button type="button" data-open-compare-product="${product.id}">Ver ficha ↗</button></article>`;}

function renderComparison(){if(!compareResult)return;const a=reviews.find(item=>String(item.id)===String(compareProductA?.value||""));const b=reviews.find(item=>String(item.id)===String(compareProductB?.value||""));updateComparePickerButton("a",a||null);updateComparePickerButton("b",b||null);if(!a||!b){compareResult.innerHTML=`<div class="compare-empty"><strong>Elige dos productos para empezar.</strong><span>Las estadísticas aparecerán aquí de forma automática.</span></div>`;return;}if(a.category!==b.category){compareResult.innerHTML=`<div class="compare-empty compare-error"><strong>Comparación no permitida.</strong><span>Solo puedes comparar productos de la misma categoría.</span></div>`;return;}
  const metrics=comparisonMetrics(a.category);let pointsA=0,pointsB=0,comparable=0;const lanes=[];for(const metric of metrics){const av=metric.value(a),bv=metric.value(b),winner=metricWinner(av,bv,metric.direction);if(Number.isFinite(av)&&Number.isFinite(bv)&&metric.weight>0){comparable++;if(winner==="a")pointsA+=metric.weight;else if(winner==="b")pointsB+=metric.weight;else{pointsA+=metric.weight/2;pointsB+=metric.weight/2;}}lanes.push(`<article class="compare-metric-lane"><div class="lane-side lane-a ${winner==="a"?"lane-winner":""}"><strong>${escapeHtml(formatMetricValue(metric,av))}</strong><div><i style="width:${Number.isFinite(av)?metricAdvantage(av,bv,metric.direction):0}%"></i></div></div><div class="lane-label"><span>${comparisonSpecIcon(metric.icon||"chip")}</span><strong>${escapeHtml(metric.label)}</strong><small>${winner==="tie"?"Empate":"Ventaja"}</small></div><div class="lane-side lane-b ${winner==="b"?"lane-winner":""}"><strong>${escapeHtml(formatMetricValue(metric,bv))}</strong><div><i style="width:${Number.isFinite(bv)?metricAdvantage(bv,av,metric.direction):0}%"></i></div></div></article>`);}
  let winner=null,winnerLabel="Empate técnico",winnerNote="Los datos disponibles están muy igualados.";if(comparable>0&&pointsA!==pointsB){winner=pointsA>pointsB?a:b;winnerLabel=`${winner.name||"Producto"}`;winnerNote=`Destaca en ${Math.max(pointsA,pointsB)} puntos frente a ${Math.min(pointsA,pointsB)} según métricas comparables.`;}else if(!comparable){winnerLabel="Sin datos suficientes";winnerNote="Completa más especificaciones para obtener un resultado.";}const total=Math.max(1,pointsA+pointsB);const shareA=Math.round((pointsA/total)*100),shareB=100-shareA;
  const quick=(COMPARISON_TEXT_SPECS[a.category]||[]).map(([key,label,icon])=>`<article class="compare-quick-row"><div><span>${comparisonSpecIcon(icon)}</span><strong>${escapeHtml(label)}</strong></div><p>${escapeHtml(comparisonTextValue(a,key))}</p><i>vs</i><p>${escapeHtml(comparisonTextValue(b,key))}</p></article>`).join("");
  compareResult.innerHTML=`<div class="compare-duel-arena">${comparisonProductCard(a,winner?.id===a.id,"side-a")}<div class="compare-duel-center"><span class="duel-kicker">RESULTADO</span><div class="duel-orb" style="--share-a:${shareA}%;--share-b:${shareB}%"><div><strong>${comparable?`${shareA}/${shareB}`:"—"}</strong><small>balance</small></div></div><h3>${escapeHtml(winnerLabel)}</h3><p>${escapeHtml(winnerNote)}</p></div>${comparisonProductCard(b,winner?.id===b.id,"side-b")}</div><div class="compare-metric-lanes">${lanes.join("")}</div><div class="compare-quick-specs"><div class="compare-quick-head"><span>COMPARACIÓN RÁPIDA</span><strong>${escapeHtml(a.name||"A")} <i>vs</i> ${escapeHtml(b.name||"B")}</strong></div>${quick}</div>`;
  compareResult.querySelectorAll("[data-open-compare-product]").forEach(btn=>btn.addEventListener("click",()=>openReview(Number(btn.dataset.openCompareProduct))));}

comparePickerAButton?.addEventListener("click",event=>{event.stopPropagation();const open=comparePickerAMenu?.hidden!==false;closeCompareMenus();if(comparePickerAMenu){comparePickerAMenu.hidden=!open;comparePickerAButton.setAttribute("aria-expanded",String(open));}});
comparePickerBButton?.addEventListener("click",event=>{event.stopPropagation();if(comparePickerBButton.disabled)return;const open=comparePickerBMenu?.hidden!==false;closeCompareMenus();if(comparePickerBMenu){comparePickerBMenu.hidden=!open;comparePickerBButton.setAttribute("aria-expanded",String(open));}});
document.addEventListener("click",event=>{if(!event.target.closest(".compare-visual-select-card"))closeCompareMenus();});
compareProductA?.addEventListener("change",refreshCompareProductB);
compareProductB?.addEventListener("change",renderComparison);

function focusProductsHome() {
  const home = document.getElementById("home");
  if (!home) return;
  requestAnimationFrame(() => home.scrollIntoView({ behavior: "auto", block: "start" }));
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

          ${Number(review.score || 0) > 0 ? `<div class="product-editor-score">
            <strong>${Number(review.score || 0).toFixed(1)}</strong>
            <span>/10 MadeLesh Score</span>
          </div>` : ""}

          <p class="product-detail-summary">${escapeHtml(displaySummary(review))}</p>
        </div>
      </section>

      <div class="product-detail-body">
        ${renderColors(review.colors, review.specs?.colorImages)}
        ${renderConnections(review.connections)}
        ${renderProPlayers(review)}

        <section class="product-info-section">
          <div class="product-section-head">
            <h3>Especificaciones</h3>
            <p>${escapeHtml(review.category || "")}</p>
          </div>

          <div class="product-spec-grid">
            ${buildSpecs(review).map(renderSpecCard).join("")}
          </div>
        </section>

        ${renderTechnicalSource(review)}
        ${renderProductDownloads(review)}
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

    if (currentRole === "user") bindRatingButtons(id, Number(rating.mine || 0));
    bindProductMedia(review);
    bindProductColorImages(review);

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  } catch (error) {
    console.error(error);
    alert("No se pudo abrir este producto.");
  }
}

function productImageHtml(review) {
  const firstColorImage = Array.isArray(review?.specs?.colorImages) ? review.specs.colorImages.map(item => safeImageSrc(item?.image || "")).find(Boolean) : "";
  const images = [...new Set([
    safeImageSrc(review.imageUrl),
    ...(Array.isArray(review.images) ? review.images.map(safeImageSrc) : []),
    firstColorImage
  ].filter(Boolean))];

  if (!images.length) images.push(categoryPlaceholderDataUrl(review.category));

  const video = safeVideoSrc(review?.specs?.productVideo);
  const sound = review.category === "Teclados" ? safeAudioSrc(review?.specs?.keyboardSound) : "";

  return `
    <div class="product-media-viewer">
      <div class="product-media-main-frame">
        <div class="product-media-stage" id="productMediaStage">
          <img class="product-detail-image" src="${escapeHtml(images[0])}" alt="${escapeHtml(review.name || "Producto")}">
        </div>

        ${sound ? `
          <button class="keyboard-sound-button" id="keyboardSoundButton" type="button" aria-label="Reproducir sonido del teclado" title="Escuchar cómo suena al teclear">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h4l5 4V6L8 10z"></path><path d="M16 9c1.5 1.5 1.5 4.5 0 6M19 6c4 3.5 4 8.5 0 12"></path></svg>
            <span>ESCUCHAR</span>
          </button>
          <audio id="keyboardSoundAudio" preload="metadata" src="${escapeHtml(sound)}"></audio>
        ` : ""}
      </div>

      ${(images.length > 1 || video) ? `
        <div class="product-media-thumbs-wrap">
          <span class="product-media-thumbs-label">FOTOS DEL PRODUCTO</span>
          <div class="product-media-thumbs" aria-label="Fotos y video del producto">
          ${images.map((src,index) => `
            <button class="product-media-thumb ${index===0 ? "active" : ""}" type="button" data-media-image="${escapeHtml(src)}" aria-label="Imagen ${index+1}">
              <img src="${escapeHtml(src)}" alt="">
            </button>`).join("")}
          ${video ? `
            <button class="product-media-thumb product-video-thumb" type="button" data-media-video="${escapeHtml(video)}" aria-label="Video del producto">
              <svg viewBox="0 0 24 24"><path d="m9 7 8 5-8 5z"></path></svg><span>VIDEO</span>
            </button>` : ""}
          </div>
        </div>` : ""}
    </div>`;
}

function safeVideoSrc(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  try {
    const url = new URL(text);
    return ["http:","https:"].includes(url.protocol) ? url.href : "";
  } catch { return ""; }
}

function safeAudioSrc(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  if (/^data:audio\/(?:mpeg|mp3|ogg|wav|webm|mp4|aac|x-m4a|m4a);base64,/i.test(text)) return text;
  return safeUrl(text);
}

function youtubeEmbedUrl(value) {
  const url = safeVideoSrc(value);
  if (!url) return "";
  try {
    const parsed = new URL(url);
    let id = "";
    if (parsed.hostname.includes("youtu.be")) id = parsed.pathname.split("/").filter(Boolean)[0] || "";
    if (parsed.hostname.includes("youtube.com")) id = parsed.searchParams.get("v") || (parsed.pathname.includes("/shorts/") ? parsed.pathname.split("/").filter(Boolean).pop() : "");
    return id ? `https://www.youtube.com/embed/${encodeURIComponent(id)}` : "";
  } catch { return ""; }
}

function videoStageHtml(url) {
  const embed = youtubeEmbedUrl(url);
  if (embed) return `<iframe class="product-detail-video" src="${escapeHtml(embed)}" title="Video del producto" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  if (/\.(mp4|webm|ogg)(?:$|[?#])/i.test(url)) return `<video class="product-detail-video" src="${escapeHtml(url)}" controls playsinline preload="metadata"></video>`;
  return `<div class="product-video-external"><span>VIDEO DEL PRODUCTO</span><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">ABRIR VIDEO ↗</a></div>`;
}

function bindProductMedia(review) {
  const stage = modalContent.querySelector("#productMediaStage");
  if (!stage) return;

  const thumbs = [...modalContent.querySelectorAll(".product-media-thumb")];
  thumbs.forEach(button => {
    button.addEventListener("click", () => {
      const image = safeImageSrc(button.dataset.mediaImage || "");
      const video = safeVideoSrc(button.dataset.mediaVideo || "");
      if (image) stage.innerHTML = `<img class="product-detail-image" src="${escapeHtml(image)}" alt="${escapeHtml(review.name || "Producto")}">`;
      else if (video) stage.innerHTML = videoStageHtml(video);
      thumbs.forEach(item => item.classList.toggle("active", item === button));
    });
  });

  const soundButton = modalContent.querySelector("#keyboardSoundButton");
  const soundAudio = modalContent.querySelector("#keyboardSoundAudio");
  soundButton?.addEventListener("click", async () => {
    if (!soundAudio) return;
    if (soundAudio.paused) {
      try {
        await soundAudio.play();
        soundButton.classList.add("playing");
        soundButton.querySelector("span").textContent = "SONANDO";
      } catch {}
    } else {
      soundAudio.pause();
    }
  });
  const stopSoundVisual = () => {
    soundButton?.classList.remove("playing");
    const label = soundButton?.querySelector("span");
    if (label) label.textContent = "ESCUCHAR";
  };
  soundAudio?.addEventListener("ended", stopSoundVisual);
  soundAudio?.addEventListener("pause", stopSoundVisual);
}

function displaySummary(review) {
  const original = String(review.summary || "").trim();
  if (original && !looksMostlyEnglish(original)) return original;

  const s = review.specs || {};
  const name = `${review.brand || ""} ${review.name || ""}`.trim() || "Este producto";
  const connections = Array.isArray(review.connections) && review.connections.length
    ? ` Ofrece conexión ${review.connections.join(", ")}.`
    : "";
  const polling = Array.isArray(s.pollingRate) ? s.pollingRate.join(", ") : s.pollingRate;

  if (review.category === "Teclados") {
    return `${name} es un teclado${s.layout ? ` de formato ${s.layout}` : ""}${s.switchTechnology ? ` con tecnología ${s.switchTechnology}` : ""}.${connections}${polling ? ` Admite tasas de sondeo de ${polling}.` : ""} Consulta abajo sus especificaciones técnicas completas.`;
  }
  if (review.category === "Mouse") {
    return `${name} es un mouse${s.sensor ? ` equipado con sensor ${s.sensor}` : ""}${s.weight ? ` y un peso aproximado de ${s.weight} g` : ""}.${connections}${polling ? ` Admite tasas de sondeo de ${polling}.` : ""} Consulta abajo sus especificaciones técnicas completas.`;
  }
  return `${name} pertenece a la categoría ${review.category || "tecnología"}.${connections} Consulta abajo sus especificaciones, conexiones y opciones de compra.`;
}

function looksMostlyEnglish(text) {
  const value = ` ${String(text || "").toLowerCase()} `;
  const english = [" the ", " and ", " with ", " features ", " supports ", " has ", " includes ", " available ", " keyboard ", " mouse "];
  return english.filter(word => value.includes(word)).length >= 2;
}

function cleanSpecDisplayValue(value) {
  if (Array.isArray(value)) {
    return value.map(cleanSpecDisplayValue).filter(item => item !== "");
  }
  if (value === true || value === false || value === null || value === undefined) return value;
  const text = String(value).trim();
  if (!text) return "";
  if (text.length > 90) return "";
  if (/^[,.;:]/.test(text)) return "";
  if (/\b(supports?|features?|includes?|has a|available in|polling rate of)\b/i.test(text) && text.split(/\s+/).length > 6) return "";
  return text;
}

function specIcon(label) {
  const value = String(label || "").toLowerCase();
  if (value.includes("sensor")) return `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7"></circle><circle cx="12" cy="12" r="2"></circle><path d="M12 2v3M12 19v3M2 12h3M19 12h3"></path></svg>`;
  if (value.includes("dpi")) return `<svg viewBox="0 0 24 24"><path d="M4 18a8 8 0 1 1 16 0"></path><path d="m12 14 4-4"></path><circle cx="12" cy="14" r="1.5"></circle></svg>`;
  if (value.includes("mcu")) return `<svg viewBox="0 0 24 24"><rect x="7" y="7" width="10" height="10" rx="2"></rect><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"></path></svg>`;
  if (value.includes("velocidad") || value.includes("aceleración")) return `<svg viewBox="0 0 24 24"><path d="M4 17a8 8 0 0 1 16 0"></path><path d="m12 13 5-5"></path></svg>`;
  if (value.includes("forma") || value.includes("tamaño") || value.includes("joroba") || value.includes("curvatura") || value.includes("apertura")) return `<svg viewBox="0 0 24 24"><path d="M7 19c-2-3-2-8 0-11 2-3 8-3 10 0 2 3 2 8 0 11-2 3-8 3-10 0z"></path><path d="M12 5v14"></path></svg>`;
  if (value.includes("mano") || value.includes("pulgar") || value.includes("anular")) return `<svg viewBox="0 0 24 24"><path d="M7 12V7a1.5 1.5 0 0 1 3 0v4M10 11V5a1.5 1.5 0 0 1 3 0v6M13 11V6a1.5 1.5 0 0 1 3 0v6M16 12V9a1.5 1.5 0 0 1 3 0v5c0 5-3 7-7 7h-1c-3 0-5-2-6-5l-1-3a1.5 1.5 0 0 1 3-1z"></path></svg>`;
  if (value.includes("encoder")) return `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7"></circle><path d="M12 5v4M12 15v4M5 12h4M15 12h4"></path></svg>`;
  if (value.includes("botones")) return `<svg viewBox="0 0 24 24"><rect x="7" y="3" width="10" height="18" rx="5"></rect><path d="M12 3v7M8 11h8"></path></svg>`;
  if (value.includes("material")) return `<svg viewBox="0 0 24 24"><path d="m12 3 8 5-8 5-8-5z"></path><path d="m4 12 8 5 8-5M4 16l8 5 8-5"></path></svg>`;
  if (value.includes("peso") || value.includes("weight")) return `<svg viewBox="0 0 24 24"><path d="M6 20h12l-1.5-11h-9z"></path><path d="M9 9a3 3 0 0 1 6 0"></path></svg>`;
  if (value.includes("switch")) return `<svg viewBox="0 0 24 24"><rect x="6" y="5" width="12" height="14" rx="3"></rect><path d="M9 9h6M9 13h6"></path></svg>`;
  if (value.includes("polling")) return `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"></circle><path d="M12 7v5l3 2"></path></svg>`;
  if (value.includes("bater") || value.includes("autonom") || value.includes("battery")) return `<svg viewBox="0 0 24 24"><rect x="4" y="7" width="15" height="10" rx="2"></rect><path d="M19 10h2v4h-2M7 12h7"></path></svg>`;
  if (value.includes("dimens")) return `<svg viewBox="0 0 24 24"><path d="M4 7h16M4 17h16M7 4v6M17 14v6"></path></svg>`;
  if (value.includes("formato") || value.includes("layout")) return `<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2"></rect><path d="M6 10h2M10 10h2M14 10h2M6 14h12"></path></svg>`;
  if (value.includes("hot-swap") || value.includes("rapid")) return `<svg viewBox="0 0 24 24"><path d="m13 2-7 11h6l-1 9 7-12h-6z"></path></svg>`;
  if (value.includes("keycap")) return `<svg viewBox="0 0 24 24"><path d="M6 8h12l2 9H4z"></path><path d="M9 12h6"></path></svg>`;
  if (value.includes("montaje")) return `<svg viewBox="0 0 24 24"><path d="M4 6h16v12H4zM8 10h8M8 14h8"></path></svg>`;
  if (value.includes("driver")) return `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"></circle><circle cx="12" cy="12" r="3"></circle></svg>`;
  if (value.includes("impedancia") || value.includes("sensibilidad")) return `<svg viewBox="0 0 24 24"><path d="M3 12h3l2-5 4 10 3-8 2 3h4"></path></svg>`;
  if (value.includes("frecuencia")) return `<svg viewBox="0 0 24 24"><path d="M3 12c2-7 4-7 6 0s4 7 6 0 4-7 6 0"></path></svg>`;
  if (value.includes("micrófono")) return `<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"></rect><path d="M6 11a6 6 0 0 0 12 0M12 17v4"></path></svg>`;
  if (value.includes("codec") || value.includes("bluetooth")) return `<svg viewBox="0 0 24 24"><path d="M7 7l10 10-5 4V3l5 4L7 17"></path></svg>`;
  if (value.includes("entrada") || value.includes("salida") || value.includes("plug") || value.includes("conector")) return `<svg viewBox="0 0 24 24"><path d="M8 4v6M16 4v6M6 10h12v4a6 6 0 0 1-12 0z"></path></svg>`;
  return `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"></circle><path d="M12 8v4M12 16h.01"></path></svg>`;
}

function coreSpec(label, value) {
  const cleaned = cleanSpecDisplayValue(value);
  const available = Array.isArray(cleaned) ? cleaned.length > 0 : cleaned !== undefined && cleaned !== null && String(cleaned).trim() !== "";
  return `
    <article class="product-spec-card ${available ? "" : "spec-unavailable"}">
      <div class="product-spec-label"><span class="product-spec-icon">${specIcon(label)}</span><span>${escapeHtml(label)}</span></div>
      <strong>${available ? escapeHtml(formatValue(cleaned)) : "No disponible"}</strong>
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
      <div class="product-spec-label"><span class="product-spec-icon">${specIcon("Agarre")}</span><span>Tipos de agarre</span></div>
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
    add("MCU", s.mcu);
    add("Polling Rate", Array.isArray(s.pollingRate) ? s.pollingRate : (s.pollingRateMax || s.pollingRate));
    add("Switch", s.switchType);
    add("Battery", s.battery || (s.batteryHours ? `${s.batteryHours} h` : ""));
    add("Weight", s.weight ? `${s.weight} g` : "");
    add("Sensor", s.sensor);
    add("Material", s.material);
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

function renderColors(colors, colorImages = []) {
  if (!Array.isArray(colors) || !colors.length) return "";
  return `
    <section class="product-info-section">
      <div class="product-section-head"><h3>Colores disponibles</h3><p>Selecciona un color para cambiar la imagen</p></div>
      <div class="product-color-list product-color-selector">
        ${colors.map((item, index) => `
          <button type="button" class="product-color ${index === 0 ? "active" : ""}"
                  data-product-color-hex="${escapeHtml(String(item.hex || "").toLowerCase())}">
            <span class="product-color-dot" style="background:${safeColor(item.hex)}"></span>
            ${escapeHtml(item.name || item.hex || "Color")}
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function bindProductColorImages(review) {
  const buttons = [...modalContent.querySelectorAll("[data-product-color-hex]")];
  const image = modalContent.querySelector(".product-detail-image");
  if (!buttons.length || !image) return;

  const mapping = new Map(
    (Array.isArray(review?.specs?.colorImages) ? review.specs.colorImages : [])
      .map(item => [String(item?.hex || "").toLowerCase(), safeImageSrc(item?.image || item?.imageUrl || "")])
      .filter(([,src]) => Boolean(src))
  );
  const fallback = safeImageSrc(review.imageUrl) || safeImageSrc(Array.isArray(review.images) ? review.images[0] : "");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      const src = mapping.get(String(button.dataset.productColorHex || "").toLowerCase()) || fallback;
      if (src) {
        const stage = modalContent.querySelector("#productMediaStage");
        if (stage) stage.innerHTML = `<img class="product-detail-image" src="${escapeHtml(src)}" alt="${escapeHtml(review.name || "Producto")}">`;
        else if (image) image.src = src;
        modalContent.querySelectorAll(".product-media-thumb").forEach(item => item.classList.remove("active"));
      }
    });
  });
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

function renderProPlayers(product) {
  const players = Array.isArray(product?.specs?.proPlayers) ? product.specs.proPlayers.slice(0, 3) : [];
  if (!players.length) return "";

  return `
    <section class="product-info-section pro-players-section">
      <div class="product-section-head">
        <h3>Jugadores profesionales</h3>
        <p>Periférico usado por</p>
      </div>
      <div class="pro-player-grid">
        ${players.map(player => {
          const name = escapeHtml(player?.name || "Jugador");
          const url = safeUrl(player?.url || "");
          const content = `
            <span class="pro-player-avatar">${escapeHtml((player?.name || "?").trim().charAt(0).toUpperCase())}</span>
            <span><strong>${name}</strong><small>${url ? "Ver red social" : "Jugador profesional"}</small></span>
            ${url ? `<b>↗</b>` : ""}`;
          return url
            ? `<a class="pro-player-card" href="${url}" target="_blank" rel="noopener noreferrer">${content}</a>`
            : `<div class="pro-player-card">${content}</div>`;
        }).join("")}
      </div>
    </section>`;
}


function renderProductDownloads(product) {
  const driverUrl = safeUrl(product?.specs?.driverDownloadUrl || "");
  const softwareUrl = safeUrl(product?.specs?.softwareDownloadUrl || "");
  if (!driverUrl && !softwareUrl) return "";

  return `
    <section class="product-info-section product-downloads-section">
      <div class="product-section-head">
        <h3>Drivers y software</h3>
        <p>Descargas oficiales configuradas por MadeLesh</p>
      </div>
      <div class="product-download-grid">
        ${driverUrl ? `
          <a class="product-download-card" href="${driverUrl}" target="_blank" rel="noopener noreferrer">
            <span class="product-download-icon">
              <svg viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 19h14"/></svg>
            </span>
            <span><small>DRIVERS</small><strong>Descargar drivers</strong></span>
            <b>↗</b>
          </a>` : ""}
        ${softwareUrl ? `
          <a class="product-download-card" href="${softwareUrl}" target="_blank" rel="noopener noreferrer">
            <span class="product-download-icon">
              <svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 9h8M8 13h5"/></svg>
            </span>
            <span><small>SOFTWARE</small><strong>Descargar software</strong></span>
            <b>↗</b>
          </a>` : ""}
      </div>
    </section>`;
}

function renderTechnicalSource(product) {
  const url = safeUrl(product?.specs?.eloShapesUrl);
  if (!url) return "";

  return `
    <section class="product-technical-source">
      <div>
        <span class="technical-source-icon">${specIcon("Sensor")}</span>
        <div>
          <small>FUENTE TÉCNICA DEL MOUSE</small>
          <strong>EloShapes</strong>
        </div>
      </div>
      <a href="${url}" target="_blank" rel="noopener noreferrer">VER FICHA ↗</a>
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
          const customIcon = safeImageSrc(store.icon || "");
          return `
            <a class="purchase-card" href="${url}" target="_blank" rel="noopener noreferrer">
              <div><span class="link-icon">${customIcon ? `<img class="store-custom-icon" src="${escapeHtml(customIcon)}" alt="">` : storeIcon()}</span><span class="link-copy"><span>TIENDA DE CONFIANZA</span><strong>${escapeHtml(store.name || "Tienda")}</strong></span></div><span>↗</span>
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
      <div class="product-section-head"><h3>Pros y contras</h3><p>Resumen MadeLesh</p></div>
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

function categoryPlaceholderDataUrl(category) {
  const defs = {
    Mouse: { label: "MOUSE", symbol: "⌁" },
    Teclados: { label: "TECLADO", symbol: "⌨" },
    IEM: { label: "IEM", symbol: "◔" },
    Headsets: { label: "HEADSET", symbol: "◉" },
    DAC: { label: "DAC", symbol: "◫" }
  };
  const item = defs[category] || { label: "PRODUCTO", symbol: "◇" };
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900">
    <defs>
      <radialGradient id="r"><stop stop-color="#34370a"/><stop offset="1" stop-color="#1a1a1c"/></radialGradient>
    </defs>
    <rect width="900" height="900" rx="64" fill="url(#r)"/>
    <circle cx="450" cy="360" r="170" fill="none" stroke="#eeff00" stroke-width="7" opacity=".28"/>
    <text x="450" y="410" text-anchor="middle" font-family="Arial,sans-serif" font-size="150" fill="#eeff00">${item.symbol}</text>
    <text x="450" y="625" text-anchor="middle" font-family="Arial,sans-serif" font-size="44" font-weight="700" fill="#ffffff">${item.label}</text>
    <text x="450" y="680" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="#96969d">IMAGEN NO DISPONIBLE</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function safeImageSrc(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  if (/^data:image\/(?:png|jpeg|webp);base64,[A-Za-z0-9+/=\s]+$/i.test(text)) return text;
  return safeUrl(text);
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
priceSort?.addEventListener("change", renderReviews);
clearFilters?.addEventListener("click", () => {
  searchInput.value = "";
  if (priceSort) priceSort.value = "default";

  Object.keys(selectedProductFilters).forEach(type => {
    selectedProductFilters[type].clear();
    multiFilterConfig[type]?.menu
      ?.querySelectorAll('input[type="checkbox"]')
      .forEach(input => { input.checked = false; });
    updateMultiFilterTrigger(type);
  });

  closeAllMultiFilters();
  renderReviews();
});

document.querySelectorAll("[data-filter]").forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    selectedProductFilters.category.clear();
    if (category) selectedProductFilters.category.add(category);

    categoryFilterMenu
      ?.querySelectorAll('input[type="checkbox"]')
      .forEach(input => { input.checked = selectedProductFilters.category.has(input.value); });

    updateMultiFilterTrigger("category");
    renderReviews();
    document.getElementById("home").scrollIntoView({ behavior: "smooth" });
  });
});

setupMultiFilterMenus();

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

loadPublicSettings();

function currentPageView() {
  const requested = new URLSearchParams(window.location.search).get("view") || "home";
  return ["home", "categorias", "comparacion"].includes(requested) ? requested : "home";
}

function applyPageView() {
  const view = currentPageView();
  document.querySelectorAll("[data-view]").forEach(section => {
    const views = String(section.dataset.view || "").split(/\s+/).filter(Boolean);
    section.hidden = !views.includes(view);
  });

  document.querySelectorAll(".desktop-nav .nav-link").forEach(link => {
    const url = new URL(link.href, window.location.href);
    link.classList.toggle("active", (url.searchParams.get("view") || "home") === view);
  });

  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

applyPageView();

restoreSession();
