<template>
    <div class="page">
        <loni-header ref="header"
                     :icon="headerIcon"
                     line>Popup</loni-header>
        <div class="container">
            <loni-button @click="visible=!visible" long>显示/隐藏 弹出层</loni-button>
            <p></p>
            <loni-button @click="boxTopVisible=!boxTopVisible" long>顶部弹出框</loni-button>
            <p></p>
            <loni-button @click="boxBottomVisible=!boxBottomVisible" long>底部弹出框</loni-button>
            <p></p>
            <loni-button @click="boxLeftVisible=!boxLeftVisible" long>左侧弹出框</loni-button>
            <p></p>
            <loni-button @click="boxRightVisible=!boxRightVisible" long>右侧弹出框</loni-button>
            <p></p>
            <loni-button @click="boxBackgroundVisible=!boxBackgroundVisible" long>自定义弹出层背景色</loni-button>
        </div>
        <loni-popup v-model="visible"></loni-popup>
        <loni-popup v-model="boxTopVisible" :top="headerHeight+'px'">
            <div class="box-width popup-fade-in-bottom">顶部弹出框</div>
        </loni-popup>
        <loni-popup v-model="boxBottomVisible">
            <div class="box-width popup-fade-in-up">底部弹出框</div>
        </loni-popup>
        <loni-popup v-model="boxLeftVisible">
            <div class="box-height popup-fade-in-right">左侧弹出框</div>
        </loni-popup>
        <loni-popup v-model="boxRightVisible">
            <div class="box-height popup-fade-in-left">右侧弹出框</div>
        </loni-popup>
        <loni-popup v-model="boxBackgroundVisible" background="purple" center>
            <div class="box popup-fade">自定义弹出层背景色</div>
        </loni-popup>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Ref } from 'vue-facing-decorator';

    @Component
    export default class PageComponentPopup extends Vue {
        public headerIcon = [
            {
                icon: "icon-loni-doc",
                active: () => {
                    $vue.$router.push("/components/popup/doc");
                }
            }
        ];

        @Ref() header!: any;

        public visible = false;
        public boxTopVisible = false;
        public boxBottomVisible = false;
        public boxLeftVisible = false;
        public boxRightVisible = false;
        public boxBackgroundVisible = false;

        public headerHeight = 0;
        mounted() {
            this.headerHeight = this.header.$el.offsetHeight;
        }
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
    }
    .box,
    .box-width,
    .box-height {
        .align(center);
        background-color: #fff;
        letter-spacing: 3px;
        font-size: 28px;
        color: #999;
    }
    .box-width {
        width: 100%;
        height: 500px;

    }
    .box-height {
        width: 350px;
        height: 100%;
    }
    .box {
        width: 550px;
        height: 400px;
    }
</style>
