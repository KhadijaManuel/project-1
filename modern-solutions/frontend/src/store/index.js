import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    payrollData: [],
    error: null,
  },
  getters: {
    getPayrollData: (state) => state.payrollData,
    getError: (state) => state.error,
  },
  mutations: {
    setPayrollData(state, data) {
      state.payrollData = data;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchPayrollData({ commit }) {
      try {
        const res = await axios.get('http://localhost:5000/payroll');
        commit('setPayrollData', res.data);
      } catch (err) {
        commit('setError', err.message);
      }
    },
    async deletePayroll({ dispatch }, id) {
      try {
        await axios.delete(`http://localhost:5000/payroll/${id}`);
        dispatch('fetchPayrollData'); // refresh
      } catch (err) {
        console.error(err);
      }
    },
  },
  modules: {},
});
