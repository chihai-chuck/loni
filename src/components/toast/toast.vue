<template>
    <transition name="loni-toast-fade">
        <div class="loni-toast"
             :class="[options.position, {'event-penetrate':options.eventPenetrate}]"
             v-show="visible">
            <div class="loni-toast-content" :style="{background:options.background}">
                <template v-if="!$slots.default">{{message}}</template>
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
    import Vue from "@/shim-vue";
    import { Component, Prop, Watch } from 'vue-facing-decorator';

    import config from "@/config/toast";

    @Component({
        name: "LoniToast",
        emits: ["close"]
    })
    export default class LoniToast extends Vue {
        /** 消息内容 */
        @Prop()
        public message?: string;

        /** 出现位置 */
        @Prop()
        public position?: "top" | "middle" | "bottom";

        /** 显示时长，单位毫秒。值为0或负数不消失 */
        @Prop()
        public duration?: number;

        /** 背景色 */
        @Prop()
        public background?: string;

        /** 点击事件穿透 */
        @Prop({ type: Boolean, default: undefined })
        public eventPenetrate?: boolean;

        /** 是否在页面切换时自动关闭 */
        @Prop({ type: Boolean, default: undefined })
        public closeOnPopstate?: boolean;

        public visible = false;

        public get options() {
            return {
                position: this.position ?? config.position,
                duration: this.duration ?? config.duration,
                background: this.background ?? config.background,
                eventPenetrate: this.eventPenetrate ?? config.eventPenetrate,
                closeOnPopstate: this.closeOnPopstate ?? config.closeOnPopstate
            }
        }

        public close() {
            this.visible = false;
            setTimeout(() => {
                this.$emit("close");
            }, 300);
        }

        @Watch("visible")
        private onVisibleChanged() {
            if(this.visible) {
                if(this.options.duration > 0) {
                    setTimeout(this.close, this.options.duration);
                }
                if(this.options.closeOnPopstate) {
                    window.addEventListener("popstate", this.close);
                }
            } else {
                if(this.options.closeOnPopstate) {
                    window.removeEventListener("popstate", this.close);
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .loni-toast {
        .align(center);
        z-index: 1999;
        position: fixed;
        left: 0;
        right: 0;
        width: 90%;
        margin: auto;
        transition: none .3s;
        transition-property: opacity, transform;
        &.event-penetrate {
            pointer-events: none;
        }
        &.top {
            top: 10vh;
        }
        &.middle {
            top: 0;
            bottom: 0;
            width: 80%;
        }
        &.bottom {
            bottom: 10vh;
        }
        &-content {
            max-width: 100%;
            min-width: 30%;
            padding: 8px;
            border-radius: 8px;
            line-height: 20px;
            white-space: pre-line;
            text-align: center;
            font-size: 14px;
            color: #fff;
        }
    }

    .loni-toast-fade-enter.top,
    .loni-toast-fade-leave-to.top {
        opacity: 0;
        transform: translate3d(0, -5vh, 0) scale3d(.85, .85, 1);
    }
    .loni-toast-fade-enter.middle,
    .loni-toast-fade-leave-to.middle {
        opacity: 0;
        transform: scale3d(.7, .7, 1);
    }
    .loni-toast-fade-enter.bottom,
    .loni-toast-fade-leave-to.bottom {
        opacity: 0;
        transform: translate3d(0, 5vh, 0) scale3d(.85, .85, 1);
    }
</style>
