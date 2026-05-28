<template>
  <main>
    <section class="hero">
      <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&h=800&fit=crop" class="hero-img" />
      <a href="/shop" class="hero-btn">Shop New Arrivals</a>
    </section>
    <section class="strip">
      <div class="strip-track">
        <img v-for="i in 12" :key="i" :src="`https://images.unsplash.com/photo-${i % 2 === 0 ? '1506905925346-21bda4d32df4' : '1469474968028-56623f02e42e'}?w=200&h=140&fit=crop`" />
      </div>
    </section>
    <section class="hero">
      <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=700&fit=crop" class="hero-img hero-short" />
    </section>
  </main>
</template>

<style scoped>
.hero { position: relative; }
.hero-img { width: 100%; height: 80vh; object-fit: cover; display: block; }
.hero-short { height: 60vh; }
.hero-btn { position: absolute; bottom: 80px; left: 50%; transform: translateX(-50%); background: rgba(255,255,255,0.85); color: #7a3a4a; padding: 14px 40px; font-size: 1rem; border: 1px solid #f4b8cb; text-decoration: none; white-space: nowrap; }
.strip { overflow: hidden; border-top: 1px solid #f4b8cb; border-bottom: 1px solid #f4b8cb; }
.strip-track { display: flex; gap: 4px; animation: scroll 20s linear infinite; width: max-content; }
.strip-track img { width: 180px; height: 140px; object-fit: cover; }
@keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
</style>
