<template>
    <div class="music-list">
        <div class="list-th">
            <div>歌曲</div>
            <div>歌手</div>
        </div>
        <div class="list">
            <div class="item" v-for="(v,index) in list" :key="v.songid" @click="handlerPlay(v)">
                <div class="index">
                    <span>{{index + 1}}</span>
                    <img v-if="false" src="../static/img/wave.gif" alt="">
                </div>
                <div class="name">{{v.title}}</div>
                <div class="author">{{v.author}}</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'List',
        props: {},
        data() {
            return {}
        },
        computed: {
            list() {
                return this.$root.list
            }
        },
        mounted() {
        },
        methods: {
            handlerPlay(item) {
                this.$root.playing = item
            }
        }
    }
</script>
<style lang="scss">
    .music-list {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: calc(100vh - 80px);
        font-weight: 300;

        .list-th {
            flex: 0 0 45px;
            display: flex;
            align-items: center;
            text-align: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);

            & > div {
                flex: 1;

                &:nth-child(1) {
                    text-align: left;
                    padding-left: 60px;
                }

                &:nth-child(2) {
                    flex: 0 0 150px;
                    text-align: right;
                    padding-right: 20px;
                }

                &:nth-child(3) {
                    flex: 0 0 100px;
                }
            }
        }

        .list {
            flex: 1;
            overflow: auto;
        }

        .item {
            height: 60px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            cursor: pointer;
            color: #eee;

            &:hover {
                color: #fff;
            }

            .index {
                width: 40px;
                text-align: right;
                margin-right: 20px;
                font-weight: 100;
                font-size: 12px;
            }

            .name {
                flex: 1;
            }

            .author {
                flex: 0 0 150px;
                text-align: right;
                padding-right: 20px;
            }
        }
    }
</style>
