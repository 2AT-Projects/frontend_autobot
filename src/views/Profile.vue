<template>
  <b-container fluid='xl'>
    <header class="jumbotron mt-4">
      <h3>
        <strong>{{ currentUser.username }}</strong> Profile
      </h3>
    </header>
    <div class="jumbotron">
      <p>
        <strong>Token:</strong>
        {{ currentUser.accessToken.substring(0, 20) }} ...
        {{
          currentUser.accessToken.substr(currentUser.accessToken.length - 20)
        }}
      </p>
      <p>
        <strong>Username:</strong>
        {{ currentUser.user_ufabet }}
      </p>
      <p>
        <strong>Password:</strong>
        {{ currentUser.password_ufabet }}
      </p>
      <strong>Authorities:</strong>
      <ul>
        <li v-for="(role, index) in currentUser.roles" :key="index">
          {{ role }}
        </li>
      </ul>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>