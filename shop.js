// Still Goods Shop JavaScript

// Cart state
let cart = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    setupEmailForm();
    updateCartCount();
});

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('stillGoodsCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('stillGoodsCart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart count display
function updateCartCount() {
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountEl.textContent = totalItems;
    }
}

// Email signup form handler
function setupEmailForm() {
    const form = document.getElementById('emailSignup');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = form.querySelector('input[type="email"]').value;
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        // Disable form during submission
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        try {
            // Submit to Formspree
            const response = await fetch('https://formspree.io/f/mgoolyep', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new Error('Submission failed');
            }

            // Success
            submitButton.textContent = 'Thank you!';
            form.querySelector('input[type="email"]').value = '';

            // Reset after 3 seconds
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 3000);

        } catch (error) {
            // Error
            submitButton.textContent = 'Error. Try again?';
            submitButton.disabled = false;

            setTimeout(() => {
                submitButton.textContent = originalText;
            }, 3000);

            console.error('Email signup error:', error);
        }
    });
}

// Add to cart (for future use)
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
}

// Remove from cart (for future use)
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}

// Update quantity (for future use)
function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(0, quantity);
        if (item.quantity === 0) {
            removeFromCart(productId);
        } else {
            saveCart();
        }
    }
}

// Get cart total (for future use)
function getCartTotal() {
    return cart.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
}

// Export functions for use in other scripts
export {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal
};
