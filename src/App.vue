<script setup lang="ts">
import { ref, provide } from 'vue'
import AppHeader from './components/AppHeader.vue'

const toast = ref<string | null>(null)

function showToast(message: string) {
  toast.value = message
  setTimeout(() => (toast.value = null), 2500)
}

provide('showToast', showToast)
</script>

<template>
  <AppHeader />

  <div v-if="toast" class="toast">
    {{ toast }}
  </div>

  <main class="container">
    <router-view />
  </main>
</template>
