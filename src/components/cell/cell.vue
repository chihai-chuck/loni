<template>
    <ul class="loni-cell"
        :class="{radius:options.radius}">
        <slot></slot>
    </ul>
</template>

<script lang="ts">
    import Vue from "@/shim-vue";
    import { Component, Prop } from "vue-facing-decorator";

    import config from "@/config/cell";

    @Component({
        name: "LoniCell"
    })
    export default class LoniCell extends Vue {
        /** 圆角边框 */
        @Prop({ type: Boolean, default: undefined })
        public radius?: boolean;

        /** 固定列表标题宽度 */
        @Prop()
        public titleFixed?: string;

        public get options() {
            return {
                radius: this.radius ?? config.radius
            }
        }
    }
</script>

<style lang="less" scoped>
    .loni-cell {
        width: 100%;
        &.radius :deep(.loni-cell-item) {
            &:first-child,
            &.spacing + * {
                border-top-left-radius: 6px;
                border-top-right-radius: 6px;
            }
            &:last-child,
            &.spacing {
                border-bottom-left-radius: 6px;
                border-bottom-right-radius: 6px;
            }
        }
    }
</style>
