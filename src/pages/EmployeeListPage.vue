<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import EmployeeTable from '../components/EmployeeTable.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'
import { useEmployees } from '../composables/useEmployees'

const router = useRouter()
const { employees, count, deleteEmployee, exportEmployees, importEmployees } = useEmployees()

const deleteTarget = ref<string | null>(null)
const confirmOpen = computed(() => deleteTarget.value !== null)

const fileInput = ref<HTMLInputElement | null>(null)

function onImport(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) importEmployees(file)
}

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

    <div>
      <button class="btn" @click="exportEmployees">Export</button>

      <input
        type="file"
        accept="application/json"
        hidden
        ref="fileInput"
        @change="onImport"
      />
      <button class="btn" @click="fileInput?.click()">Import</button>
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
