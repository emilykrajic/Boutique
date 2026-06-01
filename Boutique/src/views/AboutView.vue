<template>
  <main class="page">
    <div class="content">
      <h1 class="title">About Us</h1>

      <p class="body">
        Miss Wild Thing is a Greenville, South Carolina boutique built for the bold, free spirited
        young woman who refuses to blend in. We curate hand selected, boho chic pieces that are
        trendy, expressive, and made for every moment from casual college wear to spirited game day
        fits that turn heads in any college town.
      </p>

      <p class="body">
        Every item in our shop is thoughtfully hand selected with the modern young lady in mind.
        Whether you're heading to class, hitting the tailgate, or just living your best life, we
        have something that feels like it was made just for you.
      </p>

      <p class="body">
        We have a deep love for jewelry and it shows. From layered necklaces to statement earrings
        and delicate rings, our collection is full of handmade jewelry pieces that add the perfect
        finishing touch to any outfit.
      </p>

      <p class="body">
        Looking for something truly one of a kind? Our
        <RouterLink to="/customs" class="link">Custom Orders</RouterLink> page is where the magic
        happens. Every custom piece is handmade and curated around your vision with our personal
        wild twist woven into every detail. No two pieces are ever the same.
      </p>

      <p class="body">Miss Wild Thing isn't just a boutique, it's a vibe. Come find yours.</p>
    </div>
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.page {
  background: #fffbfb;
  min-height: 100vh;
  padding: 60px 40px;
}
.content {
  max-width: 700px;
  margin: 0 auto;
}
.title {
  font-family: 'Dancing Script', cursive;
  font-size: 3rem;
  color: #2f2925;
  margin-bottom: 32px;
}
.body {
  font-size: 1.2rem;
  color: #433a34;
  margin-bottom: 24px;
  line-height: 1.8;
}
.link {
  color: #2f2925;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.link:hover {
  color: #433a34;
}
</style>
