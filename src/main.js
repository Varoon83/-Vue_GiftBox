import Vue from 'vue'
import VueRouter from "vue-router"
import App from './App.vue'
import giftRoutes from "./routes/routes";
import axios from "axios";
import store from "./store/store";
import Vuelidate from "vuelidate";
import '@/assets/css/main.css'
import Toasted from 'vue-toasted';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue' 
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Navigation from './components/navigation'

Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.component('Navigation', Navigation);
Vue.use(Toasted, {
  duration: 9000,
  position: 'top-right',
  action : {
    text : 'Okay',
    onClick : (e, toastObject) => {
        toastObject.goAway(0);
    }
  }
})

Vue.config.productionTip = false;
Vue.prototype.$http = axios; 

const giftrouter = new VueRouter({
  routes:giftRoutes,
  mode:'history'
})


new Vue({
    render: h => h(App),
    router: giftrouter,
    store: store
}).$mount('#app')