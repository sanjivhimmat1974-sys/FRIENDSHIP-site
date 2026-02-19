// Friendship Book - Cute Edition with Surprise Elements! 🎀💖

// Global variables
let currentPage = 0;
let isBookOpen = false;
let isFlipping = false;
const totalPages = 20;

// DOM Elements
const book = document.getElementById('book');
const cover = document.getElementById('cover');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const openBtn = document.getElementById('openBtn');
const currentPageSpan = document.getElementById('currentPage');
const totalPagesSpan = document.getElementById('totalPages');
const effectsContainer = document.getElementById('effectsContainer');

// Popup messages for different pages
const popupMessages = {
    1: { title: "🌸 A New Journey Begins!", message: "Let's explore our beautiful friendship together!" },
    5: { title: "💕 Halfway There!", message: "5 pages of love already! Keep going, bestie!" },
    10: { title: "🎉 Amazing!", message: "You've reached the middle of our friendship book! 🌟" },
    15: { title: "💖 Almost Done!", message: "Just a few more pages of friendship magic!" },
    20: { title: "🎊 CONGRATULATIONS! 🎊", message: "You've completed the friendship journey! You're the best friend ever! 💕" }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    totalPagesSpan.textContent = totalPages;
    updateNavigation();
    
    // Hide all pages except cover
    for (let i = 1; i <= totalPages; i++) {
        const page = document.getElementById('page' + i);
        if (page) {
            page.classList.remove('active');
            page.classList.remove('flipped');
            page.classList.remove('special-page');
        }
    }
    
    // Cover should be visible
    if (cover) {
        cover.classList.add('active');
    }
    
    console.log('🎀 Friendship Book initialized with ' + totalPages + ' pages! Cute edition loaded!');
    
    // Show welcome popup after a short delay
    setTimeout(() => {
        showPopup("📖 Welcome, Bestie!", "Click 'Open Book' to begin our friendship journey! 💕");
    }, 1000);
});

// Open the book with SURPRISE confetti! 🎊
function openBook() {
    isBookOpen = true;
    book.classList.add('opened');
    openBtn.textContent = '📕 Close Book 💖';
    
    // SURPRISE: Confetti burst when opening! 🥳
    setTimeout(() => {
        createConfetti();
    }, 300);
    
    // Show first page after opening
    setTimeout(() => {
        currentPage = 1;
        showPage(1);
        updateNavigation();
        
        // Show popup for page 1
        setTimeout(() => {
            showPopup(popupMessages[1].title, popupMessages[1].message);
        }, 800);
    }, 500);
}

// Close the book
function closeBook() {
    isBookOpen = false;
    book.classList.remove('opened');
    openBtn.textContent = '📖 Open Book 💕';
    
    // Reset all pages
    for (let i = 1; i <= totalPages; i++) {
        const page = document.getElementById('page' + i);
        if (page) {
            page.classList.remove('active');
            page.classList.remove('flipped');
            page.classList.remove('special-page');
        }
    }
    
    // Show cover
    if (cover) {
        cover.classList.add('active');
    }
    
    currentPage = 0;
    updateNavigation();
}

// Toggle book
function toggleBook() {
    if (isBookOpen) {
        closeBook();
    } else {
        openBook();
    }
}

// Show a specific page
function showPage(pageNum) {
    // Hide cover
    if (cover) {
        cover.classList.remove('active');
    }
    
    // Show the requested page
    for (let i = 1; i <= totalPages; i++) {
        const page = document.getElementById('page' + i);
        if (page) {
            if (i === pageNum) {
                page.classList.add('active');
                page.classList.remove('flipped');
                
                // Add special glow effect for page 10 and 20
                if (i === 10 || i === 20) {
                    page.classList.add('special-page');
                }
            } else if (i < pageNum) {
                // Pages before current are flipped
                page.classList.add('flipped');
                page.classList.remove('active');
                page.classList.remove('special-page');
            } else {
                // Pages after current are hidden
                page.classList.remove('active');
                page.classList.remove('flipped');
                page.classList.remove('special-page');
            }
        }
    }
}

