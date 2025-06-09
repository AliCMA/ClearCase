const cartCountMobile = document.getElementById("cart-count-mobile");
const cartCountDesktop = document.getElementById("cart-count-desktop");
const buttons = document.querySelectorAll(".add-to-cart");

// Haal huidige producten uit localStorage of begin met een lege array
let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

// Functie om beide winkelmand-tellers te updaten
function updateCartCount() {
  if (cartCountMobile) cartCountMobile.textContent = cartProducts.length;
  if (cartCountDesktop) cartCountDesktop.textContent = cartProducts.length;
}
updateCartCount();

// Popup tonen
function showCartPopup(message = "Toegevoegd aan winkelmandje!") {
  const popup = document.getElementById("cart-popup");
  if (!popup) return;
  popup.textContent = message;
  popup.classList.add("show");
  setTimeout(() => {
    popup.classList.remove("show");
  }, 1600);
}

// Voeg producten toe aan het winkelmandje
buttons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    const card = btn.closest(".product-card");
    const title = card.querySelector("h3").textContent;
    const priceText = card.querySelector("p").textContent;
    const img = card.querySelector("img").getAttribute("src");

    // Haal het getal uit de prijs-string, bijvoorbeeld "€19,99" -> 19.99
    let price = parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.'));
    if (isNaN(price)) price = 0;

    cartProducts.push({ title, price, img });
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    updateCartCount();

    // Toon popup
    showCartPopup(`'${title}' toegevoegd aan winkelmandje!`);
  });
});

// Hamburger menu functionaliteit
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navUl = document.querySelector('.navigation ul');
  if (hamburger && navUl) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      navUl.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', navUl.classList.contains('open'));
    });
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navUl.contains(e.target)) {
        navUl.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }
});