<template>
  <main class="product-page" v-if="product">
    <router-link to="/shop" class="back-link">← Continue Shopping</router-link>
    <div class="product-layout">
      <div class="product-img-wrap">
        <div class="img-grid">
          <div v-for="i in 8" :key="i" class="img-box" @click="enlarged = i"></div>
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

    <div v-if="enlarged" class="lightbox" @click="enlarged = null">
      <div class="lightbox-box"></div>
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
const enlarged = ref(null);

const products = [
  {
    id: 1,
    name: 'Rosette Slip Dress',
    price: 68,
    badge: 'New',
    img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=1000&fit=crop',
  },
  {
    id: 2,
    name: 'Linen Co-ord Set',
    price: 94,
    badge: 'Bestseller',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop',
  },
  {
    id: 3,
    name: 'Pearl Knit Top',
    price: 52,
    badge: null,
    img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=1000&fit=crop',
  },
  {
    id: 4,
    name: 'Velvet Mini Skirt',
    price: 76,
    badge: 'Sale',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop',
  },
  {
    id: 5,
    name: 'Satin Wrap Blouse',
    price: 61,
    badge: 'New',
    img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=1000&fit=crop',
  },
  {
    id: 6,
    name: 'Denim Wide Leg',
    price: 88,
    badge: null,
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop',
  },
];

const product = computed(() => products.find((p) => p.id === Number(route.params.id)));

watch(
  product,
  (p) => {
    if (p) viewProduct(p);
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
  min-height: 80vh;
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
.product-img-wrap {
  flex: 1;
}
.img-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.img-box {
  width: 100%;
  aspect-ratio: 3/4;
  background: #d4b896;
  cursor: pointer;
}
.img-box:hover {
  opacity: 0.85;
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
.img-grid img {
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  cursor: pointer;
  transition: opacity 0.2s;
}
.img-grid img:hover {
  opacity: 0.85;
}
.product-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 20px;
}
.product-name {
  font-family: 'Dancing Script', cursive;
  font-size: 3rem;
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
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.5);
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.lightbox-box {
  width: 52vw;
  height: 93vh;
  background: #d4b896;
  cursor: default;
}

@media (max-width: 768px) {
  .product-layout {
    flex-direction: column;
    gap: 24px;
  }
  .product-page {
    padding: 20px;
  }
}
.lightbox-img {
  max-height: 90vh;
  max-width: 90vw;
  object-fit: contain;
  border-radius: 0;
}
@media (max-width: 768px) {
  .product-layout {
    flex-direction: column;
    gap: 24px;
  }
  .product-page {
    padding: 20px;
  }
}
</style>
