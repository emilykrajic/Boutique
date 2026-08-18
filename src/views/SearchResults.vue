<template>
  <main class="shop search-results">
    <template v-if="results.length">
      <div class="product-grid">
        <div
          v-for="product in results"
          :key="product.id"
          class="product-card"
          @click="openProduct(product)"
        >
          <div class="img-wrap">
            <span v-if="product.badge" class="badge">{{ product.badge }}</span>
            <img :src="product.image || product.img" :alt="product.name" />
          </div>
          <div class="product-info">
            <span>{{ product.name }}</span>
            <span class="price">${{ product.price }}</span>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="no-results">
        <h1 class="page-title">Sorry, we couldn't find that</h1>
        <p class="no-results-text">
          Take a look at these instead! You might find something you love.
        </p>
      </div>

      <div class="product-grid">
        <div
          v-for="product in suggestions"
          :key="product.id"
          class="product-card"
          @click="openProduct(product)"
        >
          <div class="img-wrap">
            <span v-if="product.badge" class="badge">{{ product.badge }}</span>
            <img :src="product.image || product.img" :alt="product.name" />
          </div>
          <div class="product-info">
            <span>{{ product.name }}</span>
            <span class="price">${{ product.price }}</span>
          </div>
        </div>
      </div>
    </template>
  </main>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { products } from '../products.js';
import { buildSearchIndex, searchProducts, getSuggestedProducts } from '../utils/search.js';

const route = useRoute();
const router = useRouter();

const query = computed(() => (typeof route.query.q === 'string' ? route.query.q : ''));

const searchIndex = buildSearchIndex(products);

const results = computed(() => searchProducts(searchIndex, query.value));

// Suggestions only need to be picked when there are no results —
// recompute is cheap either way since it only runs when results.length is 0.
const suggestions = computed(() => getSuggestedProducts(products, 4, results.value));

function openProduct(product) {
  router.push(`/product/${product.id}`);
}
</script>

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
