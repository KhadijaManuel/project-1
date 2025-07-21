  <template>
    <div class="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">

      <!-- Main Content -->
      <main class="flex-1 px-8 py-10">
        <!-- Page Title -->
        <div class="mb-8">
          <h2 class="text-3xl font-extrabold text-blue-700 dark:text-blue-400 tracking-tight">
            Employee Management
          </h2>
        </div>

        <!-- Employee Table -->
        <section class="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4 border-b pb-2 border-gray-300 dark:border-gray-600">
            Current Employees
          </h3>
          <EmployeeTableView :employees="employees" />
        </section>

        <!-- Centered Add New Employee Form -->
        <div class="flex justify-center">
          <section class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-2xl">
            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-6">Add New Employee</h3>
            <form @submit.prevent="addEmployee" class="space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input v-model="newEmployee.name" placeholder="Name" required class="input-style" />
                <input v-model="newEmployee.position" placeholder="Position" required class="input-style" />
                <input v-model="newEmployee.department" placeholder="Department" required class="input-style" />
                <input v-model="newEmployee.salary" type="number" placeholder="Salary" required class="input-style" />
                <input v-model="newEmployee.history" placeholder="Employment History" class="input-style md:col-span-2" />
                <input v-model="newEmployee.contact" placeholder="Contact" required class="input-style md:col-span-2" />
              </div>

              <div class="pt-4">
                <button
                  type="submit"
                  class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 shadow"
                >
                  Add Employee
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  </template>

  <script>
  import SidebarComp from '@/components/SidebarComp.vue';
  import EmployeeTableView from '@/components/EmployeeTableView.vue';

  export default {
    name: 'EmployeeManagement',
    components: {
      SidebarComp,
      EmployeeTableView
    },
    data() {
      return {
        employees: [],
        newEmployee: {
          name: '',
          position: '',
          department: '',
          salary: '',
          history: '',
          contact: ''
        }
      };
    },
    async mounted() {
      await this.fetchInfo();
    },
    methods: {
      async fetchInfo() {
        try {
          const response = await fetch('/data/employee_info.json');
          const info = await response.json();
          this.employees = info.employeeInformation.map(item => ({
            id: item.employeeId,
            name: item.name,
            position: item.position,
            department: item.department,
            salary: item.salary,
            history: item.employmentHistory,
            contact: item.contact,
            isEditing: false
          }));
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
      },
      addEmployee() {
        const newId = this.employees.length
          ? this.employees[this.employees.length - 1].id + 1
          : 1;

        this.employees.push({
          id: newId,
          ...this.newEmployee,
          isEditing: false
        });

        this.newEmployee = {
          name: '',
          position: '',
          department: '',
          salary: '',
          history: '',
          contact: ''
        };
      }
    }
  };
  </script>

  <style scoped>

  .input-style {
    
    @apply w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition;
  }
  </style>
