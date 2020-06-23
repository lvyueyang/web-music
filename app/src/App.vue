<template>
    <main id="app" class="main-wrap">
        <header-bar></header-bar>
        <div class="content">
            <list></list>
            <div class="music-lrc">
                <img src="" alt="">
                <div class="lrc-wrap"></div>
            </div>
        </div>
        <operate></operate>
    </main>
</template>
<script>
    import Header from './components/Header'
    import List from './components/List'
    import Operate from './components/Operate'

    export default {
        name: 'App',
        data() {
            return {}
        },
        components: {
            HeaderBar: Header,
            List,
            Operate
        },
        mounted() {
        },
        methods: {}
    }
</script>
<style lang="scss">
    @import "./style/main";

    .main-wrap {
        max-width: 1000px;
        margin: 0 auto;
        height: 100vh;
        display: flex;
        flex-direction: column;

        .content {
            flex: 1;
            display: flex;

            .music-lrc {
                flex: 0 300px;
            }
        }
    }
</style>
