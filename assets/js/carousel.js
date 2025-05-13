document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const nextButton = document.querySelector('.carousel-btn.next');
    const prevButton = document.querySelector('.carousel-btn.prev');
    const cards = document.querySelectorAll('.carousel .card');

    let startX = 0;
    let scrollLeft = 0;
    let isDragging = false;

    // Function to scroll to the next or previous card
    function scrollToCard(direction) {
        const containerWidth = carousel.clientWidth;
        const currentScroll = carousel.scrollLeft;
        
        // Find the target card based on current scroll position
        let targetCard = null;
        let minDistance = Infinity;
        
        cards.forEach(card => {
            const cardLeft = card.offsetLeft;
            const cardCenter = cardLeft + (card.offsetWidth / 2);
            const currentCenter = currentScroll + (containerWidth / 2);
            const distance = cardCenter - currentCenter;
            
            if (direction === 'next' && distance > 10 && distance < minDistance) {
                minDistance = distance;
                targetCard = card;
            } else if (direction === 'prev' && distance < -10 && Math.abs(distance) < minDistance) {
                minDistance = Math.abs(distance);
                targetCard = card;
            }
        });

        if (!targetCard && direction === 'next') {
            targetCard = cards[cards.length - 1];
        } else if (!targetCard && direction === 'prev') {
            targetCard = cards[0];
        }

        if (targetCard) {
            // Calculate scroll position to center the target card
            const cardLeft = targetCard.offsetLeft;
            const cardWidth = targetCard.offsetWidth;
            const scrollPosition = cardLeft - (containerWidth - cardWidth) / 2;
            
            carousel.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    }

    // Center the first card initially
    function centerInitialCard() {
        if (cards.length > 0) {
            const containerWidth = carousel.clientWidth;
            const firstCard = cards[0];
            const cardWidth = firstCard.offsetWidth;
            const scrollPosition = firstCard.offsetLeft - (containerWidth - cardWidth) / 2;
            
            carousel.scrollTo({
                left: scrollPosition,
                behavior: 'auto'
            });
        }
    }

    // Add touch and mouse drag support
    function startDragging(e) {
        isDragging = true;
        carousel.classList.add('dragging');
        startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
        scrollLeft = carousel.scrollLeft;
    }

    function stopDragging() {
        isDragging = false;
        carousel.classList.remove('dragging');
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    }

    // Event listeners for touch and mouse drag
    carousel.addEventListener('mousedown', startDragging);
    carousel.addEventListener('touchstart', startDragging);

    carousel.addEventListener('mousemove', drag);
    carousel.addEventListener('touchmove', drag);

    carousel.addEventListener('mouseleave', stopDragging);
    carousel.addEventListener('mouseup', stopDragging);
    carousel.addEventListener('touchend', stopDragging);

    // Prevent click events while dragging
    carousel.addEventListener('click', (e) => {
        if (carousel.classList.contains('dragging')) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);

    // Center first card after a short delay to ensure all content is loaded
    setTimeout(centerInitialCard, 100);

    // Event listeners for the buttons
    nextButton?.addEventListener('click', () => scrollToCard('next'));
    prevButton?.addEventListener('click', () => scrollToCard('prev'));
    
    // Add keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            scrollToCard('next');
        } else if (event.key === 'ArrowLeft') {
            scrollToCard('prev');
        }
    });

    // Recenter on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(centerInitialCard, 100);
    });
});