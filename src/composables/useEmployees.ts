import { computed, ref } from 'vue'
import type { Employee } from '../types/employee'
import employeesJson from '../assets/employees.json'

const employees = ref<Employee[]>([...(employeesJson as Employee[])])

export function useEmployees() {
  function getByCode(code: string) {
    return employees.value.find(e => e.code === code) ?? null
  }

  function createEmployee(emp: Employee) {
    const code = emp.code.trim().toUpperCase()
    if (employees.value.some(e => e.code === code)) {
      throw new Error('Employee code already exists')
    }
    employees.value = [{ ...emp, code }, ...employees.value]
  }

  function updateEmployee(code: string, emp: Employee) {
    const idx = employees.value.findIndex(e => e.code === code)
    if (idx === -1) throw new Error('Employee not found')
    employees.value[idx] = { ...emp, code }
  }

  function deleteEmployee(code: string) {
    employees.value = employees.value.filter(e => e.code !== code)
  }

  function exportEmployees() {
    const blob = new Blob(
      [JSON.stringify(employees.value, null, 2)],
      { type: 'application/json' }
    )
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'employees.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function importEmployees(file: File) {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string)
        if (!Array.isArray(data)) throw new Error()
        employees.value = data
      } catch {
        alert('Invalid employee file')
      }
    }
    reader.readAsText(file)
  }

  const count = computed(() => employees.value.length)

  return {
    employees,
    count,
    getByCode,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    exportEmployees,
    importEmployees,
  }
}