<template>
  <main class="customs">
    <h1 class="title">Custom Orders</h1>
    <p class="subtitle">Have something special in mind? We create custom pieces just for you.</p>
    <div class="form">
      <input type="text" placeholder="Your name" />
      <input type="email" placeholder="Your email" />
      <textarea placeholder="Describe your custom order..."></textarea>
      <button type="button">Submit Request</button>
    </div>
  </main>
</template>

<style scoped>
.customs { padding: 60px 40px; max-width: 600px; margin: 0 auto; }
.title { font-family: 'Dancing Script', cursive; font-size: 3rem; color: #8b6347; margin-bottom: 12px; }
.subtitle { font-size: 1.1rem; color: #5c4033; margin-bottom: 40px; }
.form { display: flex; flex-direction: column; gap: 16px; }
.form input, .form textarea { padding: 12px 16px; border: 1.5px solid #d4b896; border-radius: 8px; font-family: inherit; font-size: 1rem; outline: none; }
.form textarea { height: 150px; resize: vertical; }
.form button { background: #8b6347; color: white; padding: 14px; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; }
.form button:hover { background: #6b4423; }
</style>
