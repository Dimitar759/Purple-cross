import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../pages/EmployeeListPage.vue'),
    },
    {
      path: '/create',
      component: () => import('../pages/EmployeeCreatePage.vue'),
    },
    {
      path: '/employee/:code',
      component: () => import('../pages/EmployeeDetailsPage.vue'),
      props: true,
    },
    {
      path: '/employee/:code/edit',
      component: () =>
        import('../pages/EmployeeDetailsPage.vue'),
      props: route => ({ code: route.params.code, mode: 'edit' }),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})