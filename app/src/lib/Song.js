import Observe from './Observe'

class Song extends Observe {
    constructor(list) {
        super()
        this.song = null
        this.list = list
    }

    play(item) {
        this.song = item
    }

    pushSong() {

    }
}
