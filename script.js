 // Create floating particles for preloader
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 20;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
                particlesContainer.appendChild(particle);
            }
        }

        // Enhanced preloader with faster timing
        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            const body = document.body;
            
            // Create particles
            createParticles();
            
            // Faster preloader - show for only 1.5 seconds
            setTimeout(() => {
                preloader.classList.add('hidden');
                body.classList.remove('loading');
                
                // Remove preloader from DOM after fade out
                setTimeout(() => {
                    preloader.remove();
                    // Initialize skill progress bars
                    initializeSkillBars();
                }, 600);
            }, 1500);
        });

        // Initialize skill progress bars
        function initializeSkillBars() {
            const skillBars = document.querySelectorAll('.skill-progress-bar');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width;
                }, 500);
            });
        }

        // Theme Toggle Functionality
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        const navbar = document.getElementById('navbar');
        const body = document.body;

        // Check for saved theme preference or default to 'light'
        const currentTheme = localStorage.getItem('theme') || 'light';
        body.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);
        updateNavbarTheme(currentTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            updateNavbarTheme(newTheme);
        });

        function updateThemeIcon(theme) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }

        function updateNavbarTheme(theme) {
            navbar.style.background = theme === 'dark' 
                ? 'rgba(15, 23, 42, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)';
        }

        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const navMenu = document.getElementById('nav-menu');
        const menuIcon = document.getElementById('menu-icon');

        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuIcon.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuIcon.textContent = '☰';
            });
        });

        // INSTANT navigation - no delay!
        function instantScrollTo(target) {
            const targetElement = document.querySelector(target);
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - 30;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }

        // Apply instant scrolling to navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = this.getAttribute('href');
                instantScrollTo(target);
            });
        });

        // Scroll to Top Functionality
        const scrollToTopBtn = document.getElementById('scroll-to-top');

        // Show/hide scroll to top button
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top when clicked
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger skill bar animations when skills section is visible
                    if (entry.target.id === 'skills') {
                        initializeSkillBars();
                    }
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Enhanced Contact form handling
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submit-btn');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                resetSubmitButton();
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                resetSubmitButton();
                return;
            }
            
            // Simulate form submission
            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                this.reset();
                resetSubmitButton();
            }, 1000);

            function resetSubmitButton() {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }
        });

        // Add skill item click effects
        document.querySelectorAll('.skill-item').forEach(skill => {
            skill.addEventListener('click', () => {
                skill.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    skill.style.transform = '';
                }, 100);
            });
        });

        // Keyboard navigation with instant scrolling
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                const sections = document.querySelectorAll('.snap-section');
                const currentSection = getCurrentSection();
                
                if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
                    instantScrollTo(`#${sections[currentSection + 1].id}`);
                } else if (e.key === 'ArrowUp' && currentSection > 0) {
                    instantScrollTo(`#${sections[currentSection - 1].id}`);
                }
            }
        });

        function getCurrentSection() {
            const sections = document.querySelectorAll('.snap-section');
            const scrollPosition = window.scrollY + window.innerHeight / 2;
            
            for (let i = 0; i < sections.length; i++) {
                const section = sections[i];
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    return i;
                }
            }
            return 0;
        }

        // Performance optimization: Throttle scroll events
        function throttle(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            }
        }

        // Apply throttled scroll listener for navbar background
        window.addEventListener('scroll', throttle(() => {
            const currentTheme = body.getAttribute('data-theme');
            if (window.scrollY > 50) {
                navbar.style.background = currentTheme === 'dark' 
                    ? 'rgba(15, 23, 42, 0.98)' 
                    : 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.background = currentTheme === 'dark' 
                    ? 'rgba(15, 23, 42, 0.95)' 
                    : 'rgba(255, 255, 255, 0.95)';
            }
        }, 16), { passive: true });