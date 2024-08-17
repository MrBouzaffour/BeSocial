<template>
  <v-container class="auth-page" fill-height fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card class="elevation-12 pa-5" shaped>
          <v-toolbar color="indigo darken-3" dark flat>
            <v-toolbar-title class="headline">Buzz In</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="email"
                label="Email Address"
                prepend-icon="mdi-email"
                type="email"
                outlined
                dense
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                outlined
                dense
                required
              ></v-text-field>
              <v-fade-transition>
                <v-alert
                  v-if="message"
                  type="error"
                  border="left"
                  colored-border
                  elevation="2"
                  color="pink"
                  dark
                >
                  {{ message }}
                </v-alert>
              </v-fade-transition>
              <v-btn color="purple darken-2" block large dark class="mt-5" type="submit">
                Log In
              </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="blue-grey darken-1" @click="$router.push('/register')">
              Sign Up Instead?
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '../utils/axios'; // Import the configured Axios instance
import { mapActions } from 'vuex';
import store from '../store';

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      message: '',
      showPassword: false
    };
  },
  methods: {
    ...mapActions(['login']),
    async login() {
      try {
        const response = await axios.post('/users/login', {
          email: this.email,
          password: this.password
        });
        const token = response.data.token;
        await store.dispatch('login', token);
        this.$router.push('/feed');
      } catch (error) {
        this.message = 'Invalid email or password. Please try again.'; 
      }
    },
  },
};
</script>

<style scoped>
.auth-page {
  background-color: #e8eaf6; /* A light indigo background */
}

.pa-5 {
  padding: 32px; /* More spacious padding */
}

.headline {
  font-size: 1.75rem; /* Larger and more prominent title */
}
</style>
