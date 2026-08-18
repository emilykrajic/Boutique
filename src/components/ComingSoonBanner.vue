<script setup>
defineProps({
  title: { type: String, default: 'Coming Soon' },
  message: {
    type: String,
    default: "We're putting the finishing touches on this collection. Check back shortly!",
  },
});
</script>

<template>
  <div class="coming-soon">
    <h1 class="page-title">{{ title }}</h1>
    <p class="coming-soon-text">{{ message }}</p>
  </div>
</template>

<style scoped>
.coming-soon { text-align: center; padding: 80px 16px; }
.page-title { font-family: 'Cormorant Garamond', serif; font-size: 2rem; color: #2f2925; margin: 0 0 4px; }
.coming-soon-text { color: #6b625b; font-size: 1.05rem; max-width: 480px; margin: 0 auto; }
</style>
