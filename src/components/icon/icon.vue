<template>
    <i class="loni-icon monochrome"
       :class="[name,{center:options.center},{margin:$slots.default}]"
       :style="{
           fontSize: options.size,
           color: options.color
       }"
       @click="$emit('click',$event)"
       v-if="options.monochrome"><slot></slot></i>
    <div class="loni-icon multiple"
         :class="{margin:$slots.default}"
         @click="$emit('click',$event)"
         v-else>
        <svg aria-hidden="true"
             :style="{fontSize:options.size}">
            <use :xlink:href="`#${name}`"></use>
        </svg>
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import Vue from "@/shim-vue";
    import { Component, Prop } from "vue-facing-decorator";

    import config from "@/config/icon";

    @Component({
        name: "LoniIcon",
        emits: ["click"]
    })
    export default class LoniIcon extends Vue {
        /** 图标名称 */
        @Prop({ type: String, required: true })
        public name!: string;

        /** 图标大小，需带单位传入 */
        @Prop()
        public size?: string;

        /** 图标颜色（仅在单色图标下生效） */
        @Prop()
        public color?: string;

        /** 单色模式，将不会使用svg显示图标，这时可以传入一个slot */
        @Prop({ type: Boolean, default: undefined })
        public monochrome?: boolean;

        /** 是否将图标内容居中（这可能会导致图标与周围文本无法在同一行显示） */
        @Prop({ type: Boolean, default: undefined })
        public center?: boolean;

        public get options() {
            return {
                size: this.size ?? config.size,
                color: this.color ?? config.color,
                monochrome: this.monochrome ?? config.monochrome,
                center: this.center ?? config.center
            }
        }
    }
</script>

<style lang="less" scoped>
    .loni-icon {
        &.multiple {
            .align(center, inline-flex);
            &.margin > svg {
                margin-right: 6px;
            }
            > svg {
                display: inline-block;
                width: 1em;
                height: 1em;
                overflow: hidden;
            }
        }
        &.monochrome {
            display: inline-block;
            &.center {
                .align(center);
            }
            &.margin::before {
                margin-right: 6px;
            }
        }
    }
</style>
