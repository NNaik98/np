document.addEventListener('DOMContentLoaded', () => {
    const weddingDate = new Date('January 29, 2026 00:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.querySelector('.countdown-wrapper').innerHTML = "<h2>We are married!</h2>";
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    // --- Hero Section Animations (Immediate on Load) ---
    // These elements are visible when the page first loads, so we give them
    // the 'show' class immediately to trigger their entrance animations.
    const heroImage = document.querySelector('.hero-image');
    const heroText = document.querySelector('.hero-text');
    const heroButton = document.querySelector('.hero-button');
    const scrollDownIndicator = document.querySelector('.scroll-down-indicator');

    // Add 'show' class to hero elements immediately on DOMContentLoaded
    if (heroImage) heroImage.classList.add('show');
    if (heroText) heroText.classList.add('show');
    if (heroButton) heroButton.classList.add('show');
    if (scrollDownIndicator) scrollDownIndicator.classList.add('show'); // This triggers the arrow animation

    // Intersection Observer for other animations
    const observerOptions = {
        root: null, // The viewport is the root
        rootMargin: '0px', // No extra margin around the viewport
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const animateElements = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Stop observing once it has animated
            }
        });
    };

    const observer = new IntersectionObserver(animateElements, observerOptions);

    // Select all elements that need to animate on scroll.
    // Explicitly select all relevant sections and animate classes,
    // ensuring hero elements are NOT re-observed here as they are handled above.
    document.querySelectorAll(
        'section:not(.hero), .event-card, .person, .grid-item, footer, .family-card, .animate-fade-in:not(.hero-image):not(.hero-button), .animate-slide-up:not(.hero-text)'
    ).forEach(element => {
        observer.observe(element);
    });

    // --- Scroll-to-top button logic ---
    const scrollTopButton = document.querySelector('.scroll-top');
    if (scrollTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Show button after scrolling 300px
                scrollTopButton.classList.add('show');
            } else {
                scrollTopButton.classList.remove('show');
            }
        });

        scrollTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Smooth scroll to the top
            });
        });
    }

    // --- Smooth scroll for hero button ---
    const heroButtonScroll = document.querySelector('.hero-button');
    if (heroButtonScroll) { // Renamed to avoid conflict with `heroButton` variable
        heroButtonScroll.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = heroButtonScroll.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // --- Smooth scroll for scroll-down-indicator ---
    const scrollDownIndicatorElement = document.querySelector('.scroll-down-indicator'); // Renamed to avoid conflict
    if (scrollDownIndicatorElement) {
        scrollDownIndicatorElement.addEventListener('click', (e) => {
            e.preventDefault();
            // Assuming you want it to scroll to the video-section, or save-the-date
            const targetSection = document.getElementById('video-section'); // Or 'save-the-date' if you prefer
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // --- Masonry Layout for Desktop Gallery ---
    if (document.querySelector('.masonry-container')) {
        imagesLoaded(document.querySelector('.masonry-container'), function() {
            new Masonry('.masonry-container', {
                itemSelector: '.grid-item',
                columnWidth: '.grid-item',
                gutter: 15,
                percentPosition: true
            });
        });
    }

    // --- Mobile Gallery Carousel Logic ---
    const carouselContainerMobile = document.querySelector('.carousel-container-mobile');

    let currentCarouselIndex = 0; // Changed variable name to avoid conflict

    const createDots = (images, dotsContainer) => {
        dotsContainer.innerHTML = '';
        images.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot-mobile');
            if (index === 0) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => showImage(index, images, dotsContainer));
            dotsContainer.appendChild(dot);
        });
    };

    const updateDots = (dotsContainer) => {
        const dots = dotsContainer.querySelectorAll('.dot-mobile');
        dots.forEach((dot, index) => {
            if (index === currentCarouselIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    const showImage = (index, images, dotsContainer) => {
        images.forEach((img, i) => {
            img.classList.remove('active');
            if (i === index) {
                img.classList.add('active');
            }
        });
        currentCarouselIndex = index;
        updateDots(dotsContainer);
    };

    if (carouselContainerMobile) {
        const carouselImagesMobile = carouselContainerMobile.querySelector('.carousel-images-mobile');
        const images = Array.from(carouselImagesMobile.querySelectorAll('.carousel-image-mobile'));
        const prevBtn = carouselContainerMobile.querySelector('.carousel-prev-mobile');
        const nextBtn = carouselContainerMobile.querySelector('.carousel-next-mobile');
        const dotsContainer = carouselContainerMobile.querySelector('.carousel-dots-mobile');

        createDots(images, dotsContainer);
        showImage(0, images, dotsContainer); // Show the first image initially

        prevBtn.addEventListener('click', () => {
            currentCarouselIndex = (currentCarouselIndex > 0) ? currentCarouselIndex - 1 : images.length - 1;
            showImage(currentCarouselIndex, images, dotsContainer);
        });

        nextBtn.addEventListener('click', () => {
            currentCarouselIndex = (currentCarouselIndex < images.length - 1) ? currentCarouselIndex + 1 : 0;
            showImage(currentCarouselIndex, images, dotsContainer);
        });

        // Auto-advance carousel (optional, you had this in your original script)
        setInterval(() => {
            currentCarouselIndex = (currentCarouselIndex < images.length - 1) ? currentCarouselIndex + 1 : 0;
            showImage(currentCarouselIndex, images, dotsContainer);
        }, 5000); // Change image every 5 seconds
    }
});