<template>
    <div class="page">
        <loni-header z-index="999"
                     :icon="headerIcon"
                     line>Header</loni-header>
        <div class="container">
            <loni-header position="relative">常规导航栏</loni-header>
            <p></p>
            <loni-header position="relative" :back-handler="backHandler" back-text="返回">自定义返回事件</loni-header>
            <p></p>
            <loni-header position="relative" :icon="demoHeaderIcon">显示菜单图标</loni-header>
            <p></p>
            <loni-header position="relative" :icon="demoHeaderRenderIcon">动态渲染菜单图标区域</loni-header>
            <p></p>
            <loni-header position="relative" home-text="主页" home>返回改为主页按钮</loni-header>
            <p></p>
            <loni-header position="relative" color="255,0,255">自定义文字及图标颜色</loni-header>
            <p></p>
            <loni-header position="relative" back-icon-cover>返回按钮显示半透明遮罩</loni-header>
            <p></p>
            <loni-header position="relative" color="255,255,255" text-shadow>图标及文字阴影</loni-header>
            <p></p>
            <loni-header position="relative" color="255,255,255" text-shadow transparent>背景透明</loni-header>
            <p></p>
            <loni-header position="relative" line="255,0,255">底部边线</loni-header>
            <p></p>
            <loni-header position="relative" background="135,206,235">自定义背景色</loni-header>
            <p></p>
            <loni-header position="relative" statusbar-height="26px">适应状态栏高度</loni-header>
            <p></p>
            <div class="caption">slot区域填充模式(更自由的自定义)：</div>
            <loni-header position="relative" slot-full>
                <div class="search-box">
                    <input type="search" placeholder="请输入搜索内容" v-model="searchText" @keyup.enter="searchActive">
                    <i class="icon-search" @click="searchActive"></i>
                </div>
            </loni-header>
            <p></p>
            <p></p>
            <hr>
            <p></p>
            <div class="caption">导航栏页面滚动过渡特效：</div>
            <loni-cell>
                <loni-cell-item title="导航栏根据页面滚动位置渐现渐隐" next="header/fade-base"></loni-cell-item>
                <loni-cell-item title="颜色根据页面滚动位置从全透明向传入色值渐变" next="header/fade-color"></loni-cell-item>
                <loni-cell-item title="slot区域根据页面滚动位置渐现渐隐" next="header/fade-slot"></loni-cell-item>
                <loni-cell-item title="slot区域颜色根据页面滚动位置从全透明向传入色值渐变" next="header/fade-slot-color"></loni-cell-item>
                <loni-cell-item title="背景色根据页面滚动位置从全透明向传入色值渐变" next="header/fade-background"></loni-cell-item>
                <loni-cell-item title="颜色根据页面滚动位置由传入色值渐变" next="header/fade-color-gradient"></loni-cell-item>
                <loni-cell-item title="底边线自定义颜色并且根据页面滚动位置渐现渐隐" next="header/fade-line"></loni-cell-item>
            </loni-cell>
            <p></p>
            <div class="caption">因为过渡特效传入的fade参数是个数组，所以过渡特效是可用组合的</div>
            <loni-cell>
                <loni-cell-item title="导航栏组合过渡特效" next="header/fade-demo"></loni-cell-item>
            </loni-cell>
        </div>
    </div>
</template>

<script lang="tsx">
    import { Vue, Component } from 'vue-property-decorator';
    import type { CreateElement } from "vue";

    @Component
    export default class PageComponentHeader extends Vue {
        private headerIcon = [
            {
                icon: "icon-loni-doc",
                active: () => {
                    this.$router.push("/components/header/doc");
                }
            }
        ];

        private demoHeaderIcon = [
            {
                caption: "设置"
            },
            {
                icon: "icon-share",
                style: {
                    color: "blue"
                }
            }
        ];

        private demoHeaderRenderIcon = [
            {
                render: (h: CreateElement) => <loni-loading></loni-loading>
            }
        ];

        private searchText = "";

        private backHandler() {
            alert("自定义返回事件")
        }

        private searchActive() {
            alert("搜索内容：" + this.searchText);
        }
    }
</script>

<style lang="less" scoped>
    .container {
        width: 100%;
        padding: 20px 0;
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
        .caption {
            .align(v-center);
            width: 100%;
            margin-bottom: 15px;
            padding: 0 20px;
            font-size: 28px;
            color: #999;
        }
    }
    .search-box {
        display: flex;
        width: 100%;
        height: 100%;
        > i {
            .align(center);
            width: 90px;
            height: 100%;
            font-size: 28px;
            color: #999;
        }
        > input {
            .align(v-center);
            flex: 1;
            width: 0;
            height: 100%;
            font-size: 28px;
        }
    }
</style>
