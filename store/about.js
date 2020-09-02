// eslint-disable
const id = '-MA0mY_wLX4ydQIAna1e'
export const state = () => ({
  about: null,
  metaMain: '',
  metaAbout: ''
})

export const getters = {
  img (state) {
    return state.about.img
  },
  skills (state) {
    return state.about.skills
  },
  about (state) {
    return state.about.about
  },
  all (state) {
    return state.about
  },
  getMetaMain (state) {
    return state.metaMain
  },
  getMetaAbout (state) {
    return state.metaAbout
  }
}
export const mutations = {
  loadAbout (state, payload) {
    state.about = payload
  },
  saveAs (state, payload) {
    state.about = payload
  },
  metaMain (state, payload) {
    state.metaMain = payload
  },
  metaAbout (state, payload) {
    state.metaAbout = payload
  }
}
export const actions = {

  async update ({ commit, getters, dispatch }, payload) {
    try {
      // avatar
      if (typeof (payload.img) !== 'string') {
        const fileName = payload.img.name
        const Dstorage = this.$fireStorage
        const storageRef = Dstorage.ref()
        const desertRef = storageRef.child(`about/avatar/${id}__${getters.all.imgName}`)
        await desertRef.delete()
        await this.$fireStorage.ref(`about/avatar/${id}__${payload.imgName}`).delete()
        const storage = await this.$fireStorage.ref(`about/avatar/${id}__${fileName}`).put(payload.img)
        const imgUrl = await storage.ref.getDownloadURL()
        payload.img = imgUrl
        payload.imgName = fileName
      }
      // skills
      if (payload.names.length) {
        for (let j = 0; j < payload.names.length; j++) {
          const Dstorage = this.$fireStorage
          const storageRef = Dstorage.ref()
          const desertRef = storageRef.child(`about/skills/${id}__${payload.names[j]}`)
          await desertRef.delete()
          payload.names = []
        }
      }
      for (let i = 0; i < payload.skills.length; i++) {
        if (typeof (payload.skills[i].img) !== 'string') {
          const skillName = payload.skills[i].img.name
          const skillFile = payload.skills[i].img
          const storageSkils = await this.$fireStorage.ref(`about/skills/${id}__${skillName}`).put(skillFile)
          const skillUrl = await storageSkils.ref.getDownloadURL()
          payload.skills[i].img = skillUrl
        }
      }
      // соединяет то что есть и оюновляет то что добавили
      const updateData = {
        ...getters.all,
        ...payload
      }
      await this.$fireDb.ref(`about/${id}`).update(updateData)
    } catch (error) {
      commit('setError', error)
      throw error
    }
  },
  async loadAbout ({ commit }, payload) {
    try {
      // done logic here
      const about = (await this.$fireDb.ref('about').once('value')).val()
      commit('loadAbout', about[id])
    } catch (error) {
      commit('setError', error)
      throw error
    }
  },
  async metaMain ({ commit }) {
    try {
      const meta = (await this.$fireDb.ref('meta').child('main').once('value')).val()
      commit('metaMain', meta)
    } catch (error) {
      commit('setError', error)
      throw error
    }
  },
  async metaAbout ({ commit }) {
    try {
      const meta = (await this.$fireDb.ref('meta').child('about').once('value')).val()
      commit('metaAbout', meta)
    } catch (error) {
      commit('setError', error)
      throw error
    }
  }
}
