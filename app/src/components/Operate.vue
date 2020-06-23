<template>
    <div class="music-operate">
        <div class="item">
            <i class="iconfont icon-skip-back-mini-fill"></i>
        </div>
        <div class="item">
            <i class="iconfont icon-play-fill"></i>
        </div>
        <div class="item">
            <i class="iconfont icon-skip-forward-mini-fill"></i>
        </div>
        <div class="progress">
            <div class="info">
                <div class="name">歌曲名称</div>
                <div class="time">3:00 / 5:30</div>
            </div>
            <div class="line">
                <div class="p">
                    <span></span>
                </div>
            </div>
        </div>
        <div class="item">
            <i class="iconfont icon-add-fill add-icon"></i>
        </div>
        <div class="item">
            <i class="iconfont icon-order-play-line sort-icon"></i>
        </div>
        <div class="item">
            <i class="iconfont icon-volume-down-line volume-icon"></i>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Operate',
        props: {},
        data() {
            return {}
        },
        mounted() {
        },
        methods: {}
    }
</script>
<style lang="scss">
    .music-operate {
        flex: 0 80px;
        display: flex;
        align-items: center;
        user-select: none;
        font-weight: 200;

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

        .progress {
            flex: 1;
            padding: 0 40px;

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
                        display: block;
                        right: 0;
                        top: -8px;
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                        background: #fff;
                        cursor: pointer;
                    }
                }
            }

            .info {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-bottom: 10px;
                line-height: 1;

                .name {
                    font-size: 16px;
                }

                .time {
                    font-size: 12px;
                }
            }
        }
    }
</style>
