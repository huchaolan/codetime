import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.use(Vuex)
Vue.config.productionTip = false

const store = new Vuex.Store({
  state:{
    count:0
  },
  mutations:{
    increase(state,val){
      state.count= state.count+val;
    }
  },
  actions:{
    increase({commit}) {
      setTimeout(()=>{
        commit('increase',2)
      },3000);
    }
  },
  getters:{
    increaseDouble(state) {
      return state.count*2;
    }
  }
})
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
