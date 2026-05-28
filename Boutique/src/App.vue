<template>
  <div id="app-wrapper">
    <div class="sticky-header">
      <header class="navbar">
        <router-link to="/" class="logo-link">
          <img src="/MissWildThing.png" alt="Miss Wild Thing" class="logo-img" />
        </router-link>
        <input class="search" type="text" placeholder="Find your thing..." />
        <div class="nav-icons">
          <router-link to="/cart" class="cart-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </router-link>
        </div>
      </header>
      <nav class="category-nav">
        <router-link to="/shop/tops">Tops</router-link>
        <router-link to="/shop/pants">Pants</router-link>
        <router-link to="/shop/skirts">Skirts</router-link>
        <router-link to="/shop/dresses">Dresses</router-link>
        <router-link to="/shop/accessories">Accessories</router-link>
        <router-link to="/customs">Customs</router-link>
      </nav>
    </div>
    <div class="content">
      <router-view />
    </div>
    <footer class="footer">
      <div class="footer-links">
        <router-link to="/contact">Contact Us</router-link>
        <span>·</span>
        <router-link to="/about">About Us</router-link>
        <span>·</span>
        <router-link to="/jobs">Job Opportunities</router-link>
        <span>·</span>
        <router-link to="/cart">Your Order</router-link>
      </div>
      <p>© 2026 Emily Krajic · Miss Wild Thing</p>
    </footer>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600&family=Cormorant+Garamond:wght@300;400&display=swap');
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { height: 100%; }
body { font-family: 'Cormorant Garamond', serif; background: #fffbfb; color: #2f2925; }
#app-wrapper { min-height: 100vh; display: flex; flex-direction: column; }
.content { flex: 1; }
.sticky-header { position: sticky; top: 0; z-index: 100; background: #fffbfb; }
.navbar { display: flex; align-items: center; justify-content: space-between; padding: 4px 16px; background: #fffbfb; gap: 8px; }
.logo-link { display: flex; align-items: center; text-decoration: none; }
.logo-img { height: 100px; width: auto; cursor: pointer; }
.search { flex: 1; max-width: 500px; padding: 10px 16px; border: 1.5px solid #2f2925; border-radius: 8px; font-size: 1rem; outline: none; font-family: inherit; background: #fffbfb; margin-left: auto; }
.nav-icons { display: flex; gap: 12px; align-items: center; }
.cart-icon { color: #2f2925; text-decoration: none; display: flex; }
.cart-icon:hover { color: #2f2925; }
.category-nav { display: flex; justify-content: center; background: #fffbfb; border-top: 1px solid #2f2925; border-bottom: 1px solid #2f2925; }
.category-nav a { padding: 12px 20px; font-size: 1.2rem; color: #2f2925; text-decoration: none; letter-spacing: 0.05em; }
.category-nav a:hover, .category-nav a.router-link-active { color: #2f2925; font-weight: 600; }
.footer { background: #fffbfb; padding: 22px 20px; text-align: center; border-top: 1px solid #2f2925; }
.footer-links { display: flex; justify-content: center; gap: 12px; font-size: 1rem; color: #2f2925; margin-bottom: 8px; flex-wrap: wrap; }
.footer-links a { color: #2f2925; text-decoration: none; }
.footer p { font-size: 0.9rem; color: #2f2925; }
@media (max-width: 768px) {
  .navbar { padding: 6px 12px; gap: 8px; }
  .logo-img { height: 70px; }
  .search { max-width: 100%; padding: 8px 10px; font-size: 0.9rem; }
  .category-nav a { padding: 10px 12px; font-size: 0.95rem; white-space: nowrap; }
  .footer { padding: 20px; }
}
@media (max-width: 480px) {
  .navbar { padding: 4px 8px; gap: 4px; justify-content: center; }
  .logo-link { flex-shrink: 0; }
  .logo-img { height: 35px; }
  .search { display: none; }
  .nav-icons { flex-shrink: 0; }
  .cart-icon svg { width: 20px; height: 20px; }
  .category-nav { justify-content: center; }
  .category-nav a { padding: 8px 4px; font-size: 0.7rem; letter-spacing: 0; }
}
</style>
