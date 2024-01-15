<template>
    <div class="page">
        <loni-header :icon="headerIcon"
                     line>Switch</loni-header>
        <div class="container">
            <div class="line">
                <em>普通状态：</em>
                <loni-switch v-model="checked"></loni-switch>
            </div>
            <p></p>
            <div class="line">
                <em>禁用状态：</em>
                <loni-switch v-model="checked" disabled></loni-switch>
            </div>
            <p></p>
            <div class="line">
                <em>异步操作：</em>
                <loni-switch v-model="checkedAsync"
                             @change="changeAsync"
                             async></loni-switch>
            </div>
            <p></p>
            <div class="line">
                <em>加载状态：</em>
                <loni-switch v-model="checked" loading></loni-switch>
            </div>
            <p></p>
            <div class="line">
                <em>自定义颜色：</em>
                <loni-switch v-model="checked" active-color="red" inactive-color="yellow"></loni-switch>
            </div>
            <p></p>
            <div class="line">
                <em>自定义大小：</em>
                <loni-switch v-model="checked" size="20px"></loni-switch>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    import { sleep } from "@pecasha/util";

    @Component
    export default class PageComponentSwitch extends Vue {
        private headerIcon = [
            {
                icon: "icon-loni-doc",
                active: () => {
                    this.$router.push("/components/switch/doc");
                }
            }
        ];

        private checked = true;
        private checkedAsync = false;

        private async changeAsync(callback: (status:boolean) => void) {
            let action = true;
            try {
                await this.$loni.Dialog.confirm("是否切换？");
            } catch {
                action = false;
            }
            await sleep(2000);
            callback(action);
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
        .line {
            .align(v-center);
            > em {
                margin-right: 10px;
                font-size: 22px;
                color: #999;
            }
        }
    }
</style>
