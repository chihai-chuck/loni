<template>
    <div class="page">
        <loni-header line>Checkbox - 说明文档</loni-header>
        <p id="checkbox"
           class="components">Checkbox</p>
        <div class="container first">
            <h2 id="checkbox-params">参数</h2>
            <ul class="params">
                <li v-for="(item,index) in checkboxParams"
                    :key="index">
                    <h3>{{item.name}}</h3>
                    <small>{{item.text}}</small>
                    <p>
                        <span>类型：</span>
                        <em>{{item.type}}</em>
                    </p>
                    <p>
                        <span>是否可选：</span>
                        <em>{{item.optional?"是":"否"}}</em>
                    </p>
                    <p v-if="item.default">
                        <span>默认值：</span>
                        <em>{{item.default}}</em>
                    </p>
                </li>
            </ul>
        </div>
        <div class="container">
            <h2 id="checkbox-events">事件</h2>
            <ul class="events">
                <li v-for="(item,index) in checkboxEvents"
                    :key="index">
                    <h3>{{item.name}}</h3>
                    <small>{{item.text}}</small>
                    <p v-if="item.params">
                        <span>形参：</span>
                        <em>{{item.params}}</em>
                    </p>
                </li>
            </ul>
        </div>
        <div class="container">
            <h2 id="checkbox-slots">插槽</h2>
            <ul class="events">
                <li v-for="(item,index) in checkboxSlots"
                    :key="index">
                    <h3>{{item.name}}</h3>
                    <small>{{item.text}}</small>
                </li>
            </ul>
        </div>
        <p id="checkbox-group"
           class="components">CheckboxGroup</p>
        <div class="container first">
            <h2 id="checkbox-group-params">参数</h2>
            <ul class="params">
                <li v-for="(item,index) in checkboxGroupParams"
                    :key="index">
                    <h3>{{item.name}}</h3>
                    <small>{{item.text}}</small>
                    <p>
                        <span>类型：</span>
                        <em>{{item.type}}</em>
                    </p>
                    <p>
                        <span>是否可选：</span>
                        <em>{{item.optional?"是":"否"}}</em>
                    </p>
                    <p v-if="item.default">
                        <span>默认值：</span>
                        <em>{{item.default}}</em>
                    </p>
                </li>
            </ul>
        </div>
        <div class="container">
            <h2 id="checkbox-group-slots">插槽</h2>
            <ul class="events">
                <li v-for="(item,index) in checkboxGroupSlots"
                    :key="index">
                    <h3>{{item.name}}</h3>
                    <small>{{item.text}}</small>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from "vue-facing-decorator";

    @Component({
        name: "PageComponentsCheckboxDoc"
    })
    export default class PageComponentsCheckboxDoc extends Vue {
        public checkboxParams = [
            {
                name: "model-value",
                text: "复选框选中状态，可通过v-model双向绑定，也可使用value单向控制",
                type: "boolean"
            },
            {
                name: "radio",
                text: "单选状态（将由外部控制value变更选中状态）",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "uncheckColor",
                text: "未选中时的图标色值",
                type: "string",
                optional: true,
                default: '"#ccc"'
            },
            {
                name: "checkedColor",
                text: "已选中时的图标色值",
                type: "string",
                optional: true,
                default: '"#dc3b40"'
            },
            {
                name: "color",
                text: "复选框文字颜色",
                type: "string",
                optional: true,
                default: `"#333"`
            },
            {
                name: "uncheckIcon",
                text: "未选中图标",
                type: "string",
                optional: true,
                default: '"icon-loni-check-circular"'
            },
            {
                name: "checkedIcon",
                text: "已选中图标",
                type: "string",
                optional: true,
                default: '"icon-loni-checked-circular"'
            },
            {
                name: "size",
                text: "图标和文字大小（需带单位）",
                type: "string",
                optional: true,
                default: '"16px"'
            },
            {
                name: "disabled",
                text: "是否禁用复选框",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "name",
                text: "当在CheckboxGroup中开启model-name时必传",
                type: "string、number",
                optional: true,
                default: "null"
            }
        ];
        public checkboxEvents = [
            {
                name: "click",
                text: "点击事件（每次复选框被点击都会触发）"
            },
            {
                name: "change",
                text: "复选框状态切换事件",
                params: "[boolean]切换后的状态"
            }
        ];
        public checkboxSlots = [
            {
                name: "default",
                text: "复选框图标右侧文字内容或自定义内容"
            }
        ];

        public checkboxGroupParams = [
            {
                name: "model-value",
                text: "分组复选框选中状态，可通过v-model双向绑定，也可使用value单向控制",
                type: "boolean[]、string[]、number[]",
                optional: false
            },

            {
                name: "uncheckColor",
                text: "所有复选框未选中时的图标色值（CheckboxGroup设置的属性比Checkbox优先级低）",
                type: "string",
                optional: true,
                default: '"#ccc"'
            },
            {
                name: "checkedColor",
                text: "所有复选框已选中时的图标色值（CheckboxGroup设置的属性比Checkbox优先级低）",
                type: "string",
                optional: true,
                default: '"#dc3b40"'
            },
            {
                name: "color",
                text: "所有复选框文字颜色（CheckboxGroup设置的属性比Checkbox优先级低）",
                type: "string",
                optional: true,
                default: `"#333"`
            },
            {
                name: "uncheckIcon",
                text: "所有复选框未选中图标（CheckboxGroup设置的属性比Checkbox优先级低）",
                type: "string",
                optional: true,
                default: '"icon-loni-check-circular"'
            },
            {
                name: "checkedIcon",
                text: "所有复选框已选中图标（CheckboxGroup设置的属性比Checkbox优先级低）",
                type: "string",
                optional: true,
                default: '"icon-loni-checked-circular"'
            },
            {
                name: "size",
                text: "所有复选框图标和文字大小（需带单位，CheckboxGroup设置的属性比Checkbox优先级低）",
                type: "string",
                optional: true,
                default: '"16px"'
            },
            {
                name: "disabled",
                text: "是否禁用所有复选框",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "direction",
                text: "复选框排列方向（vertical-垂直、horizontal-水平）",
                type: "string",
                optional: true,
                default: `"vertical"`
            },
            {
                name: "modelName",
                text: "v-model绑定数据的方式，如果是modelName需要在Checkbox子组件传入name参数",
                type: "boolean",
                optional: true,
                default: "false"
            }
        ];
        public checkboxGroupSlots = [
            {
                name: "default",
                text: "checkbox复选框列表（不可放置其它标签，否则会引起绑定状态错误）"
            }
        ];
    }
