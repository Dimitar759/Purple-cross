<script setup lang="ts">
import { useRouter } from 'vue-router'
import EmployeeForm from '../components/EmployeeForm.vue'
import { useEmployees } from '../composables/useEmployees'
import type { Employee } from '../types/employee'

const router = useRouter()
const { createEmployee } = useEmployees()

const emptyEmployee: Employee = {
  code: '',
  fullName: '',
  occupation: '',
  department: '',
  dateOfEmployment: '',
  terminationDate: null,
}

function save(e: Employee) {
  try {
    createEmployee(e)
    router.push('/')
  } catch (err) {
    alert((err as Error).message)
  }
}

function cancel() {
  router.push('/')
}
</script>

<template>
  <div class="pageTitle">
    <div>
      <h1>Create Employee</h1>
      <div class="muted">Add a new record</div>
    </div>
  </div>

  <EmployeeForm mode="create" :initial="emptyEmployee" @save="save" @cancel="cancel" />
</template>
