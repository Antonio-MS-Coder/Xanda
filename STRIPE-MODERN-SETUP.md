# Stripe Modern Implementation Guide

## The Problem

Stripe deprecated the `redirectToCheckout()` method. The modern approach requires creating Checkout Sessions on a server before redirecting customers.

## Your Options

### Option 1: Payment Links (Easiest - 5 minutes)
### Option 2: Serverless Backend (Best - 30 minutes)
### Option 3: Simple Single-Product Links (Quick Fix - 10 minutes)

---

## Option 1: Payment Links (RECOMMENDED)

Payment Links are the modern, no-code way to accept payments.

### Steps:

1. **Create Payment Links in Stripe Dashboard**
   - Go to https://dashboard.stripe.com/payment-links
   - Click "+ New" for each product:

#### Jamaica Link:
- Product: Jamaica con chile de árbol y sal de gusano
- Price: price_1SJURhAk4Vo7mfNIm6xTZvHd
- Click "Create link"
- Copy the link (looks like: `https://buy.stripe.com/test_xxxxx`)

#### Cebolla Link:
- Product: Cebolla caramelizada con tocino ahumado
- Price: price_1SJUTFAk4Vo7mfNIrFFaPNZM
- Click "Create link"
- Copy the link

#### Arándano Link:
- Product: Arándano con mezcal y sal de gusano
- Price: price_1SJUU8Ak4Vo7mfNIMRj48G0I
- Click "Create link"
- Copy the link

#### Gift Box Link:
- Product: Gift Box - Edición Regalo
- Price: price_1SJUVAAk4Vo7mfNIuqVT98G8
- Click "Create link"
- Copy the link

2. **Update index.html**

Replace the `paymentLinks` object in the checkout function (around line 1523) with your actual links:

```javascript
const paymentLinks = {
  'price_1SJURhAk4Vo7mfNIm6xTZvHd': 'https://buy.stripe.com/PASTE_YOUR_JAMAICA_LINK',
  'price_1SJUTFAk4Vo7mfNIrFFaPNZM': 'https://buy.stripe.com/PASTE_YOUR_CEBOLLA_LINK',
  'price_1SJUU8Ak4Vo7mfNIMRj48G0I': 'https://buy.stripe.com/PASTE_YOUR_ARANDANO_LINK',
  'price_1SJUVAAk4Vo7mfNIuqVT98G8': 'https://buy.stripe.com/PASTE_YOUR_GIFTBOX_LINK'
};
```

3. **Configure Each Payment Link**

For each payment link in Stripe Dashboard:
- After payment: Redirect to `https://antonio-ms-coder.github.io/Xanda/success.html`
- Collect shipping address: Yes
- Countries: Mexico only
- Language: Spanish

### ✅ Advantages:
- No server needed
- No code changes needed
- Works immediately
- Supports quantity
- Mobile-friendly

### ⚠️ Limitations:
- Only one product at a time (customers can't buy Jamaica + Cebolla in one checkout)
- For multiple products, they need to checkout separately

---

## Option 2: Serverless Backend (BEST SOLUTION)

Use a free serverless platform to create Checkout Sessions.

### Using Netlify Functions (Free):

1. **Create a new file: `/netlify/functions/create-checkout.js`**

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { lineItems } = JSON.parse(event.body);

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

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ sessionId: session.id, url: session.url }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
```

2. **Create `netlify.toml` in project root:**

```toml
[build]
  functions = "netlify/functions"

[build.environment]
  NODE_VERSION = "18"
```

3. **Create `package.json`:**

```json
{
  "name": "xanda",
  "version": "1.0.0",
  "dependencies": {
    "stripe": "^14.0.0"
  }
}
```

4. **Update checkout function in index.html:**

```javascript
async function checkout() {
  if (cart.length === 0) {
    alert('Tu carrito está vacío');
    return;
  }

  const lineItems = cart.map(item => ({
    price: item.priceId,
    quantity: item.quantity
  }));

  try {
    const response = await fetch('/.netlify/functions/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lineItems })
    });

    const { url } = await response.json();
    window.location.href = url;
  } catch (error) {
    console.error('Error:', error);
    alert('Hubo un error al procesar tu compra.');
  }
}
```

5. **Deploy to Netlify:**
   - Push code to GitHub
   - Connect repository to Netlify
   - Add environment variable: `STRIPE_SECRET_KEY` (your Secret Key)
   - Deploy!

### ✅ Advantages:
- Full cart support (multiple products)
- Professional solution
- Secure (Secret Key on server)
- Free tier is generous

---

## Option 3: Quick Fix - Contact Form

For now, redirect to a contact form when customers want to buy multiple products:

```javascript
async function checkout() {
  if (cart.length === 0) {
    alert('Tu carrito está vacío');
    return;
  }

  // Build email with cart details
  const cartSummary = cart.map(item =>
    `${item.name} x${item.quantity} - $${item.price * item.quantity} MXN`
  ).join('%0A');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const subject = `Pedido Xanda - Total: $${total} MXN`;
  const body = `Hola,%0A%0AQuisiera hacer el siguiente pedido:%0A%0A${cartSummary}%0A%0ATotal: $${total} MXN%0A%0AGracias!`;

  window.location.href = `mailto:hola@xanda.mx?subject=${subject}&body=${body}`;
}
```

---

## My Recommendation

**Start with Option 1 (Payment Links)** to get payments working TODAY, then upgrade to Option 2 (Serverless) when you have time.

This gives you:
1. ✅ Immediate payment processing
2. ✅ No server costs
3. ✅ Easy to set up
4. ✅ Supports most use cases

Then migrate to Netlify Functions for full cart support.

---

## Need Help?

Let me know which option you want to implement and I'll update your code accordingly!
