import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EmployeesView from '@/views/EmployeesView.vue'
import LeaveView from '@/views/LeaveView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/employees',
    name: 'employees',
    component: EmployeesView

  },
  {
    path: '/leave',
    name: 'leave',
    component: LeaveView
  }
 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

