import Vue from 'vue'
import App from './App.vue'
import store from './store'
import MainModal from '@/components/MainModal.vue'
import './styles/index.scss'

Vue.component('MainModal', MainModal)
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
