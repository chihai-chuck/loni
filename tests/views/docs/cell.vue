<template>
    <div class="page">
        <loni-header line>Cell - 说明文档</loni-header>
        <p id="cell"
           class="components">Cell</p>
        <div class="container first">
            <h2 id="cell-params">参数</h2>
            <ul class="params">
                <li v-for="(item,index) in cellParams"
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
            <h2 id="cell-slots">插槽</h2>
            <ul class="events">
                <li v-for="(item,index) in cellSlots"
                    :key="index">
                    <h3>{{item.name}}</h3>
                    <small>{{item.text}}</small>
                </li>
            </ul>
        </div>
        <p id="cell-item"
           class="components">CellItem</p>
        <div class="container first">
            <h2 id="cell-item-params">参数</h2>
            <ul class="params">
                <li v-for="(item,index) in cellItemParams"
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
                <li v-for="(item,index) in cellItemEvents"
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
            <h2 id="cell-item-slots">插槽</h2>
            <ul class="events">
                <li v-for="(item,index) in cellItemSlots"
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
        name: "PageComponentsCellDoc"
    })
    export default class PageComponentsCellDoc extends Vue {
        private cellParams = [
            {
                name: "radius",
                text: "圆角边框",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "titleFixed",
                text: "固定列表标题宽度（所有item子项，需带单位）",
                type: "string",
                optional: true,
                default: '"auto"'
            }
        ];
        private cellItemParams = [
            {
                name: "nextIcon",
                text: "是否显示右侧箭头图标",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "next",
                text: "在点击时触发路由跳转，并且会默认显示nextIcon",
                type: "string",
                optional: true,
                default: "null"
            },
            {
                name: "icon",
                text: "列表项图标",
                type: "string",
                optional: true,
                default: "null"
            },
            {
                name: "iconColor",
                text: "列表项图标颜色",
                type: "string",
                optional: true,
                default: '"#444"'
            },
            {
                name: "title",
                text: "列表项标题",
                type: "string",
                optional: true,
                default: '""'
            },
            {
                name: "color",
                text: "列表项标题文字颜色",
                type: "string",
                optional: true,
                default: '"#444"'
            },
            {
                name: "textColor",
                text: "列表项文本内容文字颜色",
                type: "string",
                optional: true,
                default: '"#999"'
            },
            {
                name: "spacing",
                text: "是否在列表项底部增加20rpx的margin间距",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "spacingFill",
                text: "是否以色值填充方式在列表项底部增加20rpx的间距（true默认填充色值#eee）",
                type: "boolean、string",
                optional: true,
                default: "false"
            },
            {
                name: "splitLine",
                text: "是否显示分割线",
                type: "boolean",
                optional: true,
                default: "true"
            },
            {
                name: "background",
                text: "列表项背景色",
                type: "string",
                optional: true,
                default: '"#fff"'
            },
            {
                name: "important",
                text: "是否在列表项标题前加星号标识",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "titleFixed",
                text: "固定列表项标题宽度（需带单位）",
                type: "string",
                optional: true,
                default: '"auto"'
            },
            {
                name: "textFlex",
                text: "列表项文本内容区域是否使用flex布局",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "textLeft",
                text: "列表项文本内容是否居左显示",
                type: "boolean",
                optional: true,
                default: "false"
            }
        ];

        private cellSlots = [
            {
                name: "default",
                text: "cell-item列表子项（理论上可以放置别的组件或标签，但是需要自行做兼容，并且会影响到cell-item的一些父级属性读取）"
            }
        ];

        private cellItemEvents = [
            {
                name: "click",
                text: "列表项点击事件"
            }
        ];

        private cellItemSlots = [
            {
                name: "default",
                text: "列表项显示值（右侧显示文本）"
            },
            {
                name: "custom",
                text: "自定义列表项内容（可以直接使用自定义的标签填充在列表项内，需要自行添加样式）"
            },
            {
                name: "prefix",
                text: "自定义列表项标题或图标（使用此插槽时，列表项的icon、title属性将会失效）"
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
