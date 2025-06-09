const cartCount = document.getElementById("cart-count");
const buttons = document.querySelectorAll(".add-to-cart");

// Haal huidige producten uit localStorage of begin met een lege array
let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

// Toon het aantal producten in het winkelmandje
if (cartCount) cartCount.textContent = cartProducts.length;

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
    if (cartCount) cartCount.textContent = cartProducts.length;
  });
});