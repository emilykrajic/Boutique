<template>
  <main class="product-page" v-if="product">
    <router-link to="/shop" class="back-link">← Continue Shopping</router-link>
    <div class="product-layout">
      <div class="product-img-wrap">
        <div class="main-img">
          <img :src="activeImg" :alt="product.name" />
        </div>
        <div class="thumb-grid">
          <div v-for="i in 4" :key="i" class="thumb" @click="selectedImg = product.img">
            <img :src="product.img" :alt="product.name" />
          </div>
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
const selectedImg = ref(null);

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
const activeImg = computed(() => selectedImg.value || product.value?.img);

watch(
  product,
  (p) => {
    if (p) {
      viewProduct(p);
      selectedImg.value = null;
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
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.main-img {
  width: 100%;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: #d4b896;
}
.main-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.thumb-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}
.thumb {
  aspect-ratio: 3/4;
  overflow: hidden;
  background: #d4b896;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}
.thumb:hover {
  opacity: 1;
}
.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
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
    gap: 24px;
  }
  .product-page {
    padding: 20px;
  }
}
</style>
