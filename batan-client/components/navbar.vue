<template>
  <nav class="navbar">
    <div class="">
      <NuxtLink to="/lobby" class="brand">
        <img id="logo" src="@/static/icon.png">
        <h1>Batan</h1>
      </NuxtLink>
    </div>
    <div v-if="$auth.loggedIn" class="nav-right">
      <b-dropdown variant="light" right :text="activeGame" :options="games">
        <b-dropdown-item v-for="game in games" @click="gameSelected(game)">{{ game }}</b-dropdown-item>
      </b-dropdown>

      <b-dropdown id="profile-btn" right no-caret class="sm" style="background-color: black;">
        <div slot="button-content">
          <img id="profile" class="dropdown" :src="$auth.user.picture">
        </div>
        <b-dropdown-item :to="'/profile'" >Profile
        </b-dropdown-item>

        <b-dropdown-item-button @click.prevent="logout()">Log out</b-dropdown-item-button>
      </b-dropdown>
    </div>
    <div v-else class="nav-right">
      <b-button @click.prevent="login()" size="md" variant="light">Sign up or Log in</b-button>
    </div>
  </nav>
</template>

<script>
const axios = require('axios').default; // TODO: Move to store

export default {
  name: "Navbar",
  props: {

  },
  data() {
    return {
      games: ["Game 1", "Game 2"],   //TODO: move to vuex store
      activeGame: ""
    }
  },
  methods: {
    login() {
      this.$auth.loginWith('auth0');
    },
    logout() {
      this.$auth.logout()
    },
    gameSelected(game) {
      this.activeGame=game;
      this.$router.push({
        path: '/game-screen'
      })
    }
  },
  watch: {
  },
  mounted() {
    if (this.$auth.loggedIn) {
      // TODO: Add check (profile not loaded), move profile load & state grab to store
      this.$axios.setToken(this.$auth.getToken('auth0'));
      this.$axios.get('http://localhost:3001/').then((response) => {
        console.log(response);
      });
      console.log("sending req")
    } else {
      console.log("not logged in")
    }
  }
}
</script>

<style lang="css" scoped>
h1 {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

nav {
  width: 100%;
  background-color: black;
  color: white;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 3em;
}

.nav-right {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 50%;
  justify-content: flex-end;
}
@media (min-width: 1000px) {
  .nav-right {
    width: 500px;
  }

}

.nav-right > * {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

a {
  margin: 0;
  padding: 0;
  color: black;
}

a:hover {
  text-decoration: none;
}

#logo {
  height: 2rem;
}

#profile {
  height: 2rem;
  border-radius: 1rem;
}

.brand {
  display: flex;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  color: white;
  font-size: 2rem;
  font-family: Roboto, Ariel, sans-serif;
}

.dropdown {
   color: #000!important;
}
</style>