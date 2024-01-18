<template>
    <div class="page">
        <loni-header :icon="headerIcon"
                     line>Cell</loni-header>
        <div class="container">
            <loni-cell>
                <loni-cell-item title="常规菜单">副标题</loni-cell-item>
                <loni-cell-item title="常规菜单" text-left>副标题居左</loni-cell-item>
                <loni-cell-item title="带箭头菜单" next-icon></loni-cell-item>
                <loni-cell-item title="路由菜单" next="/components/button"></loni-cell-item>
                <loni-cell-item title="自定义背景色" background="linear-gradient(to right,#c6ffdd,#fbd786,#f7797d)"></loni-cell-item>
                <loni-cell-item title="自定义标题颜色" color="red"></loni-cell-item>
                <loni-cell-item title="自定义副标题颜色" text-color="blue" next-icon>副标题</loni-cell-item>
                <loni-cell-item title="底部带间距的菜单" spacing></loni-cell-item>
                <loni-cell-item title="底部以色值填充方式的间距" spacing-fill="#00f"></loni-cell-item>
                <loni-cell-item title="不显示底边线的菜单" :split-line="false"></loni-cell-item>
                <loni-cell-item title="限制列表标题宽度" title-fixed="5em">标题超过限制宽度将会自动换行</loni-cell-item>
                <loni-cell-item title="图标标题" icon="icon-loni-checked-circular">直接使用css定义的图标类名</loni-cell-item>
                <loni-cell-item title="自定义图标颜色" icon="icon-loni-checked-circular" icon-color="pink">可自定义单色图标的颜色</loni-cell-item>
                <loni-cell-item title="多色图标">
                    <em class="prefix-icon"
                        slot="prefix">
                        <loni-icon name="icon-food-pistachio"
                                   size="22px"></loni-icon>
                    </em>
                    <p>多色图标或图片格式图标可使用prefix自定义，不过大小及位置需要自己调整</p>
                </loni-cell-item>
                <loni-cell-item>
                    <div class="custom-item"
                         slot="custom">
                        自定义菜单栏内容，此时所有的布局和样式都需要自己编写，标题栏只提供基本的外框
                    </div>
                </loni-cell-item>
            </loni-cell>
        </div>
        <div class="cell-radius">
            <loni-cell radius>
                <loni-cell-item title="设置一组菜单的圆角边框">副标题</loni-cell-item>
                <loni-cell-item title="圆角会根据loni-cell的边界绘制">副标题</loni-cell-item>
                <loni-cell-item title="loni-cell-item不受任何影响">副标题</loni-cell-item>
            </loni-cell>
        </div>
        <loni-cell title-fixed="8em">
            <loni-cell-item title="限制一组菜单的标题宽度"></loni-cell-item>
            <loni-cell-item title="可以在loni-cell限制全部菜单项"></loni-cell-item>
            <loni-cell-item title="但是在菜单项中的限制优先级更高" title-fixed="auto"></loni-cell-item>
        </loni-cell>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-facing-decorator';

    @Component
    export default class PageComponentCell extends Vue {
        public headerIcon = [
            {
                icon: "icon-loni-doc",
                active: () => {
                    $vue.$router.push("/components/cell/doc");
                }
            }
        ];
    }
</script>

<style lang="less" scoped>
    .container {
        width: 100%;
        padding-top: 20px;
        > p {
            width: 100%;
            height: 20px;
        }
        > span {
            display: inline-block;
            width: 20px;
        }
    }
    .custom-item {
        font-size: 24px;
    }
    .cell-radius {
        width: 100%;
        padding: 20px;
    }
    .prefix-icon {
        .align(v-center);
        height: 100%;
        margin-right: 15px;
    }
</style>
