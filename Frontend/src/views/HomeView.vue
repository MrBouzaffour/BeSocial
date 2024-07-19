<template>
  <div id="welcome">
    <div class="hero">
      <h1>Welcome to MyApp</h1>
      <p>Your new favorite social media platform for students and professionals!</p>
      <div class="cta-buttons">
        <router-link to="/register" class="btn primary">Get Started</router-link>
        <router-link to="/login" class="btn secondary">Login</router-link>
      </div>
    </div>
    <div class="features">
      <FeatureCard
        icon="path/to/feed-icon.png"
        title="Feed"
        description="Stay updated with your friends' latest posts and activities."
      />
      <FeatureCard
        icon="path/to/messages-icon.png"
        title="Live Messages"
        description="Chat with your friends in real-time with our messaging tool."
      />
      <FeatureCard
        icon="path/to/todolist-icon.png"
        title="To-Do List"
        description="Keep track of your tasks and stay organized."
      />
      <FeatureCard
        icon="path/to/study-tools-icon.png"
        title="Study Tools"
        description="Access various tools to help you with your studies."
      />
      <FeatureCard
        icon="path/to/financial-help-icon.png"
        title="Financial Help"
        description="Get assistance with managing your finances effectively."
      />
    </div>
    <AppFooter />
  </div>
</template>

<script>
import FeatureCard from '../components/FeatureCard.vue';
import AppFooter from '../components/AppFooter.vue';

export default {
  name: 'HomeView',
  components: {
    FeatureCard,
    AppFooter,
  },
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
  background-color: #8ecae6; /* Soft blue */
  color: #023047; /* Dark blue for contrast */
  padding: 20px;
  width: 100%;
  flex: 1 0 auto; /* Flex-grow and shrink with auto basis */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 20px;
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
  background-color: #219ebc; /* Medium blue */
  color: #fff;
}

.cta-buttons .btn.secondary {
  background-color: #fff;
  color: #219ebc;
  border: 2px solid #219ebc;
}

.features {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  width: 100%;
  flex: 2 0 auto; /* Flex-grow and shrink with auto basis */
  background-color: #f0f7f9; /* Very light blue */
}

.feature {
  background-color: #fff;
  padding: 20px;
  margin: 10px;
  width: 220px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
}

.feature img {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}

.feature h2 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.feature p {
  font-size: 0.9rem;
  color: #555;
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

  .features {
    flex-direction: column;
  }

  .feature {
    width: 90%;
  }
}
</style>
