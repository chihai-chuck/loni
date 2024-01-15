<template>
    <div class="loni-switch"
         :class="{disabled, active}"
         :style="{
             fontSize: options.size,
             backgroundColor: value?options.activeColor:options.inactiveColor
         }"
         @click="change">
        <p>
            <span :style="{color:value?options.activeColor:'#ccc'}"
                  v-if="isLoading">
                <svg viewBox="25 25 50 50"
                     class="loni-switch-loading-circular">
                    <circle cx="50" cy="50" r="20" fill="none"></circle>
                </svg>
            </span>
        </p>
    </div>
</template>

<script lang="ts">
    import Vue from "@/shim-vue";
    import {
        Component,
        Prop,
        VModel,
        Watch
    } from "vue-property-decorator";

    import config from "@/config/switch";

    @Component({
        name: "LoniSwitch"
    })
    export default class LoniSwitch extends Vue {
        @VModel({ type: Boolean, required: true })
        private active!: boolean;

        @Prop()
        public size?: string;

        @Prop()
        public activeColor?: string;

        @Prop()
        public inactiveColor?: string;

        @Prop({ type: Boolean, default: false })
        public disabled!: boolean;

        @Prop({ type: Boolean, default: false })
        public loading!: boolean;

        @Prop({ type: Boolean, default: false })
        public async!: boolean;

        private isLoading = false;

        public get options() {
            return {
                size: this.size ?? config.size,
                activeColor: this.activeColor ?? config.activeColor,
                inactiveColor: this.inactiveColor ?? config.inactiveColor
            }
        }

        @Watch("loading")
        private onLoadingChanged() {
            this.isLoading = this.loading;
        }

        created() {
            this.isLoading = this.loading;
        }

        private change() {
            this.$emit("click");
            if(this.disabled || this.isLoading) {
                return;
            }
            if(this.async) {
                this.isLoading = true;
            }
            if(this.async) {
                this.$emit("change", (status: boolean) => {
                    this.isLoading = false;
                    if(status) {
                        this.active = !this.active;
                    }
                });
            } else {
                this.active = !this.active;
                this.$emit("change", this.active);
            }
        }
    }
</script>

<style lang="less" scoped>
    .loni-switch {
        position: relative;
        width: 2em;
        height: 1em;
        overflow: hidden;
        box-sizing: content-box;
        border-radius: 1em;
        transition: none .3s;
        transition-property: background-color, border-color;
        border: 1px solid rgba(0,0,0,.1);
        cursor: pointer;
        &.disabled {
            cursor: not-allowed;
            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #fff;
                opacity: .5;
            }
            &.active {
                border-color: rgba(255,255,255,.5);
            }
        }
        &.active > p {
            transform: translateX(1em);
        }
        > p {
            .absolute(m);
            .align(center);
            z-index: 5;
            width: 1em;
            height: 1em;
            border-radius: 100%;
            background-color: #fff;
            box-shadow: 0 3px 1px 0 rgb(0 0 0 / 5%), 0 2px 2px 0 rgb(0 0 0 / 10%), 0 3px 3px 0 rgb(0 0 0 / 5%);
            transition: transform .3s cubic-bezier(.3,1.05,.4,1.05);
            > span {
                .align(center, inline-flex);
                width: 50%;
                height: 50%;
                animation: loading-rotate 2s linear infinite;
                transition: color .3s;
            }
        }
    }

    .loni-switch-loading-circular {
        display: block;
        width: 100%;
        height: 100%;
        > circle {
            stroke: currentColor;
            stroke-width: 3;
            stroke-linecap: round;
            animation: loading-circular 1.5s ease-in-out infinite;
        }
    }

    @keyframes loading-rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes loading-circular {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -40;
        }
        100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -120;
        }
    }
</style>
