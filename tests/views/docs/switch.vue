<template>
    <div class="page">
        <loni-header line>Switch - 说明文档</loni-header>
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
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from "vue-facing-decorator";

    @Component({
        name: "PageComponentsSwitchDoc"
    })
    export default class PageComponentsSwitchDoc extends Vue {
        public params = [
            {
                name: "model-value",
                text: "显示/隐藏，可通过v-model双向绑定，也可使用value单向控制",
                type: "boolean",
                optional: false
            },
            {
                name: "size",
                text: "开关大小（需带单位）",
                type: "string",
                optional: true,
                default: '"30px"'
            },
            {
                name: "activeColor",
                text: "开启状态色值",
                type: "string",
                optional: true,
                default: '"#2d8cf0"'
            },
            {
                name: "inactiveColor",
                text: "关闭状态色值",
                type: "string",
                optional: true,
                default: '"#f1f1f1"'
            },
            {
                name: "disabled",
                text: "是否禁用",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "loading",
                text: "是否显示加载中状态",
                type: "boolean",
                optional: true,
                default: "false"
            },
            {
                name: "async",
                text: "是否开启异步控制（开启后在点击事件触发时会自动开启loading，然后在触发的change事件中会传递一个回调函数，调用这个回调函数后会关闭自动loading状态，注意开启后change事件不再传递当前开关状态）",
                type: "boolean",
                optional: true,
                default: "false"
            }
        ];

        public events = [
            {
                name: "click",
                text: "开关点击事件（每次点击都会触发）"
            },
            {
                name: "change",
                text: "开关状态切换事件",
                params: "如果开启了async将会传递一个带有回调函数的function，否则传递切换后的开关状态"
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
