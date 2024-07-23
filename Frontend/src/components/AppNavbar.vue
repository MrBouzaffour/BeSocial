<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/">Bee</router-link>
    </div>
    <div class="navbar-toggle" @click="toggleMenu">
      <span v-if="!menuOpen">☰</span>
      <span v-if="menuOpen">✖</span>
    </div>
    <div :class="['navbar-links', { 'navbar-links-open': menuOpen }]">
      <router-link v-if="!$store.getters.isAuthenticated" to="/">Home</router-link>
      <router-link v-if="!$store.getters.isAuthenticated" to="/login">Login</router-link>
      <router-link v-if="!$store.getters.isAuthenticated" to="/register">Register</router-link>
      <router-link v-if="$store.getters.isAuthenticated" to="/feed">Feed</router-link>
      <button v-if="$store.getters.isAuthenticated" @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
/* Additional scoped styles if needed */
</style>
