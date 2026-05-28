<template>
  <header class="navbar">
    <a href="/" class="logo">Miss Wild Thing</a>
    <input class="search" type="text" placeholder="Find your thing..." />
    <div class="nav-icons">
      <a href="/cart" class="cart-icon">🛍</a>
      <button class="menu-btn">☰</button>
    </div>
  </header>
  <nav class="category-nav">
    <a href="/shop/tops">Tops</a>
    <a href="/shop/pants">Pants</a>
    <a href="/shop/skirts">Skirts</a>
    <a href="/shop/dresses">Dresses</a>
    <a href="/shop/accessories">Accessories</a>
    <a href="/shop/customs">Customs</a>
  </nav>
  <router-view />
  <footer class="footer">
    <div class="footer-links">
      <a href="#">Contact Us</a> · <a href="#">About Us</a> · <a href="#">Job Opportunities</a> · <a href="#">Your Order</a>
    </div>
    <p>© 2026 Emily Krajic · Miss Wild Thing</p>
  </footer>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600&family=Cormorant+Garamond:wght@300;400&display=swap');
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Cormorant Garamond', serif; background: #fff; color: #7a3a4a; }
.navbar { display: flex; align-items: center; justify-content: space-between; padding: 16px 40px; background: #fce8ee; gap: 20px; }
.logo { font-family: 'Dancing Script', cursive; font-size: 2rem; color: #c2657a; text-decoration: none; white-space: nowrap; }
.search { flex: 1; max-width: 500px; padding: 10px 16px; border: 1.5px solid #f4b8cb; border-radius: 8px; font-size: 1rem; outline: none; font-family: inherit; }
.nav-icons { display: flex; gap: 12px; align-items: center; }
.cart-icon { font-size: 1.4rem; text-decoration: none; }
.menu-btn { background: none; border: none; font-size: 1.4rem; cursor: pointer; color: #c2657a; }
.category-nav { display: flex; justify-content: center; gap: 0; background: #fce8ee; border-top: 1px solid #f4b8cb; padding: 0 40px; }
.category-nav a { padding: 12px 20px; font-size: 1rem; color: #7a3a4a; text-decoration: none; letter-spacing: 0.05em; }
.category-nav a:hover { color: #9b3a52; font-weight: 600; }
.footer { background: #fce8ee; padding: 32px 40px; text-align: center; margin-top: 60px; }
.footer-links { display: flex; justify-content: center; gap: 12px; font-size: 1rem; color: #c2657a; margin-bottom: 8px; }
.footer-links a { color: #c2657a; text-decoration: none; }
.footer p { font-size: 0.9rem; color: #c2859a; }
</style>
