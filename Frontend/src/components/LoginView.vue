<!--<template>
  <div id="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginView',
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const login = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email: email.value,
          password: password.value,
        });
        const data = response.data;
        console.log(data);
        if (data.token) {
          localStorage.setItem('token', data.token);
          alert('Logged in successfully');
          router.push('/posts');
        } else {
          alert(data.msg || 'Login failed');
        }
      } catch (error) {
        console.error('Error logging in:', error);
      }
    };

    return {
      email,
      password,
      login,
    };
  },
};
</script>
-->
<template>
  <div id="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginView',
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const login = async () => {
      try {
        const response = await axios.post('/api/auth/login', {
          email: email.value,
          password: password.value,
        });
        const data = response.data;
        console.log(data);
        if (data.token) {
          localStorage.setItem('token', data.token);
          alert('Logged in successfully');
          router.push('/posts');
        } else {
          alert(data.msg || 'Login failed');
        }
      } catch (error) {
        console.error('Error logging in:', error);
      }
    };

    return {
      email,
      password,
      login,
    };
  },
};
</script>
