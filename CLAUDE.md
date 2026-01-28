# CLAUDE.md - Still Goods

## Project Overview

Still Goods is an e-commerce shop within the Scott Bertrand ecosystem, deployed to `goods.scottbertrand.com`. The brand represents "quiet goods for considered living" - a curated collection of thoughtfully designed products.

## Quick Commands

```bash
npm run dev      # Start dev server (port 8003)
npm run build    # Build for production
npm run preview  # Preview production build
```

## Tech Stack

- **Frontend**: Static HTML/CSS/JS with Vite
- **Styling**: CSS custom properties (theming), no frameworks
- **Payments**: Stripe (prepared, not yet active)
- **Email**: Formspree for launch notifications
- **Deployment**: Vercel (serverless + static)
- **Font**: Inter (Google Fonts)

## Project Structure

```
scott-still-goods/
├── index.html          # Shop home
├── about.html          # Brand story
├── success.html        # Checkout confirmation
├── products/           # Product detail pages
├── styles.css          # Base styles + theme system
├── shop.css            # Shop-specific styles
├── nav-quiet.css       # Quiet Minimal navigation styles
├── nav-quiet.js        # Navigation behavior
├── theme.js            # Theme management
├── shop.js             # Cart functionality
├── checkout.js         # Stripe checkout handlers
├── modal.js            # Modal components
├── assets/             # Logos, product images
├── api/checkout.js     # Vercel serverless (Stripe)
├── vercel.json         # Deployment config
└── vite.config.js      # Build config
```

## Brand & Design System

### Brand Identity

- **Tagline**: "Quiet goods for considered living"
- **Philosophy**: Quality over quantity, objects that age gracefully
- **Aesthetic**: Warm minimal - clean lines with soul
- **Typography**: Inter for UI, Georgia for body copy

### Product Categories

- Apparel
- Accessories
- Home & Kitchen
- Desk & Workspace

### Color System (Warm Minimal)

Theme variables are defined in `styles.css`. The site supports:
- Light theme (default) - warm off-white backgrounds
- Dark theme - warm charcoal
- System preference detection

**Light Theme:**
- `--bg-page: #faf9f7` (warm white)
- `--bg-primary: #f5f3f0`
- `--text-primary: #1a1918`
- `--text-secondary: #57534e`
- `--accent-warm: #d4a574` (warm gold)

**Dark Theme:**
- `--bg-page: #0c0a09`
- `--bg-primary: #1c1917`
- `--text-primary: #fafaf9`
- `--accent-warm: #d4a574`

### Theme-Aware Assets

Logo files in `/assets/` have light/dark variants:
- `still-goods-logo-light.png` (for dark backgrounds)
- `still-goods-logo-dark.png` (for light backgrounds)
- CSS handles switching via `[data-theme]` selectors

## Navigation System (Quiet Minimal)

The site uses a unique "Quiet Minimal" navigation with three states:

### States

1. **Default**: Ultra-minimal bar with logo (left) and "Menu" trigger (right)
2. **Scrolled**: Collapses to floating pill in corner
3. **Open**: Fullscreen overlay with large typography categories

### Files

- `nav-quiet.css` - All navigation styles
- `nav-quiet.js` - Navigation behavior (scroll, open/close, preview)

### Features

- Fullscreen overlay slides up from bottom on mobile
- Large typography category links
- Cursor-following preview images (desktop)
- Staggered reveal animations
- Theme toggle in footer
- Accessible with keyboard and screen readers

### Mobile Considerations

- Touch-optimized with 44px minimum targets
- Slide-up overlay for thumb-friendly interaction
- No preview images on mobile
- Grid layout for footer links

### Adding to New Pages

Include in `<head>`:
```html
<link rel="stylesheet" href="nav-quiet.css">
```

Add navigation HTML (copy from index.html), then include before `</body>`:
```html
<script src="nav-quiet.js"></script>
```

## Development Guidelines

### Code Style

- Vanilla HTML/CSS/JS - no frameworks
- Mobile-first responsive design
- Semantic HTML with ARIA attributes
- CSS custom properties for theming
- ES modules for JavaScript

### File Naming

- Lowercase with hyphens: `product-name.html`
- CSS: `component-name.css`
- JS: `feature-name.js`

### Adding New Products

1. Create product page in `/products/product-name.html`
2. Add product to catalog in `/api/checkout.js`
3. Add product images to `/assets/`
4. Update navigation category if needed

### Theme Changes

1. Update CSS variables in `styles.css` (`:root` and `[data-theme="dark"]`)
2. Update nav variables in `nav-quiet.css` if needed
3. Create new asset variants if needed
4. Test both themes thoroughly

## Ecosystem Integration

### Related Projects

- **Main Portfolio**: scottbertrand.com
- **Field Notes**: scott-field-notes
- **Parent Brand**: Bertrand Brands

### Theme Rules Across Ecosystem

**IMPORTANT**: Each site has specific theme defaults:

| Site | Default Theme | Toggle Available | Notes |
|------|---------------|------------------|-------|
| scottbertrand.com | Dark | Yes (time-based + manual) | Defaults to 'system' mode (time of day in Canada/Eastern) |
| bertrandbrands.com | Dark | No | Permanently dark, dark-only design |
| goods.scottbertrand.com (Still Goods) | **Light** | Yes (light → dark → system) | Light default is intentional brand differentiation |

**localStorage Keys**:
- scottbertrand.com, bertrandbrands.com: `sb-theme`
- goods.scottbertrand.com (Still Goods): `sg-theme` (unique to prevent cross-site interference)

### Theme Implementation (Still Goods)

1. `<html data-theme="light">` - Default set in HTML
2. Inline script in `<head>` prevents FOUC - only switches to dark if explicitly saved
3. Theme cycle: light → dark → system → light
4. Light theme is the brand default for Still Goods
5. Uses `sg-theme` key (not `sb-theme`) to keep theme independent from other ecosystem sites

### Navigation Links

- Footer links to scottbertrand.com
- Contact: hello@bertrandbrands.com

## Current Status

**Phase 1**: Coming Soon (email capture)
- New warm minimal aesthetic
- Unique Quiet Minimal navigation
- Product categories defined

**Next**:
- Category landing pages
- Product catalog
- Stripe checkout activation

## Environment Variables

For Stripe integration (when ready):
```
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Deployment

- Auto-deploys from GitHub to Vercel
- Primary: goods.scottbertrand.com
- Alias: shop.scottbertrand.com
