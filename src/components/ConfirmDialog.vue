<script setup lang="ts">
defineProps<{
  open: boolean
  title?: string
  message: string
  confirmText?: string
}>()

const emit = defineEmits<{ (e: 'confirm'): void; (e: 'cancel'): void }>()
</script>

<template>
  <div v-if="open" class="modalOverlay" @click.self="emit('cancel')">
    <div class="card modal">
      <h3 class="modalTitle">{{ title ?? 'Confirm' }}</h3>
      <p class="muted">{{ message }}</p>
      <div class="modalActions">
        <button class="btn" @click="emit('cancel')">Cancel</button>
        <button class="btn btn--danger" @click="emit('confirm')">{{ confirmText ?? 'Confirm' }}</button>
      </div>
    </div>
  </div>
</template>
