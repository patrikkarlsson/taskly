import * as fb from './../firebase'

const state = {
  currentUser: null,
}

const getters = {
  currentUser: (state) => state.currentUser,
}

const actions = {
  async fetch({ commit, dispatch }, user) {
    const currentUser = await fb.db.ref('users/' + fb.auth.currentUser.uid).once('value')
    if (currentUser.val()) {
      commit('setCurrentUser', currentUser.val())
      dispatch('auth/authenticated', true, { root: true })
    }
  }, // eslint-disable-next-line
  async update({}, user) {
    const { name, title } = user
    var updates = {}
    updates['/users/' + fb.auth.currentUser.uid] = { name, title }
    await fb.db.ref().update(updates)
  },
  resetCurrentUser({ commit }) {
    commit('setCurrentUser', null)
  }
}

const mutations = {
  setCurrentUser(state, currentUser) {
    state.currentUser = currentUser
  },
}

export default {
  namespaced: true,
  mutations,
  getters,
  actions,
  state,
}