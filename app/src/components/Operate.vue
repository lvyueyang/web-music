<template>
    <div class="music-operate">
        <div class="item prev" @click="$song.prev()">
            <i class="iconfont icon-skip-back-mini-fill"></i>
        </div>
        <div class="item" @click="handlerAudioPlay">
            <i class="iconfont icon-play-fill" v-if="!state.playing"></i>
            <i class="iconfont icon-pause-line" v-else></i>
        </div>
        <div class="item next" @click="$song.next()">
            <i class="iconfont icon-skip-forward-mini-fill"></i>
        </div>
        <div class="item" @click="handlerToggleMode">
            <i class="iconfont icon-repeat-fill sort-icon" v-if="mode.active === 1"></i>
            <i class="iconfont icon-order-play-line sort-icon" v-if="mode.active === 2"></i>
            <i class="iconfont icon-repeat-one-fill sort-icon" v-if="mode.active === 3"></i>
            <i class="iconfont icon-shuffle-line sort-icon" v-if="mode.active === 4"></i>
        </div>
        <div class="progress">
            <div class="info">
                <div class="name">{{item.title}}</div>
                <div class="time">{{duration.current | durationFormat}} / {{duration.total | durationFormat}}</div>
            </div>
            <div class="line">
                <div class="p" :style="{width: progress + '%'}">
                    <span></span>
                </div>
            </div>
        </div>
        <!--<div class="item">
            <i class="iconfont icon-add-fill add-icon"></i>
        </div>-->

        <!--<div class="item">
            <i class="iconfont icon-volume-down-line volume-icon"></i>
        </div>-->
    </div>
</template>
<script>
    export default {
        name: 'Operate',
        props: {},
        data() {
            return {
                state: {
                    playing: false
                },
                item: {},
                duration: {
                    total: 0,
                    current: 0,
                },
                mode: {
                    active: 1
                },
                progress: 0
            }
        },
        filters: {
            durationFormat(val) {
                let t = (val / 60)
                let m = Number(t.toString().split('.')[0])
                let s = Number(((t - Number(m)) * 60).toString().split('.')[0])
                if (m <= 9) {
                    m = '0' + m
                }
                if (s <= 9) {
                    s = '0' + s
                }
                return m + ':' + s
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                const audio = this.$song.audio
                this.$song.on('play', item => {
                    this.item = item
                })
                audio.addEventListener('play', e => {
                    this.state.playing = true
                })
                audio.addEventListener('loadedmetadata', e => {
                    this.duration.total = audio.duration
                })
                audio.addEventListener('pause', e => {
                    this.state.playing = false
                })
                audio.addEventListener('timeupdate', e => {
                    const {currentTime, duration} = audio
                    this.duration.current = currentTime
                    this.progress = (currentTime / duration) * 100
                })

                window.addEventListener('keyup', e => {
                    if (e.keyCode === 32 || e.code === 'Space') {
                        console.log('Space')
                        this.handlerAudioPlay()
                    }
                })
            },
            handlerAudioPlay() {
                if (this.state.playing) {
                    this.$song.pause()
                } else {
                    this.$song.play()
                }
            },
            handlerToggleMode() {
                let active = this.mode.active
                if (active === 4) {
                    active = 1
                } else {
                    active += 1
                }
                this.mode.active = active
            }
        }
    }
</script>
<style lang="scss" scoped>
    .music-operate {
        flex: 0 80px;
        display: flex;
        align-items: center;
        user-select: none;
        font-weight: 200;
        @media (max-width: 750px) {
            box-shadow: 5px 5px 10px #aaa;
        }

        span {
            vertical-align: middle;
        }

        i {
            font-size: 40px;
        }

        .item {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            margin: 0 10px;
            color: #fff;
            opacity: .8;

            &:hover {
                opacity: 1;
            }

            @media (max-width: 750px) {
                &.next, &.prev {
                    display: none;
                }
            }
        }

        .icon-pause-line, .icon-play-fill {
            font-size: 35px;
        }

        .sort-icon {
            font-size: 25px;
        }

        .add-icon {
            font-size: 33px;
        }

        .volume-icon {
            font-size: 29px;
        }

        &:hover {
            .progress span {
                display: block !important;
            }
        }

        .progress {
            flex: 1;
            padding: 0 20px 0 20px;

            .line {
                position: relative;
                width: 100%;
                background: rgba(255, 255, 255, 0.3);
                height: 2px;
                border-radius: 0;

                .p {
                    position: relative;
                    width: 60%;
                    height: 100%;
                    background: #ffffff;

                    span {
                        position: absolute;
                        right: 0;
                        top: -8px;
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                        background: #fff;
                        cursor: pointer;
                        display: none;
                    }
                }
            }

            .info {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-bottom: 20px;
                line-height: 1;
                white-space: nowrap;

                .name {
                    flex: 1;
                    font-size: 16px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .time {
                    font-size: 12px;
                    flex: 0 0 100px;
                    text-align: right;
                }
            }
        }
    }
</style>
