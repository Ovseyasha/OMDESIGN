import Compressor from 'compressorjs'
export const state = () => ({
  projects: [],
  project: null,
  meta: ''
})

export const getters = {
  projects (state) {
    return state.projects
  },
  project (state) {
    return state.project
  },
  meta (state) {
    return state.meta
  },
  getById: state => (id) => {
    return state.projects.find(p => p.id === id)
  }
}
export const mutations = {
  LoadProjects (state, payload) {
    state.projects = payload
  },
  addNewService (state, payload) {
    state.projects.push(payload)
  },
  loadProjectById (state, payload) {
    state.project = payload
  },
  meta (state, payload) {
    state.meta = payload
  }
}
export const actions = {
  async LoadProjects ({ commit }) {
    try {
      const loadProjects = (await this.$fireDb.ref('projects').once('value')).val()
      const projectsArray = []
      if (loadProjects !== null) {
        Object.keys(loadProjects).forEach((key) => {
          const s = loadProjects[key]
          projectsArray.push({
            ...s,
            id: key
          })
        })
      }
      commit('LoadProjects', projectsArray)
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    }
  },
  async addNewPorject ({ commit }, payload) {
    try {
      // здесь отправить на сервер
      const newProject = payload.project
      const project = await this.$fireDb.ref('projects').push(newProject)
      // ---------------------- BG -------------------------------------------
      const key = project.key
      const fileName = payload.img.name
      const ext = fileName.slice(fileName.lastIndexOf('.'))
      const firebase = this.$fireStorage
      const db = this.$fireDb
      // eslint-disable-next-line
      new Compressor(payload.img, {
        quality: 0.6,
        async success (result) {
          const storages = await firebase.ref(`projects/${key}/bg/${fileName}`).put(result)
          const imageUrl = await storages.ref.getDownloadURL()
          await db.ref(`projects/${key}`).update({ img: imageUrl, fileName })
        }
      })
      if (ext === '.gif') {
        const storages = await this.$fireStorage.ref(`projects/${key}/bg/${fileName}`).put(payload.img)
        const imageUrl = await storages.ref.getDownloadURL()
        await this.$fireDb.ref(`projects/${key}`).update({ img: imageUrl, fileName })
      }
      // ---------------------- SLIDER -------------------------------------------
      for (let i = 0; i < newProject.imgs.length; i++) {
        if (typeof (newProject.imgs[i].img) !== 'string') {
          const slideName = Math.random() + newProject.imgs[i].img.name
          const slideFile = newProject.imgs[i].img
          const ext = slideName.slice(slideName.lastIndexOf('.'))
          const firebase = this.$fireStorage
          const db = this.$fireDb
          // eslint-disable-next-line
          new Compressor(slideFile, {
            quality: 0.8,
            async success (result) {
              const storagesSlide = await firebase.ref(`projects/${key}/slides/${slideName}`).put(result)
              const slideUrl = await storagesSlide.ref.getDownloadURL()
              const index = i
              const title = newProject.imgs[i].title
              newProject.imgs[i].fileName = slideName
              await db.ref(`projects/${key}/imgs/${index}`).update({ img: slideUrl, title, fileName: slideName })
            }
          })
          if (ext === '.gif') {
            const storagesSlide = await this.$fireStorage.ref(`projects/${key}/slides/${slideName}`).put(slideFile)
            const slideUrl = await storagesSlide.ref.getDownloadURL()
            const index = i
            const title = newProject.imgs[i].title
            newProject.imgs[i].fileName = slideName
            await this.$fireDb.ref(`projects/${key}/imgs/${index}`).update({ img: slideUrl, title, fileName: slideName })
          }
        }
      }
      // done logic here
      commit('addNewService', {
        ...newProject,
        id: project.key
      })
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    }
  },
  async editProject ({ commit, getters, dispatch }, payload) {
    try {
      // здесь отправить на сервер
      const newProject = payload.project
      const id = payload.id
      // ---------------------- BG -------------------------------------------
      if (typeof (newProject.img) !== 'string') {
        // const fileName = newProject.img.name
        await dispatch('loadProjectById', id)
        const fileName = getters.project.fileName
        const ext = fileName.slice(fileName.lastIndexOf('.'))
        const firebase = this.$fireStorage
        const db = this.$fireDb
        // eslint-disable-next-line
        new Compressor(newProject.img, {
          quality: 0.6,
          async success (result) {
            const storages = await firebase.ref(`projects/${id}/bg/${fileName}`).put(result)
            const imageUrl = await storages.ref.getDownloadURL()
            await db.ref(`projects/${id}`).update({ img: imageUrl, fileName })
          }
        })
        if (ext === '.gif') {
          const storages = await this.$fireStorage.ref(`projects/${id}/bg/${fileName}`).put(newProject.img)
          const imageUrl = await storages.ref.getDownloadURL()
          newProject.img = imageUrl
        }
      }
      // ---------------------- SLIDER -------------------------------------------
      if (payload.deletedName.length) {
        for (let i = 0; i < payload.deletedName.length; i++) {
          const storage = this.$fireStorage
          const storageRef = storage.ref()
          const desertRef = storageRef.child(`projects/${id}/slides/${payload.deletedName[i]}`)
          await desertRef.delete()
        }
      }
      for (let i = 0; i < newProject.imgs.length; i++) {
        if (typeof (newProject.imgs[i].img) !== 'string') {
          const slideName = Math.random() + newProject.imgs[i].fileName
          const slideFile = newProject.imgs[i].img
          const ext = slideName.slice(slideName.lastIndexOf('.'))
          const firebase = this.$fireStorage
          const db = this.$fireDb
          // eslint-disable-next-line
          new Compressor(slideFile, {
            quality: 0.8,
            async success (result) {
              const storagesSlide = await firebase.ref(`projects/${id}/slides/${slideName}`).put(result)
              const slideUrl = await storagesSlide.ref.getDownloadURL()
              newProject.imgs[i].img = slideUrl
              newProject.imgs[i].fileName = slideName
              await db.ref(`projects/${id}/imgs/${i}`).update({ img: slideUrl, title: newProject.imgs[i].title, fileName: slideName })
            }
          })
          if (ext === '.gif') {
            const storagesSlide = await this.$fireStorage.ref(`projects/${id}/slides/${slideName}`).put(slideFile)
            const slideUrl = await storagesSlide.ref.getDownloadURL()
            newProject.imgs[i].img = slideUrl
            newProject.imgs[i].fileName = slideName
          }
        }
      }
      await this.$fireDb.ref('projects').child(id).update(newProject)
      dispatch('LoadProjects')
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    }
  },
  async deleteProjectById ({ commit, dispatch }, payload) {
    try {
      // здесь отправить на сервер
      const id = payload
      const project = (await this.$fireDb.ref('projects').child(id).once('value')).val()
      await this.$fireStorage.ref().child(`projects/${id}/bg/${project.fileName}`).delete()
      project.imgs.forEach(async (img) => {
        await this.$fireStorage.ref().child(`projects/${id}/slides/${img.fileName}`).delete()
      })
      await this.$fireDb.ref('projects').child(id).remove()
      dispatch('LoadProjects')
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    }
  },
  async loadProjectById ({ commit }, payload) {
    try {
      // здесь отправить на сервер
      const id = payload
      const loadProject = (await this.$fireDb.ref(`projects/${id}`).once('value')).val()
      commit('loadProjectById', loadProject)
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    }
  },
  async meta ({ commit }) {
    try {
      const meta = (await this.$fireDb.ref('meta').child('projects').once('value')).val()
      commit('meta', { type: 'projects', value: meta })
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    }
  }
}
