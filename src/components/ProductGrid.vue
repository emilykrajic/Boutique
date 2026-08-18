<script setup>
defineProps({
  products: { type: Array, required: true },
});
const emit = defineEmits(['select']);
</script>

<template>
  <div class="product-grid">
    <div
      v-for="product in products"
      :key="product.id"
      class="product-card"
      @click="emit('select', product)"
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
</template>

<style scoped>
.product-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.product-card { cursor: pointer; }
.img-wrap { position: relative; aspect-ratio: 3/4; overflow: hidden; background: #d4b896; }
.img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease; }
.product-card:hover img { transform: scale(1.04); }
.badge { position: absolute; top: 12px; left: 12px; background: #c7cdab; color: white; font-size: 0.75rem; padding: 4px 12px; border-radius: 20px; }
.product-info { display: flex; justify-content: space-between; padding: 10px 2px 0; font-size: 1rem; }
.product-info span { color: #2f2925; font-size: 1rem; }
.price { color: #2f2925; }

@media (max-width: 768px) {
  .product-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
}
</style>
