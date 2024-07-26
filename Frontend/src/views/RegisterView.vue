<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-header">
        <img src="@/assets/bee-logo.png" alt="Bee Logo" class="bee-logo">
        <h2>Join the Hive</h2>
      </div>
      <form @submit.prevent="register">
        <div class="form-group">
          <input v-model="name" type="text" placeholder="Name" required />
        </div>
        <div class="form-group">
          <input v-model="lastname" type="text" placeholder="LastName" required />
        </div>
        <div class="form-group">
          <input v-model="email" type="email" placeholder="Email" required />
        </div>
        <div class="form-group">
          <input v-model="password" type="password" placeholder="Password" required />
        </div>
        <button type="submit" class="btn">Join the Hive</button>
      </form>
      <p class="switch-auth">Already a member? <router-link to="/login">Buzz In</router-link></p>
    </div>
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
          body: JSON.stringify({ name: name.value,lastname: lastname.value, email: email.value, password: password.value }),
        });
        const data = await response.json();
        if (data.token) {
          router.push('/login');
        } else {
          alert(data.msg || 'Registration failed');
        }
      } catch (error) {
        console.error('Error registering:', error);
      }
    };

    return {
      name,
      email,
      lastname,
      password,
      register,
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
