document.addEventListener("DOMContentLoaded", () => {
    const targetDate = new Date("2026-01-29T12:12:16").getTime();
    const daysSpan = document.getElementById("days");
    const hoursSpan = document.getElementById("hours");
    const minutesSpan = document.getElementById("minutes");
    const secondsSpan = document.getElementById("seconds");
    let countdownInterval;

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
            clearInterval(countdownInterval);
            return;
        }
        if (daysSpan) daysSpan.textContent = String(days).padStart(2, '0');
        if (hoursSpan) hoursSpan.textContent = String(hours).padStart(2, '0');
        if (minutesSpan) minutesSpan.textContent = String(minutes).padStart(2, '0');
        if (secondsSpan) secondsSpan.textContent = String(seconds).padStart(2, '0');
    }

    if (daysSpan && hoursSpan && minutesSpan && secondsSpan) {
        countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown();
    }

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

    const elementsToAnimate = document.querySelectorAll(
        '.animate-slide-up, .animate-fade-in, .hero-image, .hero-text, .hero-button, .person, .event-card, .grid-item'
    );
    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observerInstance.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    const masonryContainer = document.querySelector('.masonry-container');
    if (masonryContainer) {
        imagesLoaded(masonryContainer, function() {
            new Masonry(masonryContainer, {
                itemSelector: '.grid-item',
                percentPosition: true,
                gutter: 15,
                transitionDuration: '0.4s'
            });
        });
    }
});