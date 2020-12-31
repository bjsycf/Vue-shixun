import Vue from 'vue'
import App from './App.vue'
import normalize from 'normalize.css'
import router from './router'
import waterfall from 'vue-waterfall2'

Vue.use(waterfall)
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue
new Vue({
    render: h => h(App),
    router,
}).$mount('#app')
