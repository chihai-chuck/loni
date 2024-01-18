<template>
    <div class="page">
        <loni-header scroll-obj="page" :fade="headerFade"><img class="header-img" src="../../../assets/images/hot.png"></loni-header>
        <div class="container">向下滚动预览效果<i class="icon-loni-arrow-bottom"></i></div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-facing-decorator';

    @Component
    export default class PageComponentHeaderFadeSlot extends Vue {
        public headerFade = ["slot"];
    }
</script>

<style lang="less" scoped>
    .page {
        height: 200%;
        background: linear-gradient(to bottom, #ed4264, #ffedbc);
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
    .header-img {
        height: 60px;
    }
</style>
