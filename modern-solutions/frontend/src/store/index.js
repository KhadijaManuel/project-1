import axios from 'axios';
import { createStore } from 'vuex';

export default createStore({
  state: {
    payrollData: [],  // Store payroll data
    error: null,  // Store any error messages
  },
  getters: {
    // Getter to access payroll data
    getPayrollData: (state) => state.payrollData,
    
    // Getter to access error messages
    getError: (state) => state.error,
  },
  mutations: {
    // Mutation to set payroll data into state
    setPayrollData(state, payrollData) {
      state.payrollData = payrollData;
    },

    // Mutation to set error message into state
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    // Action to fetch payroll data from the backend
    async fetchPayrollData({ commit }) {
      try {
        // Axios request to the backend API to fetch payroll data
        const res = await axios.get('http://localhost:5000/payroll');  // Make sure this matches your backend route

        // Commit the data to the Vuex store if the request is successful
        commit('setPayrollData', res.data);
      } catch (error) {
        // Commit any error message if the request fails
        commit('setError', error.message);
      }
    },
  },
  modules: {},
});
