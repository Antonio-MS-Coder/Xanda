# Xanda — Quick Start Guide

Get your premium landing page live in 5 simple steps.

## Overview

This is a complete, production-ready landing page for Xanda. Just add images, configure Stripe, and deploy.

**What's Included:**
- ✅ Premium HTML landing page with all sections
- ✅ Custom CSS with animations and design system
- ✅ SEO optimization (meta tags, structured data)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Stripe Buy Button integration ready
- ✅ GitHub Pages deployment ready
- ✅ Comprehensive documentation

## 5-Step Quick Start

### Step 1: Add Your Images (15 minutes)

Add these 6 images to the `/assets` folder:

1. **hero.webp** — Main showcase image (1200×800px, ≤200KB)
2. **jamaica.webp** — Jamaica product (900×1125px, ≤120KB)
3. **cebolla.webp** — Cebolla product (900×1125px, ≤120KB)
4. **arandano.webp** — Arándano product (900×1125px, ≤120KB)
5. **giftbox.webp** — Gift box (1200×900px, ≤150KB)
6. **logo.svg** — Replace placeholder with final logo

**Tips:**
- Use WebP format for best performance
- Compress images at [Squoosh.app](https://squoosh.app/)
- See `IMAGE-REQUIREMENTS.md` for detailed specs

**Don't have images yet?** Use placeholder images from [Unsplash](https://unsplash.com/s/photos/gourmet-food) temporarily.

### Step 2: Configure Stripe (20 minutes)

1. **Create products** in [Stripe Dashboard](https://dashboard.stripe.com/):
   - Jamaica con chile pasilla
   - Cebolla caramelizada con tocino ahumado
   - Arándano con mezcal y sal de gusano
   - Gift Box 3 frascos

2. **Create Buy Buttons** for each product:
   - Enable "Allow quantity to be adjusted"
   - Enable "Collect shipping address"
   - Copy each `buy-button-id`

3. **Update `index.html`** (Lines 156, 171, 186, 207):
   ```html
   <!-- Replace these 5 values: -->
   BUY_BTN_JAMAICA → buy_btn_1ABCabc123
   BUY_BTN_CEBOLLA → buy_btn_1DEFdef456
   BUY_BTN_ARANDANO → buy_btn_1GHIghi789
   BUY_BTN_GIFTBOX → buy_btn_1JKLjkl012
   PUBLISHABLE_KEY_XANDA → pk_test_51ABC...
   ```

4. **Test** with test card `4242 4242 4242 4242`

**Start with test mode**, switch to live when ready to accept real payments.

### Step 3: Customize Content (10 minutes)

Edit `index.html` to update:

- **Contact email** (Line 263, 534): Change `hola@xanda.mx` to your email
- **Social links** (Lines 265-267, 524-543): Update Instagram, TikTok, Pinterest URLs
- **Custom domain** (Lines 20-33): Update `https://xanda.mx/` to your domain
- **Copyright** (Line 560): Verify company name

Optional customizations:
- Product descriptions
- Pricing display (if you want to show prices)
- Additional sections

### Step 4: Deploy to GitHub Pages (15 minutes)

1. **Create GitHub repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Xanda landing page"
   git branch -M main
   ```

2. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/xanda.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to repository **Settings** → **Pages**
   - Source: **Deploy from a branch**
   - Branch: **main** / **root**
   - Click **Save**

4. **Wait 2-3 minutes** for deployment

5. **Visit**: `https://YOUR-USERNAME.github.io/xanda/`

### Step 5: Verify & Launch (10 minutes)

**Pre-launch checklist:**
- [ ] All images load correctly
- [ ] Stripe buttons work (test mode)
- [ ] Mobile responsive on real device
- [ ] No console errors
- [ ] All links work
- [ ] Run Lighthouse audit (Performance ≥90)

**When ready to go live:**
1. Switch Stripe to live mode
2. Update buy buttons with live keys
3. Test one real purchase (then refund)
4. Share with the world!

**Post-launch:**
- Submit to [Google Search Console](https://search.google.com/search-console)
- Share on social media
- Monitor Stripe dashboard for orders

## Custom Domain (Optional)

Add `xanda.mx` instead of GitHub subdomain:

1. **Add CNAME file** to repository:
   ```
   xanda.mx
   ```

2. **Configure DNS** with your registrar:
   ```
   A Record:  @ → 185.199.108.153
   A Record:  @ → 185.199.109.153
   A Record:  @ → 185.199.110.153
   A Record:  @ → 185.199.111.153
   CNAME:     www → YOUR-USERNAME.github.io
   ```

3. **GitHub Pages**: Settings → Custom domain → Enter `xanda.mx`

4. **Wait 24 hours** for DNS propagation

5. **Enable HTTPS** in GitHub Pages settings

## Testing Locally

Before deploying, test on your computer:

```bash
# Navigate to project folder
cd /path/to/Xanda

# Start local server (Python 3)
python3 -m http.server 8000

# Visit in browser
open http://localhost:8000
```

Test:
- All sections scroll smoothly
- Images load
- Buttons look correct (won't work until deployed)
- Mobile responsive (Chrome DevTools)

## Troubleshooting

### Images not showing
- Check file names match exactly (case-sensitive)
- Verify files are in `/assets` folder
- Use browser DevTools → Network tab to see 404 errors

### Stripe buttons not working
- Verify you replaced ALL placeholder IDs
- Check browser console for errors
- Ensure Stripe script loads
- Confirm publishable key is correct

### Site not deploying
- Repository must be public
- Branch must be "main" not "master"
- Wait 5 minutes after enabling Pages
- Check Actions tab for build errors

### Performance issues
- Compress images more (target ≤100KB for products)
- Use WebP format
- Remove unused code
- Test on fast WiFi first

## Next Steps

**Immediate:**
1. Add Google Analytics (optional)
2. Set up email notifications for Stripe orders
3. Create social media accounts (@xanda.mx)
4. Prepare product photography

**Week 1:**
1. Submit sitemap to Google Search Console
2. Share on Instagram, TikTok, Pinterest
3. Send to friends/family for feedback
4. Process first real order!

**Ongoing:**
1. Add customer testimonials
2. Create blog/recipes section
3. Launch email newsletter
4. Seasonal product launches
5. Monitor analytics and optimize

## Documentation Files

- **README.md** — Complete guide and documentation
- **INSTRUCTIONS.md** — Original technical specifications
- **IMAGE-REQUIREMENTS.md** — Detailed image specs and tips
- **DEPLOYMENT-CHECKLIST.md** — Pre-launch verification
- **QUICK-START.md** — This file

## Support

**Questions?**
- Email: hola@xanda.mx
- GitHub Issues: https://github.com/YOUR-USERNAME/xanda/issues

**Useful Resources:**
- [Stripe Documentation](https://stripe.com/docs)
- [GitHub Pages Guide](https://docs.github.com/en/pages)
- [Lighthouse Guide](https://developers.google.com/web/tools/lighthouse)

## Time Estimate

| Task | Time | Status |
|------|------|--------|
| Add images | 15 min | ⬜ |
| Configure Stripe | 20 min | ⬜ |
| Customize content | 10 min | ⬜ |
| Deploy to GitHub | 15 min | ⬜ |
| Verify & test | 10 min | ⬜ |
| **Total** | **~70 min** | |

## Success Criteria

Your site is ready to launch when:
- ✅ All images load and look professional
- ✅ All 4 Stripe buy buttons work
- ✅ Mobile looks perfect on real phone
- ✅ Lighthouse Performance ≥ 90
- ✅ No console errors
- ✅ Contact info is correct
- ✅ Social links work

---

**Let's launch Xanda!** 🚀

You've got this. The hard part (design and development) is done. Now just add your content and go live.

**Questions?** Re-read the relevant documentation file or contact hola@xanda.mx