// Turn page with special effects
function turnPage(direction) {
    if (isFlipping) return;
    
    if (!isBookOpen && direction > 0) {
        openBook();
        return;
    }
    
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        isFlipping = true;
        currentPage = newPage;
        showPage(currentPage);
        updateNavigation();
        
        // Special effects on page 10 and 20 - HEART SHOWER! 💖💕
        if (currentPage === 10 || currentPage === 20) {
            setTimeout(() => {
                createHeartShower();
            }, 500);
            
            // Show popup for special pages
            if (popupMessages[currentPage]) {
                setTimeout(() => {
                    showPopup(popupMessages[currentPage].title, popupMessages[currentPage].message);
                }, 800);
            }
        }
        
        // Regular effects on every 5th page
        if (currentPage % 5 === 0) {
            setTimeout(createEffect, 500);
        }
        
        // Show popup for page 5 and 15
        if (popupMessages[currentPage]) {
            setTimeout(() => {
                showPopup(popupMessages[currentPage].title, popupMessages[currentPage].message);
            }, 600);
        }
        
        setTimeout(() => {
            isFlipping = false;
        }, 600);
    } else if (newPage === 0) {
        closeBook();
    }
}

// Update navigation buttons
function updateNavigation() {
    currentPageSpan.textContent = currentPage;
    
    // Enable/disable buttons
    if (currentPage === 0) {
        prevBtn.disabled = true;
        nextBtn.disabled = false;
    } else if (currentPage === totalPages) {
        prevBtn.disabled = false;
        nextBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }
}

// Create sparkle effect animation
function createEffect() {
    const effects = ['💖', '💕', '💗', '💝', '⭐', '🌟', '✨', '🧚', '🦋'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const effect = document.createElement('div');
            effect.className = 'effect-item';
            effect.textContent = effects[Math.floor(Math.random() * effects.length)];
            effect.style.left = (Math.random() * 80 + 10) + '%';
            effect.style.animationDuration = (2 + Math.random() * 2) + 's';
            effect.style.fontSize = (1.5 + Math.random()) + 'em';
            effectsContainer.appendChild(effect);
            
            setTimeout(() => {
                effect.remove();
            }, 4000);
        }, i * 80);
    }
}

// SURPRISE: Confetti burst when opening book! 🎊🥳
function createConfetti() {
    const confettiShapes = ['🎊', '🎉', '⭐', '✨', '💖', '💕', '🎀'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Use emoji confetti
            confetti.textContent = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
            confetti.style.left = (Math.random() * 100) + '%';
            confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
            confetti.style.fontSize = (1 + Math.random() * 1.5) + 'em';
            
            effectsContainer.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }, i * 50);
    }
}

// SPECIAL: Heart shower on page 10 and 20! 💖💕🔥
function createHeartShower() {
    const hearts = ['💖', '💕', '💗', '💝', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤍', '🤎', '❣️', '💘', '💟'];
    
    // Create many hearts!
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-particle';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = (Math.random() * 100) + '%';
            heart.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
            heart.style.fontSize = (1.5 + Math.random() * 1.5) + 'em';
            
            effectsContainer.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 60);
    }
    
    // Also add sparkle effects
    createEffect();
}

// Show popup message
function showPopup(title, message) {
    // Remove existing popup if any
    const existingPopup = document.querySelector('.popup-message');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    const popup = document.createElement('div');
    popup.className = 'popup-message';
    popup.innerHTML = `
        <span class="popup-close" onclick="this.parentElement.remove()">✕</span>
        <h2>${title}</h2>
        <p>${message}</p>
    `;
    
    document.body.appendChild(popup);
    
    // Auto close after 4 seconds
    setTimeout(() => {
        if (popup.parentElement) {
            popup.remove();
        }
    }, 4000);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        turnPage(1);
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        turnPage(-1);
    }
});

// Touch swipe support
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            turnPage(1);
        } else {
            turnPage(-1);
        }
    }
}

// Auto-play background music on user interaction
document.body.addEventListener('click', function() {
    const audio = document.getElementById('background-music');
    if (audio) {
        audio.volume = 0.4;
    }
}, { once: true });
