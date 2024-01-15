<template>
    <div class="page">
        <loni-header line>Dialog - 说明文档</loni-header>
        <div class="container">
            <h2 id="params">参数</h2>
            <ul class="params">
                <li v-for="(item,index) in params"
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
            <h2 id="events">事件</h2>
            <ul class="events">
                <li v-for="(item,index) in events"
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
            <h2 id="slots">插槽</h2>
            <ul class="slots">
                <li v-for="(item,index) in slots"
                    :key="index">
                    <h3>{{item.name}}</h3>
                    <small>{{item.text}}</small>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component({
        name: "PageComponentsDialogDoc"
    })
    export default class PageComponentsDialogDoc extends Vue {
        private params = [
            {
                name: "model-value",
                text: "模态弹窗显示状态，可通过v-model双向绑定，也可使用value单向控制",
                type: "boolean",
                optional: false
            },
            {
                name: "title",
                text: "弹窗标题",
                type: "string",
                optional: true,
                default: '""'
            },
            {
                name: "message",
                text: "弹窗消息内容",
                type: "string",
                optional: true,
                default: "null"
            },
            {
                name: "showCancelButton",
                text: "是否显示取消按钮",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "showConfirmButton",
                text: "是否显示确认按钮",
                type: "boolean",
                optional: true,
                default: "true"
            },
            {
                name: "confirmButtonText",
                text: "确认按钮文字内容",
                type: "string",
                optional: true,
                default: '"确定"'
            },
            {
                name: "confirmButtonColor",
                text: "确认按钮文字颜色",
                type: "string",
                optional: true,
                default: '"#ed4014"'
            },
            {
                name: "cancelButtonText",
                text: "取消按钮文字内容",
                type: "string",
                optional: true,
                default: '"取消"'
            },
            {
                name: "cancelButtonColor",
                text: "取消按钮文字颜色",
                type: "string",
                optional: true,
                default: '"#c5c8ce"'
            },
            {
                name: "closeOnClickOverlay",
                text: "点击弹窗背景区域是否关闭弹窗",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "closeOnPopstate",
                text: "是否在页面切换时自动关闭",
                type: "boolean",
                optional: true,
                default: "true"
            },
            {
                name: "eventOnce",
                text: "点击事件是否带.once修饰符（这是实例化调用时会用到的一个参数，正常使用中一般不会需要用到）",
                type: "boolean",
                optional: true,
                default: "false"
            }
        ];

        private events = [
            {
                name: "confirm",
                text: "模态弹窗确认按钮点击事件"
            },
            {
                name: "cancel",
                text: "模态弹窗取消按钮点击事件"
            }
        ];

        private slots = [
            {
                name: "default",
                text: "消息内容文本或自定义的消息内容区域"
            }
        ];
    }
</script>

<style lang="less" scoped>
    .container {
        margin-top: 20px;
        background-color: #fff;
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
                    white-space: pre-line;
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
