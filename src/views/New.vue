<template>
  <main class="shop">
    <div class="product-grid">
      <div
        v-for="product in newProducts"
        :key="product.id"
        class="product-card"
        @click="router.push(`/product/${product.id}`)"
      >
        <div class="img-wrap">
          <span class="badge">New</span>
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
const router = useRouter();

const newProducts = [
  { id: 1, name: 'Rosette Slip Dress', price: 68 },
  { id: 5, name: 'Satin Wrap Blouse', price: 61 },
  { id: 7, name: 'Floral Midi Dress', price: 84 },
  { id: 8, name: 'Silk Cami Top', price: 45 },
  { id: 9, name: 'Ruffle Hem Skirt', price: 72 },
  { id: 10, name: 'Lace Trim Cardigan', price: 58 },
  { id: 11, name: 'Pleated Wide Leg', price: 91 },
  { id: 12, name: 'Bow Detail Blouse', price: 63 },
  { id: 13, name: 'Knit Mini Dress', price: 77 },
  { id: 14, name: 'Corset Vest Top', price: 54 },
  { id: 15, name: 'Satin Slip Skirt', price: 69 },
  { id: 16, name: 'Puff Sleeve Crop', price: 48 },
];
</script>

<style scoped>
main {
  background: #fffbfb;
}
.shop {
  padding: 40px;
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
