<template>
    <div class="page">
        <loni-header line>Toast - 说明文档</loni-header>
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
        name: "PageComponentsToastDoc"
    })
    export default class PageComponentsToastDoc extends Vue {
        private params = [
            {
                name: "message",
                text: "消息内容",
                type: "string",
                optional: true,
                default: "null"
            },
            {
                name: "position",
                text: "出现位置（top-上方、middle-中间、botton-下方）",
                type: "string",
                optional: true,
                default: '"middle"'
            },
            {
                name: "duration",
                text: "显示时长（单位毫秒，值为0或负数不消失）",
                type: "number",
                optional: true,
                default: "3000"
            },
            {
                name: "background",
                text: "背景色",
                type: "string",
                optional: true,
                default: '"rgba(0,0,0,.6)"'
            },
            {
                name: "eventPenetrate",
                text: "点击事件穿透",
                type: "boolean",
                optional: true,
                default: "true"
            },
            {
                name: "closeOnPopstate",
                text: "是否在页面切换时自动关闭",
                type: "boolean",
                optional: true,
                default: "false"
            }
        ];

        private events = [
            {
                name: "close",
                text: "轻提示框关闭事件"
            }
        ];

        private slots = [
            {
                name: "default",
                text: "自定义轻提示框内容"
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
