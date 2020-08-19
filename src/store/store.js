import Vue from 'vue'
import Vuex from "vuex"
Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        authenticated: false,
        currentUser: null
      },
      getters: {
        getCurrentUser: state => {
            return state.currentUser
        }
      }
    ,
    mutations: {
        setAuthentication(state, status) {
            state.authenticated = status;
        },
        setCurrentUser(state, user) {
            state.currentUser = user;
        }
    }
  })
