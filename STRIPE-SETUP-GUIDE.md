# Stripe Setup Guide for Xanda

This guide will walk you through setting up Stripe products and implementing the shopping cart for your Xanda landing page.

## Part 1: Create Products in Stripe Dashboard

### Step 1: Log into Stripe Dashboard
1. Go to https://dashboard.stripe.com
2. Make sure you're in **Test Mode** (toggle in top right) while setting up
3. Navigate to **Products** in the left sidebar

### Step 2: Create Each Product

For each product (Jamaica, Cebolla/Tocino, Arándano, Gift Box), follow these steps:

#### Product 1: Jamaica con chile de árbol y sal de gusano
1. Click **"+ Add product"**
2. Fill in the details:
   - **Name:** `Xanda Jamaica con chile de árbol y sal de gusano`
   - **Description:** `Mermelada de jamaica con chile de árbol y sal de gusano. Perfecta para quesos de cabra, tablas gourmet, o como glaseado para carne de cerdo. 250g.`
   - **Upload image:** Use `assets/jamaica.webp`
   - **Pricing:**
     - **Price:** `299` (or your price in MXN)
     - **Currency:** Select `MXN - Mexican Peso`
     - **Billing period:** One time
   - **Tax code:** Select appropriate category (usually "General - Tangible Goods")
3. Click **"Save product"**
4. **IMPORTANT:** Copy the **Price ID** (starts with `price_...`) - you'll need this later

#### Product 2: Cebolla caramelizada con tocino ahumado
1. Click **"+ Add product"**
2. Fill in:
   - **Name:** `Xanda Cebolla caramelizada con tocino ahumado`
   - **Description:** `Cebolla caramelizada con tocino ahumado, mezcal reposado y sal ahumada. Ideal para hamburguesas gourmet, sándwiches, o acompañar carnes. 250g.`
   - **Upload image:** Use `assets/cebolla.webp`
   - **Price:** `299 MXN` (one time)
3. Click **"Save product"**
4. Copy the **Price ID**

#### Product 3: Arándano con mezcal y sal de gusano
1. Click **"+ Add product"**
2. Fill in:
   - **Name:** `Xanda Arándano con mezcal y sal de gusano`
   - **Description:** `Mermelada de arándano con mezcal reposado y sal de gusano. Perfecta para quesos maduros, postres gourmet, o como acompañamiento de carnes asadas. 250g.`
   - **Upload image:** Use `assets/arandano.webp`
   - **Price:** `299 MXN` (one time)
3. Click **"Save product"**
4. Copy the **Price ID**

#### Product 4: Gift Box - Edición Regalo
1. Click **"+ Add product"**
2. Fill in:
   - **Name:** `Xanda Gift Box - Edición Regalo`
   - **Description:** `Estuche premium con los tres sabores signature de Xanda. Empaque de lujo, ideal para regalos corporativos o especiales. Incluye: Jamaica, Cebolla/Tocino, y Arándano (3 x 250g).`
   - **Upload image:** Use `assets/giftbox.webp`
   - **Price:** `799 MXN` (one time, or your preferred bundle price)
3. Click **"Save product"**
4. Copy the **Price ID**

### Step 3: Get Your Stripe Publishable Key
1. In Stripe Dashboard, go to **Developers** → **API keys**
2. Copy your **Publishable key** (starts with `pk_test_...` in test mode)
3. Keep this safe - you'll need it in Part 2

---

## Part 2: Update Your Landing Page

### Step 1: Add Stripe.js Script
The Stripe script is already included in your `index.html`. Verify it's there:
```html
<script src="https://js.stripe.com/v3/"></script>
```

### Step 2: Update Product Configuration

Open `index.html` and find the JavaScript section near the bottom (around line 1400+). You'll see a placeholder configuration. Replace it with your actual Stripe data:

```javascript
// Stripe Configuration
const STRIPE_PUBLISHABLE_KEY = 'pk_test_YOUR_KEY_HERE'; // Replace with your key
const stripe = Stripe(STRIPE_PUBLISHABLE_KEY);

// Product Configuration - Replace these Price IDs with your actual ones
const products = {
  jamaica: {
    priceId: 'price_XXXXXXXXXXXXX', // Your Jamaica Price ID
    name: 'Xanda Jamaica con chile de árbol y sal de gusano',
    price: 299,
    image: './assets/jamaica.webp'
  },
  cebolla: {
    priceId: 'price_XXXXXXXXXXXXX', // Your Cebolla Price ID
    name: 'Xanda Cebolla caramelizada con tocino ahumado',
    price: 299,
    image: './assets/cebolla.webp'
  },
  arandano: {
    priceId: 'price_XXXXXXXXXXXXX', // Your Arándano Price ID
    name: 'Xanda Arándano con mezcal y sal de gusano',
    price: 299,
    image: './assets/arandano.webp'
  },
  giftbox: {
    priceId: 'price_XXXXXXXXXXXXX', // Your Gift Box Price ID
    name: 'Xanda Gift Box - Edición Regalo',
    price: 799,
    image: './assets/giftbox.webp'
  }
};
```

