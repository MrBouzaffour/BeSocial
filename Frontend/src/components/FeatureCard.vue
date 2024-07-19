<template>
    <div class="feature">
      <img :src="icon" :alt="title" />
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FeatureCard',
    props: {
      icon: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
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
  </style>
  