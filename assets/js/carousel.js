document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const nextButton = document.querySelector('.carousel-btn.next');
    const prevButton = document.querySelector('.carousel-btn.prev');
    const cards = document.querySelectorAll('.carousel .card');

    // Function to scroll to the next or previous card
    function scrollToCard(direction) {
        const currentScroll = carousel.scrollLeft;
        const containerWidth = carousel.clientWidth;
        
        // Determine which card is currently in view
        let targetCard = null;
        let targetScroll = 0;
        
        if (direction === 'next') {
            // Find the first card that's fully or partially out of view to the right
            for (const card of cards) {
                const cardLeftEdge = card.offsetLeft;
                const cardRightEdge = cardLeftEdge + card.offsetWidth;
                
                // If the right edge of the card is beyond the current view
                if (cardLeftEdge > currentScroll + 20) {
                    targetCard = card;
                    targetScroll = cardLeftEdge - 10; // Adjust for margin
                    break;
                }
            }
            
            // If no card was found (we're at the end), scroll to the last card
            if (!targetCard && cards.length > 0) {
                targetCard = cards[cards.length - 1];
                targetScroll = targetCard.offsetLeft - 10;
            }
        } else {
            // Find the first card that's fully or partially out of view to the left
            for (let i = cards.length - 1; i >= 0; i--) {
                const card = cards[i];
                const cardLeftEdge = card.offsetLeft;
                
                // If the left edge of the card is before the current view
                if (cardLeftEdge < currentScroll - 20) {
                    targetCard = card;
                    targetScroll = cardLeftEdge - 10; // Adjust for margin
                    break;
                }
            }
            
            // If no card was found (we're at the beginning), scroll to the first card
            if (!targetCard && cards.length > 0) {
                targetCard = cards[0];
                targetScroll = 0;
            }
        }
        
        // Scroll to the target position
        if (targetCard) {
            carousel.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    }

    // Event listeners for the buttons
    nextButton.addEventListener('click', () => scrollToCard('next'));
    prevButton.addEventListener('click', () => scrollToCard('prev'));
    
    // Optional: Add keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            scrollToCard('next');
        } else if (event.key === 'ArrowLeft') {
            scrollToCard('prev');
        }
    });
});