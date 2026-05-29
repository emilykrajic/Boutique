<template>
  <main class="shop">
    <div class="product-grid">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
        @click="router.push(`/product/${product.id}`)"
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

    <div v-if="selected" class="overlay" @click.self="selected = null">
      <div class="popup">
        <button class="close" @click="selected = null">✕</button>
        <img :src="selected.img" :alt="selected.name" class="popup-img" />
        <div class="popup-info">
          <span v-if="selected.badge" class="badge">{{ selected.badge }}</span>
          <h2>{{ selected.name }}</h2>
          <p class="popup-price">${{ selected.price }}</p>
          <button class="add-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const products = [
  {
    id: 1,
    name: 'Rosette Slip Dress',
    price: 68,
    badge: 'New',
    img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=500&fit=crop',
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
.img-wrap img {
  display: none;
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

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup {
  background: #fffbfb;
  max-width: 900px;
  width: 95%;
  height: 90vh;
  display: flex;
  gap: 0;
  overflow: hidden;
  position: relative;
  border-radius: 8px;
}
.popup-img {
  width: 50%;
  object-fit: cover;
  height: 100%;
}
.popup-info {
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  flex: 1;
}
.popup-info .badge {
  font-size: 0.65rem;
  padding: 3px 8px;
}
.popup-info {
  padding: 40px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
}
.popup-info h2 {
  font-family: 'Dancing Script', cursive;
  font-size: 2rem;
  color: #2f2925;
}
.popup-price {
  font-size: 1.2rem;
  color: #2f2925;
}
.add-btn {
  background: #2f2925;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 12px;
}
.add-btn:hover {
  background: #433a34;
}
.popup-info .badge {
  position: static;
  display: inline-block;
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .shop {
    padding: 16px;
  }
  .popup {
    flex-direction: column;
  }
  .popup-img {
    width: 100%;
    height: 250px;
  }
}
</style>
