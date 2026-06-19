<template>
  <main class="product-page" v-if="product">
    <router-link to="/shop" class="back-link">← Continue Shopping</router-link>

    <div class="product-layout">
      <div class="img-row">
        <div class="main-img" :style="{ background: activeColor }"></div>
        <div class="thumb-stack">
          <div
            v-for="(color, i) in thumbColors"
            :key="i"
            class="thumb"
            :class="{ active: activeColor === color }"
            :style="{ background: color }"
            @click="activeColor = color"
          ></div>
        </div>
      </div>

      <div class="product-details">
        <span v-if="product.badge" class="badge">{{ product.badge }}</span>
        <h1 class="product-name">{{ product.name }}</h1>
        <p class="product-price">${{ product.price }}</p>
        <p class="product-desc">A beautiful piece crafted with care. Perfect for any occasion.</p>
        <button class="add-btn" @click="handleAddToCart(product)">Add to Cart</button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCart } from '../stores/cart';

const { addToCart, viewProduct } = useCart();
const route = useRoute();
const router = useRouter();

const thumbColors = ['#d4b896', '#c7cdab', '#a98c73', '#8a9a7e', '#e0c9a6'];
const activeColor = ref(thumbColors[0]);

const products = [
  { id: 1, name: 'Rosette Slip Dress', price: 68, badge: 'New' },
  { id: 2, name: 'Linen Co-ord Set', price: 94, badge: 'Bestseller' },
  { id: 3, name: 'Pearl Knit Top', price: 52, badge: null },
  { id: 4, name: 'Velvet Mini Skirt', price: 76, badge: 'Sale' },
  { id: 5, name: 'Satin Wrap Blouse', price: 61, badge: 'New' },
  { id: 6, name: 'Denim Wide Leg', price: 88, badge: null },
  { id: 7, name: 'Rosette Slip Dress', price: 68, badge: 'New' },
  { id: 8, name: 'Linen Co-ord Set', price: 94, badge: 'Bestseller' },
  { id: 9, name: 'Pearl Knit Top', price: 52, badge: null },
  { id: 10, name: 'Velvet Mini Skirt', price: 76, badge: 'Sale' },
  { id: 11, name: 'Satin Wrap Blouse', price: 61, badge: 'New' },
  { id: 12, name: 'Denim Wide Leg', price: 88, badge: null },
];

const product = computed(() => products.find((p) => p.id === Number(route.params.id)));

watch(
  product,
  (p) => {
    if (p) {
      viewProduct(p);
      activeColor.value = thumbColors[0];
    }
  },
  { immediate: true },
);

function handleAddToCart(product) {
  addToCart(product);
  router.push('/cart');
}
</script>

<style scoped>
.product-page {
  padding: 40px;
  background: #fffbfb;
  min-height: 100vh;
}
.back-link {
  font-size: 0.95rem;
  color: #2f2925;
  text-decoration: none;
  display: inline-block;
  margin-bottom: 32px;
}
.product-layout {
  display: flex;
  gap: 60px;
  align-items: flex-start;
}
.img-row {
  flex: 1.4;
  display: flex;
  gap: 16px;
}
.main-img {
  flex: 1;
  aspect-ratio: 3/4;
  border-radius: 4px;
  transition: background 0.2s ease;
}
.thumb-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 160px;
}
.thumb {
  flex: 1;
  aspect-ratio: 1/1;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.6;
  transition:
    opacity 0.2s,
    transform 0.15s;
  border: 2px solid transparent;
}
.thumb:hover {
  opacity: 0.9;
}
.thumb.active {
  opacity: 1;
  border-color: #2f2925;
}
.badge {
  display: inline-block;
  background: #c7cdab;
  color: white;
  font-size: 0.75rem;
  padding: 4px 12px;
  border-radius: 20px;
  width: fit-content;
}
.product-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 20px;
}
.product-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  color: #2f2925;
}
.product-price {
  font-size: 1.4rem;
  color: #2f2925;
}
.product-desc {
  font-size: 1.1rem;
  color: #433a34;
  line-height: 1.8;
}
.add-btn {
  background: #2f2925;
  color: white;
  padding: 14px 32px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 12px;
  width: fit-content;
}
.add-btn:hover {
  background: #433a34;
}

@media (max-width: 768px) {
  .product-layout {
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }
  .img-row {
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }
  .main-img {
    width: 100%;
  }
  .thumb-stack {
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 90px;
  }
  .product-page {
    padding: 20px;
  }
}
</style>
