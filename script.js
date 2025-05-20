document.addEventListener("DOMContentLoaded", () => {
    // --- Function Declarations moved to the top of the DOMContentLoaded scope ---

    // Carousel helper functions
    let index = 0; // Declare index globally within DOMContentLoaded
    const images = document.querySelectorAll('.carousel-image');
    const totalImages = images.length;

    function showImage(newIndex) {
        // Ensure there are images to work with before trying to access them
        if (totalImages === 0) return;

        // Remove active class from current image if it exists
        if (images[index]) {
            images[index].classList.remove('active');
        }

        // Calculate new index, handling wrap-around for both ends
        index = (newIndex + totalImages) % totalImages;
        if (index < 0) { // Handle negative results from modulo for previous button
            index += totalImages;
        }

        // Add active class to the new image
        if (images[index]) {
            images[index].classList.add('active');
        }
    }

    function showNextImage() {
        showImage(index + 1);
    }

    function showPrevImage() {
        showImage(index - 1);
    }

    // Countdown timer update function
    const targetDate = new Date("2026-01-29T12:12:16").getTime();
    const daysSpan = document.getElementById("days");
    const hoursSpan = document.getElementById("hours");
    const minutesSpan = document.getElementById("minutes");
    const secondsSpan = document.getElementById("seconds");
    let countdownInterval; // Declare interval variable outside

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
            if (daysSpan) daysSpan.textContent = "00";
            if (hoursSpan) hoursSpan.textContent = "00";
            if (minutesSpan) minutesSpan.textContent = "00";
            if (secondsSpan) secondsSpan.textContent = "00";
            clearInterval(countdownInterval); // Stop the countdown
            return;
        }

        // Only update if elements exist
        if (daysSpan) daysSpan.textContent = String(days).padStart(2, '0');
        if (hoursSpan) hoursSpan.textContent = String(hours).padStart(2, '0');
        if (minutesSpan) minutesSpan.textContent = String(minutes).padStart(2, '0');
        if (secondsSpan) secondsSpan.textContent = String(seconds).padStart(2, '0');
    }

    // --- End of Function Declarations ---


    // Carousel functionality
    if (totalImages > 0) { // Only set up carousel interval and navigation if there are images
        showImage(0); // Initialize first image as active
        let interval = setInterval(showNextImage, 4000);

        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseover', () => {
                clearInterval(interval);
            });

            carouselContainer.addEventListener('mouseout', () => {
                interval = setInterval(showNextImage, 4000);
            });
        }

        document.getElementById('carousel-left')?.addEventListener('click', showPrevImage);
        document.getElementById('carousel-right')?.addEventListener('click', showNextImage);
    }


    // Scroll to top button functionality
    const scrollBtn = document.querySelector(".scroll-top");
    if (scrollBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                scrollBtn.classList.add("show");
            } else {
                scrollBtn.classList.remove("show");
            }
        });

        scrollBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Countdown Timer functionality
    if (daysSpan && hoursSpan && minutesSpan && secondsSpan) {
        countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown(); // Call once immediately to avoid initial flicker
    }


    // Scroll Animations (Intersection Observer)
    // Select all elements that need to animate, including new Hero and Event Card elements
    const elementsToAnimate = document.querySelectorAll(
        '.animate-slide-up, .animate-fade-in, .hero-image, .hero-text, .hero-button, .person, .event-card'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // observer.unobserve(entry.target); // Optional: animate only once
            } else {
                // entry.target.classList.remove('show'); // Optional: re-animate on scroll
            }
        });
    }, { threshold: 0.2 }); // Adjust threshold as needed

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
window.addEventListener('load', () => {
    // 1. Initialize Masonry
    const masonryContainer = document.querySelector('.masonry-container');
    const masonry = new Masonry(masonryContainer, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-item',
        gutter: 15,             // Ensure this matches the CSS column-gap
        fitWidth: true        // Make the container fit the columns
    });

    // 2. Wait for images to load, then layout Masonry
    imagesLoaded(masonryContainer).on('progress', () => {
        masonry.layout(); // Re-layout after each image loads
    }).on('always', () => {
        masonry.layout(); // Final layout after all images are loaded
    });

    // --- Intersection Observer for Animations (unchanged, but applies to new section)---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.animate-slide-up, .animate-fade-in').forEach(element => {
        observer.observe(element);
    });

    // --- Scroll to Top Button (unchanged) ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});