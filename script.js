document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const iconSun = document.getElementById('icon-sun');
    const iconMoon = document.getElementById('icon-moon');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', currentTheme);
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            iconSun.style.display = 'block';
            iconMoon.style.display = 'none';
        } else {
            iconSun.style.display = 'none';
            iconMoon.style.display = 'block';
        }
    }

    if(iconSun && iconMoon) {
        updateThemeIcon(currentTheme);
    }

    themeToggle.addEventListener('click', () => {
        const current = body.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
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

    // 5. Navbar Scroll Effect & Mobile Menu Logic
    const navbar = document.getElementById('navbar');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = document.getElementById('menu-icon');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    if(mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuIcon.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });
    }

    // 6. Smooth Anchor Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            if(navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (menuIcon) menuIcon.textContent = '☰';
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 90;
                window.scrollTo({
                    top: targetPosition, 
                    behavior: 'smooth'
                });
            }
        });
    });

    // 7. Live Mouse Telemetry Tracker
    const mouseX = document.getElementById('nav-mouse-x');
    const mouseY = document.getElementById('nav-mouse-y');
    
    if (mouseX && mouseY) {
        document.addEventListener('mousemove', (e) => {
            mouseX.textContent = String(e.clientX).padStart(3, '0');
            mouseY.textContent = String(e.clientY).padStart(3, '0');
        });
    }

    // 8. Formspree Contact Form Architecture
    const contactForm = document.getElementById('contact-form');
    
    if(contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'TRANSMITTING...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            // Fixed Formspree Execution Logic
            const FORMSPREE_URL = "https://formspree.io/f/xnjyldrk"; 

            // If the URL is empty or the placeholder, run the simulation
            if (FORMSPREE_URL === "" || FORMSPREE_URL.includes("xyzababc")) {
                setTimeout(() => {
                    alert('Simulation: Transmission Received. (Replace URL to activate)');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                }, 1000);
                return; // Stop execution here for simulation
            }

            // If a real URL is present, execute the actual fetch request
            try {
                const formData = new FormData(this);
                const response = await fetch(FORMSPREE_URL, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    alert('Transmission Received. Communication channel established.');
                    this.reset();
                } else {
                    alert('Transmission Failed. Please try again.');
                }
            } catch (error) {
                alert('Network Error. Please try again.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }
        });
    }
});
