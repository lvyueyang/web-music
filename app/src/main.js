import Vue from 'vue'
import App from './App'
import Button from './components/Button'
import utils from './util'

Vue.component('Button', Button)
Vue.config.productionTip = false
// 添加全局方法
Vue.prototype.$utils = utils

new Vue({
    render: h => h(App),
    data: {
        playing: {},
        list: [],
        songItem: null
    },
    mounted() {
        this.getList()
    },
    methods: {
        getList() {
            this.$utils.getJson('/jay-music/musicList.json').then(res => {
                console.log(res)
                this.list = res
            }).catch(e => {
                console.error(e)
            })
        },
        playSong(item) {

        }
    }
}).$mount('#app')
