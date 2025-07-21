<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-6 max-w-7xl mx-auto">
    <div
      v-for="employee in employees"
      :key="employee.id"
      class="relative w-64 h-96 mx-auto [perspective:1000px] group"
    >
      <div
        class="relative w-full h-full text-center transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
      >
        <!-- Front Side -->
        <div
          class="absolute w-full h-full rounded-xl shadow-lg bg-blue-700 text-white flex flex-col items-center justify-center px-6 [backface-visibility:hidden]"
        >
          <!-- Profile Picture -->
          <img
            :src="employee.photo"
            alt="Profile Picture"
            class="w-24 h-24 rounded-full object-cover border-4 border-white mb-4 shadow-md"
          />
          <h1 class="text-xl font-bold mb-2">{{ employee.name }}</h1>
          <p class="text-sm">{{ employee.position }}</p>
          <p class="text-sm">{{ employee.department }} Department</p>
        </div>

        <!-- Back Side -->
        <div
          class="absolute w-full h-full rounded-xl shadow-lg bg-white text-gray-800 p-4 overflow-y-auto [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          <div>
            <h3 class="text-lg font-semibold text-blue-700 text-center mb-3">Performance Review</h3>

            <!-- Charts -->
            <div class="h-20 mb-2">
              <canvas :id="`attendance${employee.id}`" class="w-full h-full"></canvas>
            </div>
            <div class="h-20 mb-2">
              <canvas :id="`payroll${employee.id}`" class="w-full h-full"></canvas>
            </div>

            <!-- Stats -->
            <div class="text-xs space-y-1 mt-2">
              <p>
                <span class="font-semibold">Attendance:</span> {{ employee.attendanceRate }}% |
                <span class="font-semibold">Salary:</span> R{{ employee.finalSalary.toLocaleString() }}
              </p>
              <p><span class="font-semibold">Score:</span> {{ employee.review.score }}/10</p>
              <p><span class="font-semibold">Reviewer:</span> {{ employee.review.reviewer }}</p>
              <p class="italic text-gray-600">
                <span class="font-semibold">Comments:</span> {{ employee.review.comments }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'EmployeesCards',
  data() {
    return {
      employees: [
        {
          id: 1,
          name: "Sibongile Nkosi",
          position: "Software Engineer",
          department: "Development",
          finalSalary: 69500,
          attendanceRate: 80,
          attendanceData: [1, 0, 1, 1, 1],
          salaryData: [69500, 70000, 69000, 69500, 70200],
          photo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.goodgallery.com%2Faff0103d-b383-4d77-a4d3-549a4ba909b4%2Ft%2F2560%2F2b7bx9eq%2Facting-headshot-photographer-actors-headshots-10.jpg&f=1&nofb=1&ipt=b239a0d56de8ff3d4f8b6af60b226f1e2857894b36072c64579609d8c05bf615",
          review: {
            score: 9,
            reviewer: "Lungile Moyo",
            comments: "Consistently delivers high-quality work and shows leadership potential."
          }
        },
        {
          id: 2,
          name: "Lungile Moyo",
          position: "HR Manager",
          department: "Human Resources",
          finalSalary: 79000,
          attendanceRate: 80,
          attendanceData: [1, 1, 0, 1, 1],
          salaryData: [79000, 79500, 78800, 79000, 79300],
          photo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.squarespace-cdn.com%2Fcontent%2Fv1%2F572e050c4d088ea3a8f0ac9d%2F1606395599785-R4HY3W6X49YZT6O8ML7R%2FHeadshots-Atlanta-Professional.jpg&f=1&nofb=1&ipt=86839c89cfd740a43bbe00f31a188fff70af6e0fd828f90e1513ca5553ad0d51",
          review: {
            score: 8,
            reviewer: "Thabo Molefe",
            comments: "Excellent management skills and team support."
          }
        },
        {
          id: 3,
          name: "Thabo Molefe",
          position: "Quality Analyst",
          department: "Quality Assurance",
          finalSalary: 54800,
          attendanceRate: 80,
          attendanceData: [1, 1, 1, 0, 1],
          salaryData: [54800, 55000, 54600, 54800, 55100],
          photo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.carvermostardi.com%2Fcmos%2Fwp-content%2Fuploads%2F2018%2F05%2Fcorporate_headshots_tampa_006.jpg&f=1&nofb=1&ipt=3f48a93e92913aaa7ce2bbbc15b85c4f0a34a58a71ffedec5e1f82ed6b830ae3",
          review: {
            score: 8,
            reviewer: "Sibongile Nkosi",
            comments: "Pays attention to detail and meets deadlines."
          }
        },
        {
          id: 4,
          name: "Keshav Naidoo",
          position: "Sales Representative",
          department: "Sales",
          finalSalary: 59700,
          attendanceRate: 80,
          attendanceData: [0, 1, 1, 1, 1],
          salaryData: [59700, 60000, 59400, 59700, 60000],
          photo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.squarespace-cdn.com%2Fcontent%2Fv1%2F5747b95c8a65e22d87e2be51%2F1678346232026-9Y97VT0A8RUVS2D6ZDGT%2F8C2A5953-Boston%2BHeadshot%2BPhotographer%2B-%2BGiovanni%2BThe%2BPhotograher%2B-%2BDawn.jpg&f=1&nofb=1&ipt=78c6286fd99155cf7e984db240734c29d3ce4d8136e52894a9337d568feb358f",
          review: {
            score: 7,
            reviewer: "Zanele Khumalo",
            comments: "Good sales performance, can improve on follow-ups."
          }
        },
        {
          id: 5,
          name: "Zanele Khumalo",
          position: "Marketing Specialist",
          department: "Marketing",
          finalSalary: 57850,
          attendanceRate: 80,
          attendanceData: [1, 1, 0, 1, 1],
          salaryData: [57850, 58000, 57700, 57850, 58100],
          photo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.squarespace-cdn.com%2Fcontent%2Fv1%2F6204821bfe06b76898b431c5%2F1661872946038-HFUT1IX9DB99YK644R7F%2FAW5A3965%2Bcopy.jpg&f=1&nofb=1&ipt=3b7d1f942baf6391934f116c08e50872e3351bbb559d93ef073b062c5e5f493d",
          review: {
            score: 8,
            reviewer: "Keshav Naidoo",
            comments: "Creative marketing ideas and strong teamwork."
          }
        },
        {
          id: 6,
          name: "Sipho Zulu",
          position: "UI/UX Designer",
          department: "Design",
          finalSalary: 64800,
          attendanceRate: 80,
          attendanceData: [1, 1, 0, 1, 1],
          salaryData: [64800, 65000, 64600, 64800, 65100],
          photo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.showit.co%2F1200%2FA4eQ9dEARFywLp4hra70LQ%2F82976%2Fjanel-lee_photography_cincinnati_ohio_professional_headshots_personal_branding_justin_england.jpg&f=1&nofb=1&ipt=5d36675c84a1f62f43ebf2c9eac19fd05e9752c2d8261a6fad288fb9894547b1",
          review: {
            score: 7,
            reviewer: "Naledi Moeketsi",
            comments: "Strong design skills and attention to user experience."
          }
        },
        {
          id: 7,
          name: "Naledi Moeketsi",
          position: "DevOps Engineer",
          department: "IT",
          finalSalary: 71800,
          attendanceRate: 80,
          attendanceData: [1, 1, 1, 0, 1],
          salaryData: [71800, 72000, 71600, 71800, 72100],
          photo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.showit.co%2F1200%2FpWdEaN6EQOSy86ZaABriZQ%2F181238%2Fbest_metro_atlanta_headshot_photographer.jpg&f=1&nofb=1&ipt=4401394f040cf3070f2bb5f741f316520fcf7a5cefe8baa4ea8f16414022d66a",
          review: {
            score: 8,
            reviewer: "Sipho Zulu",
            comments: "Excellent at automating processes and ensuring system reliability."
          }
        },
        {
          id: 8,
          name: "Farai Gumbo",
          position: "Content Strategist",
          department: "Marketing",
          finalSalary: 56000,
          attendanceRate: 80,
          attendanceData: [1, 0, 1, 1, 1],
          salaryData: [56000, 56200, 55800, 56000, 56300],
          photo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.bethesdaheadshots.com%2Fwp-content%2Fuploads%2F2020%2F02%2FJonathan-Business-Headshot.jpg&f=1&nofb=1&ipt=1d41e3f16cb5d12b8d551c6deda32d935f59b6b1603db3efdaa7dfa81bc9a5fb",
          review: {
            score: 7,
            reviewer: "Zanele Khumalo",
            comments: "Creative content ideas and good collaboration with marketing."
          }
        },
        {
          id: 9,
          name: "Karabo Dlamini",
          position: "Accountant",
          department: "Finance",
          finalSalary: 61500,
          attendanceRate: 80,
          attendanceData: [1, 1, 1, 0, 1],
          salaryData: [61500, 61700, 61300, 61500, 61800],
          photo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F0c%2F2e%2F5c%2F0c2e5c6ae0393845bf3a4c159c933f03.jpg&f=1&nofb=1&ipt=caac82885de61295d37418de841d54ee5caf28178b3edad88b79f06243602572",
          review: {
            score: 8,
            reviewer: "Fatima Patel",
            comments: "Accurate financial reporting and strong analytical skills."
          }
        },
        {
          id: 10,
          name: "Fatima Patel",
          position: "Customer Support Lead",
          department: "Support",
          finalSalary: 57750,
          attendanceRate: 80,
          attendanceData: [1, 1, 0, 1, 1],
          salaryData: [57750, 58000, 57500, 57750, 58000],
          photo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.freepik.com%2Fpremium-photo%2Fprofessional-indian-female-headshots-business-corporate-women_203363-204.jpg&f=1&nofb=1&ipt=133343285b9319e5817f59a044ff70d6c13fa86b7225083ca9799ae20bd6a8bc",
          review: {
            score: 9,
            reviewer: "Karabo Dlamini",
            comments: "Excellent customer support leadership and problem-solving."
          }
        }
      ]
    }
  },
  mounted() {
    this.createCharts()
  },
  methods: {
    createCharts() {
      this.employees.forEach((employee) => {
        const attendanceCtx = document.getElementById(`attendance${employee.id}`)
        if (attendanceCtx) {
          new Chart(attendanceCtx, {
            type: 'line',
            data: {
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
              datasets: [{
                label: 'Attendance',
                data: employee.attendanceData,
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.3,
                fill: true
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                title: { display: true, text: 'Weekly Attendance', font: { size: 10 } }
              },
              scales: {
                x: { ticks: { font: { size: 8 } } },
                y: {
                  min: 0,
                  max: 1,
                  ticks: {
                    font: { size: 8 },
                    callback: (value) => (value === 1 ? 'Present' : 'Absent')
                  }
                }
              }
            }
          })
        }

        const payrollCtx = document.getElementById(`payroll${employee.id}`)
        if (payrollCtx) {
          new Chart(payrollCtx, {
            type: 'line',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
              datasets: [{
                label: 'Salary',
                data: employee.salaryData,
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                tension: 0.3,
                fill: true
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                title: { display: true, text: 'Monthly Salary', font: { size: 10 } }
              },
              scales: {
                x: { ticks: { font: { size: 8 } } },
                y: {
                  ticks: {
                    font: { size: 8 },
                    callback: (value) => 'R' + value.toLocaleString()
                  }
                }
              }
            }
          })
        }
      })
    }
  }
}
</script>
