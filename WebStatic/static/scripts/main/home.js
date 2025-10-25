const carousel = document.querySelector('.carousel');
const dots = document.querySelectorAll('.dot');
const carouselContainer = document.querySelector('.carousel-container');

let currentIndex = 0;
const totalImages = dots.length;
let autoSlide = null;

function updateCarousel() {
  if (!carousel) return;
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

function changeSlide(nextIndex = null) {
  if (nextIndex !== null) {
    currentIndex = (nextIndex + totalImages) % totalImages;
  } else {
    currentIndex = (currentIndex + 1) % totalImages;
  }
  updateCarousel();
}

function startAuto() {
  if (autoSlide) return;
  autoSlide = setInterval(() => changeSlide(), 3000);
}

function stopAuto() {
  if (!autoSlide) return;
  clearInterval(autoSlide);
  autoSlide = null;
}

// Init
updateCarousel();
startAuto();

// Pause on hover
if (carouselContainer) {
  carouselContainer.addEventListener('mouseenter', stopAuto);
  carouselContainer.addEventListener('mouseleave', startAuto);
}

// Clickable dots for manual navigation
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    stopAuto();
    changeSlide(i);
    startAuto();
  });
});
