<template>
  <main>
    <section class="hero">
      <div class="hero-img"></div>
      <a href="/shop" class="hero-btn">Shop New Arrivals</a>
    </section>
    <section class="grid-3x2">
      <div class="grid-img"></div>
      <div class="grid-img"></div>
      <div class="grid-img"></div>
      <div class="grid-img"></div>
      <div class="grid-img"></div>
      <div class="grid-img"></div>
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
  const el = strip.value;
  const scrollMiddle = (el.scrollWidth - el.clientWidth) / 2;
  el.scrollLeft = scrollMiddle;
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
  gap: 8px;
  padding: 8px;
}
.grid-img {
  height: 300px;
  background: #d4b896;
}
.strip {
  overflow-x: auto;
  border-bottom: 1px solid #d4b896;
  padding: 0 0 8px 0;
  background: #fffbfb;
}
.strip-track {
  display: flex;
  gap: 8px;
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
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
