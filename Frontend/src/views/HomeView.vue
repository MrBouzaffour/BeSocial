<template>
  <div id="welcome">
    <div class="hero">
      <img src="@/assets/bee-logo.png" alt="Bee Logo" class="bee-logo">
      <h1>Welcome to BeeSocial</h1>
      <p>Your new favorite social media platform for students and professionals!</p>
      <div class="cta-buttons">
        <router-link to="/register" class="btn primary">Join the Hive</router-link>
        <router-link to="/login" class="btn secondary">Buzz In</router-link>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue';

export default {
  name: 'HomeView',
  components: {
    AppFooter,
  },
  mounted() {
    // Hide navbar when on the home page
    document.querySelector('.navbar').style.display = 'none';
  },
  beforeUnmount() {
    // Show navbar when leaving the home page
    document.querySelector('.navbar').style.display = 'flex';
  }
};
</script>

<style scoped>
#welcome {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  height: 100vh;
  overflow: hidden; /* Prevent scrolling */
}

.hero {
  background-color: #f2f2f2; /* Light grey */
  color: #333; /* Dark grey for contrast */
  padding: 20px;
  width: 100%;
  flex: 1 0 auto; /* Flex-grow and shrink with auto basis */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hero img.bee-logo {
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #555; /* Softer grey */
}

.cta-buttons {
  display: flex;
  justify-content: center;
}

.cta-buttons .btn {
  text-decoration: none;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 5px;
  font-size: 1rem;
}

.cta-buttons .btn.primary {
  background-color: #8bc34a; /* Light green */
  color: #fff;
}

.cta-buttons .btn.secondary {
  background-color: #fff;
  color: #8bc34a;
  border: 2px solid #8bc34a;
}

.cta-buttons .btn.primary:hover,
.cta-buttons .btn.secondary:hover {
  background-color: #7cb342; /* Slightly darker green */
  color: #fff;
}

/* Responsive styling */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }

  .hero p {
    font-size: 1rem;
  }

  .cta-buttons .btn {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
}
</style>
