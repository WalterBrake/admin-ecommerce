export default {

  loggedIn: state => {
    console.log(state)
    return !!(state && state.tokenSession)
  }
}
