document.addEventListener('DOMContentLoaded', function () {

    // ── Reveal on scroll (replaces heavy GSAP ScrollTrigger) ──────────────
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ── FAQ Accordion ──────────────────────────────────────────────────────
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.closest('.faq-item');
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(f => {
                f.classList.remove('active');
                f.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            if (!isActive) {
                item.classList.add('active');
                button.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ── Smooth Scroll ──────────────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navH = 70;
                const top = target.getBoundingClientRect().top + window.scrollY - navH;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ── Mobile Menu ──────────────────────────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger && mobileMenu) {
        const mobileLinks = mobileMenu.querySelectorAll('.mobile-link');

        function openMenu() {
            hamburger.classList.add('open');
            mobileMenu.classList.add('open');
            mobileMenu.setAttribute('aria-hidden', 'false');
            hamburger.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
            mobileMenu.setAttribute('aria-hidden', 'true');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        hamburger.addEventListener('click', () => {
            hamburger.classList.contains('open') ? closeMenu() : openMenu();
        });

        mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    }

});
