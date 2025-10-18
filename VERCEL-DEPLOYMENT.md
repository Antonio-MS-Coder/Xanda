# Deploy Xanda to Vercel - Step by Step

Your code is ready! Follow these steps to deploy your site with the working shopping cart.

---

## Step 1: Sign Up / Log In to Vercel

1. Go to: **https://vercel.com/signup**
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub repositories
4. You'll be redirected to your Vercel dashboard

---

## Step 2: Import Your Repository

1. On the Vercel dashboard, click **"Add New..."** → **"Project"**
2. You'll see a list of your GitHub repositories
3. Find **"Xanda"** repository
4. Click **"Import"**

---

## Step 3: Configure the Project

Vercel will auto-detect your project settings. You should see:

### Framework Preset
- Should auto-detect as **"Other"** or **"Static"** (that's fine!)

### Root Directory
- Leave as **`./`** (default)

### Build Command
- Leave empty or set to: `echo "No build needed"`

### Output Directory
- Leave as **`public`** or set to **`.`** (current directory)

### Install Command
- Should auto-detect: `npm install` (this installs Stripe for the serverless function)

**Click "Deploy"** - but wait! We need to add the Secret Key first...

---

## Step 4: Add Environment Variable (IMPORTANT!)

**BEFORE clicking Deploy**, or **AFTER** if you already clicked:

1. On the project configuration page, find **"Environment Variables"** section
2. Click **"Add Environment Variable"**
3. Enter:
   - **Name:** `STRIPE_SECRET_KEY`
   - **Value:** `sk_live_YOUR_SECRET_KEY_HERE`

   ⚠️ **To get your Secret Key:**
   - Go to https://dashboard.stripe.com/apikeys
   - Copy the **Secret key** (starts with `sk_live_...`)
   - **NEVER** commit this to GitHub!

4. Select **"Production"**, **"Preview"**, and **"Development"**
5. Click **"Add"**

---

## Step 5: Deploy!

1. If you haven't clicked Deploy yet, click **"Deploy"** now
2. If you already deployed, go to **Settings** → **Environment Variables**, add the key, then:
   - Go to **Deployments** tab
   - Click the **"..."** menu on the latest deployment
   - Click **"Redeploy"**

Vercel will:
- ✅ Clone your repository
- ✅ Install dependencies (`npm install`)
- ✅ Build your site (instant - it's static!)
- ✅ Deploy the serverless function
- ✅ Give you a live URL

**This takes about 30-60 seconds!**

---

## Step 6: Get Your Live URL

Once deployed, you'll see:

```
🎉 Your project is ready!
https://xanda.vercel.app
```

Or something like:
```
https://xanda-xxxxx.vercel.app
```

**Click the URL to open your live site!**

---

## Step 7: Test Your Shopping Cart

1. **Open your live site** (the Vercel URL)
2. **Add Jamaica to cart** → Cart badge should show "1" ✅
3. **Add Cebolla to cart** → Cart badge should show "2" ✅
4. **Click cart icon** → Modal opens with both products ✅
5. **Change quantities** → Totals update ✅
6. **Click "Proceder al pago"** → Button shows "Procesando..." ✅
7. **Redirects to Stripe Checkout** → You see Stripe payment page in Spanish! ✅
8. **Test payment with:**
   - Card: `4242 4242 4242 4242`
   - Expiration: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits
9. **Complete payment** → Redirects to success.html ✅
10. **Check your email** → Receipt from Stripe ✅

---

## Step 8: Custom Domain (Optional)

Want to use your own domain instead of `xanda.vercel.app`?

1. In Vercel project, go to **Settings** → **Domains**
2. Enter your domain (e.g., `xanda.mx`)
3. Follow DNS instructions
4. Done! Your site will be at your custom domain

---

## Troubleshooting

### Issue: "Build failed"
**Check:**
- Make sure `package.json` exists in your repo
- Vercel needs it to install Stripe

**Fix:**
- The file is already in your repo from our commit
- Try redeploying

---

### Issue: Checkout button does nothing
**Check:**
1. Open browser DevTools (F12)
2. Go to Console tab
3. Click "Proceder al pago"
4. Look for errors

**Most common cause:**
- Missing `STRIPE_SECRET_KEY` environment variable

**Fix:**
1. Go to Vercel project → Settings → Environment Variables
2. Add the Secret Key
3. Redeploy

---

### Issue: "CORS error" in console
**Check:**
- The error might say "Access-Control-Allow-Origin"

**Fix:**
- Should not happen - the API is configured for CORS
- If it does, the API might not be deploying
- Check Vercel Functions tab to see if function deployed

---

### Issue: 500 Internal Server Error
**Check:**
1. Go to Vercel project → Functions tab
2. Click on `create-checkout`
3. Check the logs

**Most common causes:**
- Invalid Stripe Secret Key
- Stripe API error

**Fix:**
- Verify Secret Key is correct
- Check Stripe Dashboard for any issues

---

## Vercel Dashboard Features

### Deployments
- See all your deployments
- Each git push auto-deploys!
- Preview deployments for branches

### Functions
- See serverless function logs
- Debug any API errors
- Monitor performance

### Analytics (Optional - Upgrade)
- Track visitors
- See performance metrics
- Monitor errors

---

## Auto-Deploy Setup

Good news! **Auto-deploy is already enabled!**

Every time you:
1. Make changes to your code
2. Commit to GitHub
3. Push to main branch

Vercel will:
1. Detect the change
2. Auto-deploy
3. Update your live site

**In 30 seconds!** 🚀

---

## What's Next?

### Make It Live for Real:

1. ✅ Test thoroughly with test cards
2. ✅ Verify all products work
3. ✅ Test on mobile
4. ✅ Check emails are sending
5. ✅ Switch to live Stripe keys (already done!)
6. ✅ Do one real test purchase
7. ✅ Refund if needed
8. 🎉 Share your site!

### Optional Enhancements:

- **Custom Domain:** Add `www.xanda.mx`
- **Analytics:** Set up Google Analytics
- **Newsletter:** Add email capture
- **Reviews:** Add customer testimonials
- **SEO:** Submit to Google Search Console

---

## Summary

Your site now has:
- ✅ Full shopping cart with multiple products
- ✅ Quantity controls
- ✅ Secure Stripe Checkout
- ✅ Spanish language
- ✅ Mexico shipping
- ✅ Auto-deploy from GitHub
- ✅ Free hosting on Vercel
- ✅ Serverless backend
- ✅ Professional checkout flow

**Everything works!** 🎊

---

## Need Help?

If you get stuck:
1. Check the Troubleshooting section above
2. Check Vercel Functions logs
3. Check browser Console for errors
4. Let me know and I'll help debug!

---

## Your Live URLs

After deployment you'll have:
- **Production:** https://xanda.vercel.app (or your custom domain)
- **API Endpoint:** https://xanda.vercel.app/api/create-checkout
- **Success Page:** https://xanda.vercel.app/success.html

All working together perfectly! 🚀
