// Wait for DOM + GSAP to be ready
document.addEventListener('DOMContentLoaded', function () {

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // ─── HERO ANIMATIONS ────────────────────────────────────────────────────
    gsap.from('.hero-label', { opacity: 0, x: -100, duration: 1 });
    gsap.from('.hero-title', { opacity: 0, y: 50, duration: 1, delay: 0.2 });
    gsap.from('.hero-text-1', { opacity: 0, x: 100, duration: 1, delay: 0.4 });
    gsap.from('.hero-text-2', { opacity: 0, x: 100, duration: 1, delay: 0.6 });
    gsap.from('.scroll-indicator', { opacity: 0, duration: 1, delay: 1 });

    gsap.to('.scroll-indicator svg', {
        y: 10, duration: 2, repeat: -1, yoyo: true, ease: 'power1.inOut',
    });

    gsap.from('.line-1', { scaleX: 0, duration: 1.5, delay: 0.8, transformOrigin: 'left' });
    gsap.from('.line-2', { scaleX: 0, duration: 1.5, delay: 1, transformOrigin: 'right' });

    gsap.to('.blob-1', { scale: 1.2, x: 50, y: -30, duration: 8, repeat: -1, yoyo: true, ease: 'power1.inOut' });
    gsap.to('.blob-2', { scale: 1.3, x: -40, y: 40, duration: 10, repeat: -1, yoyo: true, ease: 'power1.inOut' });

    // ─── TEAM SECTION ───────────────────────────────────────────────────────
    gsap.from('.team-header', {
        scrollTrigger: { trigger: '.team', start: 'top 80%' },
        opacity: 0, x: -50, duration: 0.8,
    });

    document.querySelectorAll('.team-member').forEach((member) => {
        const delay = parseFloat(member.dataset.delay) || 0;
        gsap.from(member, {
            scrollTrigger: { trigger: member, start: 'top 85%' },
            opacity: 0, y: 50, duration: 0.6, delay,
        });
        const line = member.querySelector('.team-line');
        if (line) {
            gsap.from(line, {
                scrollTrigger: { trigger: member, start: 'top 80%' },
                scaleX: 0, duration: 0.6, delay: delay + 0.3, transformOrigin: 'left',
            });
        }
    });

    gsap.from('.team .big-number', {
        scrollTrigger: { trigger: '.team', start: 'top 60%' },
        opacity: 0, duration: 1,
    });

    // ─── SERVICES / LEISTUNGEN SECTION ──────────────────────────────────────
    // FIX: war '.projects-header' → korrigiert zu '.services-header'
    gsap.from('.services-header', {
        scrollTrigger: { trigger: '.projects', start: 'top 80%' },
        opacity: 0, y: -50, duration: 0.8,
    });

    // Pakete-Karten animieren
    document.querySelectorAll('.paket-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 90%' },
            opacity: 0, y: 40, duration: 0.6, delay: index * 0.1,
        });
    });

    // Prozess-Schritte animieren
    document.querySelectorAll('.prozess-step').forEach((step, index) => {
        gsap.from(step, {
            scrollTrigger: { trigger: step, start: 'top 90%' },
            opacity: 0, y: 30, duration: 0.5, delay: index * 0.1,
        });
    });

    // CTA Block
    gsap.from('.leistungen-cta', {
        scrollTrigger: { trigger: '.leistungen-cta', start: 'top 85%' },
        opacity: 0, y: 40, duration: 0.8,
    });

    gsap.from('.big-number-center', {
        scrollTrigger: { trigger: '.projects', start: 'top 60%' },
        opacity: 0, duration: 1,
    });

    gsap.from('.circle-bg', {
        scrollTrigger: { trigger: '.projects', start: 'top 70%' },
        opacity: 0, duration: 1,
    });

    // ─── FAQ SECTION ────────────────────────────────────────────────────────
    gsap.from('.faq-header', {
        scrollTrigger: { trigger: '.faq', start: 'top 80%' },
        opacity: 0, scale: 0.9, duration: 0.8,
    });

    document.querySelectorAll('.faq-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: { trigger: item, start: 'top 90%' },
            opacity: 0, y: 30, duration: 0.5, delay: index * 0.1,
        });
    });

    gsap.from('.box-1', {
        scrollTrigger: { trigger: '.faq', start: 'top 60%' },
        opacity: 0, x: -100, duration: 1, delay: 0.5,
    });
    gsap.from('.box-2', {
        scrollTrigger: { trigger: '.faq', start: 'top 60%' },
        opacity: 0, x: 100, duration: 1, delay: 0.7,
    });
    gsap.from('.big-number-right', {
        scrollTrigger: { trigger: '.faq', start: 'top 60%' },
        opacity: 0, duration: 1,
    });

    // ── FAQ ACCORDION ──────────────────────────────────────────────────────
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.closest('.faq-item');
            const isActive = item.classList.contains('active');

            // Close all
            document.querySelectorAll('.faq-item').forEach(faqItem => {
                faqItem.classList.remove('active');
                faqItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Open clicked if it wasn't already open
            if (!isActive) {
                item.classList.add('active');
                button.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ─── CONTACT SECTION ────────────────────────────────────────────────────
    gsap.from('.contact-header', {
        scrollTrigger: { trigger: '.contact', start: 'top 80%' },
        opacity: 0, y: 50, duration: 0.8,
    });
    gsap.from('.contact-form-wrapper', {
        scrollTrigger: { trigger: '.contact-grid', start: 'top 80%' },
        opacity: 0, x: -50, duration: 0.8,
    });
    gsap.from('.contact-info', {
        scrollTrigger: { trigger: '.contact-grid', start: 'top 80%' },
        opacity: 0, x: 50, duration: 0.8,
    });

    document.querySelectorAll('.contact-detail').forEach((detail, index) => {
        gsap.from(detail, {
            scrollTrigger: { trigger: detail, start: 'top 90%' },
            opacity: 0, y: 20, duration: 0.5, delay: 0.2 + index * 0.1,
        });
    });

    gsap.from('.footer', {
        scrollTrigger: { trigger: '.footer', start: 'top 90%' },
        opacity: 0, duration: 0.8,
    });

    gsap.from('.bottom-line', {
        scrollTrigger: { trigger: '.contact', start: 'bottom 100%' },
        scaleX: 0, duration: 2, transformOrigin: 'center',
    });

    // Rotating circle
    gsap.to('.rotating-circle', { rotation: 360, duration: 20, repeat: -1, ease: 'none' });
    gsap.to('.rotating-circle', { scale: 1.2, duration: 10, repeat: -1, yoyo: true, ease: 'power1.inOut' });

    // ─── FORM BUTTON ANIMATION ──────────────────────────────────────────────
    const submitBtn = document.querySelector('.contact-form button[type="submit"]');
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            gsap.to(submitBtn, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
        });
    }

    // ─── SMOOTH SCROLL ──────────────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

}); // end DOMContentLoaded
