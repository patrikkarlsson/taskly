<template>
  <div id="dashboard" v-if="currentUser">
    <h5>{{ currentUser.name }}</h5>
    <p>{{ currentUser.title }}</p>
    <input type="text" v-model="currentUser.title" @blur="save" />
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { currentUser } from '@/store/getters'

export default {
  computed: {
    ...mapGetters({
      currentUser,
    })
  },
  data: () => ({
    title: '',
  }),
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    },
    save() {
      this.$store.dispatch('user/update', this.currentUser)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>