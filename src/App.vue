<template>
  <div class="max-w-6xl m-auto">
    <router-view />
  </div>
  
</template>

<script>
import { provide } from 'vue'
import { userProvider } from '@/providers'

export default {
  setup() {
    provide('userProvider', userProvider)
  },
}
</script>
