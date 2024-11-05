// Initialisation des animations AOS avec plus d'options
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false,
    offset: 100
});

// Gestion du menu hamburger améliorée
function initMobileMenu() {
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    
    const nav = document.querySelector('nav');
    const menu = document.querySelector('nav ul');
    
    nav.insertBefore(hamburger, menu);

    hamburger.addEventListener('click', () => {
        menu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animation du hamburger
        if (hamburger.classList.contains('active')) {
            hamburger.querySelector('span:nth-child(1)').style.transform = 'rotate(45deg) translate(5px, 5px)';
            hamburger.querySelector('span:nth-child(2)').style.opacity = '0';
            hamburger.querySelector('span:nth-child(3)').style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            hamburger.querySelector('span:nth-child(1)').style.transform = 'none';
            hamburger.querySelector('span:nth-child(2)').style.opacity = '1';
            hamburger.querySelector('span:nth-child(3)').style.transform = 'none';
        }
    });

    // Fermer le menu lors du clic sur un lien
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.querySelectorAll('span').forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });

    // Fermer le menu lors du défilement
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll && menu.classList.contains('active')) {
            menu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.querySelectorAll('span').forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
        lastScroll = currentScroll;
    });
}

// Initialiser le menu mobile
document.addEventListener('DOMContentLoaded', initMobileMenu);

// Gestion du redimensionnement
window.addEventListener('resize', () => {
    const menu = document.querySelector('nav ul');
    const hamburger = document.querySelector('.hamburger');
    
    if (window.innerWidth > 768) {
        menu.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
            hamburger.querySelectorAll('span').forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    }
});

// Animation des compétences
const skillItems = document.querySelectorAll('.skill-item');
const animateSkills = () => {
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('animate');
    });
};

// Observer pour les animations au scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .skill-item').forEach(item => {
    observer.observe(item);
});

// Animation du texte de la hero section
const heroText = document.querySelector('.hero-content h1');
if (heroText) {
    const text = heroText.textContent;
    heroText.innerHTML = '';
    [...text].forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.animationDelay = `${i * 0.1}s`;
        heroText.appendChild(span);
    });
}

// Amélioration du formulaire de contact
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = form.querySelector('button');
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
        
        // Simuler un envoi
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        button.innerHTML = '<i class="fas fa-check"></i> Envoyé!';
        button.style.backgroundColor = '#2ecc71';
        
        setTimeout(() => {
            button.innerHTML = 'Envoyer';
            button.style.backgroundColor = '';
            form.reset();
        }, 3000);
    });
}

// Animation smooth scroll améliorée
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Calcul de la position avec offset pour le header fixe
            const headerOffset = 80; // Hauteur du header
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Fermer le menu mobile si ouvert
            const menu = document.querySelector('nav ul');
            const hamburger = document.querySelector('.hamburger');
            if (menu && menu.classList.contains('active')) {
                menu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Ajout d'une fonction pour gérer le clic sur le bouton CTA
document.querySelector('.cta-button').addEventListener('click', function(e) {
    e.preventDefault();
    const contactSection = document.querySelector('#contact');
    const headerOffset = 80;
    const elementPosition = contactSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
});

// Création des particules
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = Math.random() * 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Animation du texte de la hero section
function animateHeroText() {
    const text = document.querySelector('.hero-content h1').textContent;
    const chars = text.split('');
    document.querySelector('.hero-content h1').innerHTML = chars
        .map((char, i) => `<span style="animation-delay: ${i * 0.1}s">${char}</span>`)
        .join('');
}

// Curseur personnalisé
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });
}

// Indicateur de défilement
function createScrollIndicator() {
    const sections = document.querySelectorAll('section');
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';

    sections.forEach(() => {
        const dot = document.createElement('div');
        dot.className = 'scroll-dot';
        indicator.appendChild(dot);
    });

    document.body.appendChild(indicator);
}

function updateScrollIndicator() {
    const sections = document.querySelectorAll('section');
    const dots = document.querySelectorAll('.scroll-dot');
    
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            dots[index].classList.add('active');
        } else {
            dots[index].classList.remove('active');
        }
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    animateHeroText();
    initCustomCursor();
    createScrollIndicator();
    
    window.addEventListener('scroll', updateScrollIndicator);
});

// Animation des compétences au scroll
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transform = 'scale(1)';
            entry.target.style.opacity = '1';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-item').forEach(item => {
    item.style.transform = 'scale(0.8)';
    item.style.opacity = '0';
    item.style.transition = 'transform 0.5s, opacity 0.5s';
    skillsObserver.observe(item);
}); 