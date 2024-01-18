<template>
    <div class="page">
        <loni-header line>Header - 说明文档</loni-header>
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
    import { Vue, Component } from "vue-facing-decorator";

    @Component({
        name: "PageComponentsHeaderDoc"
    })
    export default class PageComponentsHeaderDoc extends Vue {
        public params = [
            {
                name: "line",
                text: '是否显示底部边线（可以通过传入一个色值自定义边线颜色并显示边线，色值格式："R,G,B"）',
                type: "boolean、string",
                optional: true,
                default: "false"
            },
            {
                name: "home",
                text: "是否显示主页按钮（主页和返回按钮不可同时显示，主页优先级更高）",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "homeText",
                text: "主页按钮显示文本",
                type: "string",
                optional: true,
                default: '""'
            },
            {
                name: "homePath",
                text: "主页路径",
                type: "string",
                optional: true,
                default: '""'
            },
            {
                name: "back",
                text: "是否显示返回按钮",
                type: "boolean",
                optional: true,
                default: "true"
            },
            {
                name: "backText",
                text: "返回按钮显示的文本",
                type: "string",
                optional: true,
                default: '""'
            },
            {
                name: "backPath",
                text: "自定义返回按钮时跳转的路由地址（如果没有指定则是返回上一页，否则将以replace的方式跳转）",
                type: "string",
                optional: true,
                default: "null"
            },
            {
                name: "backIconCover",
                text: "是否在返回图标后加圆形半透明黑色遮罩",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "backHandler",
                text: "自定义返回按钮触发的事件",
                type: "function",
                optional: true,
                default: "null"
            },
            {
                name: "transparent",
                text: "背景全透明（这个会导致fade部分效果无法正常显示，因为transparent对导航栏的透明优先级是最高的）",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "zIndex",
                text: "自定义导航栏的z-index层级",
                type: "number、string",
                optional: true,
                default: "990"
            },
            {
                name: "color",
                text: '字体和图标颜色（色值格式："R,G,B"）',
                type: "string",
                optional: true,
                default: '"51,51,51"'
            },
            {
                name: "position",
                text: "自定义position",
                type: "string",
                optional: true,
                default: '"sticky"'
            },
            {
                name: "icon",
                text: "右侧图标组",
                type: "Loni.Component.Header.IconItem[]",
                optional: true,
                default: "[]"
            },
            {
                name: "iconSub",
                text: "左侧图标组",
                type: "Loni.Component.Header.IconItem[]",
                optional: true,
                default: "[]"
            },
            {
                name: "spacing",
                text: "导航栏下方是否增加边距",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "textShadow",
                text: "文字和图标增加阴影（可用于白底白字的情况）",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "background",
                text: "自定义导航栏背景色（若开启了任何fade功能，background参数只有传入256色值才会生效，例：255,211,45）",
                type: "string",
                optional: true,
                default: '"255,255,255"'
            },
            {
                name: "statusbarHeight",
                text: "状态栏高度（需带单位，此处优先级比全局默认参数要高）",
                type: "string",
                optional: true,
                default: "null"
            },
            {
                name: "scrollObj",
                text: '若开启了fade，则需传入该值，例如是使用scroll组件控制页面滚动，则需要传入scroll的元素DOM对象，如果需要监听页面滚动，则直接传入字符串"page"',
                type: 'Vue、HTMLElement、"page"',
                optional: true,
                default: "null"
            },
            {
                name: "fade",
                text: `滚动渐变类型，多种类型按数组传入（字符串传入不支持带参数），（所有模式有需要参入额外参数值的通过数组方式第二个值传入，例["base", ["color", "51,51,51"]]）\n类型可选值：base、color、slot、slotColor、background、colorGradient\n    base 导航栏是否根据页面滚动位置渐现渐隐\n    color 颜色是否根据页面滚动位置渐变，将由全透明向传入色值渐变\n        参数：\n            (String) 渐变色值\n    slot slot区域是否根据页面滚动位置渐现渐隐\n    slotColor slot区域颜色是否根据页面滚动位置渐变，将由全透明向传入色值渐变\n        参数：\n            (String) 渐变色值\n    background 导航栏背景色是否根据页面滚动位置渐变，将由全透明向传入色值渐变\n    colorGradient 颜色是否根据页面滚动位置渐变，将由color参数值向传入色值渐变\n        参数：\n            {\n                start: (String)渐变开始色值\n                end: (String)渐变结束色值\n            }\n    line 底部分割线是否根据页面滚动位置渐现渐隐`,
                type: "[array, string][]、string",
                optional: true,
                default: "null"
            },
            {
                name: "visible",
                text: "导航栏可见性（在有些场景需要用到，这个建议是在config默认配置中统一设置的）",
                type: "boolean",
                optional: true,
                default: "true"
            },
            {
                name: "filling",
                text: "占位区域填充（适用于position为absolute或fixed时，使导航栏高度的一块区域不脱离文档流）",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "eventPenetrate",
                text: "事件穿透（icon按钮的事件不会穿透）",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "slotFull",
                text: "slot区域是否填充模式（填充模式的slot区域不会自居中，但是填充模式会布满空白区域）",
                type: "boolean",
                optional: true,
                default: "false"
            }
        ];

        public events = [
            {
                name: "scroll",
                text: "页面或区域滚动事件（滚动对象根据传入的scrollObj而定）",
                params: "[object]event、[number]滚动位置"
            }
        ];

        public slots = [
            {
                name: "default",
                text: "导航栏标题文字或自定义标题"
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
                    white-space: pre-wrap;
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
