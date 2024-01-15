<template>
    <div class="page">
        <loni-header :icon="headerIcon"
                     line>Icon</loni-header>
        <div class="container">
            <loni-icon name="icon-poker-heart" monochrome>单色图标</loni-icon>
            <p></p>
            <loni-icon name="icon-poker-heart" color="pink" monochrome>自定义单色图标色值</loni-icon>
            <p></p>
            <div class="icon-line"><loni-icon name="icon-poker-heart" color="pink" monochrome></loni-icon><em style="margin-left:.3rem">我不想改变文字的色值</em></div>
            <p></p>
            <loni-icon name="icon-poker-heart" size="30px" monochrome>自定义图标大小</loni-icon>
            <p></p>
            <div class="icon-line"><loni-icon name="icon-poker-heart" size="30px" monochrome></loni-icon><em style="margin-left:.3rem">我不想改变文字的大小</em></div>
            <p></p>
            <loni-icon name="icon-food-hotdog">多色图标</loni-icon>
            <p></p>
            <loni-icon name="icon-food-popsicle" size="30px">自定义多色图标大小</loni-icon>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';

    @Component
    export default class PageComponentIcon extends Vue {
        private headerIcon = [
            {
                icon: "icon-loni-doc",
                active: () => {
                    this.$router.push("/components/icon/doc");
                }
            }
        ];
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
        .icon-line {
            .align(v-center);
        }
    }
</style>
