<template>
    <transition :name="options.disTransition?'':options.transition">
        <div class="loni-popup"
             :style="{
                 zIndex: options.zIndex,
                 top: options.top
             }"
             v-show="value">
            <div class="background"
                 :style="{background:options.background}"></div>
            <div ref="popupContent"
                 class="content"
                 :class="{
                     flex: options.flex,
                     center: options.center
                 }"
                 :style="{padding:options.center?0:options.padding}">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
    import Vue from "@/shim-vue";
    import { Component, Prop, Watch, Ref, VModel } from "vue-property-decorator";

    import config from "@/config/popup";

    @Component({
        name: "LoniPopup"
    })
    export default class LoniPopup extends Vue {
        /** 弹出层是否可见 */
        @VModel({ type: Boolean, required: true })
        private visible!: boolean;

        /** 弹出层内容是否居中（以弹出层背景为区域） */
        @Prop({ type: Boolean, default: undefined })
        public center?: boolean;

        /** 弹出层z-index层级 */
        @Prop()
        public zIndex?: string | number;

        /** 弹出层内容区域内边距 */
        @Prop()
        public padding?: string;

        /** 不显示弹出层过渡动画 */
        @Prop({ type: Boolean, default: undefined })
        public disTransition?: boolean;

        /** 弹出层背景色 */
        @Prop()
        public background?: string;

        /** 弹出层transition过渡名称（用于自定义弹出层显示隐藏的过渡动画） */
        @Prop()
        public transition?: string;

        /** 是否为弹出层内容区域添加伸缩盒类型 */
        @Prop({ type: Boolean, default: undefined })
        public flex?: boolean;

        /** 距离顶部的距离，需带单位（一般用于顶部弹出窗时略过导航栏） */
        @Prop()
        public top?: string;

        /** 点击弹出层背景区域是否触发隐藏弹出层 */
        @Prop({ type: Boolean, default: undefined })
        public closeOnClickOverlay?: boolean;

        /** 是否在页面切换时自动关闭 */
        @Prop({ type: Boolean, default: undefined })
        public closeOnPopstate?: boolean;

        /** 背景区域触发点击事件监听类型 */
        @Prop()
        public maskTriggerEvent?: string;

        @Ref() private popupContent!: HTMLDivElement;

        public get options() {
            return {
                zIndex: this.zIndex ?? config.zIndex,
                disTransition: this.disTransition ?? config.disTransition,
                background: this.background ?? config.background,
                transition: this.transition ?? config.transition,
                top: this.top ?? config.top,
                closeOnClickOverlay: this.closeOnClickOverlay ?? config.closeOnClickOverlay,
                center: this.center ?? config.center,
                flex: this.flex ?? config.flex,
                padding: this.padding ?? config.padding,
                closeOnPopstate: this.closeOnPopstate ?? config.closeOnPopstate,
                maskTriggerEvent: this.maskTriggerEvent ?? config.maskTriggerEvent
            }
        }

        public close() {
            this.visible = false;
        }

        @Watch("visible")
        private onVisibleChanged() {
            const eventDisabled = (e: Event) => {
                e.stopPropagation();
                if(e.target === this.$el || e.target === this.popupContent) {
                    this.$emit("maskTrigger", e);
                    if(this.options.closeOnClickOverlay) {
                        this.close();
                    }
                }
            };
            if(this.visible) {
                document.body.style.overflow = "hidden";
                this.$el.addEventListener(this.options.maskTriggerEvent, eventDisabled);
                if(this.options.closeOnPopstate) {
                    window.addEventListener("popstate", this.close);
                }
            } else {
                document.body.style.overflow = "";
                this.$el.removeEventListener(this.options.maskTriggerEvent, eventDisabled);
                if(this.options.closeOnPopstate) {
                    window.removeEventListener("popstate", this.close);
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .loni-popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        > * {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        > .background {
            z-index: 1;
            transition: opacity .3s;
        }
        > .content {
            z-index: 2;
            &.flex {
                display: flex;
                flex-direction: column;
            }
            &.center {
                .align(center);
            }
        }
    }
    .fade-enter-active,
    .fade-leave-active {
        opacity: 1;
        transition: opacity .3s;
        .background {
            opacity: 1;
        }
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 1;
        .background {
            opacity: 0;
        }
    }
</style>
