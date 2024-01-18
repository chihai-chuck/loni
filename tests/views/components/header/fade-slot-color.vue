<template>
    <div class="page">
        <loni-header scroll-obj="page" :fade="headerFade">导航栏</loni-header>
        <div class="container">向下滚动预览效果<i class="icon-loni-arrow-bottom"></i></div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-facing-decorator';

    @Component
    export default class PageComponentHeaderFadeSlotColor extends Vue {
        public headerFade = [
            ["slotColor", "255,0,0"]
        ];
    }
</script>

<style lang="less" scoped>
    .page {
        height: 200%;
        background: linear-gradient(to bottom, #514a9d, #24c6dc);
    }
    .container {
        .align(center);
        width: 100%;
        padding-top: 200px;
        letter-spacing: 2px;
        font-size: 30px;
        color: #fff;
        > i {
            margin-left: 10px;
            font-size: 24px;
        }
    }
</style>
