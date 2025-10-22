// ===== Carrusel 3D =====
const services = [
  { title: "Construcción", desc: "Servicios de construcción de alta calidad.", bg: "url('https://w0.peakpx.com/wallpaper/503/778/HD-wallpaper-construction-contractor-thumbnail.jpg')" },
  { title: "Educación", desc: "Clases y cursos en diversas áreas.", bg: "url('https://plus.unsplash.com/premium_photo-1681843661864-3f46bfb1a4fb?auto=format&fit=crop&w=1470&q=80')" },
  { title: "Comida", desc: "Deliciosos servicios de catering y preparación de alimentos.", bg: "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80')" },
  { title: "Tecnología", desc: "Soluciones tecnológicas innovadoras.", bg: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1470&q=80')" },
  { title: "Salud", desc: "Servicios médicos y de bienestar.", bg: "url('https://static.vecteezy.com/system/resources/previews/006/712/964/non_2x/abstract-health-medical-science-healthcare-icon-digital-technology-doctor-concept-modern-innovation-treatment-medicine-on-hi-tech-future-blue-background-for-wallpaper-template-web-design-vector.jpg')" },
  { title: "Limpieza", desc: "Servicios de limpieza para hogares y oficinas.", bg: "url('https://www.ohmybox.es/getattachment/7ea46548-60c7-453c-a96e-01258071e838/10stepsspringcleaning.jpg')" }
];

const carousel = document.getElementById("carousel");
const titleEl = document.getElementById("service-title");
const descEl = document.getElementById("service-desc");
const mainEl = document.getElementById("main");

const radius = 180;
const angleStep = 360 / services.length;
let rotationY = 0;
let currentCenter = -1;

services.forEach((service, i) => {
  const item = document.createElement("div");
  item.classList.add("carousel-item");
  item.style.backgroundImage = service.bg;
  item.dataset.index = i;
  carousel.appendChild(item);
});

function updateCarousel() {
  const items = document.querySelectorAll(".carousel-item");
  items.forEach((el, i) => {
    const angle = i * angleStep + rotationY;
    const rad = (angle * Math.PI) / 180;
    const x = Math.sin(rad) * radius;
    const z = Math.cos(rad) * radius;
    const scale = z > 0 ? 1.2 : 0.8;
    el.style.transform = `translateX(${x}px) translateZ(${z}px) translateX(-50%) translateY(-50%) scale(${scale})`;
    el.style.zIndex = Math.round(z);
    el.style.opacity = z > 0 ? 1 : 0.4;
  });
}

function updateCenterItem() {
  const index = Math.round((-rotationY % 360) / angleStep) % services.length;
  const normalizedIndex = (index + services.length) % services.length;
  if (normalizedIndex !== currentCenter) {
    currentCenter = normalizedIndex;
    const service = services[normalizedIndex];
    mainEl.style.backgroundImage = service.bg;

    titleEl.classList.add("fade-enter");
    descEl.classList.add("fade-enter");
    setTimeout(() => {
      titleEl.textContent = service.title;
      descEl.textContent = service.desc;
      titleEl.classList.add("fade-enter-active");
      descEl.classList.add("fade-enter-active");
    }, 50);
    setTimeout(() => {
      titleEl.classList.remove("fade-enter", "fade-enter-active");
      descEl.classList.remove("fade-enter", "fade-enter-active");
    }, 600);
  }
}

setInterval(() => {
  rotationY += 0.3;
  updateCarousel();
  updateCenterItem();
}, 30);

updateCarousel();
updateCenterItem();


// ===== Secciones dinámicas con scroll hasta el final =====
const categories = [
  {
    name: "Comida 🍽️",
    items: [
      { img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80", text: "Catering gourmet", price: "$45.000" },
      { img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=400&q=80", text: "Menús ejecutivos", price: "$25.000" },
      { img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80", text: "Eventos familiares", price: "$30.000" },
      { img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80", text: "Catering gourmet", price: "$45.000" },
      { img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=400&q=80", text: "Menús ejecutivos", price: "$25.000" },
      { img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80", text: "Eventos familiares", price: "$30.000" },
      
    ]
  },
  {
    name: "Construcción 🧱",
    items: [
      { img: "https://w0.peakpx.com/wallpaper/503/778/HD-wallpaper-construction-contractor-thumbnail.jpg", text: "Remodelaciones", price: "$80.000" },
      { img: "https://images.unsplash.com/photo-1597003101852-5d3e0d7b08df?auto=format&fit=crop&w=400&q=80", text: "Pintura de interiores", price: "$35.000" },
      { img: "https://images.unsplash.com/photo-1597003101852-5d3e0d7b08df?auto=format&fit=crop&w=400&q=80", text: "Ampliaciones", price: "$120.000" },
      { img: "https://w0.peakpx.com/wallpaper/503/778/HD-wallpaper-construction-contractor-thumbnail.jpg", text: "Remodelaciones", price: "$80.000" },
      { img: "https://images.unsplash.com/photo-1597003101852-5d3e0d7b08df?auto=format&fit=crop&w=400&q=80", text: "Pintura de interiores", price: "$35.000" },
      { img: "https://images.unsplash.com/photo-1597003101852-5d3e0d7b08df?auto=format&fit=crop&w=400&q=80", text: "Ampliaciones", price: "$120.000" },
    ]
  },
  {
    name: "Tecnología 💻",
    items: [
      { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80", text: "Desarrollo web", price: "$150.000" },
      { img: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&w=400&q=80", text: "Soporte IT", price: "$70.000" },
      { img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&w=400&q=80", text: "Infraestructura Cloud", price: "$200.000" },
      { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80", text: "Desarrollo web", price: "$150.000" },
      { img: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&w=400&q=80", text: "Soporte IT", price: "$70.000" },
      { img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&w=400&q=80", text: "Infraestructura Cloud", price: "$200.000" },
    ]
  },
  {
    name: "Educacion 🍽️",
    items: [
      { img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80", text: "Catering gourmet", price: "$45.000" },
      { img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=400&q=80", text: "Menús ejecutivos", price: "$25.000" },
      { img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80", text: "Eventos familiares", price: "$30.000" },
      { img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80", text: "Catering gourmet", price: "$45.000" },
      { img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=400&q=80", text: "Menús ejecutivos", price: "$25.000" },
      { img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80", text: "Eventos familiares", price: "$30.000" },
      
    ]
  },
  {
    name: "Salud 🍽️",
    items: [
      { img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80", text: "Catering gourmet", price: "$45.000" },
      { img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=400&q=80", text: "Menús ejecutivos", price: "$25.000" },
      { img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80", text: "Eventos familiares", price: "$30.000" },
      { img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80", text: "Catering gourmet", price: "$45.000" },
      { img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=400&q=80", text: "Menús ejecutivos", price: "$25.000" },
      { img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80", text: "Eventos familiares", price: "$30.000" },
      
    ]
  },
  {
    name: "Limpieza 🍽️",
    items: [
      { img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80", text: "Catering gourmet", price: "$45.000" },
      { img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=400&q=80", text: "Menús ejecutivos", price: "$25.000" },
      { img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80", text: "Eventos familiares", price: "$30.000" },
      { img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80", text: "Catering gourmet", price: "$45.000" },
      { img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=400&q=80", text: "Menús ejecutivos", price: "$25.000" },
      { img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80", text: "Eventos familiares", price: "$30.000" },
      
    ]
  }
];

const container = document.getElementById("categories-container");

categories.forEach(cat => {
  const line = document.createElement("div");
  line.classList.add("category-line");

  const title = document.createElement("h3");
  title.classList.add("category-title");
  title.textContent = cat.name;
  line.appendChild(title);

  const row = document.createElement("div");
  row.classList.add("cards-row");

  cat.items.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${item.img}" alt="${item.text}">
      <div class="card-info">
        <p class="card-text">${item.text}</p>
        <p class="card-price">${item.price}</p>
      </div>
    `;

    row.appendChild(card);
  });


  line.appendChild(row);
  container.appendChild(line);
});

// ===== Animación de aparición (fade-up) =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".card").forEach(card => observer.observe(card));

function irAlTexto(id) {
  const elemento = document.getElementById(id);
  elemento.scrollIntoView({ behavior: "smooth" }); // scroll suave
}
