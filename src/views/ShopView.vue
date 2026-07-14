<script>
// Exported so other files (App.vue's search dropdown, ProductView.vue)
// can all import this same list instead of duplicating it.
// This is the ONE place to edit your catalog.
//
// Fields used by search: name, description, category, color, tags.
// Add these to each product below for search to actually find it —
// they're optional, but the more you fill in, the better search works.
export const products = [
  {
    id: 1,
    name: 'Rosette Slip Dress',
    price: 68,
    badge: 'New',
    img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=500&fit=crop',
    // description: '',
    // category: '',
    // color: '',
    // tags: [],
  },
  {
    id: 2,
    name: 'Linen Co-ord Set',
    price: 94,
    badge: 'Bestseller',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop',
  },
  {
    id: 3,
    name: 'Pearl Knit Top',
    price: 52,
    badge: null,
    img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=500&fit=crop',
  },
  {
    id: 4,
    name: 'Velvet Mini Skirt',
    price: 76,
    badge: 'Sale',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop',
  },
  {
    id: 5,
    name: 'Satin Wrap Blouse',
    price: 61,
    badge: 'New',
    img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=500&fit=crop',
  },
  {
    id: 6,
    name: 'Denim Wide Leg',
    price: 88,
    badge: null,
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop',
  },
  {
    id: 7,
    name: 'Rosette Slip Dress',
    price: 68,
    badge: 'New',
    img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=500&fit=crop',
  },
  {
    id: 8,
    name: 'Linen Co-ord Set',
    price: 94,
    badge: 'Bestseller',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop',
  },
  {
    id: 9,
    name: 'Pearl Knit Top',
    price: 52,
    badge: null,
    img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=500&fit=crop',
  },
  {
    id: 10,
    name: 'Velvet Mini Skirt',
    price: 76,
    badge: 'Sale',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop',
  },
  {
    id: 11,
    name: 'Satin Wrap Blouse',
    price: 61,
    badge: 'New',
    img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=500&fit=crop',
  },
  {
    id: 12,
    name: 'Denim Wide Leg',
    price: 88,
    badge: null,
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop',
  },
];
</script>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCart } from '../stores/cart';
import { buildSearchIndex, searchProducts, getSuggestedProducts } from '../utils/search.js';

const route = useRoute();
const router = useRouter();
const { viewProduct } = useCart();

// If a search query (?q=...) is present, this same page filters down to
// matches instead of showing the full catalog — so search results and
// normal browsing are literally the same view, not a separate lookalike.
const searchQuery = computed(() => (typeof route.query.q === 'string' ? route.query.q.trim() : ''));

const searchIndex = buildSearchIndex(products);

const isSearching = computed(() => searchQuery.value.length > 0);

const matches = computed(() =>
  isSearching.value ? searchProducts(searchIndex, searchQuery.value) : products,
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
  padding: 40px;
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
