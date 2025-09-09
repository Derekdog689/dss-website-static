// /assets/checkout.js
document.addEventListener("DOMContentLoaded", () => {
  const stripe = Stripe("pk_live_51S5FCyCosND0U4N2GHkoSCSG6GtuvodFhmLiZu0d3uJRAkFTW5jBTkWJsid7FjGUcQcoIvEm0VrtAREjCIqL1T2900ttQ8reXB");

  // Map product buttons to Stripe price IDs
  const products = {
    "buy-credit": "price_1S5FdiCosND0U4N2igcaeKUr",
    "buy-compliance": "price_1S5FpWCosND0U4N24QXBC48N",
    "buy-finance": "price_1S5Fq1CosND0U4N23Jnukoke"
  };

  Object.keys(products).forEach(buttonId => {
    const btn = document.getElementById(buttonId);
    if (btn) {
      btn.addEventListener("click", () => {
        stripe.redirectToCheckout({
          lineItems: [{ price: products[buttonId], quantity: 1 }],
          mode: "payment",
          successUrl: window.location.origin + "/success.html",
          cancelUrl: window.location.origin + "/cancel.html"
        }).then(result => {
          if (result.error) {
            alert(result.error.message);
          }
        });
      });
    }
  });
});
