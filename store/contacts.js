export const state = () => ({
  contacts: [],
  mails: [],
  mail: {},
  meta: ''
})

export const getters = {
  contacts (state) {
    return state.contacts
  },
  mails (state) {
    return state.mails
  },
  mail (state) {
    return state.mail
  },
  meta (state) {
    return state.meta
  }
}
export const mutations = {
  loadContacts (state, payload) {
    state.contacts = payload
  },
  loadMails (state, payload) {
    state.mails = payload
  },
  addMail (state, payload) {
    state.mails.push(payload)
  },
  getMailById (state, payload) {
    state.mail = payload
  },
  meta (state, payload) {
    state.meta = payload
  }
}
export const actions = {
  async loadContacts ({ commit }) {
    const id = '-MANQPK_xhzGbZt821xh'
    try {
      const contacts = await this.$fireDb.ref('contacts').once('value')
      const loadContacts = contacts.val()
      commit('loadContacts', loadContacts[id])
    } catch (error) {
      commit('setError', error.message, { root: true })
      throw error
    }
  },
  async editContacts ({ commit, dispatch }, payload) {
    const id = '-MANQPK_xhzGbZt821xh'
    try {
      const newContacts = payload.contacts
      if (payload.price !== null) {
        const fileName = payload.price.name
        const ext = fileName.slice(fileName.lastIndexOf('.'))
        const storages = await this.$fireStorage.ref(`contacts/price/${id}${ext}`).put(payload.price)
        const fileUrl = await storages.ref.getDownloadURL()
        newContacts.price = fileUrl
        newContacts.ext = ext
      }
      await this.$fireDb.ref('contacts').child(id).update(newContacts)
      dispatch('contacts/loadContacts')
    } catch (error) {
      // error logic here
      commit('setError', error.message, { root: true })
      throw error
    }
  },
  // MAILS
  async loadMails ({ commit }) {
    try {
      const mails = await this.$fireDb.ref('mails').once('value')
      const loadMails = mails.val()
      // console.log(loadServices)
      const mailsArr = []
      if (loadMails !== null) {
        Object.keys(loadMails).forEach((key) => {
          const s = loadMails[key]
          mailsArr.push({
            ...s,
            id: key
          })
        })
      }
      commit('loadMails', mailsArr)
    } catch (error) {
      commit('setError', error.message, { root: true })
      throw error
    }
  },
  async addMail ({ commit }, payload) {
    try {
      const newMail = payload
      newMail.state = 'new'
      const mails = await this.$fireDb.ref('mails').push(newMail)
      commit('addMail', {
        ...newMail,
        id: mails.key
      })
    } catch (error) {
      // error logic here
      commit('setError', error.message, { root: true })
      throw error
    }
  },
  async deleteMailById ({ commit, dispatch }, payload) {
    try {
      // здесь отправить на сервер
      const id = payload
      await this.$fireDb.ref('mails').child(id).remove()
      dispatch('contacts/loadMails')
    } catch (error) {
      // error logic here
      commit('setError', error.message, { root: true })
      throw error
    }
  },
  async getMailById ({ commit }, payload) {
    try {
      // здесь отправить на сервер
      const id = payload
      const mail = await this.$fireDb.ref('mails').child(id).once('value')
      // console.log(mail.val())
      commit('getMailById', mail.val())
    } catch (error) {
      // error logic here
      commit('setError', error.message, { root: true })
      throw error
    }
  },
  async readMsg ({ commit, dispatch }, payload) {
    // const id = '-MANQPK_xhzGbZt821xh'
    try {
      await this.$fireDb.ref('mails').child(payload).update({ state: 'read' })
      await dispatch.loadMails
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    }
  },
  async meta ({ commit }) {
    try {
      const meta = (await this.$fireDb.ref('meta').child('contacts').once('value')).val()
      commit('meta', meta)
    } catch (error) {
      commit('setError', error, { root: true })
      throw error
    }
  }
}
