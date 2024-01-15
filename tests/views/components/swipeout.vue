<template>
    <div class="page">
        <loni-header :icon="headerIcon"
                     line>Swipeout</loni-header>
        <div class="container">
            <div class="caption">配合单元格使用</div>
            <loni-cell>
                <loni-swipeout v-for="(item,index) in list"
                               :key="index">
                    <template #left>
                        <span class="btn add" @touchend="add">添加</span>
                    </template>
                    <loni-cell-item title="标题"
                                    @click="active">内容</loni-cell-item>
                    <hr>
                    <template #right>
                        <span class="btn info" @touchend="info">查看</span>
                        <span class="btn del" @touchend="del">删除</span>
                    </template>
                </loni-swipeout>
            </loni-cell>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component
    export default class PageComponentSwipeout extends Vue {
        private headerIcon = [
            {
                icon: "icon-loni-doc",
                active: () => {
                    this.$router.push("/components/swipeout/doc");
                }
            }
        ];

        private list = [0, 1, 2];

        private add() {
            this.$loni.Toast("点击了添加")
        }
        private info() {
            this.$loni.Toast("点击了查看")
        }
        private del() {
            this.$loni.Toast("点击了删除")
        }
        private active() {
            this.$loni.Dialog.alert("点击了列表项");
        }
    }
</script>

<style lang="less" scoped>
    .container {
        width: 100%;
        padding: 20px 0;
        > p {
            width: 100%;
            height: 20px;
        }
        > span {
            display: inline-block;
            width: 20px;
        }
        > hr {
            width: 100%;
            height: 1px;
            border-bottom: 1PX dashed #aaa;
        }
        .caption {
            .align(h-space-between);
            .align(v-center);
            width: 100%;
            padding: 0 20px;
            margin-bottom: 10px;
            font-size: 28px;
            color: #999;
        }
    }
    .btn {
        .align(center);
        width: 120px;
        height: 100%;
        font-size: 26px;
        color: #fff;
        &.add {
            background-color: #19be6b;
        }
        &.del {
            background-color: #ed4014;
        }
        &.info {
            background-color: #2db7f5;
        }
    }
</style>
