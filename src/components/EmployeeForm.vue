<script setup lang="ts">
import { computed, reactive, watch  } from 'vue'
import type { Employee } from '../types/employee'

type Mode = 'create' | 'edit'

const props = defineProps<{
  mode: Mode
  initial: Employee
}>()

const emit = defineEmits<{
  (e: 'save', employee: Employee): void
  (e: 'cancel'): void
}>()

const form = reactive<Employee>({
  code: props.initial.code ?? '',
  fullName: props.initial.fullName ?? '',
  occupation: props.initial.occupation ?? '',
  department: props.initial.department ?? '',
  dateOfEmployment: props.initial.dateOfEmployment ?? '',
  terminationDate: props.initial.terminationDate ?? null,
})

const errors = computed(() => {
  const e: Record<string, string> = {}

  if (!form.code.trim()) e.code = 'Code is required'
  if (!form.fullName.trim()) e.fullName = 'Full name is required'
  if (!form.occupation.trim()) e.occupation = 'Occupation is required'
  if (!form.department.trim()) e.department = 'Department is required'

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (form.dateOfEmployment) {
    const d = new Date(form.dateOfEmployment)

    if (Number.isNaN(d.getTime())) {
      e.dateOfEmployment = 'Invalid employment date'
    } else if (d.getFullYear() < 1950 || d.getFullYear() > 2100) {
      e.dateOfEmployment = 'Employment date must be between 1950 and 2100'
    }
  }

  if (form.terminationDate) {
  const t = new Date(form.terminationDate)

  if (Number.isNaN(t.getTime())) {
    e.terminationDate = 'Invalid termination date'
  }
}

  return e
})


watch(
  () => props.initial,
  (val) => {
    Object.assign(form, val)
  }
)
const isValid = computed(() => Object.keys(errors.value).length === 0)

function submit() {
  if (!isValid.value) return
  emit('save', {
    ...form,
    code: form.code.trim().toUpperCase(),
    terminationDate: form.terminationDate ? form.terminationDate : null,
  })
}
</script>

<template>
  <form class="card form" @submit.prevent="submit">
    <div class="grid">
      <label class="field">
        <span>Code *</span>
        <input class="input" v-model="form.code" :disabled="mode === 'edit'" placeholder="EMP123" />
        <span v-if="errors.code" class="error">{{ errors.code }}</span>
      </label>

      <label class="field">
        <span>Full Name *</span>
        <input class="input" v-model="form.fullName" placeholder="John Doe" />
        <span v-if="errors.fullName" class="error">{{ errors.fullName }}</span>
      </label>

      <label class="field">
        <span>Occupation *</span>
        <input class="input" v-model="form.occupation" placeholder="Pharmacist" />
        <span v-if="errors.occupation" class="error">{{ errors.occupation }}</span>
      </label>

      <label class="field">
        <span>Department *</span>
        <input class="input" v-model="form.department" placeholder="Research" />
        <span v-if="errors.department" class="error">{{ errors.department }}</span>
      </label>

      <label class="field">
        <span>Date of Employment</span>
        <input class="input" type="date" v-model="form.dateOfEmployment" />
        <span v-if="errors.dateOfEmployment" class="error">{{ errors.dateOfEmployment }}</span>
      </label>

      <label class="field">
        <span>Termination Date</span>
        <input
          class="input"
          type="date"
          :value="form.terminationDate ?? ''"
          @input="form.terminationDate = ($event.target as HTMLInputElement).value || null"
        />
        <span v-if="errors.terminationDate" class="error">{{ errors.terminationDate }}</span>
      </label>
    </div>

    <div class="formActions">
      <button class="btn" type="button" @click="emit('cancel')">Cancel</button>
      <button class="btn btn--primary" type="submit" :disabled="!isValid">
        Save
      </button>
    </div>
  </form>
</template>
