import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DashboardView  from '@/views/DashboardView.vue'
import LeaveView from '@/views/LeaveView.vue'
// import Attendance from '@/views/Attendance.vue'
import PayRoll from '@/views/PayRoll.vue'
import EmployeesView from '@/views/EmployeesView.vue'
import EmployeeAttendance from '@/views/EmployeeAttendance.vue'
import AboutView from '@/views/AboutView.vue'
const routes = [

  {path: '/about', name: 'about', component: AboutView},
  {
    path: '/',
    name: 'home',
    component: HomeView
  // }, {
  //   path: '/login',
  //   name: 'login',
  //   component: LoginView
  // },
   }, {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView 
  },
{
    path: '/leave',
    name: 'leave',
    component: LeaveView
  },
{
    path: '/employees',
    name: 'employees',
    component: EmployeesView
},
  {
    path: '/attendance',
    name: 'attendance',
    component: EmployeeAttendance
  },

{
    path: '/payroll',
    name: 'payroll',
    component:PayRoll 
},

  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  //   }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
