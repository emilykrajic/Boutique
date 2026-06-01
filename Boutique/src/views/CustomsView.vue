<template>
  <main class="customs">
    <div v-if="sent" class="thankyou">
      <h1 class="title">Thank You!</h1>
      <p class="subtitle">Your custom order request has been sent. We'll be in touch soon!</p>
      <button @click="sent = false" class="back-btn">Submit Another Request</button>
    </div>
    <div v-else>
      <h1 class="title">Custom Orders</h1>
      <p class="subtitle">Have something special in mind? We create custom pieces just for you.</p>
      <div class="form">
        <input type="text" v-model="name" placeholder="Your name" />
        <input type="email" v-model="email" placeholder="Your email" />
        <textarea v-model="message" placeholder="Describe your custom order..."></textarea>
        <button type="button" @click="sendEmail">Submit Request</button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
const name = ref('');
const email = ref('');
const message = ref('');
const sent = ref(false);

function sendEmail() {
  const subject = encodeURIComponent(`Custom Order Request from ${name.value}`);
  const body = encodeURIComponent(
    `Name: ${name.value}\nEmail: ${email.value}\n\nOrder Details:\n${message.value}`,
  );
  window.open(
    `mailto:misswildthingboutique@misswildthingboutique.com?subject=${subject}&body=${body}`,
  );
  sent.value = true;
  name.value = '';
  email.value = '';
  message.value = '';
}
</script>

<style scoped>
.customs {
  background: #fffbfb;
  min-height: 100vh;
  padding: 60px 40px;
}

.customs > div {
  max-width: 600px;
  margin: 0 auto;
}

.title {
  font-family: 'Dancing Script', cursive;
  font-size: 3rem;
  color: #2f2925;
  margin-bottom: 12px;
}
.subtitle {
  font-size: 1.1rem;
  color: #433a34;
  margin-bottom: 40px;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.form input,
.form textarea {
  padding: 12px 16px;
  border: 1.5px solid #433a34;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
}
.form textarea {
  height: 150px;
  resize: vertical;
}
.form button {
  background: #2f2925;
  color: #ffffff;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}
.form button:hover {
  background: #433a34;
}
.thankyou {
  text-align: center;
  padding: 60px 0;
}
.back-btn {
  margin-top: 24px;
  background: #2f2925;
  color: white;
  padding: 14px 32px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}
.back-btn:hover {
  background: #433a34;
}
</style>
