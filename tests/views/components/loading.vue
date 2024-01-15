<template>
    <div class="page">
        <loni-header :icon="headerIcon"
                     line>Loading</loni-header>
        <div class="container">
            <div class="caption">行内加载状态图标</div>
            <loni-loading></loni-loading>
            <p></p>
            <div class="caption">另一种风格的加载状态图标</div>
            <loni-loading type="point"></loni-loading>
            <p></p>
            <div class="caption">调整加载状态图标大小</div>
            <loni-loading size="small"></loni-loading>
            <span></span>
            <loni-loading size="default"></loni-loading>
            <span></span>
            <loni-loading size="large"></loni-loading>
            <p></p>
            <div class="caption">改变加载状态图标颜色</div>
            <loni-loading color="red"></loni-loading>
            <span></span>
            <loni-loading type="point" color="blue"></loni-loading>
            <p></p>
            <div class="caption">区域加载状态<button @click="loading=!loading">切换</button></div>
            <div class="box">
                <loni-loading v-if="loading" background="#fff" fix></loni-loading>
                蓝蓝的天空银河里，有只小白船
            </div>
            <p></p>
            <hr/>
            <p></p>
            <loni-button size="small" background="skyblue" @click="showLoading" long>显示全屏加载状态</loni-button>
            <p></p>
            <loni-button size="small" background="skyblue" @click="showLoadingCover" long>显示全屏加载状态（带遮罩）</loni-button>
            <p></p>
            <loni-button size="small" background="skyblue" @click="showLoadingCustom" long>显示自定义全屏加载状态（动态渲染）</loni-button>
        </div>
    </div>
</template>

<script lang="tsx">
    import { Vue, Component } from 'vue-property-decorator';
    import type { CreateElement } from "vue";

    @Component
    export default class PageComponentLoading extends Vue {
        private headerIcon = [
            {
                icon: "icon-loni-doc",
                active: () => {
                    this.$router.push("/components/loading/doc");
                }
            }
        ];

        private loading = true;

        private showLoading() {
            this.$loni.Loading.show({
                background: "#fff"
            });
            setTimeout(() => {
                this.$loni.Loading.hide();
            }, 3000);
        }

        private num = 3;
        private timer = 0;
        private showLoadingCustom() {
            clearInterval(this.timer);
            this.num = 3;
            this.$loni.Loading.show({
                background: "#fff",
                render: (h: CreateElement) => <p>加载中... {this.num}s</p>
            });
            this.timer = window.setInterval(() => {
                this.num--;
                if(this.num < 1) {
                    this.$loni.Loading.hide();
                    clearInterval(this.timer);
                }
            }, 1000);
        }

        private showLoadingCover() {
            this.$loni.Loading.show({
                cover: true,
                color: "#fff"
            });
            setTimeout(() => {
                this.$loni.Loading.hide();
            }, 3000);
        }
    }
</script>

<style lang="less" scoped>
    .container {
        width: 100%;
        padding: 20px;
        > p {
            width: 100%;
            height: 20px;
        }
        > span {
            display: inline-block;
            width: 20px;
        }
        > hr {
            width: 100%;
            height: 1px;
            border-bottom: 1PX dashed #aaa;
        }
    }
    .caption {
        .align(h-space-between);
        .align(v-center);
        width: 100%;
        margin-bottom: 10px;
        font-size: 28px;
        color: #999;
        > button {
            .align(v-center);
            height: 40px;
            padding: 0 20px;
            border-radius: 8px;
            background-color: #fff;
            font-size: 24px;
            color: #999;
        }
    }
    .box {
        .align(center);
        position: relative;
        width: 100%;
        height: 260px;
        padding: 20px;
        overflow: hidden;
        border-radius: 10px;
        font-size: 28px;
        background-color: #fff;
    }
</style>
