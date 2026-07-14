<template>
  <main class="product-page" v-if="product">
    <router-link to="/shop" class="back-link">← Continue Shopping</router-link>

    <div class="product-layout">
      <div class="img-row">
        <div class="main-img-wrap carousel-view">
          <div class="main-img" :style="{ background: activeColor }"></div>
          <button class="arrow arrow-left" @click="prevImage" aria-label="Previous image">‹</button>
          <button class="arrow arrow-right" @click="nextImage" aria-label="Next image">›</button>
        </div>

        <div class="img-grid grid-view">
          <div
            v-for="(color, i) in thumbColors"
            :key="i"
            class="grid-img"
            :style="{ background: color }"
          ></div>
        </div>
      </div>

      <div class="right-col">
        <div class="product-header">
          <span v-if="product.badge" class="badge">{{ product.badge }}</span>
          <h1 class="product-name">{{ product.name }}</h1>
          <p class="product-price">${{ product.price }}</p>
        </div>

        <div class="product-details">
          <div class="section">
            <p class="section-label">Size</p>
            <div class="size-row">
              <button
                v-for="size in sizes"
                :key="size"
                class="size-btn"
                :class="{ active: activeSize === size }"
                @click="activeSize = size"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <button class="add-btn" @click="handleAddToCart(product)">Add to Bag</button>

          <p class="product-desc">
            {{
              product.description ||
              'A beautiful piece crafted with care. Perfect for any occasion.'
            }}
          </p>
        </div>
      </div>
    </div>

    <hr class="divider" v-if="styleWith.length" />

    <template v-if="styleWith.length">
      <h2 class="fav-title">Style With</h2>
      <div class="fav-grid style-grid">
        <div v-for="item in styleWith" :key="item.name" class="product-card">
          <div class="img-wrap" :style="{ background: item.color }"></div>
          <div class="product-info">
            <span>{{ item.name }}</span>
            <span class="price">${{ item.price }}</span>
          </div>
        </div>
      </div>
    </template>

    <hr class="divider" v-if="suggestedProducts.length" />

    <template v-if="suggestedProducts.length">
      <h2 class="fav-title">You May Also Like</h2>
      <div class="fav-grid">
        <div
          v-for="item in suggestedProducts"
          :key="item.id"
          class="product-card"
          @click="goToProduct(item)"
        >
          <div class="img-wrap" :style="{ background: suggestedColor(item.id) }">
            <span v-if="item.badge" class="card-badge">{{ item.badge }}</span>
          </div>
          <div class="product-info">
            <span>{{ item.name }}</span>
            <span class="price">${{ item.price }}</span>
          </div>
        </div>
      </div>
    </template>
  </main>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCart } from '../stores/cart';
import { products } from './ShopView.vue';

const { addToCart, viewProduct } = useCart();
const route = useRoute();
const router = useRouter();

const thumbColors = ['#d4b896', '#c7cdab', '#a98c73', '#e9a371'];
const sizes = ['XS', 'S', 'M', 'L', 'XL'];

const activeColor = ref(thumbColors[0]);
const activeSize = ref('');

const activeIndex = computed(() => thumbColors.indexOf(activeColor.value));

function nextImage() {
  const next = (activeIndex.value + 1) % thumbColors.length;
  activeColor.value = thumbColors[next];
}

function prevImage() {
  const prev = (activeIndex.value - 1 + thumbColors.length) % thumbColors.length;
  activeColor.value = thumbColors[prev];
}

const product = computed(() => products.find((p) => p.id === Number(route.params.id)));

const styleWith = [
  { name: 'Linen Co-ord Set', price: 94, color: '#c7cdab' },
  { name: 'Pearl Knit Top', price: 52, color: '#a98c73' },
  { name: 'Satin Wrap Blouse', price: 61, color: '#e9a371' },
];

const suggestedProducts = computed(() => {
  if (!product.value) return [];
  return products.filter((p) => p.id !== product.value.id);
});

function suggestedColor(id) {
  return thumbColors[id % thumbColors.length];
}

function goToProduct(item) {
  router.push(`/product/${item.id}`);
}

watch(
  product,
  (p) => {
    if (p) {
      viewProduct(p);
      activeColor.value = thumbColors[0];
      activeSize.value = '';
    }
  },
  { immediate: true },
);

