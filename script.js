// =============================
// Script interatividade ProzFit
// =============================

// 1) Carrossel de imagens no banner principal
let imagens = [
    "/imagens/banner1.png",
    "/imagens/banner2.png",
    "/imagens/banner3.png"
];
let indice = 0;
const banner = document.querySelector(".carousel-overlay");

function trocarImagem() {
    indice = (indice + 1) % imagens.length;
    banner.style.backgroundImage = `url(${imagens[indice]})`;
}
setInterval(trocarImagem, 4000); // Troca a cada 4s

// 2) Rolagem suave ao clicar no menu
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    });
});

// 3) Botão "Voltar ao Topo"
const botaoTopo = document.createElement("div");
botaoTopo.innerText = "⬆";
botaoTopo.classList.add("voltar-topo");
document.body.appendChild(botaoTopo);

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        botaoTopo.style.display = "block";
    } else {
        botaoTopo.style.display = "none";
    }
});

botaoTopo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// 4) Chatbot simples
const chatbotBtn = document.querySelector(".chatbot-button");
chatbotBtn.addEventListener("click", () => {
    alert("Olá! 👋 Como posso ajudar você na ProzFit?");
});

// 5) Animação de fade-in nas seções
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
        }
    });
});

document.querySelectorAll("section").forEach(secao => {
    observer.observe(secao);
});