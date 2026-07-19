document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    /* -------------------------------------------------------------
     * Mobile Menu Toggle
     * ------------------------------------------------------------- */
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');
    const iconOpen = document.querySelector('.mobile-menu-toggle .icon-open');
    const iconClose = document.querySelector('.mobile-menu-toggle .icon-close');

    function toggleMobileMenu() {
        const isActive = mobileMenu.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : '';
        
        if (isActive) {
            iconOpen.style.display = 'none';
            iconClose.style.display = 'block';
        } else {
            iconOpen.style.display = 'block';
            iconClose.style.display = 'none';
        }
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    /* -------------------------------------------------------------
     * Dark/Light Theme Toggle
     * ------------------------------------------------------------- */
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check system preference or localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
    } else {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isLight = body.classList.toggle('light-mode');
            body.classList.toggle('dark-mode', !isLight);
            
            // Save state
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            
            // Re-create icons to apply color/styling if needed
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    }

    /* -------------------------------------------------------------
     * Typing Animation (Hero Section)
     * ------------------------------------------------------------- */
    const typingText = document.getElementById('typing-text');
    const phrases = [
        'Data Analyst',
        'SQL Developer',
        'Prompt Engineer',
        'Problem Solver',
        'Tech Student'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Removing characters
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Erase faster
        } else {
            // Typing characters
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // Natural typing speed
        }

        // Handle typing state transitions
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Phrase fully typed: pause and then delete
            isDeleting = true;
            typingSpeed = 1800; // Pause at the end
        } else if (isDeleting && charIndex === 0) {
            // Phrase fully deleted: transition to next phrase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 300; // Small pause before next word
        }

        setTimeout(type, typingSpeed);
    }

    if (typingText) {
        setTimeout(type, 1000);
    }

    /* -------------------------------------------------------------
     * Sticky Navigation & Scroll Highlighting
     * ------------------------------------------------------------- */
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const backToTop = document.getElementById('back-to-top');

    function handleScroll() {
        const scrollPos = window.scrollY;

        // Sticky Navbar state
        if (scrollPos > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back-To-Top button visibility
        if (scrollPos > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active section highlights
        let activeSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                activeSectionId = section.getAttribute('id');
            }
        });

        if (activeSectionId) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${activeSectionId}`);
            });
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger immediately to set initial state

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* -------------------------------------------------------------
     * Contact Form Submission Handling
     * ------------------------------------------------------------- */
    const contactForm = document.getElementById('portfolio-contact-form');
    const formSuccess = document.getElementById('form-success');
    const successCloseBtn = document.getElementById('success-close-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Capture data (mock submission)
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const message = document.getElementById('form-message').value;

            console.log('Sending message:', { name, email, message });

            // Simulate transition to success view
            formSuccess.classList.add('active');
        });
    }

    if (successCloseBtn) {
        successCloseBtn.addEventListener('click', () => {
            // Reset and close success pane
            contactForm.reset();
            formSuccess.classList.remove('active');
        });
    }

    /* -------------------------------------------------------------
     * Scroll Reveal Animation (Intersection Observer)
     * ------------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-reveal');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* -------------------------------------------------------------
     * Mouse Glow Spotlight Effect for Cards
     * ------------------------------------------------------------- */
    const glowCards = document.querySelectorAll('.focus-card, .cert-card');
    
    glowCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
