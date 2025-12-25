<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import type { Employee } from "../types/employee";
import { employmentStatusLabel, terminationStatusLabel } from "../utils/dates";
import { watch } from "vue";

const page = ref(1);
const pageSize = 10;
const props = defineProps<{ employees: Employee[] }>();
const emit = defineEmits<{ (e: "requestDelete", code: string): void }>();

const router = useRouter();

const query = ref("");
const sortKey = ref<
  "fullName" | "occupation" | "department" | "dateOfEmployment"
>("fullName");
const sortDir = ref<"asc" | "desc">("asc");

function setSort(key: typeof sortKey.value) {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key;
    sortDir.value = "asc";
  }
}

const filteredSorted = computed(() => {
  const q = query.value.trim().toLowerCase();

  const filtered = !q
    ? props.employees
    : props.employees.filter((e) =>
        [e.code, e.fullName, e.occupation, e.department].some((x) =>
          x.toLowerCase().includes(q)
        )
      );

  return [...filtered].sort((a, b) => {
    const av = a[sortKey.value];
    const bv = b[sortKey.value];
    const res = String(av).localeCompare(String(bv));
    return sortDir.value === "asc" ? res : -res;
  });
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredSorted.value.length / pageSize))
);

const paginatedEmployees = computed(() => {
  const start = (page.value - 1) * pageSize;
  return filteredSorted.value.slice(start, start + pageSize);
});

function view(code: string) {
  router.push(`/employee/${code}`);
}

function edit(code: string) {
  router.push(`/employee/${code}/edit`);
}

watch(query, () => {
  page.value = 1;
});

watch([sortKey, sortDir], () => {
  page.value = 1;
});
</script>

<template>
  <section class="card">
    <div class="toolbar">
      <input
        class="input"
        v-model="query"
        placeholder="Search by name, code, department..."
      />
      <div class="sort">
        <span class="muted">Sort:</span>
        <button
          class="btn btn--ghost"
          :class="{ 'btn--active': sortKey === 'fullName' }"
          @click="setSort('fullName')"
        >
          Name
        </button>

        <button
          class="btn btn--ghost"
          :class="{ 'btn--active': sortKey === 'department' }"
          @click="setSort('department')"
        >
          Department
        </button>

        <button
          class="btn btn--ghost"
          :class="{ 'btn--active': sortKey === 'dateOfEmployment' }"
          @click="setSort('dateOfEmployment')"
        >
          Employment
        </button>
      </div>
    </div>

    <div class="tableWrap">
      <table class="table">
        <thead>
          <tr>
            <th @click="setSort('fullName')" class="thClickable">Employee</th>
            <th @click="setSort('occupation')" class="thClickable">
              Occupation
            </th>
            <th @click="setSort('department')" class="thClickable">
              Department
            </th>
            <th @click="setSort('dateOfEmployment')" class="thClickable">
              Date of Employment
            </th>
            <th>Termination Date</th>
            <th class="right">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="e in paginatedEmployees" :key="e.code">
            <td>
              <div class="nameCell">
                <div class="name">{{ e.fullName }}</div>
                <div class="muted small">{{ e.code }}</div>
              </div>
            </td>
            <td>{{ e.occupation }}</td>
            <td>{{ e.department }}</td>
            <td>{{ employmentStatusLabel(e.dateOfEmployment) }}</td>
            <td>{{ terminationStatusLabel(e.terminationDate) }}</td>
            <td class="right actions">
              <button class="btn btn--ghost" @click="view(e.code)">View</button>
              <button class="btn btn--ghost" @click="edit(e.code)">Edit</button>
              <button
                class="btn btn--danger"
                @click="emit('requestDelete', e.code)"
              >
                Delete
              </button>
            </td>
          </tr>

          <tr v-if="filteredSorted.length === 0">
            <td colspan="6" class="empty">No employees match your search.</td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button class="btn" :disabled="page === 1" @click="page--">Prev</button>
        <span class="muted">Page {{ page }} / {{ totalPages }}</span>
        <button class="btn" :disabled="page === totalPages" @click="page++">
          Next
        </button>
      </div>
    </div>
  </section>
</template>
