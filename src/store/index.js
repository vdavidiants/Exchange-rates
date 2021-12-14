import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    defaultCurrency: 'UAH',
    data: {},
    apiData: localStorage.getItem('currencies')
      ? JSON.parse(localStorage.getItem('currencies'))
      : null
  },
  getters: {
    exchangedRates(state) {
      return Object.keys(state.data)
    },
    getDefaultCurrency(state) {
      return state.defaultCurrency
    }
  },
  mutations: {
    setCurrencyRate(state, data) {
      state.data = data.changedRate
      state.defaultCurrency = data.payload
    },
    setApiData(state, data) {
      state.apiData = data
    },
    changeState(state, payload) {
      state.defaultCurrency = payload
    }
  },
  actions: {
    getCurrencyRate({ commit, state, dispatch }) {
      fetch(
        'https://openexchangerates.org/api/latest.json?app_id=4b968cc8f6124f91b0c33fe7a3f5fa9d'
      )
        .then(response => response.json())
        .then(data => {
          commit('setApiData', data)
          dispatch('setChangedData', state.defaultCurrency)
          localStorage.setItem('currencies', JSON.stringify(data))
        })
        .catch(err => console.log(err))
    },
    setChangedData({ commit, state }, payload = 'UAH') {
      const defaultRate = state.apiData.rates[payload]
      const changedRate = {}
      for (let currency in state.apiData.rates) {
        changedRate[currency] = state.apiData.rates[currency] / defaultRate
      }
      commit('setCurrencyRate', { changedRate, payload })
    }
  }
})

export default store
