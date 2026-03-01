import { createClient } from '@supabase/supabase-js';

// Helper to sanitize text
const safeText = (text, maxLength = 255) => {
  if (typeof text !== 'string') return '';
  return text.trim().substring(0, maxLength);
};

export default async function handler(req, res) {
  // 1. CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method Not Allowed' });
  }

  try {
    const { customer, shipping, items, comment, currency = 'RUB' } = req.body;

    // 2. Validation
    if (!customer?.email || !customer?.email.includes('@')) {
      return res.status(400).json({ ok: false, message: 'Invalid email' });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ ok: false, message: 'Items list is empty' });
    }
    if (!shipping?.address1) {
      return res.status(400).json({ ok: false, message: 'Shipping address is required' });
    }

    // 3. Initialize Supabase with service_role key (Server-side only)
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables');
      return res.status(500).json({ ok: false, message: 'Server configuration error' });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 4. Calculate total_amount (Don't trust client)
    const totalAmount = items.reduce((sum, item) => {
      const qty = parseInt(item.qty) || 0;
      const price = parseFloat(item.price) || 0;
      return sum + (qty * price);
    }, 0);

    // 5. Upsert Customer
    const { data: customerData, error: customerError } = await supabase
      .from('customers')
      .upsert({
        email: customer.email.toLowerCase(),
        name: safeText(customer.name),
        phone: safeText(customer.phone),
        updated_at: new Date().toISOString(),
      }, { onConflict: 'email' })
      .select()
      .single();

    if (customerError) {
      console.error('Customer upsert error:', customerError);
      throw new Error('Failed to save customer data');
    }

    // 6. Create Order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_id: customerData.id,
        status: 'new',
        total_amount: totalAmount,
        currency: safeText(currency, 3),
        comment: safeText(comment, 1000),
        shipping_address: {
          address1: safeText(shipping.address1),
          address2: safeText(shipping.address2),
          city: safeText(shipping.city),
          region: safeText(shipping.region),
          postal_code: safeText(shipping.postalCode),
          country: safeText(shipping.country),
        },
        items: items.map(item => ({
          sku: safeText(item.sku),
          title: safeText(item.title),
          qty: parseInt(item.qty),
          price: parseFloat(item.price)
        })),
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (orderError) {
      console.error('Order creation error:', orderError);
      throw new Error('Failed to create order');
    }

    // 7. Success Response
    return res.status(200).json({
      ok: true,
      orderId: orderData.id,
      createdAt: orderData.created_at
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ ok: false, message: error.message || 'Internal Server Error' });
  }
}

/**
 * REQUIRED ENV VARIABLES IN VERCEL:
 * SUPABASE_URL = Your Project URL (e.g., https://xyz.supabase.co)
 * SUPABASE_SERVICE_ROLE_KEY = Your service_role key (Found in Project Settings -> API)
 * 
 * IMPORTANT: Never use VITE_ prefix for the service_role key!
 */
