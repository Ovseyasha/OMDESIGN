// eslint-disable
export const state = () => ({
  admin: null
})

export const getters = {
  admin (state) {
    return state.admin
  }
}
export const mutations = {
  setAdmin (state, payload) {
    state.admin = payload
  }
}
export const actions = {
  async login ({ commit }, payload) {
    try {
      const admin = await this.$fireAuth.signInWithEmailAndPassword(payload.email, payload.password)
      commit('setAdmin', { id: admin.user.uid })
      commit('setError', null, { root: true })
    } catch (error) {
      // error logic here
      commit('setError', error, { root: true })
      throw error
    }
  },
  getUid ({ commit }) {
    const user = this.$fireAuth.currentUser
    commit('setAdmin', { id: user ? user.uid : null })
    return user ? user.uid : null
  },
  async logOut ({ commit }) {
    await this.$fireAuth.signOut()
    commit('setAdmin', null)
  }
}