### Step 3: Shopping Cart Implementation

Add this shopping cart code to your `index.html` before the closing `</body>` tag:

```javascript
// Shopping Cart State
let cart = [];

// Add to Cart Function
function addToCart(productKey) {
  const product = products[productKey];
  if (!product) return;

  // Check if product already in cart
  const existingItem = cart.find(item => item.priceId === product.priceId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  updateCartUI();
  showCartNotification();
}

// Update Cart UI
function updateCartUI() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartBadge = document.getElementById('cart-badge');

  if (cartBadge) {
    cartBadge.textContent = cartCount;
    cartBadge.style.display = cartCount > 0 ? 'flex' : 'none';
  }
}

// Show Cart Notification
function showCartNotification() {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 bg-amber-400 text-neutral-950 px-6 py-3 rounded-lg shadow-xl z-50 font-semibold';
  notification.textContent = '✓ Agregado al carrito';
  document.body.appendChild(notification);

  // Remove after 2 seconds
  setTimeout(() => {
    notification.remove();
  }, 2000);
}

// Checkout Function
async function checkout() {
  if (cart.length === 0) {
    alert('Tu carrito está vacío');
    return;
  }

  // Create line items for Stripe
  const lineItems = cart.map(item => ({
    price: item.priceId,
    quantity: item.quantity
  }));

  try {
    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      lineItems: lineItems,
      mode: 'payment',
      successUrl: window.location.origin + '/success.html',
      cancelUrl: window.location.origin + '/index.html',
      locale: 'es',
      billingAddressCollection: 'required',
      shippingAddressCollection: {
        allowedCountries: ['MX']
      }
    });

    if (error) {
      console.error('Error:', error);
      alert('Hubo un error al procesar tu compra. Por favor intenta de nuevo.');
    }
  } catch (err) {
    console.error('Checkout error:', err);
    alert('Hubo un error al procesar tu compra. Por favor intenta de nuevo.');
  }
}

// Load cart from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedCart = localStorage.getItem('xandaCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartUI();
  }
});

// Save cart to localStorage whenever it changes
function saveCart() {
  localStorage.setItem('xandaCart', JSON.stringify(cart));
}
```

### Step 4: Update Buy Buttons

Find your product "Comprar" buttons in `index.html` and update them to use the cart system:

**For Jamaica product (around line 300):**
```html
<button onclick="addToCart('jamaica')" class="btn-primary w-full">
  Agregar al carrito
</button>
```

**For Cebolla product (around line 350):**
```html
<button onclick="addToCart('cebolla')" class="btn-primary w-full">
  Agregar al carrito
</button>
```

**For Arándano product (around line 400):**
```html
<button onclick="addToCart('arandano')" class="btn-primary w-full">
  Agregar al carrito
</button>
```

**For Gift Box (around line 600):**
```html
<button onclick="addToCart('giftbox')" class="btn-primary-large">
  Agregar al carrito
</button>
```

### Step 5: Add Cart Icon to Navigation

Add a cart icon to your navigation (around line 165):

```html
<nav class="flex items-center gap-8">
  <a href="#productos" class="nav-link">Productos</a>
  <a href="#origen" class="nav-link">Historia</a>
  <a href="#recetas" class="nav-link">Recetas</a>
  <a href="#regalos" class="nav-link">Regalos</a>

  <!-- Cart Icon -->
  <button onclick="toggleCart()" class="relative p-2 hover:bg-neutral-800/50 rounded-lg transition-colors">
    <svg class="w-6 h-6 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
    </svg>
    <span id="cart-badge" class="absolute -top-1 -right-1 bg-amber-400 text-neutral-950 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center" style="display: none;">0</span>
  </button>
</nav>
```

### Step 6: Add Cart Sidebar/Modal

Add this cart modal HTML before the closing `</body>` tag:

