<template>
  <main class="cart-page">
    <a href="/shop" class="back-link">← Continue Shopping</a>
    <h1 class="cart-title">Your Cart</h1>

    <div v-if="items.length === 0" class="empty">Your cart is empty.</div>

    <div v-else class="cart-items">
      <div v-for="item in items" :key="item.id" class="cart-item">
        <div class="cart-img"></div>
        <div class="cart-info">
          <span class="item-name">{{ item.name }}</span>
          <span class="item-price">${{ item.price }}</span>
          <span class="item-qty">Qty: {{ item.qty }}</span>
        </div>
      </div>
    </div>

    <hr class="divider" />

    <!-- Only show when cart has items -->
    <template v-if="recentlyViewed.length > 0">
      <h2 class="fav-title">Recently Viewed</h2>
      <div class="fav-grid">
        <div
          v-for="product in recentlyViewed"
          :key="product.id"
          class="product-card"
          @click="openProduct(product)"
        >
          <div class="img-wrap">
            <span v-if="product.badge" class="badge">{{ product.badge }}</span>
          </div>
          <div class="product-info">
            <span>{{ product.name }}</span>
            <span class="price">${{ product.price }}</span>
          </div>
        </div>
      </div>
      <hr class="divider" />
    </template>

    <h2 class="fav-title">Our Favorites</h2>
    <div class="fav-grid">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
        @click="openProduct(product)"
      >
        <div class="img-wrap">
          <span v-if="product.badge" class="badge">{{ product.badge }}</span>
        </div>
        <div class="product-info">
          <span>{{ product.name }}</span>
          <span class="price">${{ product.price }}</span>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useCart } from '../stores/cart';

const router = useRouter();
const { items, recentlyViewed } = useCart();

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

function openProduct(product) {
  router.push(`/product/${product.id}`);
}
</script>

<style scoped>
.cart-page {
  padding: 40px;
  background: #fffbfb;
  min-height: 100vh;
}
.back-link {
  font-size: 0.95rem;
  color: #2f2925;
  text-decoration: none;
  display: inline-block;
  margin-bottom: 24px;
}
.cart-title {
  font-family: 'Dancing Script', cursive;
  font-size: 3rem;
  color: #2f2925;
  margin-bottom: 24px;
}
.empty {
  color: #2f2925;
  margin-bottom: 40px;
}
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
}
.cart-item {
  display: flex;
  gap: 16px;
  align-items: center;
}
.cart-img {
  width: 160px;
  height: 220px;
  background: #d4b896;
  flex-shrink: 0;
}
.cart-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.item-name {
  color: #2f2925;
  font-size: 1rem;
}
.item-price {
  color: #2f2925;
  font-size: 0.95rem;
}
.item-qty {
  color: #433a34;
  font-size: 0.85rem;
}
.divider {
  border: none;
  border-top: 1px solid #2f2925;
  margin-bottom: 32px;
}
.fav-title {
  font-family: 'Dancing Script', cursive;
  font-size: 2.5rem;
  color: #2f2925;
  margin-bottom: 24px;
}
.fav-grid {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  gap: 12px;
  padding-bottom: 40px;
}
.fav-grid::-webkit-scrollbar {
  display: none;
}
.product-card {
  min-width: 160px;
  flex-shrink: 0;
  cursor: pointer;
}
.img-wrap {
  position: relative;
  aspect-ratio: 2/3;
  overflow: hidden;
  width: 100%;
  max-height: 220px;
  background: #d4b896;
}
.badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: #c7cdab;
  color: white;
  font-size: 0.75rem;
  padding: 4px 12px;
  border-radius: 20px;
  width: fit-content;
}
.product-info {
  display: flex;
  justify-content: space-between;
  padding: 10px 2px 0;
  font-size: 1rem;
}
.product-info span,
.price {
  color: #2f2925;
}
@media (max-width: 768px) {
  .cart-page {
    padding: 20px;
  }
}
</style>
