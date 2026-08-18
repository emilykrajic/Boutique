<template>
  <div id="app-wrapper">
    <div class="sticky-header">
      <header class="navbar">
        <router-link to="/" class="logo-link">
          <img src="/MissWildThing.png" alt="Miss Wild Thing" class="logo-img" />
        </router-link>

        <div class="search-wrap" ref="searchWrap">
          <input
            class="search"
            type="text"
            placeholder="Find your thing..."
            v-model="searchQuery"
            @input="onSearchInput"
            @keydown.down.prevent="moveActive(1)"
            @keydown.up.prevent="moveActive(-1)"
            @keydown.enter.prevent="onEnter"
            @keydown.esc="closeResults"
            @focus="onFocus"
            role="combobox"
            aria-autocomplete="list"
            :aria-expanded="showResults"
            aria-controls="search-results-list"
          />

          <ul v-if="showResults" id="search-results-list" class="search-results" role="listbox">
            <li v-if="isSearching" class="search-status">Searching…</li>

            <template v-else-if="results.length">
              <li
                v-for="(product, i) in results"
                :key="product.id"
                class="search-result"
                :class="{ active: i === activeIndex }"
                role="option"
                :aria-selected="i === activeIndex"
                @mousedown.prevent="selectProduct(product)"
                @mouseenter="activeIndex = i"
              >
                <img
                  v-if="product.image || product.img"
                  :src="product.image || product.img"
                  :alt="product.name"
                  class="search-result-img"
                />
                <div class="search-result-info">
                  <span class="search-result-name">{{ product.name }}</span>
                  <span class="search-result-meta">
                    <template v-if="product.category"
                      >{{ product.category
                      }}<span v-if="product.color"> · {{ product.color }}</span> · </template
                    >${{ product.price }}
                  </span>
                </div>
              </li>
              <li class="search-viewall" @mousedown.prevent="goToSearch">
                View all results for "{{ searchQuery.trim() }}"
              </li>
            </template>
          </ul>
        </div>

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
          <!-- Hamburger button (mobile only) -->
          <button
            class="hamburger"
            :class="{ open: menuOpen }"
            @click="menuOpen = !menuOpen"
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <!-- Desktop nav -->
      <nav class="category-nav">
        <router-link to="/shop/accessories">Accessories</router-link>
        <!-- <router-link to="/shop/tops">Tops</router-link> -->
        <!-- <router-link to="/shop/dresses">Dresses</router-link> -->
        <!-- <router-link to="/shop/pants">Bottoms</router-link> -->
        <router-link to="/customs">Customs</router-link>
      </nav>

      <!-- Mobile drawer -->
      <nav class="mobile-menu" :class="{ open: menuOpen }" @click="menuOpen = false">
        <!-- <router-link to="/shop/tops">Tops</router-link> -->
        <!-- <router-link to="/shop/pants">Pants</router-link> -->
        <!-- <router-link to="/shop/skirts">Skirts</router-link> -->
        <!-- <router-link to="/shop/dresses">Dresses</router-link> -->
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

<script setup>
import { ref, computed, watch, onBeforeUnmount, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { products } from './products.js';
import { buildSearchIndex, searchProducts } from './utils/search.js';

const menuOpen = ref(false);
const router = useRouter();
const route = useRoute();

// ---------------- Search ----------------

const searchQuery = ref('');
const showResults = ref(false);
const isSearching = ref(false);
const activeIndex = ref(-1);
const searchWrap = ref(null);

const SEARCH_DEBOUNCE_MS = 200;
const MAX_RESULTS = 6;
let debounceTimer = null;

// The query actually used for filtering — only updates after the debounce
// settles, so we're not re-filtering the whole catalog on every keystroke.
const committedQuery = ref('');

// Precompute a lowercase "haystack" per product once (not on every keystroke)
// so filtering stays cheap even as the catalog grows.
const searchIndex = buildSearchIndex(products);

const results = computed(() => searchProducts(searchIndex, committedQuery.value, MAX_RESULTS));

function onSearchInput() {
  isSearching.value = true;
  showResults.value = true;
  activeIndex.value = -1;

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    committedQuery.value = searchQuery.value;
    isSearching.value = false;
  }, SEARCH_DEBOUNCE_MS);
}

function onFocus() {
  if (searchQuery.value.trim()) showResults.value = true;
}

function closeResults() {
  showResults.value = false;
  activeIndex.value = -1;
}

function moveActive(delta) {
  if (!showResults.value || !results.value.length) return;
  const max = results.value.length - 1;
  let next = activeIndex.value + delta;
  if (next < 0) next = max;
  if (next > max) next = 0;
  activeIndex.value = next;
}

function selectProduct(product) {
  // Assumes a product detail route named "product" at /product/:id.
  // Adjust this if your routes are set up differently.
  router.push({ name: 'product', params: { id: product.id } });
  closeResults();
}

// Any time navigation lands somewhere other than the search results page
// (Home, a product page, a category page, etc.), reset the search bar back
// to its placeholder — covers clicks from the dropdown, the results grid,
// nav links, back/forward, all of it, since this only cares about the
// route you end up on.
watch(
  () => route.fullPath,
  () => {
    const onActiveSearch =
      route.path === '/shop' && typeof route.query.q === 'string' && route.query.q.trim();
    if (!onActiveSearch) {
      clearTimeout(debounceTimer);
      searchQuery.value = '';
      committedQuery.value = '';
      isSearching.value = false;
      closeResults();
    }
  },
);

function goToSearch() {
  clearTimeout(debounceTimer);
  const trimmed = searchQuery.value.trim();
  if (!trimmed) return;

  committedQuery.value = trimmed;
  isSearching.value = false;
  // ShopView.vue reads ?q= itself and filters the same grid you browse normally.
  router.push({ path: '/shop', query: { q: trimmed } });
  closeResults();
}

