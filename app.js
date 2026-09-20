const reviews = [
  {
    id: "mouse-pro-x",
    category: "Mouse",
    brand: "MadeGear",
    name: "Mouse Pro X",
    score: 9.1,
    date: "19 SEP 2026",
    price: "$79",
    summary: "Ligero, preciso y construido para competitivo. Una forma segura y un sensor excelente.",
    pros: ["58 g de peso", "Sensor muy consistente", "Buena autonomía"],
    cons: ["Sin Bluetooth", "Solo dos botones laterales"]
  },
  {
    id: "iem-reference-one",
    category: "IEM",
    brand: "AudioLab",
    name: "Reference One",
    score: 8.8,
    date: "17 SEP 2026",
    price: "$49",
    summary: "Afinación equilibrada con medios naturales y una presentación muy fácil de disfrutar.",
    pros: ["Medios naturales", "Buen imaging", "Cómodos por horas"],
    cons: ["Accesorios básicos", "Escena moderada"]
  },
  {
    id: "keyboard-75-he",
    category: "Teclados",
    brand: "KeyLab",
    name: "Keyboard 75 HE",
    score: 9.0,
    date: "15 SEP 2026",
    price: "$119",
    summary: "Switches magnéticos, actuación ajustable y un formato 75% muy bien resuelto.",
    pros: ["Rapid Trigger", "Keycaps PBT", "Buena construcción"],
    cons: ["Software mejorable", "Precio elevado"]
  },
  {
    id: "air-wireless",
    category: "Headsets",
    brand: "SoundLab",
    name: "Air Wireless",
    score: 8.5,
    date: "12 SEP 2026",
    price: "$89",
    summary: "Headset inalámbrico cómodo, estable y con autonomía suficiente para varios días.",
    pros: ["Muy cómodo", "45 h de batería", "Conexión estable"],
    cons: ["Micrófono correcto, no excepcional", "Sin conexión simultánea"]
  },
  {
    id: "mini-dac-amp",
    category: "DAC",
    brand: "MadeAudio",
    name: "Mini DAC Amp",
    score: 8.9,
    date: "10 SEP 2026",
    price: "$99",
    summary: "Compacto, silencioso y con suficiente potencia para la mayoría de IEM y audífonos.",
    pros: ["Muy bajo ruido", "Salida 4.4 mm", "Construcción sólida"],
    cons: ["Sin Bluetooth", "Sin pantalla"]
  },
  {
    id: "mouse-air-s",
    category: "Mouse",
    brand: "MadeGear",
    name: "Mouse Air S",
    score: 8.6,
    date: "08 SEP 2026",
    price: "$59",
    summary: "Una alternativa ligera de buen precio para claw y fingertip.",
    pros: ["Buen valor", "Forma ágil", "Cable USB-C"],
    cons: ["Coating promedio", "Clicks algo duros"]
  }
];

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
const modalContent = document.getElementById("modalContent");

document.getElementById("year").textContent = new Date().getFullYear();

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

function cardTemplate(review) {
  return `
    <article class="review-card" data-category="${review.category}" data-review="${review.id}" tabindex="0" role="button" aria-label="Abrir review ${review.name}">
      <div class="review-visual">
        <div class="visual-shape"></div>
        <div class="score-badge">${review.score.toFixed(1)}</div>
      </div>

      <div class="review-content">
        <div class="review-meta">
          <span>${review.category}</span>
          <span>${review.date}</span>
        </div>

        <h3>${review.brand}<br>${review.name}</h3>
        <p>${review.summary}</p>

        <div class="review-read">
          <span>LEER REVIEW</span>
          <span>${review.price} ↗</span>
        </div>
      </div>
    </article>
  `;
}

function renderReviews() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;

  const filtered = reviews.filter(review => {
    const matchesCategory = category === "Todos" || review.category === category;
    const haystack = `${review.brand} ${review.name} ${review.category} ${review.summary}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    return matchesCategory && matchesQuery;
  });

  reviewsGrid.innerHTML = filtered.map(cardTemplate).join("");
  emptyMessage.hidden = filtered.length > 0;

  bindCards();
}

function bindCards() {
  reviewsGrid.querySelectorAll(".review-card").forEach(card => {
    const open = () => openReview(card.dataset.review);
    card.addEventListener("click", open);
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  });
}

function openReview(id) {
  const review = reviews.find(item => item.id === id);
  if (!review) return;

  modalContent.innerHTML = `
    <div class="modal-hero">
      <span class="modal-category">${review.category} · ${review.date}</span>
      <h2 id="modalTitle">${review.brand}<br>${review.name}</h2>
      <span class="modal-score">${review.score.toFixed(1)} / 10</span>
    </div>

    <div class="modal-body">
      <p class="modal-summary">${review.summary}</p>

      <div class="modal-grid">
        <section class="modal-box">
          <h3>Pros</h3>
          <ul>${review.pros.map(item => `<li>${item}</li>`).join("")}</ul>
        </section>

        <section class="modal-box">
          <h3>Contras</h3>
          <ul>${review.cons.map(item => `<li>${item}</li>`).join("")}</ul>
        </section>
      </div>
    </div>
  `;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

modal.querySelectorAll("[data-close-modal]").forEach(el => {
  el.addEventListener("click", closeModal);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    closeModal();
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

const featured = reviews[0];
if (featured) {
  document.getElementById("featuredName").textContent = `${featured.brand} ${featured.name}`;
  document.getElementById("featuredText").textContent = featured.summary;
  document.getElementById("featuredScore").textContent = featured.score.toFixed(1);
  document.getElementById("featuredLink").addEventListener("click", event => {
    event.preventDefault();
    openReview(featured.id);
  });
}

renderReviews();
