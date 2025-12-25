<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import EmployeeForm from "../components/EmployeeForm.vue";
import { useEmployees } from "../composables/useEmployees";
import type { Employee } from "../types/employee";
import { employmentStatusLabel, terminationStatusLabel } from "../utils/dates";

const props = defineProps<{ code: string; mode?: "edit" }>();
const router = useRouter();
const { getByCode, updateEmployee } = useEmployees();

const employee = computed(() => getByCode(props.code));
const isEdit = computed(() => props.mode === "edit");

function goBack() {
  router.push("/");
}

function goEdit() {
  router.push(`/employee/${props.code}/edit`);
}

function save(e: Employee) {
  try {
    updateEmployee(props.code, e);
    router.push(`/employee/${props.code}`);
  } catch (err) {
    alert((err as Error).message);
  }
}
</script>

<template>
  <div v-if="!employee" class="card">
    <h2>Employee not found</h2>
    <p class="muted">The employee code "{{ code }}" does not exist.</p>
    <button class="btn" @click="goBack">Back</button>
  </div>

  <template v-else>
    <div class="pageTitle">
      <div class="pageTitle-left">
        <h1>{{ employee.fullName }}</h1>
        <div class="muted">{{ employee.code }}</div>
      </div>

      <div class="pageTitle-right">
        <button v-if="!isEdit" class="btn btn--primary" @click="goEdit">
          Edit
        </button>
        <button class="btn" @click="goBack">Back</button>
      </div>
    </div>

    <div v-if="!isEdit" class="card">
      <div class="detailsGrid">
        <div class="kv">
          <div class="k">Occupation</div>
          <div class="v">{{ employee.occupation }}</div>
        </div>
        <div class="kv">
          <div class="k">Department</div>
          <div class="v">{{ employee.department }}</div>
        </div>
        <div class="kv">
          <div class="k">Employment</div>
          <div class="v">
            {{ employmentStatusLabel(employee.dateOfEmployment) }}
          </div>
        </div>
        <div class="kv">
          <div class="k">Termination</div>
          <div class="v">
            {{ terminationStatusLabel(employee.terminationDate) }}
          </div>
        </div>
      </div>
    </div>

    <EmployeeForm
      v-else
      mode="edit"
      :initial="employee"
      @save="save"
      @cancel="() => router.push(`/employee/${code}`)"
    />
  </template>
</template>