function onEnter() {
  goToSearch();
}

function handleClickOutside(event) {
  if (searchWrap.value && !searchWrap.value.contains(event.target)) {
    closeResults();
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  clearTimeout(debounceTimer);
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600&family=Cormorant+Garamond:wght@300;400&display=swap');
/* * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
} */
html,
body {
  overflow-x: hidden;
  width: 100%;
}

#app-wrapper {
  overflow-x: hidden;
  width: 100%;
}
body {
  font-family: 'Cormorant Garamond', serif;
  background: #fffbfb;
  color: #2f2925;
}
#app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
}
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #fffbfb;
}
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 16px;
  background: #fffbfb;
  gap: 8px;
  border-bottom: 1px solid #2f2925;
}
.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
}
.logo-img {
  height: 100px;
  width: auto;
  cursor: pointer;
}
.search-wrap {
  position: relative;
  flex: 1;
  min-width: 0;
  max-width: 500px;
  margin-left: auto;
}
.search {
  width: 100%;
  padding: 10px 16px;
  border: 1.5px solid #2f2925;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  font-family: inherit;
  background: #fffbfb;
  box-sizing: border-box;
}
.search-results {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: #fffbfb;
  border: 1.5px solid #2f2925;
  border-radius: 8px;
  list-style: none;
  margin: 0;
  padding: 6px;
  max-height: 420px;
  overflow-y: auto;
  z-index: 200;
  box-shadow: 0 8px 20px rgba(47, 41, 37, 0.12);
}
.search-status {
  padding: 10px 12px;
  font-size: 0.95rem;
  color: #6b625b;
}
.search-result {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
}
.search-result:hover,
.search-result.active {
  background: #f5f0eb;
}
.search-result-img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
  background: #ede8e3;
}
.search-result-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.search-result-name {
  font-size: 1rem;
  color: #2f2925;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.search-result-meta {
  font-size: 0.82rem;
  color: #8a8079;
  text-transform: capitalize;
}
.search-viewall {
  padding: 10px 12px;
  font-size: 0.9rem;
  text-align: center;
  color: #2f2925;
  font-weight: 600;
  cursor: pointer;
  border-top: 1px solid #ede8e3;
  margin-top: 4px;
}
.search-viewall:hover {
  background: #f5f0eb;
}
.nav-icons {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;
}
.cart-icon {
  color: #2f2925;
  text-decoration: none;
  display: flex;
  flex-shrink: 0;
}
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 4px;
  flex-shrink: 0;
}
.hamburger span {
  display: block;
  width: 22px;
  height: 1.5px;
  background: #2f2925;
  transition:
    transform 0.3s,
    opacity 0.3s;
  transform-origin: center;
}
.hamburger.open span:nth-child(1) {
  transform: translateY(6.5px) rotate(45deg);
}
.hamburger.open span:nth-child(2) {
  opacity: 0;
}
.hamburger.open span:nth-child(3) {
  transform: translateY(-6.5px) rotate(-45deg);
}

.category-nav {
  display: flex;
  justify-content: center;
  background: #fffbfb;
  border-bottom: 1px solid #2f2925;
}
.category-nav a {
  padding: 12px 20px;
  font-size: 1.2rem;
  color: #2f2925;
  text-decoration: none;
  letter-spacing: 0.05em;
}
.category-nav a:hover,
.category-nav a.router-link-exact-active {
  font-weight: 600;
}

.mobile-menu {
  display: none;
  flex-direction: column;
  background: #fffbfb;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.35s ease;
  border-bottom: 1px solid #2f2925;
}
.mobile-menu.open {
  max-height: 400px;
}
.mobile-menu a {
  padding: 14px 24px;
  font-size: 1.15rem;
  color: #2f2925;
  text-decoration: none;
  border-bottom: 1px solid #ede8e3;
  letter-spacing: 0.04em;
  display: block;
}
.mobile-menu a:last-child {
  border-bottom: none;
}
.mobile-menu a:hover,
.mobile-menu a.router-link-exact-active {
  background: #f5f0eb;
  font-weight: 600;
}

.footer {
  background: #fffbfb;
  padding: 22px 20px;
  text-align: center;
  border-top: 1px solid #2f2925;
}
.footer-links {
  display: flex;
  justify-content: center;
  gap: 12px;
  font-size: 1rem;
  color: #2f2925;
  margin-bottom: 8px;
  flex-wrap: wrap;
}
.footer-links a {
  color: #2f2925;
  text-decoration: none;
}
.footer p {
  font-size: 0.9rem;
  color: #2f2925;
}

@media (max-width: 768px) {
  .category-nav {
    border-bottom: 0px solid #2f2925;
  }
  .hamburger {
    display: flex;
  }
  .mobile-menu {
    display: flex;
  }
  .navbar {
    padding: 6px 12px;
  }
  .logo-img {
    height: 70px;
  }
  .search {
    padding: 8px 10px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 4px 8px;
    gap: 4px;
  }
  .category-nav {
    display: none;
  }
  .logo-img {
    height: 50px;
  }
  .search-wrap {
    display: none;
  }
  .cart-icon svg {
    width: 22px;
    height: 22px;
  }
}
@media (max-width: 768px) {
  .footer {
    padding: 16px 12px;
  }
  .footer-links {
    gap: 6px;
    font-size: 0.85rem;
  }
  .footer p {
    font-size: 0.78rem;
  }
  .category-nav {
    display: none;
  }
}

@media (max-width: 480px) {
  .footer-links {
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  .footer-links span {
    display: none;
  }
  .category-nav {
    border-bottom: 0px solid #2f2925;
  }
}
</style>
