<template>
    <div class="page">
        <loni-header line>Popup - 说明文档</loni-header>
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
        name: "PageComponentsPopupDoc"
    })
    export default class PageComponentsPopupDoc extends Vue {
        private params = [
            {
                name: "model-value",
                text: "显示/隐藏，可通过v-model双向绑定，也可使用value单向控制",
                type: "boolean",
                optional: false
            },
            {
                name: "center",
                text: "内容是否居中显示（以弹出层背景为区域）",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "zIndex",
                text: "自定义层级",
                type: "number",
                optional: true,
                default: "1799"
            },
            {
                name: "padding",
                text: "弹出层内容区域内边距",
                type: "string",
                optional: true,
                default: '""'
            },
            {
                name: "disTransition",
                text: "是否禁用显隐过渡效果",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "background",
                text: "弹出层遮罩背景色",
                type: "string",
                optional: true,
                default: "rgba(0,0,0,.55)"
            },
            {
                name: "transition",
                text: "弹出层transition过渡名称（可自定义也可使用预设）\n预设效果：\nfade 渐变\npopup-fade-in-up 从底部渐变出现\npopup-fade-in-bottom 从顶部渐变出现\npopup-fade-in-left 从左侧渐变出现\npopup-fade-in-right 从右侧渐变出现\npopup-fade-in-scale 从中心缩放渐变",
                type: "string",
                optional: true,
                default: '"fade"'
            },
            {
                name: "flex",
                text: "内容区域使用伸缩盒布局",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "top",
                text: "距离顶部的距离，需带单位（一般用于顶部弹出窗时略过导航栏）",
                type: "string",
                optional: true,
                default: '"0"'
            },
            {
                name: "closeOnClickOverlay",
                text: "点击遮罩是否关闭弹出层",
                type: "boolean",
                optional: true,
                default: "true"
            },
            {
                name: "closeOnPopstate",
                text: "是否在页面切换时自动关闭",
                type: "boolean",
                optional: true,
                default: "true"
            },
            {
                name: "maskTriggerEvent",
                text: "背景区域触发点击事件监听类型",
                type: "string",
                optional: true,
                default: '"touchstart"'
            }
        ];

        private events = [
            {
                name: "maskTrigger",
                text: "遮罩点击事件",
                params: "[object]遮罩层元素event"
            }
        ];

        private slots = [
            {
                name: "default",
                text: "弹窗内容区域"
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
