<template>
    <div class="page scroll flex">
        <loni-header :icon="headerIcon"
                     line>Scroll</loni-header>
        <loni-scroll @refresh="listRefresh"
                     @infinite="listInfinite"
                     :page-end="page.end"
                     refresh-scroll-back>
            <ul class="list">
                <li v-for="(num,index) in list">当前第{{num}}行</li>
            </ul>
        </loni-scroll>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';

    import { arrayInitRange } from "@pecasha/util";

    @Component
    export default class PageComponentScroll extends Vue {
        private headerIcon = [
            {
                icon: "icon-loni-doc",
                active: () => {
                    this.$router.push("/components/scroll/doc");
                }
            }
        ];

        private list: number[] = [];
        private page = {
            index: 1,
            size: 20,
            end: false
        }

        created() {
            this.init();
        }

        private init() {
            this.list = arrayInitRange(this.page.size, 0);
        }

        private listRefresh(done: Function) {
            setTimeout(() => {
                this.page.index = 1;
                this.page.end = false;
                this.init();
                done();
            }, 2000);
        }

        private listInfinite(done: Function) {
            this.page.index++;

            setTimeout(() => {
                const end = this.page.index * this.page.size;
                this.list = this.list.concat(arrayInitRange(end, end - this.page.size));
                if(this.page.index > 2) {
                    this.page.end = true;
                }
                done();
            }, 1000);
        }
    }
</script>

<style lang="less" scoped>
    .list {
        width: 100%;
        background-color: #fff;
        > li {
            .align(v-center);
            width: 100%;
            height: 100px;
            padding: 0 30px;
            font-size: 26px;
            &:not(:last-child) {
                border-bottom: 1PX solid #f5f5f5;
            }
        }
    }
</style>
