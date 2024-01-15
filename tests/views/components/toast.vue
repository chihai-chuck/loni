<template>
    <div class="page">
        <loni-header :icon="headerIcon"
                     line>Toast</loni-header>
        <div class="container">
            <loni-button @click="top" long>上方显示</loni-button>
            <p></p>
            <loni-button @click="middle" long>中间显示</loni-button>
            <p></p>
            <loni-button @click="bottom" long>下方显示</loni-button>
            <p></p>
            <loni-button @click="long" long>长文本内容</loni-button>
            <p></p>
            <loni-button @click="renderShow" long>动态更新内容</loni-button>
        </div>
    </div>
</template>

<script lang="tsx">
    import { Vue, Component } from "vue-property-decorator";
    import type { CreateElement } from "vue";

    @Component
    export default class PageComponentToast extends Vue {
        private headerIcon = [
            {
                icon: "icon-loni-doc",
                active: () => {
                    this.$router.push("/components/toast/doc");
                }
            }
        ];

        private top() {
            this.$loni.Toast({
                message: "一条轻提示",
                position: "top"
            })
        }
        private middle() {
            this.$loni.Toast({
                message: "一条轻提示",
                position: "middle"
            });
        }
        private bottom() {
            this.$loni.Toast({
                message: "一条轻提示",
                position: "bottom"
            })
        }
        private long() {
            this.$loni.Toast({
                message: "生活中没有侥幸，生活将以铁一般的逻辑，粉碎任何人发自内心的背叛和疏离倾向",
                duration: 6000
            });
        }

        private num = 3;
        private timer = 0;
        private renderShow() {
            this.$loni.Toast({
                render: (h: CreateElement) => <p>加载中... {this.num}s</p>
            });
            this.timer = window.setInterval(() => {
                this.num--;
                if(this.num < 1) {
                    clearInterval(this.timer);
                }
            }, 1000);
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
</style>
