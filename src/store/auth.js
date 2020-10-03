import * as fb from './../firebase'

const state = {
  isAuthenticated: false,
}

const getters = {
  isAuthenticated: (state) => state.isAuthenticated,
}

const actions = {
  async login({ dispatch, commit }, { email, password }) {
    const { user } = await fb.auth.signInWithEmailAndPassword(email, password)
    if (user) {
      commit('setAsAuthenticated', true)
      dispatch('user/fetch', user, { root: true })
    }
  },
  async logout({ dispatch, commit }) {
    await fb.auth.signOut()
    dispatch('user/resetCurrentUser', null, { root: true })
    commit('setAsAuthenticated', false)
  },
  async signup({ dispatch, commit }, { email, password, name, title }) {
    try {
      const { user } = await fb.auth.createUserWithEmailAndPassword(email, password)

      await fb.db.ref('users/' + user.uid).set({
        name: name,
        title: title
      })

      commit('setAsAuthenticated', true)
      dispatch('user/fetch', user, { root: true })
    } catch (err) {
      console.log(err)
    }
  },
  authenticated({ commit }, isAuthenticated) {
    commit('setAsAuthenticated', isAuthenticated)
  },
}

const mutations = {
  setAsAuthenticated(state, authenticated) {
    state.isAuthenticated = authenticated
  },
}

export default {
  namespaced: true,
  mutations,
  getters,
  actions,
  state,
}