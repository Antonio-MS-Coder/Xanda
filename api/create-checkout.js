const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  // Enable CORS for your domain
  const allowedOrigins = [
    'https://xanda.com.mx',
    'https://www.xanda.com.mx',
    'https://xanda.vercel.app',
    'https://xanda-mx.vercel.app',
    'https://antonio-ms-coder.github.io',
    'http://localhost:3000',
    'http://localhost:8888'
  ];

  const origin = req.headers.origin || req.headers.referer?.replace(/\/$/, '');
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    // Allow same-origin requests (when origin header is not sent)
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse the request body
    const { lineItems } = req.body;

    // Validate line items
    if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
      return res.status(400).json({ error: 'Invalid line items' });
    }

    console.log('Creating checkout session with line items:', lineItems);

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/success.html`,
      cancel_url: `${origin}/index.html`,
      locale: 'es',
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['MX'],
      },
      // Automatically send receipt emails
      payment_intent_data: {
        receipt_email: null,
      },
    });

    console.log('Checkout session created:', session.id);

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
