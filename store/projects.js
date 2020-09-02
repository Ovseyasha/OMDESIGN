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
      commit('setError', error)
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
      // const ext = fileName.slice(fileName.lastIndexOf('.'))
      const storages = await this.$fireStorage.ref(`projects/${key}/bg/${fileName}`).put(payload.img)
      const imageUrl = await storages.ref.getDownloadURL()
      await this.$fireDb.ref('projects').child(key).update({ img: imageUrl, fileName })
      // ---------------------- SLIDER -------------------------------------------
      for (let i = 0; i < newProject.imgs.length; i++) {
        if (typeof (newProject.imgs[i].img) !== 'string') {
          const slideName = Math.random() + newProject.imgs[i].img.name
          const slideFile = newProject.imgs[i].img
          const storagesSlide = await this.$fireStorage.ref(`projects/${key}/slides/${slideName}`).put(slideFile)
          const slideUrl = await storagesSlide.ref.getDownloadURL()
          const index = i
          const title = newProject.imgs[i].title
          newProject.imgs[i].fileName = slideName
          await this.$fireDb.ref(`projects/${key}/imgs/${index}`).update({ img: slideUrl, title, fileName: slideName })
        }
      }
      // done logic here
      commit('addNewService', {
        ...newProject,
        id: project.key
      })
    } catch (error) {
      commit('setError', error)
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
        const storages = await this.$fireStorage.ref(`projects/${id}/bg/${fileName}`).put(newProject.img)
        const imageUrl = await storages.ref.getDownloadURL()
        newProject.img = imageUrl
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
          const storagesSlide = await this.$fireStorage.ref(`projects/${id}/slides/${slideName}`).put(slideFile)
          const slideUrl = await storagesSlide.ref.getDownloadURL()
          newProject.imgs[i].img = slideUrl
          newProject.imgs[i].fileName = slideName
        }
      }
      await this.$fireDb.ref('projects').child(id).update(newProject)
      dispatch('projects/LoadProjects')
    } catch (error) {
      commit('setError', error)
      throw error
    }
  },
  async deleteProjectById ({ commit, dispatch }, payload) {
    try {
      // здесь отправить на сервер
      const id = payload
      await this.$fireDb.ref('projects').child(id).remove()
      dispatch('projects/LoadProjects')
    } catch (error) {
      commit('setError', error)
      throw error
    }
  },
  async loadProjectById ({ commit }, payload) {
    try {
      // здесь отправить на сервер
      const id = payload
      const loadProject = (await this.$fireDb.ref('projects').child(id).once('value')).val()
      commit('loadProjectById', loadProject)
    } catch (error) {
      commit('setError', error)
      throw error
    }
  },
  async meta ({ commit }) {
    try {
      const meta = (await this.$fireDb.ref('meta').child('projects').once('value')).val()
      commit('meta', meta)
    } catch (error) {
      commit('setError', error)
      throw error
    }
  }
}
