document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Menu Mobile (UI Funcionalidade 1)
    const menuToggle = document.querySelector(".menu-toggle");
    const siteNav = document.querySelector(".site-nav");

    menuToggle.addEventListener("click", () => {
        siteNav.classList.toggle("active");
        let isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", !isExpanded);
    });

    // 2. Accordion na seção Sobre (UI Funcionalidade 2)
    const acc = document.getElementsByClassName("accordion-btn");
    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            let panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            } 
        });
    }

    // Interação de Seleção de Formato/Tamanho (UI/UX)
    const formatBtns = document.querySelectorAll('.format-btn');
    formatBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove a seleção dos irmãos
            let siblings = this.parentElement.querySelectorAll('.format-btn');
            siblings.forEach(s => s.classList.remove('selected'));
            // Adiciona a este
            this.classList.add('selected');
        });
    });

    // 3. Interação do Formulário com 8 Elementos
    const formContato = document.getElementById("form-contato");
    formContato.addEventListener("submit", function(event) {
        event.preventDefault();
        
        let btn = this.querySelector('.btn-buy');
        let originalText = btn.innerText;
        
        btn.innerText = "ENVIANDO...";
        btn.style.opacity = "0.7";

        // Simulação de delay de envio
        setTimeout(() => {
            alert("Mensagem enviada com sucesso para a garagem da Brasa!");
            formContato.reset();
            btn.innerText = originalText;
            btn.style.opacity = "1";
        }, 1500);
    });
});

// Modal de Produto - Led Zeppelin IV
function abrirModalLedIV() {
    const modal = document.getElementById('modal-led-iv');
    modal.classList.add('aberto');
    document.body.style.overflow = 'hidden';
    document.getElementById('cep-frete').value = '';
    document.getElementById('frete-resultado').style.display = 'none';
}

function fecharModalLedIV(event) {
    if (event && event.target !== document.getElementById('modal-led-iv')) return;
    const modal = document.getElementById('modal-led-iv');
    modal.classList.remove('aberto');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('modal-led-iv');
        if (modal.classList.contains('aberto')) {
            modal.classList.remove('aberto');
            document.body.style.overflow = '';
        }
    }
});

function calcularFrete() {
    const cep = document.getElementById('cep-frete').value.replace(/\D/g, '');
    const resultado = document.getElementById('frete-resultado');

    if (cep.length < 8) {
        resultado.style.display = 'block';
        resultado.innerHTML = '⚠️ Digite um CEP válido com 8 dígitos.';
        return;
    }

    resultado.style.display = 'block';
    resultado.innerHTML = 'Calculando...';

    setTimeout(() => {
        resultado.innerHTML = `
            <strong>Opções de entrega:</strong><br>
            PAC — R$ 18,90 · Prazo: 7 a 12 dias úteis<br>
            SEDEX — R$ 34,50 · Prazo: 2 a 4 dias úteis
        `;
    }, 1000);
}

// Inicialização das Bibliotecas JQuery
$(document).ready(function(){
    
    // 4. Slick Carousel para a Seção Hero
    $('.hero-slider').slick({
        dots: false,
        infinite: true,
        speed: 800,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false
    });

    // 5. JQuery Mask para o Input de Telefone (WhatsApp) no form de 8 elementos
    $('#telefone').mask('(00) 00000-0000');

    // Máscara do campo de CEP no modal
    $('#cep-frete').mask('00000-000');

    // 6. Mapa Leaflet - Brasa Vinil em Porto Alegre
    const mapa = L.map('mapa').setView([-30.0329, -51.2192], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 19
    }).addTo(mapa);
    L.marker([-30.0329, -51.2192]).addTo(mapa).bindPopup('<strong>Brasa Vinil</strong><br>Rua Voluntários da Pátria<br>Porto Alegre, RS');

    // Fancybox inicializa sozinho através do atributo data-fancybox="gallery" no HTML
});