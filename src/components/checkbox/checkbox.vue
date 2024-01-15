<template>
    <div class="loni-checkbox"
         :class="{disabled:disabledValue}"
         :style="{
             color: textColor,
             fontSize: options.size
         }"
         @click="change">
        <i class="loni"
           :class="[checked?options.checkedIcon:_uncheckIcon,{margin:$slots.default}]"
           :style="{color:checked?_checkedColor:_uncheckColor}"></i>
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import Vue from "@/shim-vue";
    import { Component, Prop } from "vue-property-decorator";

    import { colorHexToRgb, colorLighten } from "@pecasha/util";

    import type CheckboxGroup from "../checkbox-group";

    import config from "@/config/checkbox";

    @Component({
        name: "LoniCheckbox"
    })
    export default class LoniCheckbox extends Vue {
        /** 复选框选中状态 */
        @Prop({ type: Boolean, default: undefined })
        private value?: boolean;

        /** 单选状态，将由外部调整checked控制选中状态 */
        @Prop({ type: Boolean })
        public radio?: boolean;

        /** 未选中时色值 */
        @Prop()
        public uncheckColor?: string;

        /** 已选中时色值 */
        @Prop()
        public checkedColor?: string;

        /** 复选框文字颜色（默认#333） */
        @Prop()
        public color?: string;

        /** 未选中图标 */
        @Prop()
        public uncheckIcon?: string;

        /** 已选中图标 */
        @Prop()
        public checkedIcon?: string;

        /** 图标和文字大小（需带单位，默认16px） */
        @Prop()
        public size?: string;

        /** 是否禁用复选框 */
        @Prop({ type: Boolean, default: false })
        public disabled!: boolean;

        /** 当在CheckboxGroup中开启model-name时必传 */
        @Prop()
        public name?: string | number;

        private selfValue = false;
        public get checked() {
            return typeof this.value === "boolean" ? this.value : this.selfValue;
        }
        public set checked(value) {
            if(typeof this.value === "boolean") {
                this.$emit("input", value);
            } else {
                this.selfValue = value;
            }
        }

        // 如果有checkbox-group，group组件会在初始化时在此注入实例，以表示当前是在group组件内，这种判断方式是为了兼容当前不在group第一级子组件下
        public checkboxGroupInstance: CheckboxGroup | false = false;

        private get checkboxGroup() {
            return (this.checkboxGroupInstance ? this.checkboxGroupInstance : {}) as Partial<typeof config>;
        }

        public get options() {
            return {
                uncheckColor: this.uncheckColor ?? this.checkboxGroup.uncheckColor ?? config.uncheckColor,
                checkedColor: this.checkedColor ?? this.checkboxGroup.checkedColor ?? config.checkedColor,
                color: this.color ?? this.checkboxGroup.color ?? config.color,
                uncheckIcon: this.uncheckIcon ?? this.checkboxGroup.uncheckIcon ?? config.uncheckIcon,
                checkedIcon: this.checkedIcon ?? this.checkboxGroup.checkedIcon ?? config.checkedIcon,
                size: this.size ?? this.checkboxGroup.size ?? config.size
            }
        }

        private get disabledValue() {
            if(this.checkboxGroupInstance) {
                return this.disabled || this.checkboxGroupInstance.disabled;
            }
            return this.disabled;
        }

        private get _uncheckIcon() {
            if(this.options.checkedIcon !== "icon-loni-checked-circular" && !(this.uncheckIcon ?? this.checkboxGroup.uncheckIcon)) {
                return this.options.checkedIcon;
            }
            return this.options.uncheckIcon || "icon-loni-check-circular";
        }

        private get textColor() {
            if(this.disabledValue) {
                return colorLighten(colorHexToRgb(this.options.color), .5, true);
            }
            return this.options.color;
        }

        private get _uncheckColor() {
            if(this.disabledValue) {
                return colorLighten(colorHexToRgb(this.options.uncheckColor), .5, true);
            }
            return this.options.uncheckColor;
        }

        private get _checkedColor() {
            if(this.disabledValue) {
                return colorLighten(colorHexToRgb(this.options.checkedColor), .5, true);
            }
            return this.options.checkedColor;
        }

        private change() {
            this.$emit("click");
            if(this.disabledValue) {
                return;
            }
            if(!this.radio || this.checkboxGroupInstance) {
                this.checked = !this.checked;
                this.$emit("change", this.checked);
                if(this.checkboxGroupInstance) {
                    this.checkboxGroupInstance.updateModel();
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .loni-checkbox {
        .align(v-center, inline-flex);
        letter-spacing: 1px;
        user-select: none;
        cursor: pointer;
        &.disabled {
            cursor: not-allowed;
        }
        > i {
            display: inline-block;
            &.margin {
                margin-right: 6px;
            }
        }
    }
</style>
