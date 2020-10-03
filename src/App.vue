<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { currentUser, isAuthenticated } from '@/store/getters'

export default {
  computed: {
    ...mapGetters({
      currentUser,
      isAuthenticated,
    }),
  },
  watch: {
   isAuthenticated(isAuthenticated) {
     if (isAuthenticated && this.$route.name !== 'Dashboard') {
       this.$router.push({ name: 'Dashboard' })
     } else if (!isAuthenticated && this.$route.name === 'Dashboard') {
       this.$router.push({ name: 'Login' })
     }
   }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