</script>

<style lang="less" scoped>
    .components {
        width: 100%;
        height: 80px;
        padding: 0 30px;
        line-height: 80px;
        font-size: 26px;
        color: #666;
    }
    .container {
        background-color: #fff;
        &:not(.first) {
            margin-top: 20px;
        }
        > h2 {
            width: 100%;
            padding: 30px 30px 0;
            line-height: 40px;
            font-weight: bold;
            font-size: 34px;
        }
        > ul {
            width: 100%;
            > li {
                width: 100%;
                padding: 30px;
                &:not(:last-child) {
                    border-bottom: 1PX solid #eee;
                }
                > h3 {
                    width: 100%;
                    margin-bottom: 10px;
                    line-height: 36px;
                    text-decoration: underline;
                    font-size: 30px;
                }
                > small {
                    width: 100%;
                    line-height: 30px;
                    font-size: 24px;
                    color: #999;
                }
                > p {
                    display: flex;
                    width: 100%;
                    margin-top: 10px;
                    font-size: 26px;
                    > span {
                        display: block;
                        width: 5.5em;
                        line-height: 32px;
                    }
                    > em {
                        flex: 1;
                        width: 0;
                        line-height: 32px;
                        word-break: break-all;
                    }
                }
            }
        }
    }
</style>
