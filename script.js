
async function getCarrucel(param) {

  let url = "https://n8n-222090883518.southamerica-west1.run.app/webhook/7efcaa84-1d51-4b03-8c57-193606a4a65f";

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

// Generar/guardar sessionId (para persistencia)
const sessionKey = "chatSessionId";
let sessionId = localStorage.getItem(sessionKey);
if (!sessionId) {
  sessionId = crypto.randomUUID();
  localStorage.setItem(sessionKey, sessionId);
}

// Enviar mensaje al asistente
async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  // Mostrar mensaje del usuario
  const userMsg = document.createElement("div");
  userMsg.classList.add("message", "user");
  userMsg.textContent = text;
  chatMessages.appendChild(userMsg);
  userInput.value = "";
  chatMessages.scrollTop = chatMessages.scrollHeight;

  try {
    const res = await fetch("https://n8n-222090883518.southamerica-west1.run.app/webhook/edb0e7d3-850a-4803-977a-b1da870c58a2/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, chatInput: text }), // chatInput es lo que tu flujo espera
    });

    const data = await res.json();

    // Normalizar la respuesta
    let messages = [];
    if (data.output) {
      messages = [{ text: data.output }];
    } else if (Array.isArray(data)) {
      messages = data.map(item => ({ text: item.output || JSON.stringify(item) }));
    } else if (data.items) {
      messages = data.items.map(i => ({ text: i.json.output || JSON.stringify(i.json) }));
    } else {
      messages = [{ text: "Error al obtener respuesta del asistente 😕" }];
    }

    // Mostrar los mensajes del bot
    messages.forEach(msg => {
      let botText = msg.text;

      // Detectar bloque Markdown tipo ```json``` y limpiar si existe
      const mdMatch = botText.match(/```json\s*([\s\S]*?)\s*```/);
      if (mdMatch) {
        try {
          const parsed = JSON.parse(mdMatch[1]);
          botText = parsed.text || JSON.stringify(parsed);
        } catch (e) {
          console.error("Error parseando JSON del asistente:", e);
        }
      }

      const botMsg = document.createElement("div");
      botMsg.classList.add("message", "bot");
      botMsg.textContent = botText;
      chatMessages.appendChild(botMsg);
    });

  } catch (err) {
    const botMsg = document.createElement("div");
    botMsg.classList.add("message", "bot");
    botMsg.textContent = "Error conectando con el asistente 😕";
    chatMessages.appendChild(botMsg);
    console.error(err);
  }

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Event listeners
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
