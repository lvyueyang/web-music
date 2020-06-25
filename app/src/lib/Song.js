import Observe from './Observe'

const BASE_URL = 'http://jaymusic.gitee.io/jaymusic'
export default class Song extends Observe {
    constructor(list = []) {
        super()
        this.list = list
        this.song = null
        this.audio = new Audio()
        this.playList = [] // 播放列表
    }

    // 播放
    play(item) {
        let audio = this.audio
        if (item) {
            this.song = item
            console.log(item)
            audio.src = BASE_URL + item.path
            console.dir(audio)
        }
        audio.play()
        this.emit('play', this.song)
    }

    // 停止
    pause() {
        this.audio.pause()
    }

    pushSong(list = []) {
        this.list.push(...list)
        this.emit('listChange', this.list)
    }
}
