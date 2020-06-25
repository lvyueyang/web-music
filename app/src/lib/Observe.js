export default class Observe {
    constructor() {
        this.observes = {}
    }

    on(name, cb) {
        if (!this.observes[name]) {
            this.observes[name] = []
        }
        this.observes[name].push(cb)
    }

    once(name, cb) {
        let ccb = (...args) => {
            cb.apply(...args)
            this.off(name, ccb)
        }
        this.on(name, ccb)

    }

    off(name, cb) {
        if (!this.observes[name]) {
            return
        }
        const index = this.observes.indexOf(cb)
        this.observes[name].splice(index, 1)
    }

    emit(name, ...args) {
        if (!this.observes[name]) {
            return
        }
        if (typeof this.observes[name] === 'function') {
            this.observes[name](...args)
        }
        if (Array.isArray(this.observes[name])) {
            this.observes[name].forEach(cb => {
                cb(...args)
            })
        }
    }
}
