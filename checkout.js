// Still Goods - Stripe Checkout Integration
// Handles buy button → Stripe Checkout Session flow

(function() {
    'use strict';

    // Initialize buy buttons on page load
    document.addEventListener('DOMContentLoaded', initCheckout);

    function initCheckout() {
        const buyButtons = document.querySelectorAll('.btn-buy[data-product-id]');

        buyButtons.forEach(button => {
            button.addEventListener('click', handleBuyClick);
        });
    }

    async function handleBuyClick(event) {
        const button = event.currentTarget;

        // Prevent double-clicks
        if (button.disabled || button.classList.contains('loading')) {
            return;
        }

        // Get product data from button attributes
        const productData = {
            id: button.dataset.productId,
            name: button.dataset.productName,
            price: parseInt(button.dataset.productPrice, 10), // Price in cents
            currency: button.dataset.productCurrency || 'cad'
        };

        // Show loading state
        button.disabled = true;
        button.classList.add('loading');
        const originalText = button.textContent;

        try {
            // Create Stripe Checkout Session via API
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId: productData.id,
                    productName: productData.name,
                    price: productData.price,
                    currency: productData.currency,
                    successUrl: window.location.origin + '/success.html',
                    cancelUrl: window.location.href
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create checkout session');
            }

            const { url } = await response.json();

            // Redirect to Stripe Checkout
            window.location.href = url;

        } catch (error) {
            console.error('Checkout error:', error);

            // Show error message
            showCheckoutError(button, 'Something went wrong. Please try again or email us.');

            // Reset button
            button.disabled = false;
            button.classList.remove('loading');
            button.textContent = originalText;
        }
    }

    function showCheckoutError(button, message) {
        // Find or create error element
        let errorEl = button.parentElement.querySelector('.checkout-message.error');

        if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.className = 'checkout-message error';
            button.parentElement.insertBefore(errorEl, button);
        }

        errorEl.textContent = message;
        errorEl.style.display = 'block';

        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorEl.style.display = 'none';
        }, 5000);
    }
})();
