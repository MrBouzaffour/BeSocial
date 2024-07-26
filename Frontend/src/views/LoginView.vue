<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-header">
        <img src="@/assets/bee-logo.png" alt="Bee Logo" class="bee-logo">
        <h2>Buzz In</h2>
      </div>
      <form @submit.prevent="login">
        <div class="form-group">
          <input v-model="email" type="email" placeholder="Email" required />
        </div>
        <div class="form-group">
          <input v-model="password" type="password" placeholder="Password" required />
        </div>
        <button type="submit" class="btn">Buzz In</button>
      </form>
      <p class="switch-auth">New to the Hive? <router-link to="/register">Join the Hive</router-link></p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'LoginView',
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    const store = useStore();

    const login = async () => {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email.value, password: password.value }),
        });
        const data = await response.json();
        if (data.token) {
          store.dispatch('login', data.token);
          router.push('/feed');
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

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background: #f2f2f2; /* Light grey */
}

.auth-container {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
}

.auth-header {
  margin-bottom: 20px;
}

.auth-header .bee-logo {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}

.auth-header h2 {
  font-size: 24px;
  color: #5a3e36; /* Dark brown */
}

.form-group {
  margin-bottom: 15px;
}

.auth-container input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.auth-container button.btn {
  width: 100%;
  padding: 10px;
  background-color: #8bc34a; /* Light green */
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}

.auth-container button.btn:hover {
  background-color: #7cb342; /* Slightly darker green */
}

.switch-auth {
  margin-top: 20px;
  color: #555;
}

.switch-auth a {
  color: #8bc34a; /* Light green */
  text-decoration: none;
}
</style>
