// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/global.css';

// Import Vue3Toastify and its CSS
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const app = createApp(App);

app.use(router)
   .use(store)
   .use(Vue3Toastify, {
      autoClose: 3000, // Auto close after 3 seconds
      position: 'top-right', // Toast position
   });

app.mount('#app');