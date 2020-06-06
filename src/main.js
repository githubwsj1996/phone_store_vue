import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant, {NoticeBar} from 'vant'
import 'vant/lib/index.css'
import './plugins/vant.js'

Vue.use(Vant)
Vue.use(NoticeBar)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
