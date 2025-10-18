# Stripe Shopping Cart - Testing Checklist

Your Xanda shopping cart is now fully configured with **live Stripe credentials**. Use this checklist to verify everything works correctly.

## ✅ Pre-Launch Checklist

### 1. Stripe Dashboard Configuration
- [ ] All 4 products exist in Stripe Dashboard (Products section)
- [ ] Each product has a price configured in MXN
- [ ] Price IDs match what's in the code:
  - Jamaica: `price_1SJURhAk4Vo7mfNIm6xTZvHd`
  - Cebolla: `price_1SJUTFAk4Vo7mfNIrFFaPNZM`
  - Arándano: `price_1SJUU8Ak4Vo7mfNIMRj48G0I`
  - Gift Box: `price_1SJUVAAk4Vo7mfNIuqVT98G8`
- [ ] Products are set to "Active" (not archived)
- [ ] Prices are set to "One time" payment mode

### 2. Stripe Account Settings
Go to **Settings** in Stripe Dashboard:

- [ ] **Business information** is filled out
- [ ] **Branding** (logo, colors) is configured for checkout
- [ ] **Customer emails** are enabled (Settings → Emails → Successful payments)
- [ ] **Checkout settings** allow shipping (Settings → Checkout → Shipping)
- [ ] **Tax collection** is configured if needed (Settings → Tax)

### 3. GitHub Pages Deployment
- [ ] GitHub Pages is enabled (Settings → Pages)
- [ ] Source is set to `main` branch, `/ (root)` folder
- [ ] Custom domain configured (if applicable)
- [ ] Site is live at: `https://antonio-ms-coder.github.io/Xanda/`

---

## 🧪 Testing Flow

### Test 1: Add Products to Cart
1. [ ] Open your live site
2. [ ] Click "Agregar al carrito" on Jamaica product
3. [ ] Cart badge appears with "1"
4. [ ] Notification shows "Agregado al carrito"
5. [ ] Repeat for Cebolla product
6. [ ] Cart badge updates to "2"

**Expected Result:** Cart badge shows correct count, notifications appear

---

### Test 2: View Cart Modal
1. [ ] Click the cart icon in navigation
2. [ ] Cart modal slides in from right
3. [ ] Both products are displayed with images
4. [ ] Product names are correct
5. [ ] Prices show $299 MXN each
6. [ ] Total shows $598 MXN
7. [ ] Quantity shows "1" for each item

**Expected Result:** Cart displays all items correctly

---

### Test 3: Modify Cart Quantities
1. [ ] Click "+" on Jamaica product
2. [ ] Quantity changes to 2
3. [ ] Total updates to $897 MXN ($299 × 2 + $299)
4. [ ] Click "-" on Cebolla product
5. [ ] Cebolla is removed from cart
6. [ ] Cart badge updates to "2" (Jamaica × 2)
7. [ ] Total updates to $598 MXN

**Expected Result:** Quantity controls work, totals update correctly

---

### Test 4: Remove Items
1. [ ] Click "Eliminar" on Jamaica
2. [ ] Jamaica is removed from cart
3. [ ] Empty cart message appears
4. [ ] Cart badge disappears
5. [ ] Total shows $0 MXN

**Expected Result:** Remove function works, empty state displays

---

### Test 5: Cart Persistence
1. [ ] Add Gift Box to cart ($799)
2. [ ] Refresh the page (F5)
3. [ ] Cart badge still shows "1"
4. [ ] Open cart modal
5. [ ] Gift Box is still in cart

**Expected Result:** Cart persists after page refresh

---

### Test 6: Stripe Checkout (Test Mode)
**For safe testing, temporarily switch to test mode first:**

1. Replace publishable key with test key (pk_test_...)
2. Replace Price IDs with test Price IDs from Stripe test mode
3. [ ] Add products to cart
4. [ ] Click "Proceder al pago"
5. [ ] Button shows "Procesando..."
6. [ ] Redirects to Stripe Checkout page
7. [ ] Checkout page is in Spanish ("es" locale)
8. [ ] Products and quantities are correct
9. [ ] Total amount is correct
10. [ ] Shipping address section is visible
11. [ ] Use test card: `4242 4242 4242 4242`
    - Expiration: Any future date
    - CVC: Any 3 digits
    - ZIP: Any 5 digits
12. [ ] Fill in shipping address (Mexico)
13. [ ] Click "Pagar"
14. [ ] Redirects to success.html
15. [ ] Success page displays correctly
16. [ ] Cart is cleared (badge disappears)

**Expected Result:** Complete checkout flow works without errors

---

### Test 7: Live Payment (Real Card)
**⚠️ Only do this when ready to test with real money:**

1. [ ] Ensure live keys are active (not test keys)
2. [ ] Add one Jamaica product to cart
3. [ ] Proceed to checkout
4. [ ] Use a real credit card
5. [ ] Complete the purchase
6. [ ] Check email for Stripe receipt
7. [ ] Verify in Stripe Dashboard:
   - Go to **Payments**
   - See successful payment
   - Check payment details
8. [ ] Refund the test payment if needed

**Expected Result:** Real payment processes successfully

---

## 🔍 Troubleshooting Guide

### Issue: Cart badge doesn't update
**Possible causes:**
- JavaScript error in console
- `cart-badge` element ID not found

