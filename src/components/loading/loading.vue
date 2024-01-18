<template>
    <transition :name="options.disTransition?'':options.transition">
        <div class="loni-loading"
             :class="{
                 fix: options.fix,
                 center: options.center
             }"
             :style="{
                 background: options.background,
                 display: options.center?'flex':'inline-block'
             }"
             v-if="modeVisible">
            <div class="custom"
                 v-if="$slots.default">
                <slot></slot>
            </div>
            <template v-else>
                <p class="cover"
                   v-if="options.cover"></p>
                <div class="spin"
                     :class="options.size"
                     :style="{color:options.color}"
                     v-if="options.type==='spin'">
                    <em v-for="i in 12"></em>
                </div>
                <div class="point"
                     :class="options.size"
                     v-else-if="options.type==='point'">
                    <p :style="{color:options.color}"></p>
                </div>
            </template>
        </div>
    </transition>
</template>

<script lang="ts">
    import Vue from "@/shim-vue";
    import { Component, Prop } from "vue-facing-decorator";

    import config from "@/config/loading";

    @Component({
        name: "LoniLoading"
    })
    export default class LoniLoading extends Vue {
        /** 铺满父级容器（宽高布满整个最近的position:relative父级元素） */
        @Prop({ type: Boolean, default: undefined })
        public fix?: boolean;

        /** 图标尺寸（default-默认、large-大、small-小） */
        @Prop()
        public size?: "default" | "large" | "small";

        /** 图标颜色 */
        @Prop()
        public color?: string;

        /** 背景色 */
        @Prop()
        public background?: string;

        /** 内容居中 */
        @Prop({ type: Boolean, default: undefined })
        public center?: boolean;

        /** 加载状态图标类型（spin-菊花转转转、point-小点闪闪闪） */
        @Prop()
        public type?: "spin" | "point";

        /** transition过渡名称（用于自定义显示隐藏的过渡动画） */
        @Prop()
        public transition?: string;

        /** 不显示过渡动画 */
        @Prop({ type: Boolean, default: undefined })
        public disTransition?: boolean;

        /** 显示遮罩（全屏显示时有效） */
        @Prop({ type: Boolean, default: undefined })
        private cover?: boolean;

        /** 这个参数在正常使用是不需要用到的，这是使用全屏弹窗加载状态时使用的私有参数 */
        @Prop({ type: Boolean, default: false })
        private fullScreen!: boolean;

        public get options() {
            return {
                size: this.size ?? config.size,
                color: this.color ?? config.color,
                background: this.background ?? config.background,
                type: this.type ?? config.type,
                center: this.center ?? config.center,
                fix: this.fix ?? config.fix,
                transition: this.transition ?? config.transition,
                disTransition: this.disTransition ?? config.disTransition,
                cover: this.cover ?? config.cover
            }
        }

        public visible = false;

        public get modeVisible() {
            return this.fullScreen ? this.visible : true;
        }
    }
</script>

<style lang="less" scoped>
    .loni-loading {
        display: inline-block;
        vertical-align: middle;
        text-align: center;
        &.center {
            .align(center);
        }
        &.fix {
            z-index: 10;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            .spin {
                .custom;
            }
        }
        > .cover {
            .absolute(cm);
            z-index: -1;
            width: 120px;
            height: 70px;
            border-radius: 10px;
            background-color: rgba(0,0,0,.5);
        }
        > .spin {
            position: relative;
            width: 24px;
            height: 24px;
            &.large {
                width: 30px;
                height: 30px;
            }
            &.small {
                width: 18px;
                height: 18px;
            }
            > em {
                .absolute(cm);
                width: 10%;
                height: 25%;
                border-radius: 30%;
                background-color: currentColor;
                opacity: 0;
                animation: fade 1s linear infinite;
                &:nth-child(1) {
                    transform: rotate(0deg) translate(0, -142%);
                    animation-delay: 0s;
                }
                &:nth-child(2) {
                    transform: rotate(30deg) translate(0, -142%);
                    animation-delay: -.9167s;
                }
                &:nth-child(3) {
                    transform: rotate(60deg) translate(0, -142%);
                    animation-delay: -.833s;
                }
                &:nth-child(4) {
                    transform: rotate(90deg) translate(0, -142%);
                    animation-delay: -.75s;
                }
                &:nth-child(5) {
                    transform: rotate(120deg) translate(0, -142%);
                    animation-delay: -.667s;
                }
                &:nth-child(6) {
                    transform: rotate(150deg) translate(0, -142%);
                    animation-delay: -.5833s;
                }
                &:nth-child(7) {
                    transform: rotate(180deg) translate(0, -142%);
                    animation-delay: -.5s;
                }
                &:nth-child(8) {
                    transform: rotate(210deg) translate(0, -142%);
                    animation-delay: -.41667s;
                }
                &:nth-child(9) {
                    transform: rotate(240deg) translate(0, -142%);
                    animation-delay: -.333s;
                }
                &:nth-child(10) {
                    transform: rotate(270deg) translate(0, -142%);
                    animation-delay: -.25s;
                }
                &:nth-child(11) {
                    transform: rotate(300deg) translate(0, -142%);
                    animation-delay: -.1667s;
                }
                &:nth-child(12) {
                    transform: rotate(330deg) translate(0, -142%);
                    animation-delay: -.0833s;
                }
            }
            @keyframes fade {
                from { opacity: 1; }
                to { opacity: .25; }
            }
        }
        > .point {
            position: relative;
            &.default {
                width: 42px;
                height: 8px;
                > p {
                    &,
                    &::before,
                    &::after {
                        width: 8px;
                        height: 8px;
                    }
                    &::before {
                        left: -17px;
                    }
                    &::after {
                        left: 17px;
                    }
                }
            }
            &.small {
                width: 22px;
                height: 4px;
                > p {
                    &,
                    &::before,
                    &::after {
                        width: 4px;
                        height: 4px;
                    }
                    &::before {
                        left: -9px;
                    }
                    &::after {
                        left: 9px;
                    }
                }
            }
            &.large {
                width: 62px;
                height: 12px;
                > p {
                    &,
                    &::before,
                    &::after {
                        width: 12px;
                        height: 12px;
                    }
                    &::before {
                        left: -25px;
                    }
                    &::after {
                        left: 25px;
                    }
                }
            }
            > p,
            > p::before,
            > p::after {
                border-radius: 50%;
                background-color: currentColor;
            }
            > p {
                .absolute(c);
                animation: pointm 1s ease-in-out infinite;
                &::before,
                &::after {
                    content: "";
                    position: absolute;
                    top: 0;
                }
                &::before {
                    animation: pointg 1s ease-in-out infinite;
                }
                &::after {
                    animation: pointd 1s ease-in-out infinite;
                }
                @keyframes pointg {
                    0% { opacity: .2; }
                    25% { opacity: 1; }
                    50% { opacity: .2; }
                    75% { opacity: .2; }
                    100% { opacity: .2; }
                }
                @keyframes pointm {
                    0% { opacity: .2; }
                    25% { opacity: .2; }
                    50% { opacity: 1; }
                    75% { opacity: .2; }
                    100% { opacity: .2; }
                }
                @keyframes pointd {
                    0% { opacity: .2; }
                    25% { opacity: .2; }
                    50% { opacity: .2; }
                    75% { opacity: 1; }
                    100% { opacity: .2; }
                }
            }
        }
        > .custom {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .loading-fade-enter-active,
    .loading-fade-leave-active {
        opacity: 1;
        transition: opacity .3s linear;
    }
    .loading-fade-enter,
    .loading-fade-leave-to {
        opacity: 0;
    }
</style>
