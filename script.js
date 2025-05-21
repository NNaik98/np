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

    const sections = document.querySelectorAll('section, .hero-image, .hero-text, .hero-button, .event-card, .person, .grid-item, footer');
    const animateElements = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(animateElements, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    const scrollTopButton = document.querySelector('.scroll-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopButton.classList.add('show');
        } else {
            scrollTopButton.classList.remove('show');
        }
    });

    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const heroButton = document.querySelector('.hero-button');
    if (heroButton) {
        heroButton.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = heroButton.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    const scrollDownIndicator = document.querySelector('.scroll-down-indicator');
    if (scrollDownIndicator) {
        scrollDownIndicator.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = document.getElementById('save-the-date');
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

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

    const carouselContainerMobile = document.querySelector('.carousel-container-mobile');

    // Declare carousel-related functions as function expressions here
    let currentIndex = 0; // Initialize currentIndex at a higher scope if needed by other functions within this block

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
            if (index === currentIndex) {
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
        currentIndex = index;
        updateDots(dotsContainer);
    };

    if (carouselContainerMobile) {
        const carouselImagesMobile = carouselContainerMobile.querySelector('.carousel-images-mobile');
        const images = Array.from(carouselImagesMobile.querySelectorAll('.carousel-image-mobile'));
        const prevBtn = carouselContainerMobile.querySelector('.carousel-prev-mobile');
        const nextBtn = carouselContainerMobile.querySelector('.carousel-next-mobile');
        const dotsContainer = carouselContainerMobile.querySelector('.carousel-dots-mobile');

        createDots(images, dotsContainer);
        showImage(0, images, dotsContainer); // Pass images and dotsContainer to showImage as well

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
            showImage(currentIndex, images, dotsContainer);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
            showImage(currentIndex, images, dotsContainer);
        });
    }
});