function handleAddToCart(product) {
  addToCart(product, activeSize.value);
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
.badge {
  display: inline-block;
  background: #c7cdab;
  color: white;
  font-size: 0.75rem;
  padding: 4px 12px;
  border-radius: 20px;
  width: fit-content;
}
.product-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.1rem;
  color: #2f2925;
}
.product-price {
  font-size: 1.25rem;
  color: #2f2925;
}

/* --- Layout: mobile default is stacked --- */
.product-layout {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}
.img-row {
  width: 100%;
  display: flex;
  gap: 12px;
}

/* right-col dissolves on mobile so header + details act as direct
   flex items of .product-layout and can be reordered independently */
.right-col {
  display: contents;
}
.product-header {
  order: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.img-row {
  order: 2;
}
.product-details {
  order: 3;
}

.main-img-wrap {
  position: relative;
  flex: 1;
}
.main-img {
  width: 100%;
  height: 100%;
  aspect-ratio: 3/4;
  transition: background 0.2s ease;
}
.img-grid {
  display: none;
  width: 100%;
}
.grid-img {
  aspect-ratio: 3/4;
}
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  outline: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
  color: #2f2925;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}
.arrow:hover {
  background: rgba(0, 0, 0, 0.08);
}
.arrow-left {
  left: 12px;
}
.arrow-right {
  right: 12px;
}
.product-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  padding-top: 8px;
}
.section {
  width: 100%;
  padding-top: 4px;
}
.section-label {
  font-size: 0.9rem;
  color: #2f2925;
  margin-top: 5px;
  margin-bottom: 5px;
  font-weight: 600;
}
.size-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.size-btn {
  min-width: 44px;
  padding: 12px 8px;
  background: white;
  border: 1px solid #d8d0c8;
  color: #2f2925;
  cursor: pointer;
  font-size: 0.7rem;
}
.size-btn:hover {
  border-color: #2f2925;
}
.size-btn.active {
  background: #2f2925;
  color: white;
  border-color: #2f2925;
}
.add-btn {
  background: #e9a371;
  color: white;
  padding: 16px;
  border: 1px solid #e9a371;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 6px;
  width: 100%;
  letter-spacing: 0.5px;
  transition:
    background 0.2s,
    color 0.2s;
}
.add-btn:hover {
  background: #ffffff;
  border-color: #e9a371;
  color: #e9a371;
}
.product-desc {
  font-size: 0.95rem;
  color: #433a34;
  line-height: 1.7;
  border-top: 1px solid #e8e2dc;
  padding-top: 14px;
  margin-top: 4px;
}

/* Suggested / style-with sections */
.divider {
  border: none;
  border-top: 1px solid #2f2925;
  max-width: 1200px;
  margin: 48px auto 32px;
}
.fav-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  color: #2f2925;
  margin-bottom: 24px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
.fav-grid {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  gap: 12px;
  padding-bottom: 40px;
  max-width: 1200px;
  margin: 0 auto;
}
.fav-grid::-webkit-scrollbar {
  display: none;
}
.style-grid {
  overflow-x: visible;
}
.product-card {
  min-width: 160px;
  flex-shrink: 0;
  cursor: pointer;
}
.style-grid .product-card {
  cursor: default;
}
.img-wrap {
  position: relative;
  aspect-ratio: 2/3;
  overflow: hidden;
  width: 100%;
  max-height: 220px;
}
.card-badge {
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

/* --- 768px and up: row layout, right column groups title + size --- */
@media (min-width: 768px) {
  .product-layout {
    flex-direction: row;
    gap: 60px;
    align-items: flex-start;
  }
  .img-row {
    flex: 1.4;
    order: 1;
  }
  .right-col {
    display: flex;
    flex-direction: column;
    gap: 14px;
    flex: 1;
    max-width: 420px;
    order: 2;
  }
  .product-header,
  .product-details {
    order: initial;
  }
  .carousel-view {
    display: none;
  }
  .grid-view {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .style-grid {
    display: flex;
    justify-content: flex-start;
    overflow-x: visible;
    flex-wrap: wrap;
  }
  .style-grid .product-card {
    min-width: 160px;
    max-width: 160px;
    flex: 0 0 auto;
  }
}

@media (max-width: 767px) {
  .product-page {
    padding: 20px;
  }
  .product-name {
    font-size: 1.6rem;
  }
  .arrow {
    width: 28px;
    height: 28px;
    font-size: 1.1rem;
  }
  .fav-title {
    font-size: 1.4rem;
  }
}
</style>
