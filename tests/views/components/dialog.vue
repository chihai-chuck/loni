<template>
    <div class="page">
        <loni-header :icon="headerIcon"
                     line>Dialog</loni-header>
        <div class="container">
            <loni-button @click="inlineVisible=!inlineVisible" long>组件式调用</loni-button>
            <p></p>
            <loni-button @click="show" long>实例化调用</loni-button>
            <p></p>
            <loni-button @click="confirm" long>确认弹窗</loni-button>
            <p></p>
            <loni-button @click="customVisible=!customVisible" long>组件式自定义内容</loni-button>
            <p></p>
            <loni-button @click="renderShow" long>实例化动态渲染</loni-button>
        </div>
        <loni-dialog v-model="inlineVisible"
                     title="提示">这是一个提示</loni-dialog>
        <loni-dialog v-model="customVisible">
            <img class="img1" src="../../assets/images/img1.jpg">
        </loni-dialog>
    </div>
</template>

<script lang="tsx">
    import { Vue, Component } from "vue-property-decorator";
    import { CreateElement } from "vue";

    import { dateFormat } from "@pecasha/util";

    @Component
    export default class PageComponentDialog extends Vue {
        private headerIcon = [
            {
                icon: "icon-loni-doc",
                active: () => {
                    this.$router.push("/components/dialog/doc");
                }
            }
        ];

        private inlineVisible = false;
        private customVisible = false;

        private timer = 0;
        private time = new Date();

        private show() {
            this.$loni.Dialog.alert({
                title: "提示",
                message: "这是一个很简单的提示"
            });
        }

        private async confirm() {
            const action = await this.$loni.Dialog.confirm({
                title: "提示",
                message: "这是一个很复杂的选择"
            });
            this.$loni.Dialog.alert(`点击了按钮：${action}`);
        }

        private async renderShow() {
            this.time = new Date();
            this.timer = window.setInterval(() => {
                this.time = new Date();
            }, 1000);
            await this.$loni.Dialog.alert({
                title: "提示",
                render: (h: CreateElement) => <p>当前时间：{dateFormat(this.time)}</p>
            });
            clearInterval(this.timer);
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
