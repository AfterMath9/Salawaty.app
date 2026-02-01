document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('lang-toggle');
    const html = document.documentElement;
    
    // Check for saved language
    const currentLang = localStorage.getItem('salawaty-lang') || 'en';
    setLanguage(currentLang);

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = html.lang === 'en' ? 'ar' : 'en';
            setLanguage(newLang);
        });
    }

    function setLanguage(lang) {
        html.lang = lang;
        html.dir = lang === 'ar' ? 'rtl' : 'ltr';
        localStorage.setItem('salawaty-lang', lang);
        
        // Update toggle button text
        if (langToggle) {
            langToggle.textContent = lang === 'en' ? 'العربية' : 'English';
        }

        // Update all translatable elements
        const elements = document.querySelectorAll('[data-en]');
        elements.forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });

        // Update active link styling if needed
        updateActiveLinks();
    }

    function updateActiveLinks() {
        const path = window.location.pathname;
        const page = path.split("/").pop();
        
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === page) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Sticky Navbar shadow on scroll
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
            nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            nav.classList.remove('scrolled');
            nav.style.boxShadow = 'none';
        }
    });

    // Simple reveal animation for feature cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});
