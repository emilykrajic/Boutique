<template>
  <main class="customs">
    <div v-if="sent" class="thankyou">
      <h1 class="title">Thank You!</h1>
      <p class="subtitle">Your application has been sent. We'll be in touch soon!</p>
      <button @click="sent = false" class="back-btn">Submit Another Application</button>
    </div>
    <div v-else>
      <h1 class="title">Job Opportunities</h1>
      <p class="subtitle">Interested in joining the Miss Wild Thing team? We'd love to meet you.</p>
      <div class="form">
        <input type="text" v-model="name" placeholder="Your name" />
        <input type="email" v-model="email" placeholder="Your email" />
        <textarea
          v-model="message"
          placeholder="Tell us about yourself and why you'd like to join..."
        ></textarea>
        <p v-if="error" class="error">Something went wrong. Please try again.</p>
        <button type="button" @click="sendEmail" :disabled="sending">
          {{ sending ? 'Sending...' : 'Apply Now' }}
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import emailjs from '@emailjs/browser';

const name = ref('');
const email = ref('');
const message = ref('');
const sent = ref(false);
const error = ref(false);
const sending = ref(false);

async function sendEmail() {
  sending.value = true;
  error.value = false;

  try {
    await emailjs.send(
      'service_plpxyjk',
      'template_0uqji2t',
      {
        from_name: name.value,
        from_email: email.value,
        message: `Job Application:\n${message.value}`,
      },
      '6px8XSXVuVGUV_pok',
    );

    sent.value = true;
    name.value = '';
    email.value = '';
    message.value = '';
  } catch (err) {
    console.error(err);
    error.value = true;
  } finally {
    sending.value = false;
  }
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
.form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.error {
  color: #c0392b;
  font-size: 0.9rem;
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
