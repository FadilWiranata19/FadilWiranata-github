// Loading Screen Animation
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
    }, 3000);
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 0, 87, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#ff0057';
        navbar.style.backdropFilter = 'none';
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Skill Bars Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const skill = bar.getAttribute('data-skill');
        bar.style.width = skill + '%';
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate skill bars when skills section is visible
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }
            
            // Animate project cards
            if (entry.target.classList.contains('project-card')) {
                entry.target.style.animationDelay = `${entry.target.dataset.delay || 0}s`;
            }
        }
    });
}, observerOptions);

// Observe elements
document.addEventListener('DOMContentLoaded', function() {
    // Observe skill cards
    document.querySelectorAll('.skill-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe project cards
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe about section
    observer.observe(document.querySelector('.about'));
});

// Floating Cards Animation
function createFloatingCards() {
    const cards = document.querySelectorAll('.floating-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.5}s`;
    });
}

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Parallax Effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
});

// Form Submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Mohon isi semua field!');
        return;
    }
    
    // Simulate form submission
    alert(`Terima kasih ${name}! Pesan Anda telah terkirim. Saya akan segera membalas ke ${email}`);
    
    // Reset form
    this.reset();
});

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    updateCounter();
}

// Animate counters when about section is visible
const aboutSection = document.querySelector('.about');
const aboutObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent);
                animateCounter(counter, target);
            });
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

aboutObserver.observe(aboutSection);

// Mouse Follow Effect
document.addEventListener('mousemove', function(e) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    document.body.appendChild(cursor);
    
    setTimeout(() => {
        cursor.remove();
    }, 1000);
});

// Add cursor follower styles
const style = document.createElement('style');
style.textContent = `
    .cursor-follower {
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: cursorFade 1s forwards;
    }
    
    @keyframes cursorFade {
        to {
            transform: scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    createFloatingCards();
    
    // Add hover effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add hover effects to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Easter Egg - Konami Code
let konamiCode = [];
const secretCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > secretCode.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === secretCode.join(',')) {
        document.body.style.background = 'linear-gradient(135deg, #00ff00, #00ffff)';
        alert('🎉 Selamat! Kamu menemukan kode rahasia! Kamu adalah King Coding sejati!');
    }
});

// Smooth reveal animations
const revealElements = document.querySelectorAll('.section-title, .about-text, .contact-info');
revealElements.forEach(element => {
    observer.observe(element);
});

// Add CSS for reveal animations
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .animate {
        animation: slideInUp 0.8s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(revealStyle);
