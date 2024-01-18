<template>
    <li class="loni-cell-item"
        :class="{
            spacing: options.spacing,
            'spacing-fill': !!options.spacingFill,
            'not-line': !options.splitLine,
            arrow: next||options.nextIcon
        }"
        :style="{
            background: options.background,
            borderBottomColor: spacingFillColor
        }"
        @click="active">
        <div class="wrapper"
             v-if="icon||title||$slots.prefix">
            <slot name="prefix"
                  v-if="$slots.prefix"></slot>
            <i class="icon loni"
               :class="icon"
               :style="{color:options.iconColor}"
               v-else-if="icon"></i>
            <span class="title"
                  :class="{fixed:options.titleFixed!=='auto'}"
                  :style="{
                      color: options.color,
                      width: options.titleFixed
                  }"
                  v-if="title">{{title}}</span>
        </div>
        <slot name="custom"></slot>
        <p class="text"
           :class="{
               flex: options.textFlex,
               left: options.textLeft
           }"
           :style="{color:options.textColor}"
           v-if="$slots.default"><slot></slot></p>
    </li>
</template>

<script lang="ts">
    import Vue from "@/shim-vue";
    import { Component, Prop, Emit } from "vue-facing-decorator";

    import type Cell from "../cell";

    import config from "@/config/cell-item";

    @Component({
        name: "LoniCellItem",
        expose: ["cellInstance"]
    })
    export default class LoniCellItem extends Vue {
        /** 是否显示右边icon，默认false */
        @Prop({ type: Boolean, default: undefined })
        public nextIcon?: boolean;

        /** 在点击时触发路由跳转，并且会默认显示nextIcon */
        @Prop()
        public next?: string;

        /** 列表图标 */
        @Prop({ default: "" })
        public icon!: string;

        /** 列表图标颜色 */
        @Prop()
        public iconColor?: string;

        /** 列表标题 */
        @Prop({ default: "" })
        public title!: string;

        /** 固定列表标题宽度 */
        @Prop()
        public titleFixed?: string;

        /** 列表标题文字颜色 */
        @Prop()
        public color?: string;

        /** 列表文本内容文字颜色 */
        @Prop()
        public textColor?: string;

        /** 列表文本内容区域是否使用flex布局 */
        @Prop({ type: Boolean, default: undefined })
        public textFlex?: boolean;

        /** 是否在底部增加20px的margin间距 */
        @Prop({ type: Boolean, default: undefined })
        public spacing?: boolean;

        /** 是否在底部增加20px的间距（填充方式，true默认色值#eee） */
        @Prop({ type: [Boolean, String], default: undefined })
        public spacingFill?: boolean | string;

        /** 是否显示分割线 */
        @Prop({ type: Boolean, default: undefined })
        public splitLine?: boolean;

        /** 列表自定义背景 */
        @Prop()
        public background?: string;

        /** 值居左显示 */
        @Prop({ type: Boolean, default: undefined })
        public textLeft?: boolean;

        // 不用$parent获取父级cell实例是因为上一级不一定是cell，可能是swipeout等
        public cellInstance = {} as Cell;

        public get options() {
            return {
                nextIcon: this.nextIcon ?? config.nextIcon,
                titleFixed: this.titleFixed ?? this.cellInstance?.titleFixed ?? config.titleFixed,
                color: this.color ?? config.color,
                textColor: this.textColor ?? config.textColor,
                iconColor: this.iconColor ?? config.iconColor,
                splitLine: this.splitLine ?? config.splitLine,
                background: this.background ?? config.background,
                textLeft: this.textLeft ?? config.textLeft,
                spacing: this.spacing ?? config.spacing,
                spacingFill: this.spacingFill ?? config.spacingFill,
                textFlex: this.textFlex ?? config.textFlex
            }
        }

        public get spacingFillColor() {
            if(typeof this.options.spacingFill === "string") {
                return this.options.spacingFill;
            }
            return "#eee";
        }

        @Emit("click")
        public active() {
            if(this.next) {
                this.$router?.push(this.next);
            }
        }
    }
</script>

<style lang="less" scoped>
    .loni-cell-item {
        .align(v-center);
        position: relative;
        width: 100%;
        min-height: 50px;
        padding: 12px 16px;
        background-color: #fff;
        font-size: 16px;
        &:not(:last-child) {
            border-bottom-width: 1px;
            border-bottom-style: solid;
        }
        &.not-line,
        &.spacing,
        &.spacing-fill {
            border-bottom: none;
        }
        &.arrow {
            padding-right: 30px;
            cursor: pointer;
            &:active {
                background-color: #f2f3f5;
            }
            &::before {
                content: "\e71a";
                position: absolute;
                right: 15px;
                font-size: 12px;
                color: #999;
            }
        }
        &.spacing {
            margin-bottom: 12px;
        }
        &.spacing-fill {
            border-bottom-width: 12px;
            border-bottom-style: solid;
        }
        > .wrapper {
            .align(v-center);
            margin-right: 15px;
            .icon {
                margin-right: 10px;
                font-size: 20px;
            }
            .title {
                font-size: 15px;
                &.fixed {
                    display: block;
                }
            }
        }
        > .text {
            flex: 1;
            word-break: break-all;
            font-size: 15px;
            color: #999;
            &:not(.left) {
                .align(right);
            }
            &.flex {
                display: flex;
            }
            > input {
                &.long {
                    display: block;
                    width: 100%;
                }
                &.right {
                    text-align: right;
                }
            }
        }
    }
</style>
