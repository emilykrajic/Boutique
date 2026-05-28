<template>
  <main class="cart-page">
    <a href="/shop" class="back-link">← Continue Shopping</a>
    <h1 class="cart-title">Your Cart</h1>

    <p class="empty">Your cart is empty.</p>
    <hr class="divider" />
    <h2 class="fav-title">Our Favorites</h2>
    <div class="fav-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
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

<script setup>
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
];
</script>

<style scoped>
.cart-page {
  padding: 40px;
  padding-bottom: 0;
  background: #fffbfb;
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
.divider {
  border: none;
  border-top: 1px solid #2f2925;
  margin-bottom: 32px;
}
.empty {
  color: #2f2925;
  margin-bottom: 40px;
}
.fav-title {
  font-family: 'Dancing Script', cursive;
  font-size: 2.5rem;
  color: #2f2925;
  margin-bottom: 24px;
}
.product-info span {
  color: #2f2925;
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
  min-width: 130px;
  flex-shrink: 0;
}
.img-wrap {
  position: relative;
  aspect-ratio: 2/3;
  overflow: hidden;
  width: 100%;
}
.img-wrap {
  position: relative;
  aspect-ratio: 2/3;
  overflow: hidden;
  width: 100%;
  max-height: 180px;
}
.img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}
.product-card:hover img {
  transform: scale(1.04);
}
.badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #fffbfb;
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
.price {
  color: #2f2925;
}
@media (max-width: 768px) {
  .fav-grid {
    display: flex;
    overflow-x: auto;
    scrollbar-width: none;
    gap: 12px;
  }
  .fav-grid::-webkit-scrollbar {
    display: none;
  }
}
</style>
