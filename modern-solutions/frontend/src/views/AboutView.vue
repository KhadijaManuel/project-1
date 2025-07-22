<template>
  <div class="about-hr-system">
    <h1>About This HR System</h1>

    <!-- Example: AboutView.vue -->

    <section>
      <h2>System Features</h2>
      <ul>
        <li>
          <strong>Dashboard:</strong> Provides a quick overview of key HR metrics.
          <br>
          <router-link to="/dashboard">Go to Dashboard</router-link>
        </li>
        <li>
          <strong>Employee Attendance:</strong> Tracks daily attendance, working hours, and absences.
          <br>
          <router-link to="/employee-attendance">View Attendance</router-link>
        </li>
        <li>
          <strong>Leave Table:</strong> Centralizes all employee leave requests and approvals.
          <br>
          <router-link to="/leave">Go to Leave Table</router-link>
        </li>
        <li>
          <strong>Payroll:</strong> Automates salary calculations and payslip generation.
          <br>
          <router-link to="/payroll">Go to Payroll</router-link>
        </li>
      </ul>
    </section>

  </div>
</template>

<style scoped>
.about-hr-system {
  max-width: 800px;
  margin: 40px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.07);
  padding: 32px 24px;
  font-family: 'Segoe UI', Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 24px;
}

section {
  margin-bottom: 32px;
}

h2 {
  color: #2980b9;
  margin-bottom: 12px;
}

ul {
  list-style: disc inside;
  padding-left: 0;
}

li {
  margin-bottom: 18px;
  background: #f7fafd;
  border-left: 4px solid #2980b9;
  padding: 12px 16px 8px 16px;
  border-radius: 6px;
}

router-link {
  display: inline-block;
  margin-top: 6px;
  color: #2980b9;
  text-decoration: underline;
  font-size: 0.97em;
  transition: color 0.2s;
}
router-link:hover {
  color: #145a86;
}

p {
  line-height: 1.7;
  color: #444;
}
</style>