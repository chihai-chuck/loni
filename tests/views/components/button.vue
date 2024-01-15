<template>
    <div class="page">
        <loni-header :icon="headerIcon"
                     line>Button</loni-header>
        <div class="container">
            <loni-button long>长按钮</loni-button>
            <p></p>
            <loni-button spacing="20px" long>按钮文字间距</loni-button>
            <p></p>
            <loni-button disabled long>按钮禁用</loni-button>
            <p></p>
            <loni-button async @click="asyncButtonHandler" long>等待回调按钮</loni-button>
            <p></p>
            <loni-button background="#ffd32d" long :loading="customButtonLoading" @click="customButtonHandler">自定义背景色</loni-button>
            <p></p>
            <loni-button>自适应长度按钮</loni-button>
            <span></span>
            <loni-button radius>圆角按钮</loni-button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';

    @Component
    export default class PageComponentButton extends Vue {
        private headerIcon = [
            {
                icon: "icon-loni-doc",
                active: () => {
                    this.$router.push("/components/button/doc");
                }
            }
        ];

        private customButtonLoading = false;

        private asyncButtonHandler(complete?: Function) {
            setTimeout(() => {
                complete && complete();
            }, 3000);
        }

        private customButtonHandler() {
            this.customButtonLoading = true;
            setTimeout(() => {
                this.customButtonLoading = false;
            }, 3000);
        }
    }
</script>

<style lang="less" scoped>
    .container {
        padding: 20px;
        > p {
            width: 100%;
            height: 20px;
        }
        > span {
            display: inline-block;
            width: 20px;
        }
    }
</style>
