/**
 * Shiva Shakti Ashram - Gallery Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize gallery filters
    initGalleryFilters();
    
    // Initialize lightbox
    initLightbox();
    
    // Initialize video modals
    initVideoModals();
    
    // Add animation delays to gallery items
    animateGalleryItems();
});

/**
 * Initialize gallery filters
 */
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!filterButtons.length || !galleryItems.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Show/hide gallery items based on filter
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            // Trigger layout calculation (important for masonry re-layout)
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 400);
        });
    });
}

/**
 * Initialize lightbox functionality
 */
function initLightbox() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const viewButtons = document.querySelectorAll('.view-image-btn');
    
    if (!lightbox || !lightboxImage || !viewButtons.length) return;
    
    let currentIndex = 0;
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Open lightbox when view button is clicked
    viewButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the overlay click event
            
            // Get image source and caption from parent gallery item
            const galleryItem = button.closest('.gallery-item');
            const img = galleryItem.querySelector('img');
            const title = galleryItem.querySelector('.overlay-content h3').textContent;
            const description = galleryItem.querySelector('.overlay-content p').textContent;
            
            // Set current index
            currentIndex = findVisibleIndex(galleryItem);
            
            // Update lightbox content
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightboxCaption.querySelector('h3').textContent = title;
            lightboxCaption.querySelector('p').textContent = description;
            
            // Show lightbox
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            
            // Preload adjacent images
            preloadAdjacentImages(currentIndex);
        });
    });
    
    // Close lightbox when close button is clicked
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Enable scrolling
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Enable scrolling
        }
    });
    
    // Navigate to previous image
    lightboxPrev.addEventListener('click', () => {
        navigateLightbox('prev');
    });
    
    // Navigate to next image
    lightboxNext.addEventListener('click', () => {
        navigateLightbox('next');
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Enable scrolling
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox('prev');
        } else if (e.key === 'ArrowRight') {
            navigateLightbox('next');
        }
    });
    
    /**
     * Navigate the lightbox to the previous or next image
     * @param {string} direction - 'prev' or 'next'
     */
    function navigateLightbox(direction) {
        const visibleItems = getVisibleItems();
        
        if (!visibleItems.length) return;
        
        if (direction === 'prev') {
            currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        } else {
            currentIndex = (currentIndex + 1) % visibleItems.length;
        }
        
        const galleryItem = visibleItems[currentIndex];
        const img = galleryItem.querySelector('img');
        const title = galleryItem.querySelector('.overlay-content h3').textContent;
        const description = galleryItem.querySelector('.overlay-content p').textContent;
        
        // Update lightbox content with animation
        lightboxImage.style.opacity = '0';
        setTimeout(() => {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightboxCaption.querySelector('h3').textContent = title;
            lightboxCaption.querySelector('p').textContent = description;
            lightboxImage.style.opacity = '1';
        }, 300);
        
        // Preload adjacent images
        preloadAdjacentImages(currentIndex);
    }
    
    /**
     * Get all currently visible gallery items
     * @returns {Array} - Array of visible gallery items
     */
    function getVisibleItems() {
        return Array.from(galleryItems).filter(item => {
            return window.getComputedStyle(item).display !== 'none';
        });
    }
    
    /**
     * Find the index of a gallery item in the array of visible items
     * @param {Element} item - The gallery item
     * @returns {number} - The index of the item
     */
    function findVisibleIndex(item) {
        const visibleItems = getVisibleItems();
        return visibleItems.indexOf(item);
    }
    
    /**
     * Preload images adjacent to current index
     * @param {number} index - Current index
     */
    function preloadAdjacentImages(index) {
        const visibleItems = getVisibleItems();
        
        if (!visibleItems.length) return;
        
        const prevIndex = (index - 1 + visibleItems.length) % visibleItems.length;
        const nextIndex = (index + 1) % visibleItems.length;
        
        // Preload previous and next images
        const prevImg = new Image();
        prevImg.src = visibleItems[prevIndex].querySelector('img').src;
        
        const nextImg = new Image();
        nextImg.src = visibleItems[nextIndex].querySelector('img').src;
    }
}

/**
 * Initialize video modal functionality
 */
function initVideoModals() {
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    
    if (!videoThumbnails.length) return;
    
    // Create video modal elements if they don't exist
    if (!document.querySelector('.video-modal')) {
        const videoModal = document.createElement('div');
        videoModal.className = 'video-modal';
        videoModal.innerHTML = `
            <div class="video-modal-content">
                <div class="video-container">
                    <iframe src="" frameborder="0" allowfullscreen></iframe>
                </div>
                <button class="close-video"><i class="fas fa-times"></i></button>
            </div>
        `;
        document.body.appendChild(videoModal);
    }
    
    const videoModal = document.querySelector('.video-modal');
    const videoIframe = videoModal.querySelector('iframe');
    const closeButton = videoModal.querySelector('.close-video');
    
    // Open video modal when thumbnail is clicked
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const videoItem = thumbnail.closest('.video-item');
            const videoEmbed = videoItem.querySelector('.video-embed');
            const videoSrc = videoEmbed.getAttribute('data-src');
            
            // Set video source and open modal
            videoIframe.src = videoSrc;
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Close video modal when close button is clicked
    closeButton.addEventListener('click', () => {
        closeVideoModal();
    });
    
    // Close video modal when clicking outside the video
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
    
    // Close video modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });
    
    /**
     * Close video modal and reset iframe
     */
    function closeVideoModal() {
        videoModal.classList.remove('active');
        document.body.style.overflow = ''; // Enable scrolling
        
        // Reset iframe source to stop video
        setTimeout(() => {
            videoIframe.src = '';
        }, 300);
    }
}

/**
 * Add animation delays to gallery items
 */
function animateGalleryItems() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!galleryItems.length) return;
    
    galleryItems.forEach((item, index) => {
        // Add staggered animation delay
        item.style.animationDelay = `${index * 0.1}s`;
    });
} 