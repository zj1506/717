import Vue from 'vue'
import App from './App.vue'
import router from './routes/routes'
import store from './store/store'
import './css/reset.css'
import './css/iconfont.css'
import './css/fontset.js'
import './css/swiper-3.3.1.min.js'
import axios from "axios";

Vue.prototype.$http=axios;
//开发环境使用，测试环境或者线上环境西湖掉
import "../mock/mock"

new Vue({
  el: '#app',
  data:{
  	sw:""
  },
  store,
  router,
  render: h => h(App)
})
