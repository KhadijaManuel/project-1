import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PayRoll from '@/views/PayRoll.vue'
import Attendance from '@/views/EmployeeAttendance.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/payroll',
    name:'payroll',
    component: PayRoll
  },
  {
    path:'/attendance',
    name:'attendance',
    component:Attendance
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
