document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', currentTheme);
    
    if (themeIcon) {
        themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    }

    themeToggle.addEventListener('click', () => {
        const current = body.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        themeIcon.textContent = next === 'dark' ? '☀️' : '🌙';
    });

    // 2. Scroll to Top Logic
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 3. Preloader Logic
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
            document.body.classList.remove('loading');
        }, 800);
    }, 1800);

    // 4. Intersection Observer for Fade-Up Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });

    // 5. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // 6. Smooth Anchor Scrolling (Flawless Navbar Alignment)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculates precise stopping point 90px above the element to clear the navbar
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 50;
                window.scrollTo({
                    top: targetPosition, 
                    behavior: 'smooth'
                });
            }
        });
    });

    // 7. Live Mouse Telemetry Tracker
    const mouseX = document.getElementById("nav-mouse-x");
    const mouseY = document.getElementById("nav-mouse-y");
    
    if (mouseX && mouseY) {
        document.addEventListener('mousemove', (e) => {
            mouseX.textContent = String(e.clientX).padStart(3, '0');
            mouseY.textContent = String(e.clientY).padStart(3, '0');
        });
    }
});