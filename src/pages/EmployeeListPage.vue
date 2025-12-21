<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import EmployeeTable from '../components/EmployeeTable.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'
import { useEmployees } from '../composables/useEmployees'

const router = useRouter()
const { employees, count, deleteEmployee } = useEmployees()

const deleteTarget = ref<string | null>(null)
const confirmOpen = computed(() => deleteTarget.value !== null)

function requestDelete(code: string) {
  deleteTarget.value = code
}

function confirmDelete() {
  if (deleteTarget.value) deleteEmployee(deleteTarget.value)
  deleteTarget.value = null
}

function cancelDelete() {
  deleteTarget.value = null
}

function goCreate() {
  router.push('/create')
}
</script>

<template>
  <div class="pageTitle">
    <div>
      <h1>Employees</h1>
      <div class="muted">{{ count }} records</div>
    </div>
  </div>

  <EmployeeTable :employees="employees" @requestDelete="requestDelete" />

  <button class="fab" @click="goCreate">+ Create Employee</button>

  <ConfirmDialog
    :open="confirmOpen"
    title="Delete employee"
    message="Are you sure? This action cannot be undone."
    confirmText="Delete"
    @confirm="confirmDelete"
    @cancel="cancelDelete"
  />
</template>
