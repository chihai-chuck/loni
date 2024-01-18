<template>
    <div class="page">
        <loni-header scroll-obj="page" :fade="headerFade">导航栏</loni-header>
        <div class="container">向下滚动预览效果<i class="icon-loni-arrow-bottom"></i></div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-facing-decorator';

    @Component
    export default class PageComponentHeaderFadeBackground extends Vue {
        public headerFade = [
            ["background", "147,249,185"]
        ];
    }
</script>

<style lang="less" scoped>
    .page {
        height: 200%;
        background: linear-gradient(to bottom, #acb6e5, #86fde8);
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
