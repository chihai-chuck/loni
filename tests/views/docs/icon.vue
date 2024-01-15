<template>
    <div class="page">
        <loni-header line>Icon - 说明文档</loni-header>
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
        name: "PageComponentsIconDoc"
    })
    export default class PageComponentsIconDoc extends Vue {
        private params = [
            {
                name: "name",
                text: "图标名称",
                type: "string",
                optional: false
            },
            {
                name: "size",
                text: "图标大小（需带单位）",
                type: "string",
                optional: true,
                default: `"inherit"`
            },
            {
                name: "color",
                text: "图标颜色（仅在单色图标下生效）",
                type: "string",
                optional: true,
                default: `"inherit"`
            },
            {
                name: "monochrome",
                text: "单色模式（将不会使用svg显示图标，这时可以传入一个slot）",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "center",
                text: "是否将图标内容居中（这可能会导致图标与周围文本无法在同一行显示）",
                type: "boolean",
                optional: true,
                default: "false"
            }
        ];

        private events = [
            {
                name: "click",
                text: "图标点击事件",
                params: "[object]event"
            }
        ];

        private slots = [
            {
                name: "default",
                text: "图标右侧文字"
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
