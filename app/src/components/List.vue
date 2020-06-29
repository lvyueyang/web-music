<template>
    <div class="music-list">
        <div class="list-th">
            <div>歌曲</div>
            <div>歌手</div>
        </div>
        <div class="list">
            <div class="item" v-for="(v,index) in list" :key="v.songid" @click="handlerPlay(v)">
                <div class="index">
                    <img v-if="activeId === v.songid" src="../static/img/wave.gif" alt="">
                    <span v-else>{{index + 1}}</span>
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
            return {
                list: [],
                activeId: null
            }
        },
        computed: {},
        mounted() {
            this.getList()
            this.$song.on('play', item => {
                this.activeId = item.songid
            })
        },
        methods: {
            async getList() {
                try {
                    this.list = await this.$utils.getJson('/jay-music/musicList.json')
                    this.$song.pushSong(this.list)
                    this.$song.play(this.list[0])
                } catch (e) {
                    console.error(e)
                }
            },
            handlerPlay(item) {
                this.$song.play(item)
            }
        }
    }
</script>
<style lang="scss" scoped>
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

            &::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
                background-color: transparent;
            }

            &::-webkit-scrollbar { //滚动条的宽度
                width: 9px;
                height: 9px;
            }

            &::-webkit-scrollbar-thumb { //滚动条的设置
                background-color: #141e30;
                background-clip: padding-box;
                min-height: 28px;
                border-radius: 5px;
            }

            &::-webkit-scrollbar-thumb:hover {
                background-color: rgba(247, 247, 247, 0.51);
            }
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
                background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, .2), rgba(0, 0, 0, 0));
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
