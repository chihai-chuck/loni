<template>
    <div :type="htmlType"
         class="loni-button"
         :class="classes"
         :style="styles"
         :disabled="disabled"
         @click.stop.capture.passive="handleClick">
        <loading size="small"
                 :color="options.color"
                 v-if="isLoading"
                 dis-transition></loading>
        <i class="loni"
           :class="[icon,{loading: isLoading}]"><span :style="{fontSize: options.size}"><slot></slot></span></i>
    </div>
</template>

<script lang="ts">
    import Vue from "@/shim-vue";
    import { Component, Prop, Watch } from "vue-facing-decorator";
    import loading from "../loading";
    import { browserElementComputedStyle } from "@pecasha/util";

    import config from "@/config/button";

    @Component({
        name: "LoniButton",
        components: {
            loading
        },
        emits: ["click"]
    })
    export default class LoniButton extends Vue {
        /** 按钮宽度，默认自适应内容（自定义需要带单位） */
        @Prop({ type: String })
        public width?: string;

        /** 按钮高度，默认80px（自定义需要带单位） */
        @Prop({ type: String })
        public height?: string;

        /** 开启loading状态动画（开启loading后按钮也会被禁用） */
        @Prop({ type: Boolean, default: false })
        public loading!: boolean;

        /** 异步任务按钮（开启后在点击事件触发时会自动开启loading，然后在触发的click事件中会传递一个回调函数，调用这个回调函数后会关闭自动loading状态，注意开启后click事件不再传递event对象） */
        @Prop({ type: Boolean, default: false })
        public async!: boolean;

        /** 禁用按钮，点击事件失效 */
        @Prop({ type: Boolean, default: false })
        public disabled!: boolean;

        /** 自定义背景 */
        @Prop()
        public background?: string;

        /** 自定义颜色（包含loading图标颜色，默认#333） */
        @Prop()
        public color?: string;

        /** 按钮图标 */
        @Prop({ type: String, default: ""})
        public icon!: string;

        /** 全宽按钮，按钮会达到父级元素的100%宽度 */
        @Prop({ type: Boolean, default: false })
        public long!: boolean;

        /** 按钮相对于父级元素居中（不建议使用这个去居中按钮，好的方式应当通过改变父级元素样式去居中内容） */
        @Prop({ type: Boolean, default: false })
        public center!: boolean;

        /** 自定义按钮margin样式值，例如center只能居中但是不能设置顶部或底部边距，就可以改用margin实现（设置了margin后按钮display会变为flex） */
        @Prop({ type: String, default: "" })
        public margin!: string;

        /** 按钮圆角，true默认高度80px，字符串是自定义 */
        @Prop({ type: [Boolean, String], default: undefined })
        public radius?: string | boolean;

        /** 自定义按钮的边框样式 */
        @Prop()
        public border?: string;

        /** 自定义按钮的字体大小（需带单位） */
        @Prop()
        public size?: string;

        /** 自定义按钮文字间距（需带单位） */
        @Prop()
        public spacing?: string;

        /** 设置button的flex，true默认为1，字符串自定义（开启了long时不建议同时设置flex） */
        @Prop({ type: [Boolean, String], default: false })
        public flex!: string | boolean;

        /** 设置按钮的html-type */
        @Prop({ type: String, default: "button" })
        public htmlType!: "button" | "submit" | "reset";

        public isLoading = false;
        private borderRadius = "";

        public get options() {
            return {
                background: this.background ?? config.background,
                color: this.color ?? config.color,
                radius: this.radius ?? config.radius,
                border: this.border ?? config.border,
                size: this.size ?? config.size
            }
        }
        public get styles() {
            const styles: Partial<CSSStyleDeclaration> = {
                background: this.options.background,
                border: this.options.border,
                margin: this.margin,
                color: this.options.color,
                borderRadius: this.borderRadius
            }
            if(this.width) {
                styles.width = this.width;
            }
            if(this.height) {
                styles.height = this.height;
            }
            if(this.cssFlex) {
                styles.flex = this.cssFlex;
            }
            if(this.spacing) {
                styles.letterSpacing = this.spacing;
                styles.textAlign = "center";
                styles.textIndent = this.spacing;
            }
            return styles as AnyObject;
        }
        public get classes() {
            return {
                long: this.long,
                disabled: this.disabled,
                center: this.center,
                margin: !!this.margin,
                border: !this.options.background,
                loading: this.isLoading
            }
        }

        @Watch("loading")
        private onLoadingChanged() {
            this.isLoading = this.loading;
        }

        @Watch("border")
        private getBorderRadius() {
            if(typeof this.options.radius === "boolean" && this.options.radius) {
                return this.borderRadius = this.height || browserElementComputedStyle(this.$el as HTMLButtonElement, "height") as string;
            }
            this.borderRadius =  this.options.radius as string;
        }

        private get cssFlex() {
            if(typeof this.flex === "boolean" && this.flex) {
                return "1";
            }
            return this.flex;
        }

        created() {
            this.isLoading = this.loading;
        }
        mounted() {
            this.getBorderRadius();
        }

        public handleClick(event: Event) {
            if(this.disabled || this.isLoading) {
                return;
            }
            if(this.async) {
                this.isLoading = true;
            }
            this.$emit('click', this.async ? () => {
                this.isLoading = false;
            } : event);
        }
    }
</script>

<style lang="less" scoped>
    .loni-button {
        .align(center, inline-flex);
        position: relative;
        height: 44px;
        overflow: hidden;
        padding: 0 16px;
        vertical-align: middle;
        border-radius: 6px;
        background-color: #fff;
        font-size: 15px;
        color: #333;
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
        &:active:not(.disabled)::before {
            background-color: #000;
            opacity: .1;
        }
        &.loading::before {
            background-color: #fff;
            opacity: .35;
            transition: opacity .2s ease;
        }
        &.border {
            border: 1px solid #dcdcdc;
        }
        &.long {
            display: flex !important;
            width: 100%;
        }
        &.disabled {
            background: #f5f5f5 !important;
            > i > span {
                color: #c5c5c5 !important;
            }
        }
        &.center,
        &.margin {
            display: flex !important;
        }
        &.center {
            margin: 0 auto;
        }
        &.radius {
            border-radius: 50%;
        }
        > i {
            vertical-align: middle;
            &.loading {
                margin-left: 4px;
            }
            &::before {
                margin-right: 4px;
            }
        }
    }
</style>
