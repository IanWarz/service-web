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
      { img: "https://media.istockphoto.com/id/1384317531/es/foto/rodillo-de-pintura-antes-y-despu%C3%A9s-del-hombre-para-revelar-una-habitaci%C3%B3n-recientemente.jpg?s=612x612&w=0&k=20&c=dkWg-dNOuTqenFlu4ZFxOJzjMYPef7GRvpWyGREvOuc=", text: "Pintura de interiores", price: "$35.000" },
      { img: "https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FzYXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000", text: "Ampliaciones", price: "$120.000" },
      { img: "https://w0.peakpx.com/wallpaper/503/778/HD-wallpaper-construction-contractor-thumbnail.jpg", text: "Remodelaciones", price: "$80.000" },
      { img: "https://media.istockphoto.com/id/1384317531/es/foto/rodillo-de-pintura-antes-y-despu%C3%A9s-del-hombre-para-revelar-una-habitaci%C3%B3n-recientemente.jpg?s=612x612&w=0&k=20&c=dkWg-dNOuTqenFlu4ZFxOJzjMYPef7GRvpWyGREvOuc=", text: "Pintura de interiores", price: "$35.000" },
      { img: "https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FzYXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000", text: "Ampliaciones", price: "$120.000" },
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
    name: "Educacion 📖",
    items: [
      { img: "https://media.gettyimages.com/id/1472553376/es/v%C3%ADdeo/mujer-ense%C3%B1ando-a-los-ni%C3%B1os-y-aprendiendo-con-pizarra-para-la-educaci%C3%B3n-el-futuro-y-el.jpg?s=640x640&k=20&c=uYNay8zomMb9cVFXXjBjqjqC0men7HDrFqkERD-bZ2Q=", text: "Clases presenciales", price: "$45.000" },
      { img: "https://enlinea.santotomas.cl/web/wp-content/uploads/sites/2/2019/05/bbva-educacion-1920x0-c-f.jpg", text: "Clases virtuales", price: "$25.000" },
      { img: "https://wallpapers.com/images/featured/educacion-d4w62mny8rdusxe0.jpg", text: "Examenes Libres", price: "$30.000" },
      { img: "https://media.gettyimages.com/id/1472553376/es/v%C3%ADdeo/mujer-ense%C3%B1ando-a-los-ni%C3%B1os-y-aprendiendo-con-pizarra-para-la-educaci%C3%B3n-el-futuro-y-el.jpg?s=640x640&k=20&c=uYNay8zomMb9cVFXXjBjqjqC0men7HDrFqkERD-bZ2Q=", text: "Clases presenciales", price: "$45.000" },
      { img: "https://enlinea.santotomas.cl/web/wp-content/uploads/sites/2/2019/05/bbva-educacion-1920x0-c-f.jpg", text: "Clases virtuales", price: "$25.000" },
      { img: "https://wallpapers.com/images/featured/educacion-d4w62mny8rdusxe0.jpg", text: "Examenes Libres", price: "$30.000" },
    ]
  },
  {
    name: "Salud 💉",
    items: [
      { img: "https://img.freepik.com/foto-gratis/doctor-estetoscopio-cerca_23-2149191355.jpg", text: "Cosulta Mwdica", price: "$45.000" },
      { img: "https://wallpapers.com/images/hd/medical-doctor-clinical-symbols-2nsmzg70r0to981e.jpg", text: "Tele Medicina", price: "$25.000" },
      { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv5SNKOwY8ZJRavTWx979IytOCl9FoSZN7TQ&s", text: "Compra de remedios", price: "$30.000" },
      { img: "https://img.freepik.com/foto-gratis/doctor-estetoscopio-cerca_23-2149191355.jpg", text: "Cosulta Mwdica", price: "$45.000" },
      { img: "https://wallpapers.com/images/hd/medical-doctor-clinical-symbols-2nsmzg70r0to981e.jpg", text: "Tele Medicina", price: "$25.000" },
      { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv5SNKOwY8ZJRavTWx979IytOCl9FoSZN7TQ&s", text: "Compra de remedios", price: "$30.000" },
    ]
  },
  {
    name: "Limpieza 🪣",
    items: [
      { img: "https://media.istockphoto.com/id/1365606525/es/foto/toma-de-un-cubo-de-art%C3%ADculos-de-limpieza.jpg?s=612x612&w=0&k=20&c=F16ka9KPsmIwGzClt4y-yrec43BZZjit8OpV3geAySA=", text: "Limpieza a domicilio", price: "$45.000" },
      { img: "https://img.freepik.com/foto-gratis/composicion-plana-productos-limpieza-espacio-copia_23-2148133453.jpg", text: "Venta de Insumos", price: "$25.000" },
      { img: "https://media.gettyimages.com/id/1985444295/es/v%C3%ADdeo/t%C3%A9cnico-de-sistemas-de-energ%C3%ADa-solar-limpieza-de-paneles-solares-servicio-de-mantenimiento-de.jpg?s=640x640&k=20&c=sNEBT4YCb2-QeI3dMOfXPG-Y3IdT1wkHB7nzZN9ayxg=", text: "Limpieza Industrial", price: "$30.000" },
      { img: "https://media.istockphoto.com/id/1365606525/es/foto/toma-de-un-cubo-de-art%C3%ADculos-de-limpieza.jpg?s=612x612&w=0&k=20&c=F16ka9KPsmIwGzClt4y-yrec43BZZjit8OpV3geAySA=", text: "Limpieza a domicilio", price: "$45.000" },
      { img: "https://img.freepik.com/foto-gratis/composicion-plana-productos-limpieza-espacio-copia_23-2148133453.jpg", text: "Venta de Insumos", price: "$25.000" },
      { img: "https://media.gettyimages.com/id/1985444295/es/v%C3%ADdeo/t%C3%A9cnico-de-sistemas-de-energ%C3%ADa-solar-limpieza-de-paneles-solares-servicio-de-mantenimiento-de.jpg?s=640x640&k=20&c=sNEBT4YCb2-QeI3dMOfXPG-Y3IdT1wkHB7nzZN9ayxg=", text: "Limpieza Industrial", price: "$30.000" },
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

const chatToggle = document.getElementById("chatToggle");
    const chatBox = document.getElementById("chatBox");
    const sendBtn = document.getElementById("sendBtn");
    const userInput = document.getElementById("userInput");
    const chatMessages = document.getElementById("chatMessages");

    // Mostrar/ocultar chat
    chatToggle.addEventListener("click", () => {
      chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
    });

    // Enviar mensaje
    function sendMessage() {
      const text = userInput.value.trim();
      if (text) {
        // Mensaje del usuario
        const userMsg = document.createElement("div");
        userMsg.classList.add("message", "user");
        userMsg.textContent = text;
        chatMessages.appendChild(userMsg);

        // Respuesta automática
        setTimeout(() => {
          const botMsg = document.createElement("div");
          botMsg.classList.add("message", "bot");
          botMsg.textContent = text.toLowerCase().includes("hola")
            ? "¡Hola! 😊 ¿Cómo estás?"
            : "Gracias por tu mensaje, te responderé pronto.";
          chatMessages.appendChild(botMsg);
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 500);

        userInput.value = "";
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    }

    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage();
    });
