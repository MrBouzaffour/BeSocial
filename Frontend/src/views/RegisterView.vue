<template>
  <div class="auth-container">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input v-model="name" type="text" placeholder="Name" required />
      <input v-model="lastname" type="text" placeholder="LastName" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'RegisterView',
  setup() {
    const name = ref('');
    const lastname = ref('');
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const register = async () => {
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: name.value,lastname:lastname.value, email: email.value, password: password.value }),
        });
        const data = await response.json();
        if (data.token) {
          localStorage.setItem('token', data.token);
          alert('Registered successfully');
          router.push('/feed');
        } else {
          alert(data.msg || 'Registration failed');
        }
      } catch (error) {
        console.error('Error registering:', error);
      }
    };

    return {
      name,
      lastname,
      email,
      password,
      register,
    };
  },
};
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
}

.auth-container h2 {
  margin-bottom: 20px;
}

.auth-container input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
}

.auth-container button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.auth-container button:hover {
  background-color: #0056b3;
}
</style>
