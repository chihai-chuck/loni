<template>
    <div class="page">
        <loni-header :icon="headerIcon"
                     line>Checkbox</loni-header>
        <div class="container">
            <loni-checkbox v-model="checkbox">常规复选框</loni-checkbox>
            <p></p>
            <loni-checkbox v-model="checkbox"
                           disabled>禁用状态</loni-checkbox>
            <p></p>
            <loni-checkbox v-model="checkbox"
                           uncheck-color="blue"
                           checked-color="green">自定义复选框图标颜色</loni-checkbox>
            <p></p>
            <loni-checkbox v-model="checkbox"
                           color="skyblue">自定义复选框文字颜色</loni-checkbox>
            <p></p>
            <loni-checkbox v-model="checkbox"
                           uncheck-icon="icon-unmarked"
                           checked-icon="icon-marked">自定义复选框图标</loni-checkbox>
            <p></p>
            <loni-checkbox v-model="checkbox"
                           checked-icon="icon-qian">uncheck-icon可以不传，未选中就会使用checked-icon的图标</loni-checkbox>
            <p></p>
            <div class="caption">分组复选框：</div>
            <loni-checkbox-group v-model="checkboxGroup" model-name>
                <loni-checkbox name="a">选项一</loni-checkbox>
                <loni-checkbox disabled name="b">选项二</loni-checkbox>
                <loni-checkbox name="c">选项三</loni-checkbox>
            </loni-checkbox-group>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';

    @Component
    export default class PageComponentCheckbox extends Vue {
        private headerIcon = [
            {
                icon: "icon-loni-doc",
                active: () => {
                    this.$router.push("/components/checkbox/doc");
                }
            }
        ];

        private checkbox = false;

        private checkboxGroup = ["a", "b"];
    }
</script>

<style lang="less" scoped>
    .container {
        width: 100%;
        padding: 20px;
        > p {
            width: 100%;
            height: 20px;
        }
        > span {
            display: inline-block;
            width: 20px;
        }
        .caption {
            .align(h-space-between);
            .align(v-center);
            width: 100%;
            margin-bottom: 10px;
            font-size: 28px;
            color: #999;
        }
    }
</style>
