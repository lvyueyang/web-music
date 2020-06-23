<template>
    <div class="music-header">
        <div class="item">
            <i class="iconfont icon-add-fill"></i>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Header',
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
    .music-header {
        height: 50px;
        align-items: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        display: none;

        .item {
            flex: 0 0 50px;
            text-align: center;
            cursor: pointer;

            i {
                font-size: 22px;
            }
        }
    }
</style>
