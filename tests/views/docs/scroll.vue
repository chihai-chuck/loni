<template>
    <div class="page">
        <loni-header line>Scroll - 说明文档</loni-header>
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
                    <p>
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
    import { Vue, Component } from "vue-facing-decorator";

    @Component({
        name: "PageComponentsScrollDoc"
    })
    export default class PageComponentsScrollDoc extends Vue {
        public params = [
            {
                name: "disabledInfinite",
                text: "禁用加载更多功能",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "disabledRefresh",
                text: "禁用下拉刷新功能",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "refreshScrollKeep",
                text: "刷新后滚动位置保持（适用于刷新后内容高度会发生变化，但是滚动位置不随之变化的情况）",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "pageEnd",
                text: "是否是尾页（设为true后不会再触发infinite事件）",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "disabledScrolling",
                text: "关闭webkit的快速滚动",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "infiniteText",
                text: "新页加载时的提示文本",
                type: "string",
                optional: true,
                default: '"加载中..."'
            },
            {
                name: "endText",
                text: "尾页提示文本",
                type: "string",
                optional: true,
                default: `"没有更多了"`
            },
            {
                name: "refreshPullText",
                text: "下拉时的提示文本",
                type: "string",
                optional: true,
                default: '"下拉更新"'
            },
            {
                name: "refreshLoosenText",
                text: "下拉时的松开提示文本",
                type: "string",
                optional: true,
                default: '"松开更新"'
            },
            {
                name: "color",
                text: "提示文本及加载图标的颜色",
                type: "string",
                optional: true,
                default: '"#999"'
            }
        ];

        public events = [
            {
                name: "refresh",
                text: "下拉刷新事件",
                params: "[function]一个带有回调函数的function"
            },
            {
                name: "infinite",
                text: "加载新页事件",
                params: "[function]一个带有回调函数的function、[boolean]是否正在滚动状态"
            },
            {
                name: "scrolling",
                text: "滚动中事件",
                params: "[HTMLDivElement]当前滚动对象"
            }
        ];

        public slots = [
            {
                name: "default",
                text: "内容区域"
            },
            {
                name: "refresh",
                text: "自定义下拉刷新区域"
            },
            {
                name: "infinite",
                text: "自定义加载新页区域"
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
