# Still Goods

Quiet goods for considered living. E-commerce shop deployed to goods.scottbertrand.com (with shop.scottbertrand.com redirect).

## Tech Stack

- **Frontend**: Static HTML/CSS with Vite
- **Styling**: Custom CSS with theme system (light/dark mode)
- **Cart**: localStorage-based cart system
- **Payments**: Stripe (to be integrated)
- **Deployment**: Vercel

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (port 8003)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure (when ready for e-commerce):

```env
STRIPE_PUBLIC_KEY=pk_test_your_public_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
EMAIL_SERVICE_API_KEY=your_api_key_here
```

## Project Structure

```
scott-still-goods/
├── index.html          # Shop home (coming soon page)
├── about.html          # About Still Goods
├── product.html        # Product detail template (future)
├── cart.html           # Shopping cart (future)
├── styles.css          # Shared base styles
├── shop.css            # Shop-specific styles
├── theme.js            # Theme switching logic
├── shop.js             # Cart and shop functionality
├── assets/             # Product images, brand assets
├── api/                # Future API endpoints (products, orders)
├── package.json
├── vercel.json         # Vercel configuration
└── vite.config.js      # Vite configuration
```

## Current Status

**Phase 1: Coming Soon** (Current)
- Landing page with brand logo
- Email signup form
- About page with brand values
- Theme system (light/dark mode)

**Phase 2: Product Catalog** (Future)
- Product grid
- Product detail pages
- Category filtering
- Search functionality

**Phase 3: E-commerce** (Future)
- Shopping cart
- Checkout flow
- Stripe integration
- Order management
- Customer accounts

## Pages

### index.html - Home/Coming Soon
- Still Goods logo and tagline
- Opening soon notice
- Email signup form
- Links to about page and main site

### about.html - About Still Goods
- Brand story
- Approach and values
- Connection to Scott Bertrand
- Placeholder copy (to be filled by GPT)

## Navigation

- **Brand Logo**: Links to shop home (/)
- **Shop**: Active page (/)
- **About**: About Still Goods (/about.html)
- **Scott Bertrand**: Links to scottbertrand.com
- **Cart**: Shows item count (future)

## Theme System

The site supports light and dark themes:
- Uses CSS custom properties
- Persists preference to localStorage
- Respects system preference on first visit
- Theme toggle in navigation
- Logo swaps between dark/light variants

## Shopping Cart (Future)

Cart system uses localStorage:
- Persists across page reloads
- Updates cart count in navigation
- Ready for checkout integration

## Deployment

### Deploy to Vercel

1. Push repository to GitHub
2. Import project in Vercel dashboard
3. Configure environment variables (when ready):
   - Stripe keys (test mode initially)
   - Email service API key
4. Set custom domains:
   - Primary: `goods.scottbertrand.com`
   - Redirect: `shop.scottbertrand.com` → `goods.scottbertrand.com`
5. Deploy

### DNS Configuration

Add CNAME records to your DNS:

```
# Primary shop domain
Type: CNAME
Name: goods
Value: cname.vercel-dns.com

# Shop alias (redirect at DNS level)
Type: CNAME
Name: shop
Value: goods.scottbertrand.com
```

### Setting Up shop.scottbertrand.com Redirect

**Option A: DNS-Level (Recommended)**
Configure at your DNS provider (Cloudflare, etc.):
- Add Page Rule/Redirect Rule:
  - Match: `shop.scottbertrand.com/*`
  - Redirect to: `goods.scottbertrand.com/$1`
  - Status: 301 (Permanent)

**Option B: Vercel Alias**
- Add both domains to Vercel project
- Vercel handles the redirect automatically

## Design System

**Typography:**
- Headings: Sans-serif (system fonts)
- Body: Georgia serif for descriptions
- Prices: Monospace

**Colors:**
- Neutral palette (grays, warm whites)
- Follows main site theme system
- Minimal accent colors

**Layout:**
- Generous white space
- Simple product grid (future)
- Clean, minimal aesthetic
- Mobile-first responsive

## Future E-commerce Integration

### Stripe Setup

```bash
npm install stripe
```

Create API endpoints:
- `/api/products` - Product catalog
- `/api/create-checkout-session` - Initiate checkout
- `/api/webhook` - Handle Stripe events

### Product Data Structure

```json
{
  "id": "001",
  "slug": "linen-apron",
  "name": "Linen Work Apron",
  "price": 8500,
  "currency": "USD",
  "description": "...",
  "images": ["..."],
  "inStock": true,
  "variants": [...],
  "category": "Workshop"
}
```

## Development Notes

- Keep copy as placeholders - GPT will fill in content
- Focus on foundational structure and styling
- Cart system is built, ready for products
- Stripe integration is prepared but not active
- Email signup form needs backend API endpoint

## Related Projects

- **Main Site**: [scottbertrand.com-teaser-1](../scottbertrand.com-teaser-1)
- **Field Notes**: [scott-field-notes](../scott-field-notes)

## Future Migration

Still Goods may eventually move to its own domain (e.g., `stillgoods.com`). The current subdomain setup allows for:
- Easy brand testing
- Simple migration path
- Redirect configuration when moving

## Support

For issues or questions, contact Scott Bertrand or file an issue in the repository.
