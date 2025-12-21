import { createRouter, createWebHistory } from 'vue-router'
import EmployeeListPage from '../pages/EmployeeListPage.vue'
import EmployeeCreatePage from '../pages/EmployeeCreatePage.vue'
import EmployeeDetailsPage from '../pages/EmployeeDetailsPage.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: EmployeeListPage },
    { path: '/create', component: EmployeeCreatePage },
    { path: '/employee/:code', component: EmployeeDetailsPage, props: true },
    {
      path: '/employee/:code/edit',
      component: EmployeeDetailsPage,
      props: route => ({ code: route.params.code, mode: 'edit' }),
    },
  ],
})
