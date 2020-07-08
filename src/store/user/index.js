import { Cookie, enums, Lockr } from '../../utils'

const state = {
  authToken: {
    access_token: '',
    expires_in: '',
    timestamp: ''
  },
  rememberMe: ''
}

const getters = {
  getAccessToken: (state) => {
    if (!state.authToken.access_token) {
      state.authToken = Cookie.get(enums.USER.AUTH_TOKEN) ? JSON.parse(Cookie.get(enums.USER.AUTH_TOKEN)) : {}
    }
    return state.authToken
  },
  getRememberMe: (state) => {
    if (!state.rememberMe) {
      state.rememberMe = !!Cookie.get(enums.USER.REMEMBER_ME)
    }
  }
}

const mutations = {
  updateRememberMe (state) {
    state.rememberMe = !state.rememberMe
    if (state.rememberMe) {
      Cookie.set({
        key: enums.USER.REMEMBER_ME,
        value: state.rememberMe
      })
    } else {
      Cookie.delete({
        key: enums.USER.REMEMBER_ME
      })
    }
  },
  updateAuthToken (state, authToken) {
    state.authToken = authToken
    var expires = state.authToken.expires_in.split('m')[0] / 60 / 24
    var isRememberMe = !!Cookie.get(enums.USER.REMEMBER_ME)
    if (isRememberMe) {
      expires = 7
    }
    Cookie.set({
      key: enums.USER.AUTH_TOKEN,
      value: authToken,
      expires: expires
    })
  },
  deleteAuthToken (state) {
    Cookie.delete({
      key: enums.USER.AUTH_TOKEN
    })
    state.authToken = {}
  },
  deleteRememberMe (state) {
    Lockr.delete(enums.USER.REMEMBER_ME)
    state.rememberMe = ''
  }
}

const actions = {
  get_access_token ({ commit }, cb) {
    if (!state.authToken || state.authToken.access_token === '') {
      state.authToken = Cookie.get(enums.USER.AUTH_TOKEN) ? JSON.parse(Cookie.get(enums.USER.AUTH_TOKEN)) : {}
    }
    if (state.authToken) {
      if ((new Date().getTime() - state.authToken.timestamp) > state.authToken.expires_in) {
        commit('deleteAuthToken')
        commit('deleteRememberMe')
        window.location.href = 'http://localhost:8888/'
        // jumpLoginPage()
      }
    }
    cb && cb(state.authToken.access_token)
  },
  update_rememner_me ({ commit }) {
    commit('updateRememberMe')
  },
  update_auth_token ({ commit }, authToken) {
    commit('updateAuthToken', authToken)
  }
}

// jumpLoginPage () {
//   if (process.env.NODE_ENV === 'production') {
//     window.location.href = 'http//'
//   } else {
//     window.location.href = 'http://localhost:8888/'
//   }
// }

export default {
  state,
  getters,
  mutations,
  actions
}
