

export default {
  LOGIN (state, payload) {
    state.userId = payload.userId
    state.email = payload.email
    state.name = payload.name
    state.tokenSession = payload.tokenSession
  },
  REGISTER (state, payload) {
    console.log(payload)
    state.userId = payload.userId
    state.email = payload.email
    state.name = payload.name
    state.tokenSession = payload.tokenSession
  },
  LOGOUT (state) {
    state.userId = undefined
    state.email = undefined
    state.name = undefined
    state.tokenSession = undefined
  }
}
