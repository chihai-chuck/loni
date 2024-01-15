<template>
    <div class="app-wrapper"
         :class="{pc:!mobileMode}">
        <keep-alive :include="includePage">
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script lang="ts">
    import "./assets/fonts/iconfont.js";

    import { Vue, Component, Watch } from 'vue-property-decorator';

    import { browserVersion } from "@pecasha/util";

    @Component({
        name: "App"
    })
    export default class App extends Vue {
        private includePage = [

        ].join(",");

        private mobileMode = false;

        created() {
            this.mobileMode = browserVersion().mobile;
            if(this.mobileMode) {
                this.$global.init();
            } else {
                document.documentElement.style.fontSize = "24px";
                document.body.style.display = "flex";
                document.body.style.alignItems = "center";
                document.body.style.justifyContent = "center";
            }
            this.setConsoleDebugVariable();
        }

        @Watch("$route.path")
        setConsoleDebugVariable() {
            setTimeout(() => {
                (window as any)["vv"] = (this as any).$router.currentRoute.matched[0]?.instances.default;
            }, 100);
        }
    }
</script>

<style lang="less" src="./styles/default.less"/>
<style lang="less">
    .app-wrapper {
        //-webkit-overflow-scrolling: touch;
        margin: 0 auto;
        background-color: #ededed;
        &.pc {
            .shadow(0, 0, 10px, rgba(0,0,0,.3));
            width: 750px;
            height: 1300px;
            border-radius: 15px;
            overflow-x: hidden;
            overflow-y: auto;
            &::-webkit-scrollbar {
                width: 10px;
                height: 10px;
            }
            &::-webkit-scrollbar-thumb {
                border-radius: 5px;
                background-color: rgba(0,0,0,.2);
            }
        }
        &:not(.pc) {
            width: 100%;
            height: 100%;
            min-height: 100%;
        }
    }
</style>
