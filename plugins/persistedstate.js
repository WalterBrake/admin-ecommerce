import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'

export default ({store, req}) => {
  createPersistedState({
      key: 'tokenSession',
      paths: ['auth'],
      storage: {
        getItem: (key) => {
          return Cookies.get(key)
        },
        setItem: (key, value) => Cookies.set(key, value, { expires: 365, secure: false }),
        removeItem: (key) => Cookies.remove(key)
      }
  })(store)
}