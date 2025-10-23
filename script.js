
async function getCarrucel(param) {

  let url = "https://n8n-222090883518.southamerica-west1.run.app/webhook/fb86a804-1cdd-4eab-8e74-0bc5d5a9cb18";

  let body = {
    type: param
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    // Guardar resultado en constante
    const result = await response.json();

    console.log(result); // opcional: ver en consola
    return result;       // devuelve el JSON
  } catch (error) {
    console.error('Error al hacer fetch:', error);
    return null;
  }
  
}


// ===== Carrusel 3D =====
let services = await getCarrucel('carrucel')

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
const categories = await getCarrucel('categories')
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

window.irAlTexto = function(id) {
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
