<template>
  <header class="navbar">
    <router-link to="/" class="logo-link">
      <img src="/MissWildThing.png" alt="Miss Wild Thing" class="logo-img" />
    </router-link>
    <input class="search" type="text" placeholder="Find your thing..." />
    <div class="nav-icons">
      <router-link to="/cart" class="cart-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
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
  <router-view />
  <footer class="footer">
    <div class="footer-links">
      <a href="#">Contact Us</a> · <a href="#">About Us</a> · <a href="#">Job Opportunities</a> ·
      <a href="#">Your Order</a>
    </div>
    <p>© 2026 Emily Krajic · Miss Wild Thing</p>
  </footer>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600&family=Cormorant+Garamond:wght@300;400&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: 'Cormorant Garamond', serif;
  background: #fff;
  color: #f5e8ef;
}
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 16px;
  background: #f5e8ef;
  gap: 8px;
}
.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}
.logo-img {
  height: 90px;
  width: auto;
  cursor: pointer;
}
.search {
  flex: 1;
  max-width: 500px;
  padding: 10px 16px;
  border: 1.5px solid #8d6c55;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  font-family: inherit;
  background: #fff;
  margin-left: auto;
}
.nav-icons {
  display: flex;
  gap: 12px;
  align-items: center;
}
.cart-icon {
  color: #8d6c55;
  text-decoration: none;
  display: flex;
}
.cart-icon:hover {
  color: #513e30;
}
.category-nav {
  display: flex;
  justify-content: center;
  background: #f5e8ef;
  border-top: 1px solid #8d6c55;
  padding: 0 40px;
}
.category-nav a {
  padding: 12px 20px;
  font-size: 1.2rem;
  color: #8d6c55;
  text-decoration: none;
  letter-spacing: 0.05em;
}
.category-nav a:hover,
.category-nav a.router-link-active {
  color: #513e30;
  font-weight: 600;
}
.footer {
  background: #f5e8ef;
  padding: 32px 40px;
  text-align: center;
  margin-top: 0;
}
.footer-links {
  display: flex;
  justify-content: center;
  gap: 12px;
  font-size: 1rem;
  color: #8d6c55;
  margin-bottom: 8px;
}
.footer-links a {
  color: #8d6c55;
  text-decoration: none;
}
.footer p {
  font-size: 0.9rem;
  color: #8d6c55;
}
@media (max-width: 768px) {
  .navbar {
    padding: 6px 12px;
    gap: 8px;
  }
  .logo-img {
    height: 70px;
  }
  .search {
    max-width: 100%;
    padding: 8px 10px;
    font-size: 0.9rem;
  }
  .category-nav {
    display: flex;
    justify-content: center;
    background: #f5e8ef;
    border-top: 1px solid #8d6c55;
    padding: 0;
  }
  .category-nav a {
    padding: 10px 12px;
    font-size: 0.95rem;
    white-space: nowrap;
  }
  .footer {
    padding: 20px;
  }
  .footer-links {
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
  }
  .category-nav {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .logo-img {
    height: 40px;
  }
  .search {
    display: none;
  }
}
</style>
