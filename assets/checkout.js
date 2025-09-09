// /assets/checkout.js
document.addEventListener('DOMContentLoaded', () => {
  // Your live publishable key
  const stripe = Stripe('pk_live_51S5FCyCosND0U4N2GHkoSCSG6GtuvodFhmLiZu0d3uJRAkFTW5jBTkWJsid7FjGUcQcoIvEm0VrtAREjCIqL1T2900ttQ8reXB');

  // Attach to any button with class="buy-btn" and a data-price-id
  document.querySelectorAll('.buy-btn[data-price-id]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const priceId = btn.dataset.priceId;
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: priceId, quantity: 1 }],
        mode: 'payment',
        successUrl: `${window.location.origin}/success.html`,
        cancelUrl: `${window.location.origin}/cancel.html`,
      });
      if (error) alert(error.message);
    });
  });
});
