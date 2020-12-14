<template>
  <div class="">
    <h2>Goodbye</h2>
  </div>
</template>

<script lang="ts">
export default {
  name: "Logout",
  //@ts-ignore cursed
  auth: false,
  components: {},
  created() {
    //@ts-ignore cursed
    if (!this.$auth.loggedIn) {
      //@ts-ignore cursed
      this.$router.push({
        path: '/'
      });
    }
  }
}
</script>

<style lang="css" scoped>
</style>
