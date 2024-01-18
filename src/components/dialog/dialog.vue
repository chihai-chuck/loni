<template>
    <popup v-model="visible"
           :close-on-click-overlay="options.closeOnClickOverlay"
           :close-on-popstate="options.closeOnPopstate"
           z-index="1899"
           center>
        <div class="loni-dialog popup-fade-in-scale">
            <div class="loni-dialog-container">
                <p class="loni-dialog-title"
                   v-if="options.title">{{options.title}}</p>
                <div class="loni-dialog-content">
                    <template v-if="!$slots.default">{{message}}</template>
                    <slot></slot>
                </div>
            </div>
            <div class="loni-dialog-control">
                <template v-if="eventOnce">
                    <button class="loni-dialog-cancel"
                            :style="{color:options.cancelButtonColor}"
                            @click.once="cancel"
                            v-if="options.showCancelButton">{{options.cancelButtonText}}</button>
                    <button class="loni-dialog-confirm"
                            :style="{color:options.confirmButtonColor}"
                            @click.once="confirm"
                            v-if="options.showConfirmButton">{{options.confirmButtonText}}</button>
                </template>
                <template v-else>
                    <button class="loni-dialog-cancel"
                            :style="{color:options.cancelButtonColor}"
                            @click="cancel"
                            v-if="options.showCancelButton">{{options.cancelButtonText}}</button>
                    <button class="loni-dialog-confirm"
                            :style="{color:options.confirmButtonColor}"
                            @click="confirm"
                            v-if="options.showConfirmButton">{{options.confirmButtonText}}</button>
                </template>
            </div>
        </div>
    </popup>
</template>

<script lang="ts">
    import Vue from "@/shim-vue";
    import { Component, Prop, Emit, Model } from "vue-facing-decorator";

    import config from "@/config/dialog";

    import popup from "../popup";

    @Component({
        name: "LoniDialog",
        components: {
            popup
        }
    })
    export default class LoniDialog extends Vue {
        /** 消息弹窗是否可见 */
        @Model({ type: Boolean, required: true })
        public visible!: boolean;

        /** 标题 */
        @Prop()
        public title?: string;

        /** 消息内容 */
        @Prop()
        public message?: string;

        /** 是否显示取消按钮 */
        @Prop({ type: Boolean, default: undefined })
        public showCancelButton?: boolean;

        /** 是否显示确认按钮 */
        @Prop({ type: Boolean, default: undefined })
        public showConfirmButton?: boolean;

        /** 确认按钮文字内容 */
        @Prop()
        public confirmButtonText?: string;

        /** 确认按钮文字颜色 */
        @Prop()
        public confirmButtonColor?: string;

        /** 取消按钮文字内容 */
        @Prop()
        public cancelButtonText?: string;

        /** 取消按钮文字颜色 */
        @Prop()
        public cancelButtonColor?: string;

        /** 点击弹窗背景区域是否关闭弹窗 */
        @Prop({ type: Boolean, default: undefined })
        public closeOnClickOverlay?: boolean;

        /** 是否在页面切换时自动关闭 */
        @Prop({ type: Boolean, default: undefined })
        public closeOnPopstate?: boolean;

        /** 点击事件是否带.once修饰符(这是实例化调用时会用到的一个参数，正常使用中一般不会需要用到) */
        @Prop({ type: Boolean, default: undefined })
        public eventOnce?: boolean;

        public get options() {
            return {
                title: this.title ?? config.title,
                confirmButtonText: this.confirmButtonText ?? config.confirmButtonText,
                confirmButtonColor: this.confirmButtonColor ?? config.confirmButtonColor,
                showConfirmButton: this.showConfirmButton ?? config.showConfirmButton,
                cancelButtonText: this.cancelButtonText ?? config.cancelButtonText,
                cancelButtonColor: this.cancelButtonColor ?? config.cancelButtonColor,
                showCancelButton: this.showCancelButton ?? config.showCancelButton,
                closeOnClickOverlay: this.closeOnClickOverlay ?? config.closeOnClickOverlay,
                closeOnPopstate: this.closeOnPopstate ?? config.closeOnPopstate
            }
        }

        @Emit()
        public confirm() {
            this.visible = false;
        }

        @Emit()
        public cancel() {
            this.visible = false;
        }
    }
</script>

<style lang="less" scoped>
    .loni-dialog {
        display: flex;
        flex-direction: column;
        width: 86%;
        overflow: hidden;
        border-radius: 18px;
        background-color: #fff;
        &-container {
            width: 100%;
            padding: 26px;
        }
        &-title {
            .multi-overflow(2);
            width: 100%;
            margin-bottom: 15px;
            line-height: 24px;
            text-align: center;
            font-size: 16px;
        }
        &-content {
            position: relative;
            width: 100%;
            min-height: 1em;
            max-height: 60vh;
            overflow-y: auto;
            line-height: 20px;
            white-space: pre-line;
            text-align: center;
            font-size: 14px;
            color: #777;
            :deep(img) {
                max-width: 100%;
            }
        }
        &-control {
            display: flex;
            width: 100%;
            height: 50px;
            border-top: 1px solid #eee;
            > button {
                .align(center);
                flex: 1;
                position: relative;
                height: 100%;
                font-size: 16px;
                &:first-child {
                    border-right: 1px solid #eee;
                }
                &::before {
                    content: "";
                    z-index: 10;
                    position: absolute;
                    top: -1px;
                    left: -1px;
                    right: -1px;
                    bottom: -1px;
                    pointer-events: none;
                }
                &:active::before {
                    background-color: #000;
                    opacity: .1;
                }
            }
        }
    }
</style>
