<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCart } from '../stores/cart';
import { products } from '../products.js';
import { buildSearchIndex, searchProducts, getSuggestedProducts } from '../utils/search.js';

const route = useRoute();
const router = useRouter();
const { viewProduct } = useCart();

// If a search query (?q=...) is present, this same page filters down to
// matches instead of showing the full catalog — so search results and
// normal browsing are literally the same view, not a separate lookalike.
const searchQuery = computed(() => (typeof route.query.q === 'string' ? route.query.q.trim() : ''));
const isSearching = computed(() => searchQuery.value.length > 0);

const searchIndex = buildSearchIndex(products);

// Products scoped to whichever category tab we're on (e.g. /shop/accessories,
// /shop/tops, /shop/dresses, /shop/pants, /shop/skirts). Each product now
// has its own real category, so this is a direct match — no mapping needed.
// If there's no category param (just /shop), show everything.
// When a subcategory is also present in the route (e.g. /shop/accessories/jewelry),
// narrow further to just that group.
const categoryProducts = computed(() => {
  const routeCategory = route.params.category;
  const routeSubcategory = route.params.subcategory;

  let list = routeCategory ? products.filter((p) => p.category === routeCategory) : products;

  if (routeSubcategory) {
    list = list.filter((p) => p.subcategory === routeSubcategory);
  }

  return list;
});

// The fixed set of accessory subcategories to show as tabs, regardless of
// whether products exist for each one yet. Add/remove entries here as your
// accessory lineup grows — this list drives the tab row directly.
const ACCESSORY_SUBCATEGORIES = [
  'bags',
  'belts',
  'bracelets',
  'buttons',
  'earrings',
  'hats',
  'necklaces',
  'scarves',
  'sunglasses',
];

const subcategories = computed(() => {
  if (route.params.category !== 'accessories') return [];
  return ACCESSORY_SUBCATEGORIES;
});

function subcategoryLabel(subcat) {
  return subcat.charAt(0).toUpperCase() + subcat.slice(1);
}

const matches = computed(() =>
  isSearching.value ? searchProducts(searchIndex, searchQuery.value) : categoryProducts.value,
);

const suggestions = computed(() =>
  isSearching.value && matches.value.length === 0
    ? getSuggestedProducts(products, 4, matches.value)
    : [],
);

// What actually renders in the grid: search matches, or — if a search
// came up empty — a handful of suggested items instead.
const displayedProducts = computed(() =>
  isSearching.value && matches.value.length === 0 ? suggestions.value : matches.value,
);

function openProduct(product) {
  viewProduct(product);
  router.push(`/product/${product.id}`);
}
</script>

<template>
  <main class="shop">
    <nav v-if="subcategories.length && !isSearching" class="subcategory-nav">
      <router-link :to="`/shop/${route.params.category}`" class="subcategory-link">
        All
      </router-link>
      <router-link
        v-for="subcat in subcategories"
        :key="subcat"
        :to="`/shop/${route.params.category}/${subcat}`"
        class="subcategory-link"
      >
        {{ subcategoryLabel(subcat) }}
      </router-link>
    </nav>

    <template v-if="isSearching">
      <h1 v-if="matches.length" class="page-title">Results for "{{ searchQuery }}"</h1>
      <p v-if="matches.length" class="page-count">
        {{ matches.length }} item{{ matches.length === 1 ? '' : 's' }} found
      </p>

      <div v-else class="no-results">
        <h1 class="page-title">Sorry, we couldn't find that</h1>
        <p class="no-results-text">
          We didn't find anything matching "{{ searchQuery }}". Take a look at these instead — you
          might find something you love.
        </p>
      </div>
    </template>

    <div class="product-grid">
      <div
        v-for="product in displayedProducts"
        :key="product.id"
        class="product-card"
        @click="openProduct(product)"
      >
        <div class="img-wrap">
          <span v-if="product.badge" class="badge">{{ product.badge }}</span>
          <img :src="product.img" :alt="product.name" />
        </div>
        <div class="product-info">
          <span>{{ product.name }}</span>
          <span class="price">${{ product.price }}</span>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  background: #fffbfb;
}
.shop {
  padding: 20px 40px 40px;
}
.subcategory-nav {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #2f2925;
  padding-bottom: 10px;
}
.subcategory-link {
  padding: 4px 10px;
  font-size: 0.95rem;
  color: #2f2925;
  text-decoration: none;
  letter-spacing: 0.03em;
  white-space: nowrap;
  flex-shrink: 1;
}
.subcategory-link:hover,
.subcategory-link.router-link-exact-active {
  font-weight: 600;
}
@media (max-width: 768px) {
  .subcategory-nav {
    border-bottom-width: 2px;
  }
  .subcategory-link {
    font-size: 0.85rem;
    padding: 3px 6px;
  }
}
@media (max-width: 480px) {
  .subcategory-nav {
    border-bottom-width: 3px;
  }
}
.page-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  color: #2f2925;
  margin: 0 0 4px;
}
.page-count {
  color: #8a8079;
  margin: 0 0 24px;
  font-size: 0.95rem;
}
.no-results {
  text-align: center;
  padding: 8px 16px 32px;
}
.no-results .page-title {
  margin: 0 0 10px;
}
.no-results-text {
  color: #6b625b;
  font-size: 1.05rem;
  max-width: 480px;
  margin: 0 auto;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.product-card {
  cursor: pointer;
}
.img-wrap {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: #d4b896;
}

.img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.product-card:hover img {
  transform: scale(1.04);
}
.badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #c7cdab;
  color: white;
  font-size: 0.75rem;
  padding: 4px 12px;
  border-radius: 20px;
}
.product-info {
  display: flex;
  justify-content: space-between;
  padding: 10px 2px 0;
  font-size: 1rem;
}
.product-info span {
  color: #2f2925;
  font-size: 1rem;
}
.price {
  color: #2f2925;
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .shop {
    padding: 16px;
  }
}
</style>
