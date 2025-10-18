# Deployment Guide - GitHub Pages + Vercel Serverless

Since GitHub Pages doesn't support serverless functions, we'll use a hybrid approach:
- **Frontend**: GitHub Pages (your current setup)
- **API**: Vercel serverless function (free tier)

This gives you the best of both worlds!

---

## Step 1: Deploy Serverless Function to Vercel

### 1.1 Create Vercel Account
1. Go to https://vercel.com/signup
2. Sign up with your GitHub account
3. Authorize Vercel to access your repositories

### 1.2 Create a Separate API Repository

Since your main site is on GitHub Pages, we'll create a small separate repo just for the API:

1. Go to https://github.com/new
2. Repository name: `xanda-api`
3. Description: "Serverless API for Xanda checkout"
4. Make it **Private** (keep your Secret Key safe)
5. Click "Create repository"

### 1.3 Set Up the API Repository

In your terminal:

```bash
# Create a new directory for the API
cd ~/Desktop/negocios
mkdir xanda-api
cd xanda-api

# Initialize git
git init
git branch -M main

# Create the files
```

Create these 3 files:

**File 1: `api/create-checkout.js`**
```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://antonio-ms-coder.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { lineItems } = req.body;

    if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
      return res.status(400).json({ error: 'Invalid line items' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'https://antonio-ms-coder.github.io/Xanda/success.html',
      cancel_url: 'https://antonio-ms-coder.github.io/Xanda/index.html',
      locale: 'es',
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['MX'],
      },
    });

    return res.status(200).json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Stripe error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to create checkout session',
    });
  }
};
```

**File 2: `package.json`**
```json
{
  "name": "xanda-api",
  "version": "1.0.0",
  "dependencies": {
    "stripe": "^14.11.0"
  }
}
```

**File 3: `vercel.json`**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    }
  ]
}
```

**File 4: `.gitignore`**
```
node_modules
.env
.vercel
```

**File 5: `README.md`**
```markdown
# Xanda API

Serverless API for Xanda Stripe checkout.

## Endpoints

- POST /api/create-checkout - Creates a Stripe Checkout Session
```

### 1.4 Push to GitHub

```bash
git add .
git commit -m "Initial commit - Xanda API"
git remote add origin https://github.com/Antonio-MS-Coder/xanda-api.git
git push -u origin main
```

### 1.5 Deploy to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select `xanda-api` repository
4. Click "Import"
5. **Add Environment Variable:**
   - Name: `STRIPE_SECRET_KEY`
   - Value: `sk_live_YOUR_SECRET_KEY` (get from Stripe Dashboard → Developers → API keys)
6. Click "Deploy"
7. Wait for deployment to complete
8. **Copy your API URL** (will be like: `https://xanda-api.vercel.app`)

---

## Step 2: Update Your Frontend

Now update your main Xanda site to use the Vercel API:

In `index.html`, update the checkout function to use your Vercel API URL:

```javascript
// Call serverless function to create Checkout Session
const response = await fetch('https://YOUR-PROJECT.vercel.app/api/create-checkout', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ lineItems })
});
```

Replace `YOUR-PROJECT.vercel.app` with your actual Vercel URL.

---

## Step 3: Test

1. Open your GitHub Pages site
2. Add products to cart
3. Click "Proceder al pago"
4. Should redirect to Stripe Checkout! ✅

---

## Alternative: All-in-One Vercel Deployment

If you prefer to move everything to Vercel (simpler):

1. Import your main `Xanda` repository to Vercel
2. Vercel will serve your static site AND run the serverless function
3. Update the fetch URL to: `/.vercel/functions/create-checkout`
4. Done!

Vercel gives you:
- ✅ Free hosting (like GitHub Pages)
- ✅ Auto-deploy from GitHub
- ✅ Serverless functions
- ✅ Custom domains
- ✅ Automatic HTTPS

---

## Which Should You Choose?

### Keep GitHub Pages:
- ✅ You're already set up
- ✅ Familiar with GitHub Pages
- ⚠️ Need separate API repo

### Move to Vercel:
- ✅ Everything in one place
- ✅ Simpler setup
- ✅ Better performance
- ✅ Built for this use case

**My recommendation: Move to Vercel.** It's designed exactly for this (static site + serverless functions).

---

## Need Help?

Let me know which approach you prefer and I'll help you set it up!
