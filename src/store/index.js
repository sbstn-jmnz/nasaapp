import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const APOD_ENDPOINT = "https://api.nasa.gov/planetary/apod?api_key=MJzDA7zAmQxkgAfgu1fQgQ8W8VLZDEFQLD0LIuVV"

export default new Vuex.Store({
  state: {
    apod: {}
  },
  mutations: {
    GET_APOD(state, apod) { state.apod = apod }
  },
  actions: {
    getApod({ commit }, date = null) {
      let queryDate = date ? date : new Date().toISOString().substr(0, 10)
      axios
        .get(`${APOD_ENDPOINT}&date=${queryDate}`)
        .then((response) => {
          commit('GET_APOD', response.data)
        })
        .catch(() => {
          let backup = { url: 'https://apod.nasa.gov/apod/image/2007/NEOWISEBelowBigDipper-7-16-2020-TomMasterson1081.jpg' }
          commit('GET_APOD', backup)
        })
    }
  },
  modules: {
  }
})
