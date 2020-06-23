<template>
    <button class="btn" :class="'btn-'+ type" :disabled="loading" @click="$emit('click')">
        <span v-if="loading" class="loading-fix" @click.stop></span>
        <i v-if="loading" class="iconfont icon-shuaxin loading-icon"></i>
        <slot></slot>
    </button>
</template>
<script>
    export default {
        name: 'Button',
        props: {
            loading: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: ''
            }
        },
        data() {
            return {}
        },
        mounted() {
        },
        methods: {}
    }
</script>
<style>

</style>
