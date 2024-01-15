<template>
    <div class="home">
        <loni-header :back="false"
                     :icon="headerIcon"
                     spacing
                     line><loni-icon name="icon-loni-logo" size="16px" color="#f15a1b" monochrome></loni-icon><em style="margin-left:5px">Loni</em></loni-header>
        <loni-cell>
            <loni-cell-item v-for="(component,index) in componentsList"
                            :key="index"
                            :title="component|stringCapitalize"
                            :next="`/components/${component}`"></loni-cell-item>
        </loni-cell>
        <p class="copyright">
            <span>基于 Vue 的移动端通用组件库</span>
            <em>Loni - 忍冬</em>
        </p>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    import { stringCapitalize } from "@pecasha/util";

    @Component({
        name: "PageHome",
        filters: {
            stringCapitalize: (val: string) => stringCapitalize(val)
        }
    })
    export default class PageHome extends Vue {
        private headerIcon = [
            {
                icon: "icon-loni-code",
                active: () => {
                    window.open("https://github.com/pecasha/loni", "_blank");
                }
            }
        ];

        private componentsList = [
            "button",
            "cell",
            "checkbox",
            "dialog",
            "header",
            "icon",
            "loading",
            "popup",
            "scroll",
            "swipeout",
            "switch",
            "toast"
        ].sort();
    }
</script>

<style lang="less" scoped>
    .copyright {
        .align(center);
        width: 100%;
        height: 90px;
        line-height: 1;
        text-align: center;
        font-size: 22px;
        color: #999;
        > span {
            padding-right: 30px;
        }
        > em {
            position: relative;
            padding-left: 30px;
            line-height: 34px;
            &::before {
                .absolute(m);
                left: 0;
                content: "";
                width: 1PX;
                height: 22px;
                background-color: #aaa;
            }
        }
    }
</style>
