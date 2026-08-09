const carousel = document.querySelector(".heroCarousel");
const carouselTrack = document.querySelector(".carouselTrack");
const slides = [...document.querySelectorAll(".carouselSlide")];
const indicators = [...document.querySelectorAll(".carouselIndicator")];
const prevButton = document.querySelector(".carouselButtonPrev");
const nextButton = document.querySelector(".carouselButtonNext");

const CAROUSEL_INTERVAL = 5000;
const SWIPE_THRESHOLD = 50;

let currentSlide = 0;
let carouselInterval;
let touchStartX = 0;

function atualizarCarrossel() {
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle(
            "carouselIndicatorActive",
            index === currentSlide
        );
    });
}

function mostrarSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    atualizarCarrossel();
}

function proximoSlide() {
    mostrarSlide(currentSlide + 1);
}

function slideAnterior() {
    mostrarSlide(currentSlide - 1);
}

function pararCarrossel() {
    clearInterval(carouselInterval);
}

function iniciarCarrossel() {
    pararCarrossel();

    carouselInterval = setInterval(
        proximoSlide,
        CAROUSEL_INTERVAL
    );
}

prevButton.addEventListener("click", () => {
    slideAnterior();
    iniciarCarrossel();
});

nextButton.addEventListener("click", () => {
    proximoSlide();
    iniciarCarrossel();
});

indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
        mostrarSlide(Number(indicator.dataset.slide));
        iniciarCarrossel();
    });
});

carousel.addEventListener("mouseenter", pararCarrossel);
carousel.addEventListener("mouseleave", iniciarCarrossel);

carousel.addEventListener(
    "touchstart",
    (event) => {
        touchStartX = event.touches[0].clientX;
        pararCarrossel();
    },
    { passive: true }
);

carousel.addEventListener(
    "touchend",
    (event) => {
        const touchEndX = event.changedTouches[0].clientX;
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) >= SWIPE_THRESHOLD) {
            if (swipeDistance < 0) {
                proximoSlide();
            } else {
                slideAnterior();
            }
        }

        iniciarCarrossel();
    },
    { passive: true }
);

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        pararCarrossel();
        return;
    }

    iniciarCarrossel();
});

atualizarCarrossel();
iniciarCarrossel();