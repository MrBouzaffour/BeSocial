<template>
  <div id="registration">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input type="text" v-model="name" placeholder="Name" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'RegisterView',
  setup() {
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const register = async () => {
      try {
        const response = await axios.post('/api/auth/register', {
          name: name.value,
          email: email.value,
          password: password.value,
        });
        const data = response.data;
        console.log('Response data:', data);
        alert(data.msg || 'Registered successfully');
        router.push('/login');
      } catch (error) {
        console.error('Error registering:', error);
        alert(error.response.data.msg || 'Registration failed');
      }
    };

    return {
      name,
      email,
      password,
      register,
    };
  },
};
</script>
