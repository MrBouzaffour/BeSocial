<template>
  <div id="welcome">
    <div class="hero">
      <h1>Welcome to Bee</h1>
      <p>Your new favorite social media platform for students and professionals!</p>
      <div class="cta-buttons">
        <router-link to="/register" class="btn primary">Join the Hive</router-link>
        <router-link to="/login" class="btn secondary">Buzz In</router-link>
      </div>
    </div>
    <div class="features">
      <v-container>
        <v-row justify="space-around">
          <v-col cols="12" md="4" class="feature-item">
            <v-img src="/assets/connect.png" aspect-ratio="1.5"></v-img>
            <h2>Connect</h2>
            <p>Build lasting connections with fellow students and professionals.</p>
          </v-col>
          <v-col cols="12" md="4" class="feature-item">
            <v-img src="/assets/learn.png" aspect-ratio="1.5"></v-img>
            <h2>Learn</h2>
            <p>Gain insights and share knowledge across a wide array of topics.</p>
          </v-col>
          <v-col cols="12" md="4" class="feature-item">
            <v-img src="/assets/compete.png" aspect-ratio="1.5"></v-img>
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
  background-color: #6a1b9a;
  background-image: radial-gradient(circle, #7a43aa 10%, transparent 10%);
  background-size: 10px 10px;
  color: #fff;
  padding: 60px 20px;
  width: 100%;
}


.hero h1 {
  font-size: 4rem;
  margin-bottom: 20px;
}

.hero p {
  font-size: 1.75rem;
  margin-bottom: 30px;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.cta-buttons .btn {
  text-decoration: none;
  padding: 15px 30px;
  margin: 0 10px;
  border-radius: 50px; /* Rounded buttons */
  font-size: 1.2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  transition: transform 0.2s ease-in-out;
}

.cta-buttons .btn.primary {
  background-color: #6a1b9a;
  color: #fff;
}

.cta-buttons .btn.secondary {
  background-color: transparent;
  color: #fff;
  border: 2px solid #fff;
}

.cta-buttons .btn:hover {
  transform: translateY(-3px); /* Subtle hover effect */
}

.features {
  padding: 50px 0;
  background-color: #e8eaf6;
}

.feature-item {
  text-align: center;
  margin: 20px;
  transition: all 0.3s ease-in-out;
}

.feature-item:hover {
  transform: scale(1.05); /* Scale effect on hover */
}

.feature-item h2 {
  font-size: 2.5rem;
  color: #5a3e36;
}

.feature-item p {
  font-size: 1.4rem;
  color: #333;
}
</style>
