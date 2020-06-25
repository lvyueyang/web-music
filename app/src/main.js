import Vue from 'vue'
import App from './App'
import Button from './components/Button'
import utils from './util'
import Song from './lib/Song'

Vue.component('Button', Button)

Vue.config.productionTip = false

// 添加全局方法
Vue.prototype.$utils = utils
Vue.prototype.$song = new Song()

new Vue({
    render: h => h(App),
    data: {},
    mounted() {
    },
    methods: {}
}).$mount('#app')
