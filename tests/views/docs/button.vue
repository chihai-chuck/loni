<template>
    <div class="page">
        <loni-header line>Button - 说明文档</loni-header>
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
        name: "PageComponentsButtonDoc"
    })
    export default class PageComponentsButtonDoc extends Vue {
        public params = [
            {
                name: "width",
                text: "按钮宽度（自定义需要带单位）",
                type: "string",
                optional: true,
                default: `"auto"`
            },
            {
                name: "height",
                text: "按钮高度（自定义需要带单位）",
                type: "string",
                optional: true,
                default: `"80rpx"`
            },
            {
                name: "loading",
                text: "开启loading状态动画（开启loading后按钮也会被禁用）",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "async",
                text: "异步任务按钮（开启后在点击事件触发时会自动开启loading，然后在触发的click事件中会传递一个回调函数，调用这个回调函数后会关闭自动loading状态，注意开启后click事件不再传递event对象）",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "disabled",
                text: "禁用按钮，点击事件失效",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "background",
                text: "自定义背景",
                type: "string",
                optional: true,
                default: `"#fff"`
            },
            {
                name: "color",
                text: "自定义颜色（包含loading图标颜色）",
                type: "string",
                optional: true,
                default: `"#333"`
            },
            {
                name: "icon",
                text: "按钮图标",
                type: "string",
                optional: true,
                default: "null"
            },
            {
                name: "long",
                text: "全宽按钮（按钮会达到父级元素的100%宽度）",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "center",
                text: "按钮相对于父级元素居中（不建议使用这个去居中按钮，好的方式应当通过改变父级元素样式去居中内容）",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "margin",
                text: "自定义按钮margin样式值，例如center只能居中但是不能设置顶部或底部边距，就可以改用margin实现（设置了margin后按钮display会变为flex）",
                type: "string",
                optional: true,
                default: '"0"'
            },
            {
                name: "radius",
                text: "按钮圆角，true默认高度80rpx，字符串自定义（如果改变了按钮height并且需要圆角，需要自定义）",
                type: "string、boolean",
                optional: true,
                default: "false"
            },
            {
                name: "border",
                text: "自定义按钮的边框样式",
                type: "string",
                optional: true,
                default: '"none"'
            },
            {
                name: "size",
                text: "自定义按钮的字体大小",
                type: "string",
                optional: true,
                default: `"28rpx"`
            },
            {
                name: "spacing",
                text: "自定义按钮文字间距（需要带单位）",
                type: "string",
                optional: true,
                default: "null"
            },
            {
                name: "flex",
                text: "设置button的flex，true默认为1，字符串自定义（开启了long时不建议同时设置flex）",
                type: "string、boolean",
                optional: true,
                default: "false"
            },
            {
                name: "htmlType",
                text: "设置按钮的html-type",
                type: "string",
                optional: true,
                default: '"button"'
            }
        ];

        public events = [
            {
                name: "click",
                text: "按钮点击事件",
                params: "当前开启async时传递一个带有回调函数的function，否则传递event"
            }
        ];

        public slots = [
            {
                name: "default",
                text: "按钮的文字或自定义的按钮内容"
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