**Fix:**
1. Open browser Developer Tools (F12)
2. Check Console tab for errors
3. Verify cart icon HTML has `id="cart-badge"`

---

### Issue: "Proceder al pago" button doesn't work
**Possible causes:**
- Stripe.js script didn't load
- Invalid publishable key
- Browser blocking third-party scripts

**Fix:**
1. Check Network tab for stripe.com/v3 script
2. Verify publishable key starts with `pk_live_`
3. Check Console for Stripe errors
4. Try in incognito mode

---

### Issue: Checkout shows wrong products
**Possible causes:**
- Price IDs don't match Stripe Dashboard
- Products are archived in Stripe

**Fix:**
1. Go to Stripe Dashboard → Products
2. Click each product
3. Copy the **Price ID** (starts with `price_`)
4. Verify it matches the code
5. Ensure product status is "Active"

---

### Issue: Checkout page in English instead of Spanish
**Possible causes:**
- `locale: 'es'` not set correctly

**Fix:**
1. Check checkout function has `locale: 'es'`
2. Clear browser cache
3. Try in incognito mode

---

### Issue: Can't ship to Mexico
**Possible causes:**
- Shipping countries not configured

**Fix:**
1. Verify checkout has:
   ```javascript
   shippingAddressCollection: {
     allowedCountries: ['MX']
   }
   ```
2. In Stripe Dashboard → Settings → Checkout
3. Enable "Collect shipping addresses"

---

### Issue: Success page shows 404
**Possible causes:**
- success.html not deployed
- GitHub Pages path incorrect

**Fix:**
1. Verify `success.html` exists in repository root
2. Check GitHub Pages deployment
3. Try direct URL: `https://your-site.com/success.html`
4. Update success URL in checkout if needed

---

### Issue: Payment succeeds but cart not cleared
**Possible causes:**
- success.html JavaScript not executing

**Fix:**
1. Open success.html in code editor
2. Verify this script is present:
   ```javascript
   localStorage.removeItem('xandaCart');
   ```
3. Check browser console for errors

---

## 📊 Stripe Dashboard Monitoring

After launching, monitor these in Stripe Dashboard:

### Daily Checks:
- [ ] **Payments** tab - see successful transactions
- [ ] **Failed payments** - investigate any failures
- [ ] **Customers** - see customer data
- [ ] **Disputes** - handle any chargebacks

### Weekly Checks:
- [ ] **Radar** - review fraud detection
- [ ] **Reports** - analyze sales data
- [ ] **Subscriptions** - (if you add recurring products later)

---

## 🚀 Going Live Checklist

### Before Public Launch:
- [ ] Test complete purchase flow 2-3 times
- [ ] Verify email receipts are being sent
- [ ] Confirm products display correctly
- [ ] Test on mobile devices
- [ ] Test in different browsers (Chrome, Safari, Firefox)
- [ ] Verify prices are correct
- [ ] Check shipping cost settings (if applicable)
- [ ] Test with different card types (Visa, Mastercard, Amex)
- [ ] Enable Stripe Radar for fraud protection
- [ ] Set up Stripe webhooks (optional but recommended)

### Post-Launch Monitoring:
- [ ] Monitor first 10 transactions closely
- [ ] Respond to customer emails quickly
- [ ] Track conversion rate (visitors → purchases)
- [ ] Monitor cart abandonment
- [ ] Check for any error patterns

---

## 🎯 Success Metrics to Track

### In Stripe Dashboard:
- Total sales volume
- Number of successful payments
- Average order value
- Payment failure rate
- Customer repeat rate

### On Your Site (add Google Analytics):
- Cart addition rate
- Cart abandonment rate
- Checkout initiation rate
- Purchase completion rate
- Time to purchase

---

## 🔐 Security Best Practices

- [ ] Never commit Secret Key to repository
- [ ] Only Publishable Key in frontend code
- [ ] Use HTTPS (GitHub Pages provides this)
- [ ] Keep Stripe.js library up to date
- [ ] Monitor Stripe Radar for suspicious activity
- [ ] Enable 3D Secure for cards (SCA compliance)
- [ ] Set up email notifications for large transactions

---

## 📞 Support Resources

### Stripe Documentation:
- Checkout docs: https://stripe.com/docs/payments/checkout
- Price API: https://stripe.com/docs/api/prices
- Testing: https://stripe.com/docs/testing

### Stripe Support:
- Email: support@stripe.com
- Dashboard: Click "?" icon → "Contact Support"
- Community: https://stripe.com/community

### Xanda Implementation:
- Your code is in: `/Users/tonomurrieta/Desktop/negocios/Xanda/`
- Main file: `index.html` (shopping cart at line 1297+)
- Success page: `success.html`
- Guide: `STRIPE-SETUP-GUIDE.md`

---

## ✨ You're Ready!

Your Stripe shopping cart is fully configured and ready to accept payments. The implementation includes:

✅ Live Stripe credentials
✅ Correct Price IDs
✅ Shopping cart with persistence
✅ Beautiful UI with animations
✅ Mobile-responsive design
✅ Spanish language support
✅ Mexico shipping
✅ Success page

**Next step:** Run through the testing flow above, then launch! 🚀
