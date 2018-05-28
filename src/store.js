import Vue from 'vue'
import Vuex from 'vuex'
import {HTTP} from './httpCommon'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    flow: {}
  },
  mutations: {
    SET_FLOW (state, obj) {
      state.flow = obj
    }
  },
  getters: {
    getFlow: state => state.flow
  },
  actions: {
    listFlow ({ commit }) {
      return new Promise((resolve) => {
        HTTP.get('/flow.json').then(({ data }) => {
          commit('SET_FLOW', data)
          resolve()
        })
      })
    }
  }
})
