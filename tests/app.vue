<template>
    <div class="app-wrapper"
         :class="{pc:!mobileMode}">
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>
</template>

<script lang="ts">
    import "./assets/fonts/iconfont.js";

    import { Vue, Component, Watch } from 'vue-facing-decorator';

    import { browserVersion } from "@pecasha/util";

    @Component({
        name: "App"
    })
    export default class App extends Vue {
        public mobileMode = false;

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
                (window as any)["vv"] = this.$router.currentRoute.value.matched[0]?.instances.default;
            }, 100);
        }
    }
</script>

<style lang="less" src="./styles/default.less"/>
<style lang="less">
    #app {
        .align(center);
        width: 100%;
        height: 100%;
    }
    .app-wrapper {
        background-color: #ededed;
        &.pc {
            .shadow(0, 0, 10px, rgba(0,0,0,.3));
            width: 720px;
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
