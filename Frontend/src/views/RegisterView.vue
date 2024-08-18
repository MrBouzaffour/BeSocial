<template>
  <v-container class="auth-page" fill-height fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card class="elevation-12 pa-5" shaped>
          <v-toolbar color="indigo darken-3" dark flat>
            <v-toolbar-title class="headline">Register</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="register">
              <v-text-field
                v-model="name"
                label="First Name"
                prepend-icon="mdi-account"
                outlined
                dense
                required
              ></v-text-field>
              <v-text-field
                v-model="lastname"
                label="Last Name"
                prepend-icon="mdi-account"
                outlined
                dense
                required
              ></v-text-field>
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
                Register
              </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="blue-grey darken-1" @click="$router.push('/login')">
              Already have an account? Log In
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '../utils/axios'; 

export default {
  data() {
    return {
      name: '',
      lastname: '',
      email: '',
      password: '',
      message: '',
      showPassword: false
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('/users/register', {
          name: this.name,
          lastname: this.lastname,
          email: this.email,
          password: this.password
        });
        console.log('Registration successful:', response.data);
        this.$router.push('/login');
      } catch (error) {
        console.error('Error registering:', error.response ? error.response.data : error.message);
        this.message = 'User already exists. Please try again.'; 
      }
    }
  }
};
</script>

<style scoped>
.auth-page {
  background-color: #e8eaf6;
}

.pa-5 {
  padding: 32px; 
}

.headline {
  font-size: 1.75rem;
}
</style>
