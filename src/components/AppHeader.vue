<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<template>
  <header class="header">
    <div class="header__left" @click="goHome" role="button">
      <div class="logo">Purple Cross</div>
      <div class="subtitle">Employee Management</div>
    </div>

    <div class="header__right">
      <span class="badge">Logged in as Admin</span>
    </div>
  </header>
</template>
