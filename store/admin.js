// eslint-disable
import cookie from 'vue-cookie'
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
      cookie.set('admin', admin.user.uid, 365)
      commit('setAdmin', { id: admin.user.uid })
      commit('setError', null, { root: true })
    } catch (error) {
      // error logic here
      commit('setError', error, { root: true })
      throw error
    }
  },
  getUid ({ commit }) {
    const user = cookie.get('admin')
    commit('setAdmin', { id: user })
    return user || null
  },
  async logOut ({ commit }) {
    await this.$fireAuth.signOut()
    cookie.set('admin', null, 365)
    commit('setAdmin', null)
  }
}
