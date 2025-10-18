# Xanda Deployment Checklist

Use this checklist before deploying to GitHub Pages or going live.

## Pre-Launch Checklist

### 1. Content & Copy
- [ ] All Spanish text is correct and proofread
- [ ] Product descriptions are compelling and accurate
- [ ] Contact email (hola@xanda.mx) is correct
- [ ] Social media links point to correct profiles
- [ ] Prices are set correctly in Stripe
- [ ] Legal pages linked (términos, privacidad) if required

### 2. Images
- [ ] All product images added to `/assets` folder
- [ ] Images are WebP format
- [ ] Hero image: ≤200KB
- [ ] Product images: ≤120KB each
- [ ] Gift box image: ≤150KB
- [ ] Logo SVG is final brand version
- [ ] All images have descriptive alt text
- [ ] Images look sharp on Retina displays
- [ ] No broken image links

### 3. Stripe Integration
- [ ] All 4 products created in Stripe Dashboard:
  - [ ] Jamaica con chile pasilla
  - [ ] Cebolla caramelizada con tocino ahumado
  - [ ] Arándano con mezcal y sal de gusano
  - [ ] Gift Box 3 frascos
- [ ] Buy buttons created for each product
- [ ] Quantity adjustment enabled on all buy buttons
- [ ] Shipping address collection enabled
- [ ] All `BUY_BTN_*` placeholders replaced in index.html
- [ ] `PUBLISHABLE_KEY_XANDA` replaced with real key
- [ ] Test mode works correctly
- [ ] Ready to switch to live mode (when ready)

### 4. SEO & Meta Tags
- [ ] Page title is compelling (50-60 chars)
- [ ] Meta description optimized (150-160 chars)
- [ ] Open Graph image is correct (hero.webp or custom)
- [ ] Canonical URL set correctly
- [ ] Structured data (JSON-LD) is present
- [ ] All internal links work
- [ ] Sitemap.xml created (optional but recommended)

### 5. Performance
- [ ] Run Lighthouse audit:
  - [ ] Performance ≥ 90
  - [ ] Accessibility ≥ 90
  - [ ] Best Practices ≥ 90
  - [ ] SEO = 100
- [ ] Images lazy load (except hero)
- [ ] No console errors
- [ ] Fast Time to Interactive (TTI)
- [ ] Minimal Cumulative Layout Shift (CLS)

### 6. Responsive Design
Test on:
- [ ] Desktop (1920px+, 1440px, 1024px)
- [ ] Tablet (768px, iPad)
- [ ] Mobile (375px iPhone, 360px Android)
- [ ] All breakpoints look good
- [ ] Touch targets are ≥44px on mobile
- [ ] Text is readable on all screen sizes

### 7. Browser Testing
Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### 8. Functionality
- [ ] All navigation links work
- [ ] Smooth scroll works
- [ ] Stripe buy buttons open correctly
- [ ] Cart functionality works
- [ ] Test checkout flow (test mode)
- [ ] Footer links work
- [ ] Contact email link works (mailto:)
- [ ] Social media links open in new tab

### 9. Accessibility
- [ ] All images have alt text
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] ARIA labels where appropriate
- [ ] Screen reader friendly
- [ ] Reduced motion respected

### 10. Analytics & Tracking (Optional)
- [ ] Google Analytics installed (if using)
- [ ] Meta Pixel installed (if using)
- [ ] Tag Manager configured (if using)
- [ ] Event tracking set up (button clicks, purchases)

## GitHub Pages Deployment

### Repository Setup
- [ ] Repository created on GitHub
- [ ] Repository is public (required for free GitHub Pages)
- [ ] .gitignore created (optional, for DS_Store, etc.)
- [ ] Initial commit pushed to main branch

### GitHub Pages Configuration
- [ ] Settings → Pages enabled
- [ ] Source set to: Deploy from branch
- [ ] Branch: main / root
- [ ] Custom domain configured (if using)
- [ ] DNS records set correctly (if custom domain)
- [ ] HTTPS enforced (wait for SSL certificate)
- [ ] Site published successfully

### Custom Domain (if applicable)
- [ ] CNAME file added to repository
- [ ] DNS A records point to GitHub:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153
- [ ] DNS CNAME record: www → yourusername.github.io
- [ ] DNS propagated (check with `dig xanda.mx`)
- [ ] HTTPS certificate issued (can take 24 hours)

## Post-Launch

### Immediate (Day 1)
- [ ] Test site on production URL
- [ ] Verify all Stripe buttons work in production
- [ ] Check all images load correctly
- [ ] Test on real mobile devices
- [ ] Share on social media
- [ ] Send test order to verify email flow

### Week 1
- [ ] Submit to Google Search Console
- [ ] Submit sitemap to Google
- [ ] Monitor for any errors or issues
- [ ] Check analytics (if installed)
- [ ] Gather initial user feedback

### Ongoing
- [ ] Monitor Stripe dashboard for orders
- [ ] Update product availability
- [ ] Refresh seasonal content
- [ ] Add customer testimonials
- [ ] Monitor performance scores monthly
- [ ] Update product images seasonally

## Quick Commands

### Test Locally
```bash
# Python 3 (recommended)
python3 -m http.server 8000

# Then visit: http://localhost:8000
```

### Git Commands
```bash
# Initial setup
git init
git add .
git commit -m "Initial commit: Xanda landing page"
git branch -M main
git remote add origin https://github.com/yourusername/xanda.git
git push -u origin main

# Updates
git add .
git commit -m "Update: description of changes"
git push
```

### Image Optimization (ImageMagick)
```bash
# Convert to WebP
magick convert input.jpg -quality 85 -define webp:method=6 output.webp

# Resize and convert
magick convert input.jpg -resize 1200x800 -quality 85 output.webp
```

### Lighthouse Audit
```bash
# Using Chrome DevTools
# 1. Open site in Chrome
# 2. F12 → Lighthouse tab
# 3. Generate report (Mobile + Desktop)

# Or using CLI
npm install -g lighthouse
lighthouse https://xanda.mx --view
```

## Troubleshooting

### Issue: Buy buttons not showing
**Solution:**
- Check browser console for errors
- Verify Stripe script loads
- Confirm buy-button-id is correct
- Check publishable key matches mode (test/live)

### Issue: Images not loading on GitHub Pages
**Solution:**
- Verify file paths are lowercase and correct
- Check files exist in /assets folder
- Clear browser cache
- Wait a few minutes for GitHub Pages to rebuild

### Issue: Custom domain not working
**Solution:**
- Verify DNS records are correct
- Check DNS propagation: https://dnschecker.org
- Wait 24-48 hours for full propagation
- Ensure CNAME file is in repository root

### Issue: Performance score low
**Solution:**
- Compress images further
- Use WebP format for all images
- Remove unused CSS/JS
- Enable caching headers
- Minimize external dependencies

## Resources

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Stripe Buy Button Docs](https://stripe.com/docs/payment-links/buy-button)
- [Lighthouse Docs](https://developers.google.com/web/tools/lighthouse)
- [WebP Converter (Squoosh)](https://squoosh.app/)
- [DNS Checker](https://dnschecker.org/)

## Support Contacts

- **Developer**: antonio@antoniomurrieta.com
- **Brand**: hola@xanda.mx
- **Stripe Support**: https://support.stripe.com

---

**Launch Date**: _____________

**Deployed By**: _____________

**Production URL**: _____________

**Notes**:
_________________________________________________
_________________________________________________
_________________________________________________
