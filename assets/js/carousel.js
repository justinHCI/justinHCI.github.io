const carousel = document.querySelector('.carousel');
const nextButton = document.querySelector('.carousel-btn.next');
const prevButton = document.querySelector('.carousel-btn.prev');

nextButton.addEventListener('click', () => {
    carousel.scrollBy({ left: 300, behavior: 'smooth' });
});

prevButton.addEventListener('click', () => {
    carousel.scrollBy({ left: -300, behavior: 'smooth' });
});