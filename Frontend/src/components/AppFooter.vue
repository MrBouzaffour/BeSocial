<template>
  <div class="footer">
    <p>&copy; 2024 BeeSocial. All rights reserved.</p>
  </div>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style scoped>
.footer {
  background-color: #f2f2f2; /* Same light grey as hero */
  color: #333; /* Same dark grey for contrast */
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
