document.addEventListener('DOMContentLoaded', () => {
  // Register form submission
  document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // Gather user input from the form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log(name);
    console.log(email);
    console.log(password);

    // Send the input data to the server
    const response = await fetch('/api/auth/register', {
      method: 'POST', // Specifies a POST request
      headers: {
        'Content-Type': 'application/json' // Indicates that the request body is JSON
      },
      body: JSON.stringify({ name, email, password }) // Convert the user input to a JSON string
    });

    // Handle the server's response
    const data = await response.json();
    console.log(data); // Log server response for debugging
    alert(data.msg || 'Registered successfully'); // Provide feedback to the user
  });

  // Login form submission
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    console.log(data); // Log server response for debugging
    if (data.token) {
      localStorage.setItem('token', data.token);
      alert('Logged in successfully');
    } else {
      alert(data.msg || 'Login failed');
    }
  });

  // Post form submission
  document.getElementById('post-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = document.getElementById('post-text').value;
    const token = localStorage.getItem('token');

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify({ text })
    });

    const data = await response.json();
    console.log(data); // Log server response for debugging
    alert(data.msg || 'Post created successfully');
    fetchPosts(); // Refresh posts after creating a new one
  });

  // Fetch and display posts
  async function fetchPosts() {
    const response = await fetch('/api/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const posts = await response.json();
    console.log(posts); // Log fetched posts for debugging
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';

    posts.forEach(post => {
      const div = document.createElement('div');
      div.innerHTML = `<p>${post.text}</p><small>by ${post.name}</small>`;
      postList.appendChild(div);
    });
  }

  // Initial fetch of posts when the page loads
  fetchPosts();
});
