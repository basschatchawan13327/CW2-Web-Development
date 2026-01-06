
// =========================================================
// PAGE: PRODUCT.HTML
// FUNCTION: IMAGE GALLERY INTERACTION
// =========================================================
const thumbnails = document.querySelectorAll('.pic-thumb');
const mainImage = document.getElementById('mainImage');

if (mainImage && thumbnails.length > 0) {
    thumbnails.forEach(thumb => {
        // Mouse Hover
        thumb.addEventListener('mouseenter', () => {
            updateMainImage(thumb);
        });

        // Keyboard Focus (Tab)
        thumb.addEventListener('focus', () => {
            updateMainImage(thumb);
        });

        // Keyboard Activation (Enter/Space)
        thumb.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                updateMainImage(thumb);
            }
        });
    });
}

function updateMainImage(thumb) {
    mainImage.src = thumb.dataset.large;
    mainImage.alt = thumb.alt; // Update alt text for accessibility
}


// =========================================================
// PAGE: PRODUCT.HTML
// FUNCTION: PRODUCT REVIEWS (FETCH & RENDER)
// =========================================================
const reviewContainer = document.getElementById('review-container');
const loadMoreButton = document.getElementById('read-review-button');

let allReviews = [];
let currentIndex = 0;
const reviewsPerPage = 5;

// Function to calculate and render the average rating in the header
function renderAverageRating(reviews) {
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = 5; // User requested full 5 stars
    const starHTML = `<span style="color: #b82020; margin-left: 10px;">${getStars(averageRating)}</span>`;
    const header = document.querySelector('.prod-review-box h2');
    if (header) {
        header.innerHTML += starHTML;
    }
}

// Function to load reviews from JSON file
async function loadReviews() {
    try {
        const response = await fetch('reviews.json');
        allReviews = await response.json();
        renderAverageRating(allReviews);
        showNextReviews(); // Show first batch
    } catch (error) {
        console.error('Error loading reviews:', error);
        if (reviewContainer) reviewContainer.innerHTML = '<p>Error loading reviews.</p>';
    }
}

// Function to display the next batch of reviews (Load More)
function showNextReviews() {
    const nextReviews = allReviews.slice(currentIndex, currentIndex + reviewsPerPage);
    renderReviews(nextReviews);
    currentIndex += reviewsPerPage;

    if (currentIndex >= allReviews.length && loadMoreButton) {
        loadMoreButton.style.display = 'none'; // Hide button if no more reviews
    }
}

// Function to render the review list items
function renderReviews(reviews) {
    if (!reviewContainer) return;
    reviews.forEach(review => {
        const reviewHTML = `
            <div class="review-item">
                <div class="review-icon">
                    <img src="robot-juice-images/reviewicon1.jpg" alt="Reviewer Avatar">
                </div>
                <div class="review-info">
                    <div class="review-rating">${getStars(review.rating)}</div>
                    <h3 class="review-title">${review.nickname}</h3>
                    <p class="product-id">Product: ${review.product_id.charAt(0).toUpperCase() + review.product_id.slice(1)}</p>
                </div>
                <div class="review-body">
                    <p class="review-text">${review.review}</p>
                </div>
            </div>
            <hr class="review-divider">
        `;
        reviewContainer.innerHTML += reviewHTML;
    });
}

// Helper Function to generate Star HTML
function getStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += i < rating ? '★' : '☆';
    }
    return stars;
}

if (loadMoreButton) {
    loadMoreButton.addEventListener('click', showNextReviews);
    loadReviews();
} else if (document.querySelector('.prod-review-box')) {
    // If button missing but section exists, try loading anyway (edge case)
    loadReviews();
}


// =========================================================
// GLOBAL: BURGER MENU INTERACTION
// =========================================================
const burgerMenu = document.getElementById('burger-menu');
const navList = document.querySelector('.navigate ul');

if (burgerMenu && navList) {
    burgerMenu.addEventListener('click', () => {
        const isExpanded = burgerMenu.getAttribute('aria-expanded') === 'true';
        burgerMenu.setAttribute('aria-expanded', !isExpanded);

        navList.classList.toggle('active');
        burgerMenu.classList.toggle('open'); // Optional for animating bars
    });

    // Keyboard Accessibility for Burger Menu
    burgerMenu.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            burgerMenu.click();
        }
    });
}


