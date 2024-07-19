<template>
  <footer class="footer">
    <p>&copy; 2024 MyApp. All rights reserved.</p>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style scoped>
.footer {
  background-color: #8ecae6; /* Same soft blue as hero */
  color: #023047; /* Same dark blue for contrast */
  padding: 10px 20px;
  width: 100%;
  text-align: center;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  flex: 0 0 auto; /* Prevents flex-grow and flex-shrink */
}

.footer p {
  margin: 0;
  font-size: 1rem;
}
</style>
