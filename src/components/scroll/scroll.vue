<template>
    <div class="loni-scroll">
        <div class="loni-scroll-container"
             ref="scroll"
             :class="[
                 { touch: touching },
                 { 'touch-scrolling': !options.disabledScrolling }
             ]"
             @touchstart="touchStart"
             @touchmove="touchMove"
             @touchend="touchEnd"
             @scroll="onScroll">
            <section class="inner"
                     :style="{top:(top-offsetPullRefreshHeight)+'px'}">
                <header class="pull-refresh">
                    <slot name="refresh"
                          v-if="$slots.refresh"></slot>
                    <span class="tip-text"
                          :style="{color:options.color}"
                          v-else-if="state<2"><i class="loni" :class="[{'icon-loni-line-arrow-bottom':state===0||state===1},{top:state===1}]"></i>{{[options.refreshPullText,options.refreshLoosenText][state]}}</span>
                    <loading type="point"
                             :color="options.color"
                             v-else-if="state===2"></loading>
                </header>
                <slot></slot>
                <footer class="load-more"
                        :style="{color:options.color}"
                        v-show="!options.disabledInfinite">
                    <slot name="infinite"
                          v-if="$slots.infinite"></slot>
                    <template v-else>
                        <loading size="small"
                                 :color="options.color"
                                 v-if="!pageEnd"></loading>
                        <span :class="{'no-more':pageEnd}">{{pageEnd?options.endText:options.infiniteText}}</span>
                    </template>
                </footer>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "@/shim-vue";
    import { Component, Prop, Ref, Emit } from "vue-property-decorator";
    import { browserElementComputedStyle } from "@pecasha/util";
    import loading from "../loading";

    import config from "@/config/scroll";

    @Component({
        name: "LoniScroll",
        components: {
            loading
        }
    })
    export default class LoniScroll extends Vue {
        /** 禁用加载更多功能 */
        @Prop({ type: Boolean, default: undefined })
        public disabledInfinite?: boolean;

        /** 禁用下拉刷新功能 */
        @Prop({ type: Boolean, default: undefined })
        public disabledRefresh?: boolean;

        /** 刷新后滚动位置保持（适用于刷新后内容高度会发生变化，但是滚动位置不随之变化的情况） */
        @Prop({ type: Boolean, default: undefined })
        public refreshScrollKeep?: boolean;

        /** 是否是尾页（设为true后不会再触发infinite事件） */
        @Prop({ type: Boolean, default: false })
        public pageEnd!: boolean;

        /** 关闭webkit的快速滚动 */
        @Prop({ type: Boolean, default: undefined })
        public disabledScrolling?: boolean;

        /** 新页加载时的提示文本 */
        @Prop()
        public infiniteText?: string;

        /** 尾页提示文本 */
        @Prop()
        public endText?: string;

        /** 下拉时的提示文本 */
        @Prop()
        public refreshPullText?: string;

        /** 下拉时的松开提示文本 */
        @Prop()
        public refreshLoosenText?: string;

        /** 提示文本及加载图标的颜色 */
        @Prop()
        public color?: string;

        @Ref() private scroll!: HTMLDivElement;

        public get options() {
            return {
                disabledInfinite: this.disabledInfinite ?? config.disabledInfinite,
                disabledRefresh: this.disabledRefresh ?? config.disabledRefresh,
                disabledScrolling: this.disabledScrolling ?? config.disabledScrolling,
                refreshScrollKeep: this.refreshScrollKeep ?? config.refreshScrollKeep,
                infiniteText: this.infiniteText ?? config.infiniteText,
                endText: this.endText ?? config.endText,
                refreshPullText: this.refreshPullText ?? config.refreshPullText,
                refreshLoosenText: this.refreshLoosenText ?? config.refreshLoosenText,
                color: this.color ?? config.color
            }
        }

        private top = 0;
        private state = 0;
        private startY = 0;
        private touchScroll = false;
        private touching = false;
        private infiniteLoading = false;
        private offsetPullRefreshHeight = 50;
        private startScroll = 0;
        private refreshScrollHeight = 0;

        private mounted() {
            this.offsetPullRefreshHeight = parseFloat(browserElementComputedStyle(this.scroll.querySelector(".pull-refresh") as HTMLElement, "height")?.toString() || "0");
        }

        private activated() {
            this.offsetPullRefreshHeight = parseFloat(browserElementComputedStyle(this.scroll.querySelector(".pull-refresh") as HTMLElement, "height")?.toString() || "0");
        }

        private touchStart(e: TouchEvent) {
            this.startY = e.targetTouches[0].pageY;
            this.startScroll = this.scroll.scrollTop || 0;
            this.touching = true;
            this.touchScroll = true;
        }
        private touchMove(e: TouchEvent) {
            if(this.options.disabledRefresh || this.scroll.scrollTop > 0 || !this.touching) {
                return;
            }
            const diff = e.targetTouches[0].pageY - this.startY - this.startScroll;
            if(diff > 0) {
                e.preventDefault();
            }
            this.top = (Math.pow(diff, 0.8)||0) + (this.state === 2 ? this.offsetPullRefreshHeight : 0);
            if(this.state === 2) { // in refreshing
                return;
            }
            if(this.top >= this.offsetPullRefreshHeight) {
                this.state = 1;
            } else {
                this.state = 0;
            }
        }
        private touchEnd() {
            if(this.options.disabledRefresh) {
                return;
            }
            this.touching = false;
            if(this.state === 2) { // in refreshing
                this.state = 2;
                this.top = this.offsetPullRefreshHeight;
                return;
            }
            if(this.top >= this.offsetPullRefreshHeight) { // do refresh
                this.refresh();
            } else { // cancel refresh
                this.state = 0;
                this.top = 0;
            }
        }

        @Emit()
        private refresh() {
            this.state = 2;
            this.top = this.offsetPullRefreshHeight;
            if(this.refreshScrollKeep) {
                this.refreshScrollHeight = this.scroll.scrollHeight;
            }
            return this.refreshDone;
        }
        private refreshDone() {
            this.top = 0;
            setTimeout(() => {
                this.state = 0;
                if(this.refreshScrollKeep) {
                    this.scroll.scrollTop = this.scroll.scrollHeight - this.refreshScrollHeight;
                }
            }, 300);
        }

        private infinite() {
            this.infiniteLoading = true;
            this.$emit("infinite", this.infiniteDone, this.touchScroll);
            this.touchScroll = false;
        }
        private infiniteDone() {
            this.infiniteLoading = false;
        }

        private onScroll() {
            if(this.options.disabledInfinite || this.infiniteLoading) {
                return;
            }
            const ptrHeight = this.scroll.querySelector(".pull-refresh")!.clientHeight;
            const bottom = this.scroll.querySelector(".inner")!.clientHeight - this.scroll.clientHeight - this.scroll.scrollTop - ptrHeight;
            if(bottom >= 0 && bottom < this.scroll.querySelector(".load-more")!.clientHeight && !this.pageEnd) {
                this.infinite();
            }
            this.$emit("scrolling", this.scroll);
        }

        public toScrollTop(num: number = 0) {
            this.scroll.scrollTop = num;
        }
    }
</script>

<style lang="less" scoped>
    .loni-scroll {
        flex: 1;
        position: relative;
        width: 100%;
        &-container {
            width: 100%;
            position: absolute;
            top: 0;
            bottom: 0;
            overflow: auto;
            &.touch-scrolling {
                -webkit-overflow-scrolling: touch;
            }
            > .inner {
                position: absolute;
                display: flex;
                flex-direction: column;
                width: 100%;
                min-height: calc(100% + 50px);
                transition-duration: 300ms;
                > .pull-refresh {
                    .align(center);
                    position: relative;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 50px;
                    > .tip-text {
                        display: block;
                        font-size: 14px;
                        > i {
                            display: inline-flex;
                            margin-right: 8px;
                            transition: transform .3s ease;
                            &.top {
                                transform: rotate(180deg);
                            }
                        }
                    }
                }
                > .load-more {
                    .align(center);
                    position: relative;
                    width: 100%;
                    height: 50px;
                    font-size: 14px;
                    > span:not(.no-more) {
                        margin-left: 4px;
                    }
                    > .no-more {
                        color: #ccc;
                    }
                }
            }
            &.touch > .inner {
                transition-duration: 0ms;
            }
        }
    }
</style>
