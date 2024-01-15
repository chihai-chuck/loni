<template>
    <div class="loni-swipeout">
        <div class="loni-swipeout-container"
             ref="container"
             :style="{transform:'translate3d('+position.pageX+'px,0px,0px)'}">
            <div class="loni-swipeout-box"
                 @touchstart="handlerTouchstart"
                 @touchmove="handlerTouchmove"
                 @touchend.capture="handlerTouchend">
                <div class="loni-swipeout-content"
                     :class="{lock:openStatus}"><slot></slot></div>
            </div>
            <div class="loni-swipeout-left"
                 @touchend.stop="reset">
                <div class="loni-swipeout-left-content"
                     ref="left"><slot name="left"></slot></div>
            </div>
            <div class="loni-swipeout-right"
                 @touchend.stop="reset">
                <div class="loni-swipeout-right-content"
                     ref="right"><slot name="right"></slot></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "@/shim-vue";
    import { Component, Prop, Watch, Ref } from "vue-property-decorator";

    import { EventListener } from "@pecasha/util";

    @Component({
        name: "LoniSwipeout"
    })
    export default class LoniSwipeout extends Vue {
        /** 是否禁用 */
        @Prop({ type: Boolean, default: false })
        public disabled?: boolean;

        @Ref("left")
        private refLeft!: HTMLDivElement;

        @Ref("right")
        private refRight!: HTMLDivElement;

        @Ref("container")
        private refContainer!: HTMLDivElement;

        private tStart = {
            pageX: 0,
            pageY: 0
        }
        private limitMove = {
            left: 0,
            right: 0
        }
        private position = {
            pageX: 0,
            pageY: 0
        }
        private moveLock = "none" // move的锁最好不要跟end的锁共用一个，宁愿多写一些重复代码，避免因冲突引起问题难以排查
        private open = "none";
        private openStatus = false;

        private transitionEndListener = {} as EventListener;

        private touchDiscontinue = false; // touch过程发生中断

        @Watch("open")
        @Watch("moveLock")
        private swipperLock(type: string) {
            if (type === "none") {
                this.getLimitMove();
            } else if (type === "left") {
                this.limitMove.right = 0;
            } else if (type === "right") {
                this.limitMove.left = 0;
            }
        }

        private mounted() {
            this.transitionEndListener = new EventListener(
                this.refContainer,
                "transitionend",
                () => {
                    this.openStatus = this.open !== "none";
                }
            );
            this.getLimitMove();
        }

        private destroyed() {
            this.transitionEndListener.destroy();
        }

        private handlerTouchstart(event: TouchEvent) {
            if (this.disabled || (!this.$slots.left && !this.$slots.right)) {
                return;
            }
            this.touchDiscontinue = false;
            const touches = event.touches ? event.touches[0] : void 0;
            if (touches) {
                for (let key of Object.keys(this.tStart) as ("pageX"|"pageY")[]) {
                    if (touches[key]) {
                        this.tStart[key] = touches[key];
                    }
                }
            }
        }
        private handlerTouchmove(event: TouchEvent) {
            if (this.disabled || (!this.$slots.left && !this.$slots.right)) {
                return;
            }
            if(this.touchIsVertical(event.touches[0])) {
                this.touchDiscontinue = true;
                return;
            }
            event.preventDefault();
            const touches = event.touches ? event.touches[0] : void 0;
            if (touches) {
                const direction = this.swipeDirection(
                    this.tStart.pageX,
                    touches.pageX,
                    this.tStart.pageY,
                    touches.pageY
                );
                if (direction === 'left' || direction === "right") {
                    this.swipper(touches, direction);
                }
            }
        }
        private handlerTouchend(event: TouchEvent) {
            if (this.disabled || (!this.$slots.left && !this.$slots.right)) {
                return;
            }
            this.moveLock = "none";
            const touches = event.changedTouches ? event.changedTouches[0] : void 0;
            if (touches) {
                const direction = this.swipeDirection(
                    this.tStart.pageX,
                    touches.pageX,
                    this.tStart.pageY,
                    touches.pageY
                );
                const spacing = {
                    pageX: touches.pageX - this.tStart.pageX,
                    pageY: touches.pageY - this.tStart.pageY
                }
                const reset = () => {
                    spacing.pageX = 0;
                    this.open = "none";
                }
                if(this.touchDiscontinue) {
                    setTimeout(reset, 100);
                } else {
                    if (Math.abs(spacing.pageX) >= 40 && direction === "left" && this.$slots.right) {
                        if (this.open === "left") {
                            reset();
                        } else {
                            spacing.pageX = spacing.pageX < 0 ? -this.limitMove.right : this.limitMove.right;
                            this.open = "right";
                        }
                    } else if (Math.abs(spacing.pageX) >= 40 && direction === "right" && this.$slots.left) {
                        if (this.open === "right") {
                            reset();
                        } else {
                            spacing.pageX = spacing.pageX < 0 ? -this.limitMove.left : this.limitMove.left;
                            this.open = "left";
                        }
                    } else {
                        setTimeout(reset, 100); // 此处延时为了延缓slot内元素事件的触发时间，以免还原点击与slot内元素的点击事件发生冲突
                    }
                }
                this.position = spacing;
            }
        }

        private reset() {
            this.position.pageX = 0;
            this.open = "none";
        }

        private getLimitMove() {
            this.limitMove.left = this.$slots.left ? this.refLeft.offsetWidth : 0;
            this.limitMove.right = this.$slots.right ? this.refRight.offsetWidth : 0;
        }

        private swipeDirection(x1: number, x2: number, y1: number, y2: number) {
            return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ?
                (x1 - x2 > 0 ? 'left' : 'right') :
                (y1 - y2 > 0 ? 'up' : 'down');
        }

        private swipper(touches: Touch, direction: "left" | "right") {
            const spacing = {
                pageX: touches.pageX - this.tStart.pageX,
                pageY: touches.pageY - this.tStart.pageY
            }

            if (direction === "left") {
                this.moveLock = "right";
                if (this.limitMove.right < Math.abs(spacing.pageX)) {
                    spacing.pageX = -this.limitMove.right;
                }
            } else if (direction === "right") {
                this.moveLock = "left";
                if (this.limitMove.left < Math.abs(spacing.pageX)) {
                    spacing.pageX = this.limitMove.left;
                }
            }
            this.position = spacing;
        }
        private touchIsVertical(touch: Touch) {
            const deltaX = touch.pageX < 0 ? 0 : touch.pageX - this.tStart.pageX;
            const deltaY = touch.pageY - this.tStart.pageY;
            const offsetX = Math.abs(deltaX);
            const offsetY = Math.abs(deltaY);
            return offsetY > offsetX && offsetY > 10;
        }
    }
</script>

<style lang="less" scoped>
    .loni-swipeout {
        position: relative;
        width: 100%;
        overflow: hidden;
        &-container {
            width: 100%;
            transition: transform .2s ease;
            cursor: grab;
        }
        &-content,
        &-box {
            width: 100%;
        }
        &-content.lock {
            pointer-events: none;
        }
        &-left,
        &-right {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            &-content {
                display: inline-flex;
                height: 100%;
            }
        }
        &-left {
            left: -100%;
            text-align: right;
        }
        &-right {
            right: -100%;
        }
    }
</style>
