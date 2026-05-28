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
    <section class="strip">
      <div class="strip-track">
        <div v-for="i in 12" :key="i" class="strip-img"></div>
      </div>
    </section>
  </main>
</template>

<style scoped>
main { background: #fff; }
.hero { position: relative; }
.hero-img { width: 100%; height: 80vh; background: #d4b896; display: block; }
.hero-btn { position: absolute; bottom: 80px; left: 50%; transform: translateX(-50%); background: rgba(255,255,255,0.85); color: #5c4033; padding: 14px 40px; font-size: 1rem; border: 1px solid #d4b896; text-decoration: none; white-space: nowrap; }
.grid-3x2 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; padding: 8px; }
.grid-img { height: 300px; background: #d4b896; }
.strip { overflow: hidden; border-top: 1px solid #d4b896; border-bottom: 1px solid #d4b896; padding: 8px 0; background: #fff; }
.strip-track { display: flex; gap: 8px; animation: scroll 40s linear infinite; width: max-content; }
.strip-img { width: 180px; height: 220px; background: #d4b896; flex-shrink: 0; }
@keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
</style>
