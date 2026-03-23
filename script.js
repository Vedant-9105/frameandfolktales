// script.js – same as before, but you can update the form success message if needed
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.getElementById('navLinks');
    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({ behavior: 'smooth' });
                if(navLinks && navLinks.classList.contains('active')) navLinks.classList.remove('active');
            }
        });
    });

    // Portfolio tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    if (tabBtns.length) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if(content.id === tabId) content.classList.add('active');
                });
            });
        });
    }

    // Contact form submission (if present)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for reaching out! We will contact you soon.');
            contactForm.reset();
        });
    }

    // Animate stats numbers on scroll
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const id = el.id;
                    let finalValue = 0;
                    if (id === 'yearsExp') finalValue = 12;
                    else if (id === 'weddingsPlanned') finalValue = 280;
                    else if (id === 'servicesProvided') finalValue = 45;
                    else if (id === 'venuesCovered') finalValue = 68;
                    animateNumber(el, 0, finalValue, 1500);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        statNumbers.forEach(stat => observer.observe(stat));
    }

    function animateNumber(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.innerText = Math.floor(progress * (end - start) + start) + (end > start ? '+' : '');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});