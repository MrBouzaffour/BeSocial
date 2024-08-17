<template>
  <div id="welcome">
    <div class="hero">
      <h1>Welcome to Bee</h1>
      <p>Your new favorite social media platform for students and professionals!</p>
      <div class="cta-buttons">
        <router-link to="/register" class="btn primary">Join the Hive</router-link>
        <router-link to="/login" class="btn secondary">Buzz In</router-link>
      </div>
      <img src="/assets/bee-logo.png" alt="Bee Logo" class="bee-logo">
    </div>
    <div class="features">
      <v-container>
        <v-row justify="space-around">
          <v-col cols="12" md="4" class="feature-item">
            <v-icon large color="indigo darken-3">mdi-account-group</v-icon>
            <h2>Connect</h2>
            <p>Build lasting connections with fellow students and professionals.</p>
          </v-col>
          <v-col cols="12" md="4" class="feature-item">
            <v-icon large color="indigo darken-3">mdi-school</v-icon>
            <h2>Learn</h2>
            <p>Gain insights and share knowledge across a wide array of topics.</p>
          </v-col>
          <v-col cols="12" md="4" class="feature-item">
            <v-icon large color="indigo darken-3">mdi-trophy-variant</v-icon>
            <h2>Compete</h2>
            <p>Join competitions and challenges to test your skills against others.</p>
          </v-col>
        </v-row>
      </v-container>
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
};
</script>

<style scoped>
#welcome {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #f9f9f9;
}

.hero {
  background-color: #fff;
  color: #5a3e36;
  padding: 40px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.hero img.bee-logo {
  width: 150px;
  margin-top: 20px;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 15px;
}

.hero p {
  font-size: 1.5rem;
  margin-bottom: 25px;
}

.cta-buttons {
  display: flex;
  justify-content: center;
}

.cta-buttons .btn {
  text-decoration: none;
  padding: 12px 24px;
  margin: 0 15px;
  border-radius: 8px;
  font-size: 1.1rem;
  transition: background-color 0.3s ease;
}

.cta-buttons .btn.primary {
  background-color: #6a1b9a; /* Consistent indigo theme */
  color: #fff;
}

.cta-buttons .btn.secondary {
  background-color: #fff;
  color: #6a1b9a;
  border: 2px solid #6a1b9a;
}

.features {
  padding: 50px 0;
  background-color: #e8eaf6;
}

.feature-item {
  text-align: center;
  margin: 20px;
}

.feature-item h2 {
  font-size: 2rem;
  color: #5a3e36;
}

.feature-item p {
  font-size: 1.2rem;
  color: #333;
}

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
