<template>
    <div class="loni-checkbox-group"
         :class="{vertical:direction==='vertical'}">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import Vue from "@/shim-vue";
    import { Component, Prop, Watch } from 'vue-property-decorator';

    import type Checkbox from "../checkbox";

    import { findComponentsDownward } from "@/utils/helper";

    @Component({
        name: "LoniCheckboxGroup"
    })
    export default class LoniCheckboxGroup extends Vue {
        @Prop({ type: Array, default: [], required: true })
        public value!: boolean[] | string[] | number[];

        /** 未选中时色值 */
        @Prop()
        public uncheckColor?: string;

        /** 已选中时色值 */
        @Prop()
        public checkedColor?: string;

        /** 复选框文字颜色 */
        @Prop()
        public color?: string;

        /** 未选中图标 */
        @Prop()
        public uncheckIcon?: string;

        /** 已选中图标 */
        @Prop()
        public checkedIcon?: string;

        /** 图标和文字大小 */
        @Prop()
        public size?: string;

        /** 是否禁用所有选项框 */
        @Prop({ type: Boolean, default: false })
        public disabled!: boolean;

        /** 排列方向， vertical-垂直、horizontal-水平 */
        @Prop({ type: String, default: "vertical" })
        public direction!: string;

        /** v-model绑定数据的方式，如果是modelName需要在checkbox子组件传入name参数 */
        @Prop({ type: Boolean, default: false })
        public modelName?: boolean;

        private children: Checkbox[] = [];

        private mounted() {
            this.children = findComponentsDownward<Checkbox>(this, "LoniCheckbox");
            this.children.forEach(child => {
                child.checkboxGroupInstance = this;
            });
            if(this.value.length) {
                this.valueChanged();
            } else {
                this.updateModel();
            }
        }

        public updateModel() {
            if(this.modelName) {
                this.$emit("input", this.children.filter(child => child.checked).map(child => child.name));
            } else {
                this.$emit("input", this.children.map(child => child.checked));
            }
        }

        @Watch("value")
        private valueChanged() {
            if(this.children.length) {
                if(this.value.length) {
                    if(this.modelName) {
                        this.children.forEach(child => {
                            child.checked = !!child.name && (this.value as string[] | number[]).includes(child.name as never);
                        });
                    } else {
                        (this.value as boolean[]).forEach((tag, index) => {
                            if(this.children[index].checked !== tag) {
                                this.children[index].checked = tag;
                            }
                        });
                    }
                } else {
                    this.children.forEach(child => {
                        child.checked = false;
                    });
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .loni-checkbox-group {
        display: flex;
        width: 100%;
        &.vertical {
            flex-direction: column;
        }
    }
</style>
