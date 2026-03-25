// ===== Page Load Animation =====
document.body.classList.add('page-loading');
window.addEventListener('load', () => {
    // Small delay so the transition is visible
    requestAnimationFrame(() => {
        document.body.classList.remove('page-loading');
    });
});

// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Typing Effect =====
const titles = [
    "Construction Project Manager",
    "BIM Professional",
    "LEED Green Associate",
    "PMP Certified Professional",
    "Civil Engineer"
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

    let speed = isDeleting ? 35 : 65;

    if (!isDeleting && charIndex === current.length) {
        speed = 2200;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        speed = 500;
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
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
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
    const elements = document.querySelectorAll(
        '.exp-card, .timeline-item, .stat-card, .about-text, .project-card'
    );
    elements.forEach(el => el.classList.add('fade-in'));

    const staggerGroups = document.querySelectorAll('.fade-in-stagger');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

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
                const duration = 1200;
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

// ===== Live CST Clock =====
const clockEl = document.getElementById('liveClock');

function updateClock() {
    const now = new Date();
    const cst = new Date(now.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
    const h = cst.getHours();
    const m = cst.getMinutes();
    const s = cst.getSeconds();
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    const pad = (n) => String(n).padStart(2, '0');

    clockEl.textContent = `${h12}:${pad(m)}:${pad(s)} ${ampm}`;

    // Rotate analog clock hands
    const hourHand = document.getElementById('clockHourHand');
    const minuteHand = document.getElementById('clockMinuteHand');
    const secondHand = document.getElementById('clockSecondHand');

    if (hourHand && minuteHand && secondHand) {
        const hourDeg = (h % 12) * 30 + m * 0.5; // 360/12 = 30° per hour + minute offset
        const minDeg = m * 6 + s * 0.1;           // 360/60 = 6° per minute + second offset
        const secDeg = s * 6;                       // 360/60 = 6° per second

        hourHand.setAttribute('transform', `rotate(${hourDeg} 20 20)`);
        minuteHand.setAttribute('transform', `rotate(${minDeg} 20 20)`);
        secondHand.setAttribute('transform', `rotate(${secDeg} 20 20)`);
    }

    // Update atmosphere based on hour
    updateAtmosphere(h);
}

// ===== Time-of-Day Atmosphere =====
function updateAtmosphere(hour) {
    const root = document.documentElement;

    let orangeBoost, warmth, gridBoost, overlayColor;

    if (hour >= 6 && hour < 12) {
        // Morning: warm, slightly brighter
        orangeBoost = 0.03;
        warmth = 0.02;
        gridBoost = 0.03;
        overlayColor = 'rgba(240, 160, 80, 0.03)';
    } else if (hour >= 12 && hour < 17) {
        // Afternoon: brightest, most warm
        orangeBoost = 0.05;
        warmth = 0.03;
        gridBoost = 0.04;
        overlayColor = 'rgba(240, 180, 100, 0.04)';
    } else if (hour >= 17 && hour < 20) {
        // Sunset / golden hour: amber tint peaks
        orangeBoost = 0.08;
        warmth = 0.05;
        gridBoost = 0.02;
        overlayColor = 'rgba(245, 197, 24, 0.05)';
    } else {
        // Night: default dark (no boost)
        orangeBoost = 0;
        warmth = 0;
        gridBoost = 0;
        overlayColor = 'rgba(0, 0, 0, 0)';
    }

    root.style.setProperty('--atm-orange-boost', orangeBoost);
    root.style.setProperty('--atm-warmth', warmth);
    root.style.setProperty('--atm-grid-boost', gridBoost);

    // Apply atmosphere overlay to body
    let atmOverlay = document.getElementById('atmosphereOverlay');
    if (!atmOverlay) {
        atmOverlay = document.createElement('div');
        atmOverlay.id = 'atmosphereOverlay';
        atmOverlay.style.cssText = `
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 0;
            transition: background 2s ease;
        `;
        document.body.appendChild(atmOverlay);
    }
    atmOverlay.style.background = overlayColor;

    // Adjust blueprint grids - make them slightly more visible during day
    document.querySelectorAll('.blueprint-bg').forEach(el => {
        el.style.opacity = 1 + parseFloat(gridBoost);
    });

    // Adjust orange glows on cards
    document.querySelectorAll('.stat-card, .exp-card, .cert-card').forEach(el => {
        el.style.filter = `brightness(${1 + warmth})`;
    });

    // Adjust hazard stripes
    document.querySelectorAll('.hazard-stripe').forEach(el => {
        el.style.filter = `brightness(${1 + orangeBoost * 2})`;
    });
}

updateClock();
setInterval(updateClock, 1000);
