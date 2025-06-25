import axios from 'axios';
import { createStore } from 'vuex';

export default createStore({
  state: {
    payrollData: [], // Statefor the  payroll data
    error: null, // State that handesl error messagee 
  },
  getters: {
    getPayrollData: (state) => {
      return state.payrollData; // Getter to access payroll data
    },
    getError: (state) => {
      return state.error; // Getter to access error messages
    }
  },
  mutations: {
    setPayrollData(state, payrollData) {
      state.payrollData = payrollData; //set payroll data
    },
    setError(state, error) {
      state.error = error; // set error messages
    },
  },
  actions: {
    async fetchPayrollData({ commit }){ 
      try {
        const res = await axios.get('/data/payroll_data.json'); // Fetch payroll data from JSON file in data folder   
        commit('setPayrollData', res.data.payrollData); // Commit payroll data to state/local store 
      } catch (error) {
        commit('setError', error.message); // Commit error message
      }
    }
  },
  modules: {
  }
});