```html
<!-- Shopping Cart Modal -->
<div id="cartModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 hidden">
  <div class="fixed right-0 top-0 h-full w-full max-w-md bg-neutral-900 shadow-2xl transform transition-transform">
    <div class="flex flex-col h-full">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-neutral-800">
        <h2 class="text-2xl font-playfair font-bold text-white">Tu Carrito</h2>
        <button onclick="toggleCart()" class="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
          <svg class="w-6 h-6 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Cart Items -->
      <div id="cartItems" class="flex-1 overflow-y-auto p-6">
        <!-- Cart items will be populated here -->
      </div>

      <!-- Footer with Total and Checkout -->
      <div class="border-t border-neutral-800 p-6 bg-neutral-950">
        <div class="flex items-center justify-between mb-4">
          <span class="text-lg text-neutral-400">Total:</span>
          <span id="cartTotal" class="text-2xl font-bold text-amber-300">$0 MXN</span>
        </div>
        <button onclick="checkout()" class="btn-primary w-full">
          Proceder al pago
        </button>
        <p class="text-xs text-neutral-500 text-center mt-3">Pago seguro con Stripe</p>
      </div>
    </div>
  </div>
</div>

<script>
// Toggle Cart Modal
function toggleCart() {
  const modal = document.getElementById('cartModal');
  modal.classList.toggle('hidden');
  if (!modal.classList.contains('hidden')) {
    renderCart();
  }
}

// Render Cart Items
function renderCart() {
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="text-center py-12">
        <svg class="w-16 h-16 text-neutral-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
        </svg>
        <p class="text-neutral-500">Tu carrito está vacío</p>
      </div>
    `;
    cartTotal.textContent = '$0 MXN';
    return;
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotal.textContent = `$${total.toLocaleString('es-MX')} MXN`;

  cartItemsContainer.innerHTML = cart.map((item, index) => `
    <div class="flex gap-4 mb-4 p-4 bg-neutral-800/30 rounded-lg">
      <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg">
      <div class="flex-1">
        <h3 class="text-white font-semibold text-sm mb-2">${item.name}</h3>
        <p class="text-amber-300 font-bold">$${item.price} MXN</p>
        <div class="flex items-center gap-3 mt-2">
          <button onclick="updateQuantity(${index}, -1)" class="w-7 h-7 bg-neutral-700 hover:bg-neutral-600 rounded flex items-center justify-center text-white">-</button>
          <span class="text-white font-semibold">${item.quantity}</span>
          <button onclick="updateQuantity(${index}, 1)" class="w-7 h-7 bg-neutral-700 hover:bg-neutral-600 rounded flex items-center justify-center text-white">+</button>
          <button onclick="removeFromCart(${index})" class="ml-auto text-red-400 hover:text-red-300 text-sm">Eliminar</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Update Quantity
function updateQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  updateCartUI();
  saveCart();
  renderCart();
}

// Remove from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
  saveCart();
  renderCart();
}
</script>
```

---

## Part 3: Create Success Page

Create a new file `success.html` in your Xanda folder:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Compra Exitosa - Xanda</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./styles.css">
</head>
<body class="bg-neutral-950 text-neutral-100">
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="max-w-md w-full text-center">
      <div class="mb-8">
        <svg class="w-20 h-20 text-amber-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h1 class="font-playfair text-4xl font-bold text-white mb-4">¡Gracias por tu compra!</h1>
        <p class="text-lg text-neutral-300 mb-2">Tu pedido ha sido confirmado</p>
        <p class="text-neutral-400">Recibirás un correo con los detalles de tu compra y el seguimiento de envío.</p>
      </div>

      <div class="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-8">
        <p class="text-sm text-neutral-400 mb-4">¿Tienes alguna pregunta sobre tu pedido?</p>
        <a href="mailto:hola@xanda.mx" class="text-amber-300 hover:text-amber-400 font-semibold">hola@xanda.mx</a>
      </div>

      <a href="./index.html" class="btn-primary inline-block">
        Volver al inicio
      </a>
    </div>
  </div>

  <script>
    // Clear cart after successful purchase
    localStorage.removeItem('xandaCart');
  </script>
</body>
</html>
```

---

## Part 4: Testing Your Setup

### Test Mode Testing:
1. Make sure you're using **test mode** keys (pk_test_...)
2. Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiration date
   - Any 3-digit CVC
   - Any postal code
3. Test the complete flow:
   - Add products to cart
   - View cart
   - Proceed to checkout
   - Complete payment with test card
   - Verify redirect to success page

### Going Live:
1. In Stripe Dashboard, toggle from **Test Mode** to **Live Mode**
2. Get your **Live Publishable Key** (pk_live_...)
3. Update `STRIPE_PUBLISHABLE_KEY` in your code
4. Get the **Live Price IDs** for your products
5. Update the `products` configuration with live Price IDs
6. Test with a real card (you can refund test purchases)
7. Once confirmed working, you're live!

---

## Additional Stripe Settings

### 1. Enable Shipping
In Stripe Dashboard → Settings → Checkout settings:
- Enable shipping address collection
- Set allowed countries (Mexico)

### 2. Set Up Email Receipts
In Stripe Dashboard → Settings → Emails:
- Customize receipt emails with your branding
- Add your logo and brand colors

### 3. Configure Tax (if applicable)
In Stripe Dashboard → Settings → Tax:
- Set up automatic tax calculation for Mexico

### 4. Set Up Webhooks (Optional but Recommended)
For advanced features like order tracking:
1. Go to Developers → Webhooks
2. Add endpoint (requires a backend server)
3. Listen for `checkout.session.completed` events

---

## Troubleshooting

**Issue: "Invalid API Key"**
- Make sure you copied the correct Publishable Key (not Secret Key)
- Verify you're using the right mode (test vs live)

**Issue: "No such price"**
- Double-check your Price IDs in the products configuration
- Make sure Price IDs match the mode (test vs live)

**Issue: Cart not persisting**
- Check browser console for localStorage errors
- Make sure JavaScript is enabled

**Issue: Checkout not opening**
- Verify Stripe.js script is loaded
- Check browser console for errors
- Ensure success/cancel URLs are correct

---

## Support

For Stripe-specific issues:
- Stripe Documentation: https://stripe.com/docs
- Stripe Support: https://support.stripe.com

For implementation questions, check the browser console for error messages.
