// Vercel Serverless Function: Stripe Checkout Session
// Endpoint: /api/checkout

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Product catalog (server-side source of truth)
const PRODUCTS = {
    'SG-001': {
        name: 'Walnut Desk Tray',
        price: 7800, // cents
        currency: 'cad',
        description: 'Solid walnut desk tray. Cut from a single piece.',
        image: 'https://goods.scottbertrand.com/assets/products/desk-tray.jpg'
    },
    'SG-002': {
        name: 'Concrete Pen Holder',
        price: 4800,
        currency: 'cad',
        description: 'Weighted concrete pen holder. Minimal, functional desk anchor.',
        image: 'https://goods.scottbertrand.com/assets/products/pen-holder.jpg'
    },
    'SG-003': {
        name: 'Brass Paperweight',
        price: 6800,
        currency: 'cad',
        description: 'Brushed brass paperweight. Develops patina over time.',
        image: 'https://goods.scottbertrand.com/assets/products/paperweight.jpg'
    },
    'SG-004': {
        name: 'Leather Desk Mat',
        price: 12800,
        currency: 'cad',
        description: 'Vegetable-tanned leather desk mat. Develops character with use.',
        image: 'https://goods.scottbertrand.com/assets/products/desk-mat.jpg'
    }
};

export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Check Stripe key
    if (!process.env.STRIPE_SECRET_KEY) {
        console.error('STRIPE_SECRET_KEY not configured');
        return res.status(500).json({ error: 'Payment system not configured' });
    }

    try {
        const { productId, successUrl, cancelUrl } = req.body;

        // Validate product exists
        const product = PRODUCTS[productId];
        if (!product) {
            return res.status(400).json({ error: 'Invalid product' });
        }

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: product.currency,
                        product_data: {
                            name: product.name,
                            description: product.description,
                            images: [product.image]
                        },
                        unit_amount: product.price
                    },
                    quantity: 1
                }
            ],
            shipping_address_collection: {
                allowed_countries: ['CA'] // Canada only for now
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 0,
                            currency: 'cad'
                        },
                        display_name: 'Free shipping',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 5
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 7
                            }
                        }
                    }
                }
            ],
            success_url: successUrl + '?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: cancelUrl,
            metadata: {
                productId: productId
            }
        });

        return res.status(200).json({ url: session.url });

    } catch (error) {
        console.error('Stripe error:', error);
        return res.status(500).json({ error: 'Failed to create checkout session' });
    }
}
