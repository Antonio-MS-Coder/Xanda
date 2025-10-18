# Xanda — Sabores gourmet mexicanos que trascienden

Premium landing page for Xanda, a Mexican gourmet jam and sauce brand. Built as a static site optimized for GitHub Pages with Stripe Buy Button integration.

![Xanda Preview](./assets/hero.webp)

## Overview

Xanda offers artisanal Mexican gourmet products with unique flavor combinations:
- **Jamaica con chile pasilla** — Hibiscus flowers with elegant pasilla heat
- **Cebolla caramelizada con tocino ahumado** — Caramelized onion with smoked bacon
- **Arándano con mezcal y sal de gusano** — Cranberry with mezcal and worm salt
- **Gift Box** — Premium black box with 3 jars of your choice

## Features

### Design & User Experience
- **Premium Aesthetic**: Black matte (#0a0a0a) with gold accents (#CFAE63, #FCD34D)
- **Editorial Typography**: Playfair Display for headings, Inter for body text
- **Responsive Design**: Mobile-first approach, fully responsive across all devices
- **Smooth Animations**: Micro-interactions, fade-in effects, hover states
- **Accessibility**: WCAG 2.1 AA compliant, keyboard navigation, reduced motion support

### SEO Optimization
- Comprehensive meta tags (Open Graph, Twitter Cards)
- Structured data (JSON-LD) for products and organization
- Semantic HTML5 markup
- Optimized images (WebP format with lazy loading)
- Fast loading times and Core Web Vitals optimization
- Sitemap-ready structure

### Performance
- **Target Lighthouse Scores**:
  - Performance: ≥ 90
  - Accessibility: ≥ 90
  - Best Practices: ≥ 90
  - SEO: 100
- Minimal dependencies (Tailwind CDN only)
- Optimized images with proper sizing
- Efficient CSS with GPU acceleration
- Scroll progress indicator

### E-commerce Integration
- Stripe Buy Button integration (no backend required)
- Multiple product support with cart functionality
- Adjustable quantities
- Shipping address collection
- Secure checkout flow
- Test and production mode support

## Project Structure

```
/
├── index.html              # Main landing page
├── styles.css              # Custom brand styles and design system
├── README.md               # This file
├── INSTRUCTIONS.md         # Detailed implementation instructions
└── assets/                 # Image assets
    ├── logo.svg           # Brand logo
    ├── hero.webp          # Hero section image (1200x800px)
    ├── jamaica.webp       # Jamaica product image (900x1125px)
    ├── cebolla.webp       # Cebolla product image (900x1125px)
    ├── arandano.webp      # Arándano product image (900x1125px)
    └── giftbox.webp       # Gift box image (1200x900px)
```

## Setup Instructions

### 1. Clone or Download the Repository

```bash
git clone https://github.com/yourusername/xanda.git
cd xanda
```

### 2. Add Product Images

Add the following optimized images to the `/assets` folder:

- **logo.svg** — Brand logo (vector format)
- **hero.webp** — Hero section (1200x800px, ≤200KB)
- **jamaica.webp** — Jamaica product (900x1125px, ≤120KB)
- **cebolla.webp** — Cebolla product (900x1125px, ≤120KB)
- **arandano.webp** — Arándano product (900x1125px, ≤120KB)
- **giftbox.webp** — Gift box (1200x900px, ≤150KB)

**Image Optimization Tips:**
- Use WebP format for best compression
- Maintain high quality while keeping file sizes small
- Use tools like [Squoosh](https://squoosh.app/) or [TinyPNG](https://tinypng.com/)
- Ensure images have proper alt text for SEO and accessibility

### 3. Configure Stripe Buy Buttons

#### Create Products in Stripe Dashboard

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to **Products** → **Add Product**
3. Create products for:
   - Jamaica con chile pasilla
   - Cebolla caramelizada con tocino ahumado
   - Arándano con mezcal y sal de gusano
   - Gift Box 3 frascos
4. Set prices in MXN (Mexican Pesos)
5. Add product descriptions and images

#### Generate Buy Buttons

1. For each product, click **Create payment link** or **Buy button**
2. Configure settings:
   - ✅ Allow quantity to be adjusted
   - ✅ Collect shipping address
   - ✅ Enable promo codes (optional)
3. Copy the **buy-button-id** for each product
4. Copy your **Publishable key** (starts with `pk_test_` or `pk_live_`)

#### Update HTML

Open `index.html` and replace the placeholder values:

```html
<!-- Find and replace these placeholders: -->
BUY_BTN_JAMAICA → your_jamaica_buy_button_id
BUY_BTN_CEBOLLA → your_cebolla_buy_button_id
BUY_BTN_ARANDANO → your_arandano_buy_button_id
BUY_BTN_GIFTBOX → your_giftbox_buy_button_id
PUBLISHABLE_KEY_XANDA → your_stripe_publishable_key
```

**Example:**
```html
<stripe-buy-button
  buy-button-id="buy_btn_1234567890abcdef"
  publishable-key="pk_live_51ABCDEFabcdefghijklmnop">
</stripe-buy-button>
```

### 4. Test Locally

Open `index.html` in your browser:

```bash
# Using Python 3
python3 -m http.server 8000

# Using PHP
php -S localhost:8000

# Or simply open the file
open index.html
```

Visit `http://localhost:8000` to preview the site.

**Test Stripe Checkout:**
- Use test mode keys initially
- Test card: `4242 4242 4242 4242`
- Any future expiry date, any CVC, any ZIP code

### 5. Deploy to GitHub Pages

#### Option A: Deploy from Repository Root

1. Create a new GitHub repository
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Xanda landing page"
   git branch -M main
   git remote add origin https://github.com/yourusername/xanda.git
   git push -u origin main
   ```
3. Go to **Settings** → **Pages**
4. Source: **Deploy from a branch**
5. Branch: **main** / **root**
6. Click **Save**
7. Your site will be published at `https://yourusername.github.io/xanda/`

#### Option B: Custom Domain

1. Add a `CNAME` file to the repository root:
   ```
   xanda.mx
   ```
2. In GitHub: **Settings** → **Pages** → **Custom domain**
3. Enter `xanda.mx` and click **Save**
4. Configure DNS with your domain registrar:
   ```
   A Record:  @ → 185.199.108.153
   A Record:  @ → 185.199.109.153
   A Record:  @ → 185.199.110.153
   A Record:  @ → 185.199.111.153
   CNAME:     www → yourusername.github.io
   ```
5. Wait for DNS propagation (can take up to 24 hours)
6. Enable **Enforce HTTPS** in GitHub Pages settings

### 6. Final Checks

Before going live, verify:

- ✅ All images load correctly
- ✅ Stripe Buy Buttons work (test mode first)
- ✅ Mobile responsiveness on multiple devices
- ✅ All links are functional
- ✅ Meta tags and OG images are correct
- ✅ Contact email is correct (hola@xanda.mx)
- ✅ Social media links are updated
- ✅ Run Lighthouse audit (Performance ≥90, SEO 100)

## Customization Guide

### Update Colors

Edit CSS custom properties in `styles.css`:

```css
:root {
  --color-gold: #CFAE63;           /* Brand gold */
  --color-gold-light: #FCD34D;     /* Light gold accent */
  --color-black-matte: #0a0a0a;    /* Primary background */
}
```

### Update Typography

Replace fonts in `index.html` `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;600&display=swap" rel="stylesheet">
```

Update CSS variables in `styles.css`:

```css
:root {
  --font-playfair: 'YourFont', serif;
  --font-inter: 'YourFont', sans-serif;
}
```

### Add More Products

1. Create product card in the Products section:
```html
<article class="product-card fade-in-up">
  <!-- Copy existing product structure -->
</article>
```

2. Add to JSON-LD structured data for SEO
3. Create corresponding Stripe product and buy button

### Update Content

All text content is in Spanish. To update:
- **Hero section**: Lines 145-185 in `index.html`
- **Products**: Lines 190-320
- **Gift section**: Lines 325-370
- **Origin story**: Lines 375-440
- **Footer**: Lines 500-580

## SEO Best Practices

### Meta Tags
All meta tags are pre-configured in `<head>`. Update these values:
- `<title>` — Page title (50-60 characters)
- `<meta name="description">` — Meta description (150-160 characters)
- `og:image` — Social share image (1200x630px recommended)

### Structured Data
JSON-LD is included for:
- Organization schema
- Product catalog with ItemList
- Offers and availability

### Image Optimization
- Use descriptive file names: `jamaica-chile-pasilla-mermelada.webp`
- Always include `alt` text
- Specify `width` and `height` attributes
- Use `loading="lazy"` for below-fold images
- Use `loading="eager"` for hero image

### Performance Tips
- Images should be compressed (WebP format)
- Minimize external dependencies
- Use CDN for fonts and libraries
- Enable caching headers (configured in GitHub Pages)
- Lazy load images below the fold

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile Safari (iOS 12+)
- ✅ Chrome Mobile (Android 8+)

Fallbacks included for older browsers using progressive enhancement.

## Maintenance

### Regular Updates
- Update product prices in Stripe Dashboard
- Refresh product images seasonally
- Update social proof numbers (customer count, ratings)
- Add new products as collection grows
- Monitor Lighthouse scores monthly

### Analytics (Optional)
Add Google Analytics or similar:

```html
<!-- Add before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Troubleshooting

### Stripe Buy Buttons Not Showing
- Verify buy-button-id is correct
- Check publishable key matches mode (test/live)
- Ensure Stripe script loads: `https://js.stripe.com/v3/buy-button.js`
- Check browser console for errors

### Images Not Loading
- Verify file paths are correct (case-sensitive)
- Check file extensions match (`.webp` vs `.jpg`)
- Ensure files are in `/assets` folder
- Clear browser cache

### Deployment Issues
- Ensure repository is public
- Verify GitHub Pages is enabled
- Check branch name is correct
- Wait a few minutes after deployment
- Check GitHub Actions for build errors

### Performance Issues
- Compress images further
- Minimize custom CSS
- Remove unused Tailwind classes
- Enable browser caching
- Use WebP format for all images

## Resources

### Design Assets
- [Squoosh](https://squoosh.app/) — Image compression
- [Google Fonts](https://fonts.google.com/) — Typography
- [Coolors](https://coolors.co/) — Color palette generator
- [Hero Patterns](https://heropatterns.com/) — SVG backgrounds

### SEO Tools
- [Google Search Console](https://search.google.com/search-console)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

### Stripe Documentation
- [Buy Button Guide](https://stripe.com/docs/payment-links/buy-button)
- [Testing](https://stripe.com/docs/testing)
- [Shipping](https://stripe.com/docs/payments/checkout/shipping)

## License

MIT License — Free to use and modify.

## Support

For questions or issues:
- **Email**: hola@xanda.mx
- **Instagram**: [@xanda.mx](https://instagram.com/xanda.mx)
- **Website**: [xanda.mx](https://xanda.mx)

---

**Built with passion for gourmet Mexican flavors** 🇲🇽

Made by [Antonio Murrieta](https://antoniomurrieta.com)
