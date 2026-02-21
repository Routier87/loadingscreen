const music = document.getElementById("music");
const muteBtn = document.getElementById("muteBtn");

const staffBtn = document.getElementById("staffBtn");
const staffMenu = document.getElementById("staffMenu");

const bar = document.getElementById("bar");
const hint = document.getElementById("hint");

// --- Musique : tentative d'autoplay (selon restrictions navigateur) ---
let started = false;

async function startMusic() {
  if (started) return;
  started = true;

  try {
    music.volume = 0.25;
    await music.play();
    updateMuteIcon();
  } catch (e) {
    // Certains navigateurs bloquent l'autoplay
    hint.textContent = "Clique pour activer la musique (si elle ne démarre pas automatiquement).";
    started = false;
  }
}

function updateMuteIcon() {
  muteBtn.textContent = music.muted ? "🔇" : "🔊";
}

muteBtn.addEventListener("click", () => {
  music.muted = !music.muted;
  updateMuteIcon();
  startMusic();
});

// Clique n'importe où = aide à lancer l'audio si bloqué
window.addEventListener("click", () => startMusic(), { once: false });

// --- Menu staff ---
function toggleMenu(force) {
  const shouldOpen = typeof force === "boolean" ? force : !staffMenu.classList.contains("open");
  staffMenu.classList.toggle("open", shouldOpen);
  staffBtn.setAttribute("aria-expanded", String(shouldOpen));
}

staffBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleMenu();
});

document.addEventListener("click", () => toggleMenu(false));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") toggleMenu(false);
});

// --- Progress "visuel" (tu peux le remplacer par un vrai progress si tu veux) ---
let progress = 10;
const tips = [
  "Astuce : pense à lire le règlement en arrivant en ville.",
  "Astuce : /me et /do pour un RP plus propre.",
  "Astuce : une scène RP = de la cohérence avant tout.",
  "Astuce : rejoins le Discord pour les annonces."
];

setInterval(() => {
  progress += Math.random() * 7;
  if (progress > 100) progress = 100;
  bar.style.width = `${progress}%`;
}, 700);

setInterval(() => {
  hint.textContent = tips[Math.floor(Math.random() * tips.length)];
}, 4500);

// Démarrage musique (tentative)
startMusic();
