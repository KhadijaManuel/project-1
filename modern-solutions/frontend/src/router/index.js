import { createRouter, createWebHashHistory } from 'vue-router'
import PayRoll from '@/views/PayRoll.vue'
import Attendance from '@/views/EmployeeAttendance.vue'
import DashboardView from '@/views/DashboardView.vue'
import LoginView from '@/views/LoginView.vue'
import EmployeesView from '@/views/EmployeesView.vue'
import LeaveView from '@/views/LeaveView.vue'
import PerformanceReviewView from '@/views/PerformanceReviewView.vue'

// ✅ Import the Signup page
import SignupView from '@/views/signup.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/payroll',
    name: 'payroll',
    component: PayRoll
  },
  {
    path: '/attendance',
    name: 'attendance',
    component: Attendance
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
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
  },
  {
    path: '/performance',
    name: 'performance',
    component: PerformanceReviewView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
