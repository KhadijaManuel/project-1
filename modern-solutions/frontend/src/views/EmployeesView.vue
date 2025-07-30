<template>
  <div class="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
    <main class="flex-1 px-8 py-10">
      <!-- Top Bar -->
      <div class="mb-8 flex justify-between items-center gap-4 flex-wrap">
        <h2 class="text-3xl font-extrabold text-blue-700 dark:text-blue-400 tracking-tight">
          Employee Management
        </h2>
        <div class="flex gap-3">
          <button
            @click="openAddModal"
            class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow"
          >
            Add Employee
          </button>
          <button
            @click="fetchEmployees"
            class="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow"
          >
             Refresh
          </button>
        </div>
      </div>

      <!-- Search Bar -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by name, email, or role..."
        class="w-full md:w-1/2 mb-6 px-4 py-2 border border-gray-300 rounded-md shadow-sm
               focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500
               dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
      />

      <!-- Employee Table -->
      <div
        class="overflow-x-auto rounded-lg shadow-lg border border-gray-300 dark:border-gray-700
               bg-white dark:bg-gray-800"
      >
        <table class="min-w-full text-gray-700 dark:text-gray-200">
          <thead>
            <tr class="bg-teal-600 text-white uppercase tracking-wider text-xs font-semibold">
              <th class="px-6 py-3 text-right">ID</th>
              <th class="px-6 py-3 text-left">Name</th>
              <th class="px-6 py-3 text-left">Role</th>
              <th class="px-6 py-3 text-left">Email</th>
              <th class="px-6 py-3 text-right">Salary</th>
              <th class="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="emp in filteredEmployees"
              :key="emp.employee_id"
              class="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700
                     hover:bg-teal-100 dark:hover:bg-teal-900 transition"
            >
              <td class="px-6 py-4 text-right font-mono text-sm">{{ emp.employee_id }}</td>
              <td class="px-6 py-4 text-left font-medium text-sm">{{ emp.first_name }} {{ emp.last_name }}</td>
              <td class="px-6 py-4 text-left text-sm">{{ emp.role }}</td>
              <td class="px-6 py-4 text-left text-sm lowercase">{{ emp.email }}</td>
              <td class="px-6 py-4 text-right font-semibold text-sm">
                {{
                  !isNaN(parseFloat(emp.salary))
                    ? '' + parseFloat(emp.salary).toFixed(2)
                    : emp.salary
                }}
              </td>
              <td class="px-6 py-4 text-center space-x-2">
                <button
                  @click="openEditModal(emp)"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-xs font-semibold transition"
                >
                  Edit
                </button>
                <button
                  @click="handleDelete(emp.employee_id)"
                  class="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md text-xs font-semibold transition"
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr v-if="filteredEmployees.length === 0">
              <td colspan="6" class="text-center py-6 text-gray-500 dark:text-gray-400 italic">
                No employees found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal Overlay -->
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <!-- Modal Card -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg p-6 relative">
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-6">
            {{ editMode ? 'Edit Employee' : 'Add New Employee' }}
          </h3>
          <form @submit.prevent="editMode ? updateEmployee() : addEmployee()" class="space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input v-model="form.first_name" placeholder="First Name" required class="input-style" />
              <input v-model="form.last_name" placeholder="Last Name" required class="input-style" />
              <input v-model="form.email" type="email" placeholder="Email" required class="input-style md:col-span-2" />
              <input v-model="form.role" placeholder="Role" required class="input-style" />
              <input v-model.number="form.salary" type="number" placeholder="Salary" required class="input-style" />
            </div>
            <div class="pt-4 flex gap-4">
              <button
                type="submit"
                class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
              >
                {{ editMode ? 'Update' : 'Add' }}
              </button>
              <button
                type="button"
                @click="closeModal"
                class="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employees: [],
      form: {
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        salary: ''
      },
      searchQuery: '',
      editMode: false,
      editId: null,
      showModal: false
    }
  },
  computed: {
    filteredEmployees() {
      if (!this.searchQuery) return this.employees
      const query = this.searchQuery.toLowerCase()
      return this.employees.filter(emp =>
        emp.first_name.toLowerCase().includes(query) ||
        emp.last_name.toLowerCase().includes(query) ||
        emp.email.toLowerCase().includes(query) ||
        emp.role.toLowerCase().includes(query)
      )
    }
  },
  mounted() {
    this.fetchEmployees()
  },
  methods: {
    async fetchEmployees() {
      try {
        const res = await fetch('http://localhost:5000/employees')
        const data = await res.json()
        this.employees = data
      } catch (err) {
        console.error('Fetch error:', err)
      }
    },
    openAddModal() {
      this.resetForm()
      this.editMode = false
      this.showModal = true
    },
    openEditModal(emp) {
      this.editMode = true
      this.editId = emp.employee_id
      this.form = { ...emp }
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      this.cancelEdit()
    },
    async addEmployee() {
      try {
        const res = await fetch('http://localhost:5000/employees', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form)
        })
        const data = await res.json()
        if (!res.ok) return alert(data.message)
        alert(data.message)
        await this.fetchEmployees()
        this.closeModal()
      } catch (err) {
        console.error('Add error:', err)
      }
    },
    async updateEmployee() {
      try {
        const res = await fetch(`http://localhost:5000/employees/${this.editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form)
        })
        const data = await res.json()
        if (!res.ok) return alert(data.message)
        alert(data.message)
        await this.fetchEmployees()
        this.closeModal()
      } catch (err) {
        console.error('Update error:', err)
      }
    },
    async handleDelete(id) {
      if (!confirm('Delete this employee?')) return
      try {
        const res = await fetch(`http://localhost:5000/employees/${id}`, { method: 'DELETE' })
        const data = await res.json()
        if (!res.ok) return alert(data.message)
        alert(data.message)
        this.fetchEmployees()
      } catch (err) {
        console.error('Delete error:', err)
      }
    },
    cancelEdit() {
      this.editMode = false
      this.editId = null
      this.resetForm()
    },
    resetForm() {
      this.form = {
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        salary: ''
      }
    }
  }
}
</script>

<style scoped>
.input-style {
  @apply w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition;
}
</style>
