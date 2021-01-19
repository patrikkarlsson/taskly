import { readonly, reactive } from 'vue'

const state = reactive({
  isLoggedIn: false,
})

const verifyUser = () => {
}

const signIn = () => {
  state.isLoggedIn = true
}

const signOut = () => {
  state.isLoggedIn = false
}

export default readonly({
  state,
  verifyUser,
  signIn,
  signOut,
})
