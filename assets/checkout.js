// /assets/checkout.js
document.addEventListener('DOMContentLoaded', () => {
  // 1) Stripe publishable key (safe for frontend)
  const stripe = Stripe('pk_live_51S5FCyCosND0U4N2GHkoSCSG6GtuvodFhmLiZu0d3uJRAkFTW5jBTkWJsid7FjGUcQcoIvEm0VrtAREjCIqL1T2900ttQ8reXB');

  // 2) Map button IDs to Stripe Price IDs
  const products = {
    'buy-credit':     'price_1S5FdiCosND0U4N2igcaeKUr', // DIY Credit Education Toolkit
    'buy-compliance': 'price_1S5FpWCosND0U4N24QXBC48N', // Compliance Starter Kit
    'buy-finance':    'price_1S5Fq1CosND0U4N23Jnukoke', // Small Business Financial Dashboard
  };

  // 3) Attach Checkout redirect to any button with those IDs
  Object.keys(products).forEach((buttonId) => {
    const btn = document.getElementById(buttonId);
    if (!btn) return;

    btn.addEventListener('click', async () => {
      const result = await stripe.redirectToCheckout({
        mode: 'payment',
        lineItems: [{ price: products[buttonId], quantity: 1 }],
        successUrl: `${window.location.origin}/success.html`,
        cancelUrl:  `${window.location.origin}/cancel.html`,
      });

      if (result.error) {
        alert(result.error.message || 'Unable to start checkout.');
      }
    });
  });
});
