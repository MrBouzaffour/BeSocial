import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const app = createApp(App);

app.use(router)
   .use(store)
   .use(vuetify)
   .use(Vue3Toastify, {
      autoClose: 3000, // Auto close after 3 seconds
      position: 'top-right', // Toast position
   });

app.mount('#app');
