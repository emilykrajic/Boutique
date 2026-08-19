<template>
  <main>
    <section class="hero">
      <div class="hero-img"></div>
      <router-link to="/shop/accessories" class="hero-btn">Shop New Arrivals</router-link>
    </section>
    <section class="grid-3x2">
      <div class="grid-img"></div>
      <div class="grid-img"></div>
      <div class="grid-img"></div>
      <div class="grid-img"></div>
      <div class="grid-img"></div>
      <div class="grid-img full-width"></div>
    </section>
    <section class="strip" ref="strip">
      <div class="strip-track">
        <div v-for="i in 11" :key="i" class="strip-img"></div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const strip = ref(null);

onMounted(() => {
  requestAnimationFrame(() => {
    const el = strip.value;
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  });
});
</script>

<style scoped>
main {
  background: #fffbfb;
}
.hero {
  position: relative;
}
.hero-img {
  width: 100%;
  height: 80vh;
  background: #d4b896;
  display: block;
}
.hero-btn {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 251, 251, 0.85);
  color: #5c4033;
  padding: 14px 40px;
  font-size: 1rem;
  border: 1px solid #d4b896;
  text-decoration: none;
  white-space: nowrap;
}
.grid-3x2 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 300px);
  gap: 8px;
  padding: 0px;
}
.grid-img {
  background: #d4b896;
}
.strip {
  overflow-x: auto;
  scrollbar-width: none;
  border-bottom: 1px solid #d4b896;
  padding: 0 0 4px 0;
  background: #fffbfb;
}
.strip::-webkit-scrollbar {
  display: none;
}
.strip-track {
  display: flex;
  gap: 4px;
}
.strip-track::before,
.strip-track::after {
  content: '';
  min-width: 2px;
}
.strip-img {
  width: 180px;
  height: 220px;
  background: #d4b896;
  flex-shrink: 0;
}
@media (max-width: 768px) {
  .grid-3x2 {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 4px;
    padding: 4px;
  }
  .grid-img {
    aspect-ratio: 3 / 4;
    height: auto;
  }
  .full-width {
    grid-column: unset; /* remove any spanning */
  }
  .strip-img {
    width: 120px;
    height: 150px;
  }
}
</style>
