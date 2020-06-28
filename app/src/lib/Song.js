import Observe from './Observe'

const BASE_URL = 'http://jaymusic.gitee.io/jaymusic'
export default class Song extends Observe {
    constructor(list = []) {
        super()
        this.list = list
        this.song = null
        this.audio = new Audio()
        this.mode = '1' // 0 顺序循环 1 随机播放 2 单曲循环
        this.playList = [] // 播放列表
        this.events()
    }

    // 播放
    play(item) {
        let audio = this.audio
        if (item) {
            if (this.song && this.song.songid === item.songid) {
                if (audio.paused) {
                    audio.play()
                } else {
                    this.pause()
                }
                return
            }
            this.song = item
            console.log(item)
            audio.src = BASE_URL + item.path
            console.dir(audio)
            audio.load()
        }
        audio.play()
        this.emit('play', this.song)
    }

    // 暂停
    pause() {
        this.audio.pause()
    }

    pushSong(list = []) {
        this.list.push(...list)
        this.emit('listChange', this.list)
    }

    id2index(id) {
        let index = null
        this.list.forEach((item, i) => {
            if (item.songid === id) {
                index = i
            }
        })
        return index
    }

    next() {
        const index = this.id2index(this.song.songid)
        let item
        if (index === this.list.length - 1) {
            item = this.list[0]
        } else {
            item = this.list[index + 1]
        }
        this.play(item)
    }

    prev() {
        const index = this.id2index(this.song.songid)
        let item
        if (index === 0) {
            item = this.list[this.list.length - 1]
        } else {
            item = this.list[index - 1]
        }
        this.play(item)
    }

    events() {
        this.audio.addEventListener('ended', event => {
            const {mode} = this
            // 顺序循环
            if (mode === '1') {
                this.next()
            }
            // 随机循环
            if (mode === '2') {
            }
            // 单曲循环
            if (mode === '3') {
            }
        })
    }

    cacheAudio(item = this.song) {
        window.localStorage.setItem('cacheAudio', JSON.stringify(item))
    }

    cacheProgress(item) {
        // window.localStorage.setItem('cacheProgress', JSON.stringify(item))
    }
}
