import Compressor from 'compressorjs'
export const state = () => ({
  services: [],
  service: null,
  meta: ''
})

export const getters = {
  services (state) {
    return state.services
  },
  servicesName (state) {
    const arrName = []
    for (let i = 0; i < state.services.length; i++) {
      arrName.push(state.services[i].title)
    }
    return arrName
  },
  service (state) {
    return state.service
  },
  meta (state) {
    return state.meta
  }
}
export const mutations = {
  addNewService (state, payload) {
    state.services.push(payload)
  },
  loadServices (state, payload) {
    state.services = payload
  },
  loadServiceById (state, payload) {
    state.service = payload
  },
  meta (state, payload) {
    state.meta = payload
  }
}
export const actions = {
  async loadServices ({ commit }) {
    try {
      const loadServices = (await this.$fireDb.ref('services').once('value')).val()
      const servicesArray = []
      if (loadServices !== null) {
        Object.keys(loadServices).forEach((key) => {
          const s = loadServices[key]
          servicesArray.push({
            ...s,
            id: key
          })
        })
      }
      commit('loadServices', servicesArray)
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    }
  },
  async addNewService ({ commit }, payload) {
    try {
      // здесь отправить на сервер
      const newService = payload.service
      const service = await this.$fireDb.ref('services').push(newService)
      const key = service.key
      const fileName = payload.img.name
      const ext = fileName.slice(fileName.lastIndexOf('.'))
      const firebase = this.$fireStorage
      const db = this.$fireDb
      let imageUrl = ''
      // eslint-disable-next-line
      new Compressor(payload.img, {
        quality: 0.6,
        async success (result) {
          const storages = await firebase.ref('services/bg/' + key + ext).put(result)
          imageUrl = await storages.ref.getDownloadURL()
          db.ref('services').child(key).update({ img: imageUrl, ext })
        }
      })
      if (ext === '.gif') {
        this.$fireStorage.ref('services/bg/' + key + ext).put(payload.img)
      }
      newService.img = imageUrl
      newService.ext = ext
      // done logic here
      commit('addNewService', {
        ...newService,
        id: service.key
      })
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    }
  },
  async editServices ({ commit, dispatch }, payload) {
    try {
      const id = payload.id
      const newService = payload.service
      if (typeof (newService.img) !== 'string') {
        const fileName = newService.img.name
        const ext = fileName.slice(fileName.lastIndexOf('.'))
        const firebase = this.$fireStorage
        const db = this.$fireDb
        // eslint-disable-next-line
        new Compressor(newService.img, {
          quality: 0.6,
          async success (result) {
            const storages = await firebase.ref('services/bg/' + id + ext).put(result)
            const imageUrl = await storages.ref.getDownloadURL()
            newService.img = imageUrl
            newService.ext = ext
            await db.ref('services').child(id).update({ img: imageUrl, ext })
          }
        })
        if (ext === '.gif') {
          const storages = await this.$fireStorage.ref('services/bg/' + id + ext).put(newService.img)
          const imageUrl = await storages.ref.getDownloadURL()
          newService.img = imageUrl
          newService.ext = ext
        }
      }
      await this.$fireDb.ref('services').child(id).update(newService)
      dispatch('loadServices')
    } catch (error) {
      // error logic here
      commit('setError', error, { root: true })
      throw error
    }
  },

  async deleteServicesById ({ commit, dispatch, getters }, payload) {
    try {
      // здесь отправить на сервер
      const id = payload
      await dispatch('loadServiceById', id)
      const s = getters.service
      const ext = s.ext
      await this.$fireStorage.ref().child(`services/bg/${id}${ext}`).delete()
      await this.$fireDb.ref('services').child(id).remove()
      dispatch('loadServices')
    } catch (error) {
      // error logic here
      commit('setError', error, { root: true })
      throw error
    }
  },
  async loadServiceById ({ commit }, payload) {
    try {
      // здесь отправить на сервер
      const id = payload
      const service = (await this.$fireDb.ref('services').child(id).once('value')).val()
      commit('loadServiceById', service)
    } catch (error) {
      // error logic here
      commit('setError', error, { root: true })
      throw error
    }
  },
  async meta ({ commit }) {
    try {
      const meta = (await this.$fireDb.ref('meta').child('services').once('value')).val()
      commit('meta', { type: 'services', value: meta })
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    }
  }
}
