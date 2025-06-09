const cartCount = document.getElementById("cart-count");
const cartCountDesktop = document.getElementById("cart-count-desktop");
const buttons = document.querySelectorAll(".add-to-cart");

// Haal huidige producten uit localStorage of begin met een lege array
let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

// Functie om beide winkelmand-tellers te updaten
function updateCartCount() {
  if (cartCount) cartCount.textContent = cartProducts.length;
  if (cartCountDesktop) cartCountDesktop.textContent = cartProducts.length;
}
updateCartCount();

// Voeg producten toe aan het winkelmandje
buttons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    // Vind de product info
    const card = btn.closest(".product-card");
    const title = card.querySelector("h3").textContent;
    const price = card.querySelector("p").textContent;
    const img = card.querySelector("img").getAttribute("src");

    // Voeg toe aan winkelmandje
    cartProducts.push({ title, price, img });
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));

    // Update het aantal in het winkelmandje
    updateCartCount();
  });
});

// Hamburger menu functionaliteit
const hamburger = document.querySelector('.hamburger');
const navUl = document.querySelector('.navigation ul');
if (hamburger && navUl) {
  hamburger.addEventListener('click', () => {
    navUl.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', navUl.classList.contains('open'));
  });
  // Optioneel: menu sluiten bij klik buiten menu
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navUl.contains(e.target)) {
      navUl.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}