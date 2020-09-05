export const state = () => ({
  error: null
})

export const getters = {
  error (state) {
    return state.error
  }
}
export const mutations = {
  setError (state, payload) {
    state.error = payload
  },
  clearError (state) {
    state.error = null
  }
}
export const actions = {
  setError ({ commit }, payload) {
    commit('setError', payload)
  },
  clearError ({ commit }) {
    commit('clearError')
  },
  async editMeta ({ commit }, payload) {
    try {
      await this.$fireDb.ref('meta').child(payload.type).set(payload.value)
      if (payload.type === 'about') {
        commit('about/metaAbout', { type: payload.type, value: payload.value })
      } else if (payload.type === 'main') {
        commit('about/metaMain', { type: payload.type, value: payload.value })
      } else {
        commit(`${payload.type}/meta`, { type: payload.type, value: payload.value })
      }
    } catch (error) {
    }
  }
}
