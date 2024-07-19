<template>
  <div id="welcome">
    <div class="hero">
      <h1>Welcome to MyApp</h1>
      <p>Your new favorite social media platform for students and anyone!</p>
      <div class="cta-buttons">
        <router-link to="/register" class="btn primary">Get Started</router-link>
        <router-link to="/login" class="btn secondary">Login</router-link>
      </div>
    </div>
    <div class="features">
      <div class="feature">
        <img src="path/to/feed-icon.png" alt="Feed" />
        <h2>Feed</h2>
        <p>Stay updated with your friends' latest posts and activities.</p>
      </div>
      <div class="feature">
        <img src="path/to/messages-icon.png" alt="Live Messages" />
        <h2>Live Messages</h2>
        <p>Chat with your friends in real-time with our messaging tool.</p>
      </div>
      <div class="feature">
        <img src="path/to/todolist-icon.png" alt="To-Do List" />
        <h2>To-Do List</h2>
        <p>Keep track of your tasks and stay organized.</p>
      </div>
      <div class="feature">
        <img src="path/to/study-tools-icon.png" alt="Study Tools" />
        <h2>Study Tools</h2>
        <p>Access various tools to help you with your studies.</p>
      </div>
      <div class="feature">
        <img src="path/to/financial-help-icon.png" alt="Financial Help" />
        <h2>Financial Help</h2>
        <p>Get assistance with managing your finances effectively.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

#welcome {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.hero {
  background-color: #007bff;
  color: #fff;
  padding: 50px 20px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.hero p {
  font-size: 1.5rem;
  margin-bottom: 30px;
}

.cta-buttons .btn {
  text-decoration: none;
  padding: 15px 30px;
  margin: 0 10px;
  border-radius: 5px;
  font-size: 1.2rem;
}

.cta-buttons .btn.primary {
  background-color: #0056b3;
  color: #fff;
}

.cta-buttons .btn.secondary {
  background-color: #fff;
  color: #007bff;
  border: 2px solid #007bff;
}

.features {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.feature {
  background-color: #fff;
  padding: 20px;
  margin: 10px;
  width: 200px;
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
