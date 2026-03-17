// ===== Typing Effect =====
const titles = [
    "Construction Project Manager",
    "BIM Professional",
    "AI & Construction Innovator",
    "LEED Green Associate",
    "Vanderbilt M.Eng Candidate"
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');

function type() {
    const current = titles[titleIndex];

    if (isDeleting) {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        speed = 400;
    }

    setTimeout(type, speed);
}

type();

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
    });
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===== Scroll Reveal Animation =====
function initScrollReveal() {
    // Individual fade-in elements
    const elements = document.querySelectorAll(
        '.exp-card, .timeline-item, .stat-card, .about-text'
    );
    elements.forEach(el => el.classList.add('fade-in'));

    // Stagger groups
    const staggerGroups = document.querySelectorAll('.fade-in-stagger');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
    staggerGroups.forEach(el => observer.observe(el));
}

initScrollReveal();

// ===== Counter Animation =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 1500;
                const start = performance.now();

                function update(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    counter.textContent = Math.floor(eased * target);

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        counter.textContent = target;
                    }
                }

                requestAnimationFrame(update);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

animateCounters();

// ===== Floating Particles =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const delay = Math.random() * -10;
        const duration = Math.random() * 8 + 6;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(59, 130, 246, ${Math.random() * 0.4 + 0.1});
            border-radius: 50%;
            left: ${startX}%;
            top: ${startY}%;
            animation: particleDrift ${duration}s ease-in-out ${delay}s infinite;
        `;
        container.appendChild(particle);
    }

    // Add a few gold particles for construction accent
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 2 + 1;
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(245, 158, 11, ${Math.random() * 0.2 + 0.05});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleDrift ${Math.random() * 10 + 8}s ease-in-out ${Math.random() * -8}s infinite;
        `;
        container.appendChild(particle);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleDrift {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
            25% { transform: translate(20px, -40px) scale(1.3); opacity: 0.8; }
            50% { transform: translate(-15px, -80px) scale(0.7); opacity: 0.2; }
            75% { transform: translate(25px, -40px) scale(1.1); opacity: 0.6; }
        }
    `;
    document.head.appendChild(style);
}

createParticles();
