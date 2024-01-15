<template>
    <fragment>
        <p class="loni-header-filling"
           :style="{paddingTop: options.statusbarHeight}"
           v-if="options.filling"></p>
        <div class="loni-header"
             :class="{
                 spacing: options.spacing,
                 transparent: options.transparent,
                 'pointer-none': headerPointerNone,
                 'event-penetrate': eventPenetrate
             }"
             :style="styleMerge({
                 color: fontColor,
                 position: options.position,
                 zIndex: options.zIndex,
                 paddingTop: options.statusbarHeight,
                 borderBottom: lineStyle
             }, scrollFadeOpacity)"
             ref="headerRef"
             v-if="options.visible">
            <div class="container"
                 :class="{'text-shadow': options.textShadow}">
                <div class="control">
                    <i class="home icon-loni-home"
                       @click="gotoHome"
                       v-if="home||$route.query.home">{{options.homeText}}</i>
                    <i class="back icon-loni-arrow-left"
                       :class="{cover: config.icon.back.cover}"
                       @click="gotoBack"
                       v-else-if="back">{{backText}}</i>
                    <div class="icon left">
                        <i v-for="icon in iconSub"
                           class="loni"
                           :class="[icon.icon,{caption:icon.caption}]"
                           @click="icon.active&&icon.active()"
                           :style="styleMerge({fontSize: icon.size}, icon.style||{})">
                            {{icon.caption}}
                            <header-icon-expand :render="icon.render"
                                                v-if="icon.render"></header-icon-expand>
                        </i>
                    </div>
                    <div class="full-content"
                         :style="slotStyles"
                         v-if="slotFull">
                        <slot></slot>
                    </div>
                    <div class="fill"
                         v-else></div>
                    <div class="icon right">
                        <i v-for="icon in icon"
                           class="loni"
                           :class="[icon.icon,{caption: icon.caption}]"
                           @click="icon.active&&icon.active()"
                           :style="styleMerge({fontSize: icon.size}, icon.style||{})">
                            {{icon.caption}}
                            <header-icon-expand :render="icon.render"
                                                v-if="icon.render"></header-icon-expand>
                        </i>
                    </div>
                </div>
                <div class="content"
                     v-if="!slotFull">
                    <div :style="slotStyles">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    </fragment>
</template>

<script lang="ts">
    import Vue from "@/shim-vue";
    import type { CreateElement } from "vue";

    import Fragment from "vue-fragment";

    import { Component, Prop, Watch, Ref } from "vue-property-decorator";
    import { colorGradient } from "@pecasha/util";

    import config from "@/config/header";

    Vue.use(Fragment.Plugin);

    @Component({
        name: "LoniHeader",
        components: {
            headerIconExpand: {
                name: "headerIconExpand",
                functional: true,
                props: {
                    render: {
                        type: Function,
                        default: void 0
                    }
                },
                render: (h?: CreateElement, ctx?: any) => ctx.props.render(h, ctx.props)
            }
        }
    })
    export default class LoniHeader extends Vue {
        /** 是否显示底部边线 */
        @Prop({ type: [Boolean, String], default: undefined })
        public line?: boolean | string;

        /** 是否显示主页按钮（主页和返回按钮不可同时显示，主页优先级更高） */
        @Prop({ type: Boolean, default: false })
        public home!: boolean;

        /** 主页按钮显示的文本 */
        @Prop()
        public homeText?: string;

        /** 主页路径（如果不传入则返回主页按钮会跳转至路径/） */
        @Prop()
        public homePath?: string;

        /** 是否显示返回按钮，默认true */
        @Prop({ type: Boolean, default: true })
        public back!: boolean;

        /** 返回按钮显示的文本 */
        @Prop()
        public backText?: string;

        /** 自定义返回按钮时跳转的路由地址（如果没有指定则是返回上一页，否则将以replace的方式跳转） */
        @Prop()
        public backPath?: string;

        /** 是否在返回图标后加圆形半透明黑色遮罩 */
        @Prop({ type: Boolean, default: false })
        public backIconCover!: boolean;

        /** 自定义返回按钮触发的事件 */
        @Prop({ type: Function })
        public backHandler?: Function;

        /** 背景全透明（这个会导致fade部分效果无法正常显示，因为transparent对导航栏的透明优先级是最高的） */
        @Prop({ type: Boolean, default: undefined })
        public transparent?: boolean;

        /** 自定义导航栏的z-index层级 */
        @Prop({ type: [Number, String] })
        public zIndex?: number | string;

        /** 字体和图标颜色 */
        @Prop()
        public color?: string;

        /** 自定义position，有些场景可能需要改为fixed或者absolute */
        @Prop()
        public position?: string;

        /** 右侧图标 */
        @Prop({ default: () => [] })
        public icon!: Loni.Component.Header.IconItem[];

        /** 左侧图标 */
        @Prop({ default: () => [] })
        public iconSub!: Loni.Component.Header.IconItem[];

        /** 标题框下方是否增加边距 */
        @Prop({ type: Boolean, default: undefined })
        public spacing?: boolean;

        /** 文字和图标增加阴影（用于白底白字的情况） */
        @Prop({ type: Boolean, default: undefined })
        public textShadow?: boolean;

        /** 自定义导航栏背景色（若开启了任何fade功能，background参数只有传入256色值才会生效，例：255,211,45） */
        @Prop({ type: String })
        public background?: string;

        /** 状态栏高度（此处优先级比全局默认参数要高） */
        @Prop()
        public statusbarHeight?: string;

        /** scrollObj 若开启了fade，则需传入该值，例如是使用scroll组件控制页面滚动，则需要传入scroll的元素DOM对象，如果需要监听页面滚动，则直接传入字符串"page" */
        @Prop({ type: [Object, HTMLElement, String] })
        public scrollObj?: Vue | HTMLElement | "page";

        /**
         * 滚动渐变类型，多种类型按数组传入（字符串传入不支持带参数），（所有模式有需要参入额外参数值的通过数组方式第二个值传入，例["base", ["color", "51,51,51"]]）
         * 类型可选值：base、color、slot、slotColor、background、colorGradient
         *     base 导航栏是否根据页面滚动位置渐现渐隐
         *     color 颜色是否根据页面滚动位置渐变，将由全透明向传入色值渐变
         *         参数：
         *             (String) 渐变色值
         *     slot slot区域是否根据页面滚动位置渐现渐隐
         *     slotColor slot区域颜色是否根据页面滚动位置渐变，将由全透明向传入色值渐变
         *         参数：
         *             (String) 渐变色值
         *     background 导航栏背景色是否根据页面滚动位置渐变，将由全透明向传入色值渐变
         *     colorGradient 颜色是否根据页面滚动位置渐变，将由color参数值向传入色值渐变
         *         参数：
         *             {
         *                 start: (String)渐变开始色值
         *                 end: (String)渐变结束色值
         *             }
         *     line 底部分割线是否根据页面滚动位置渐现渐隐
         */
        @Prop({ type: [Array, String] })
        public fade?: any[] | string;

        /** 导航栏可见性（在有些场景需要用到，这个建议是在config默认配置中统一设置的） */
        @Prop({ type: Boolean, default: undefined })
        public visible?: boolean;

        /** 占位区域填充（适用于position为absolute或fixed时，使导航栏高度的一块区域不脱离文档流） */
        @Prop({ type: Boolean, default: undefined })
        public filling?: boolean;

        /** 事件穿透（icon按钮的事件不会穿透） */
        @Prop({ type: Boolean, default: false })
        public eventPenetrate!: boolean;

        /** slot区域是否填充模式（填充模式的slot区域不会自居中，但是填充模式会布满空白区域） */
        @Prop({ type: Boolean, default: undefined })
        public slotFull?: boolean;

        @Ref() private headerRef!: HTMLDivElement;

        public get options() {
            return {
                line: this.line ?? config.line,
                homePath: this.homePath ?? config.homePath,
                homeText: this.homeText ?? config.homeText,
                backPath: this.backPath ?? config.backPath,
                transparent: this.transparent ?? config.transparent,
                zIndex: this.zIndex ?? config.zIndex,
                color: this.color ?? config.color,
                position: this.position ?? config.position,
                spacing: this.spacing ?? config.spacing,
                textShadow: this.textShadow ?? config.textShadow,
                background: this.background ?? config.background,
                statusbarHeight: this.statusbarHeight ?? config.statusbarHeight,
                visible: this.visible ?? config.visible,
                backHandler: this.backHandler ?? config.backHandler,
                filling: this.filling ?? config.filling,
                slotFull: this.slotFull ?? config.slotFull
            }
        }

        private backgroundOpacity = 1;
        private colorOpacity = 1;
        private slotOpacity = 1;
        private lineOpacity = 1;
        private headerColor = "";
        private headerColorStart: [number, number, number] = [0, 0, 0];
        private headerColorEnd: [number, number, number] = [0, 0, 0];
        private headerBackground = "";
        private fadeModeList = [
            "base",
            "color",
            "slot",
            "slotColor",
            "background",
            "colorGradient",
            "line"
        ];
        private config = {
            icon: {
                back: {
                    cover: false
                }
            }
        }

        private get scrollDOM() {
            if(this.scrollObj) {
                if(this.scrollObj === "page") {
                    return document;
                }
                if((<Vue>this.scrollObj)?.$options?.name === "LoniScroll") {
                    return (<any>this.scrollObj).scroll;
                }
                return (<Vue>this.scrollObj).$el || this.scrollObj;
            }
            return void 0;
        }

        private get fadeMode() {
            if(typeof this.fade === "string") {
                return this.fadeModeList.includes(this.fade) ?
                    {[this.fade]: {}} :
                    {};
            } else if(this.fade instanceof Array) {
                let temp: Loni.AnyObject = {};
                for(let item of this.fade) {
                    if(typeof item === "string") {
                        if(this.fadeModeList.includes(item)) temp[item] = {};
                    } else if(this.fadeModeList.includes(item[0])) {
                        temp[item[0]] = item[1];
                    }
                }
                return temp;
            }
            return {};
        }

        private get scrollFadeOpacity() {
            return this.fadeMode.base ? {
                opacity: this.backgroundOpacity
            } : {
                background: this.options.transparent ? "transparent" : `rgba(${this.fadeMode.background||this.headerBackground},${this.backgroundOpacity}) !important`
            }
        }

        private get fontColor() {
            return this.fadeMode.color ? `rgba(${this.fadeMode.color},${this.colorOpacity}) !important` : `rgb(${this.headerColor}) !important`;
        }

        private get lineStyle() {
            if(this.options.line) {
                const color = typeof this.options.line === "string" ? this.options.line : "238,238,238";
                return this.fadeMode.line ? `1px solid rgba(${color},${this.lineOpacity})` : `1px solid rgb(${color})`;
            }
            return "none";
        }

        private get slotStyles() {
            return {
                opacity: this.fadeMode.slot ? this.slotOpacity : 1,
                color: this.fadeMode.slotColor ? `rgba(${this.fadeMode.slotColor},${this.slotOpacity})` : ""
            }
        }

        private get headerPointerNone() {
            return this.colorOpacity < .2 || (this.backgroundOpacity < .2 && !this.fadeMode.background);
        }

        @Watch("scrollDOM")
        private scrollDOMChanged(val: LoniHeader["scrollDOM"]) {
            if(val) this.setScrollFade();
        }

        private mounted() {
            this.headerBackground = this.options.background;
            this.headerColor = this.options.color;
            this.setScrollFade();
            this.config.icon.back.cover = this.backIconCover;
        }

        private activated() {
            if(this.scrollDOM) {
                this.setScrollFade();
                this.scrollEvent(); // 初始化一下透明度之类的东西
            }
        }

        /** 获取loni-header组件的高度 */
        public getHeight() {
            return this.headerRef.offsetHeight;
        }

        public gotoBack() {
            if(this.options.backHandler) {
                this.options.backHandler(this.options.backPath);
            } else {
                if(this.options.backPath) {
                    this.$router.replace(this.options.backPath);
                } else {
                    this.$router.back();
                }
            }
        }
        public gotoHome() {
            this.$router.push(this.options.homePath || "/");
        }

        private styleMerge(obj: Loni.AnyObject, arr: Loni.AnyObject) {
            return [obj, ...[arr || []]];
        }

        private scrollEvent(event?: Event) {
            let scrollTop = 0;
            if(this.scrollObj === "page") {
                scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            } else {
                scrollTop = (<Element>this.scrollDOM).scrollTop
            }
            const scrollOpacity = scrollTop / 130;
            if(scrollOpacity >= 0 && this.backgroundOpacity <= 1 || scrollOpacity <= 1.1 && this.backgroundOpacity >= 0) {
                if(this.fadeMode.base || this.fadeMode.background) {
                    this.backgroundOpacity = scrollOpacity;
                }
                if(this.fadeMode.color) {
                    this.colorOpacity = scrollOpacity;
                }
                if(this.fadeMode.slot || this.fadeMode.slotColor) {
                    this.slotOpacity = scrollOpacity;
                }
                if(this.fadeMode.colorGradient && this.fadeMode.colorGradient.start) {
                    this.headerColor = colorGradient(this.headerColorStart, this.headerColorEnd, scrollOpacity, true);
                    this.config.icon.back.cover = this.backIconCover ? this.backgroundOpacity < .2 : false;
                }
                if(this.fadeMode.line) {
                    this.lineOpacity = scrollOpacity;
                }
            }
            this.$emit("scroll", event, scrollTop);
        }

        private setScrollFade() {
            if(this.scrollDOM === void 0) return;
            if(this.fadeMode.colorGradient && this.fadeMode.colorGradient.start) {
                this.headerColorStart = this.fadeMode.colorGradient.start.split(",");
                this.headerColorEnd = this.fadeMode.colorGradient.end.split(",");
            }

            if(Object.keys(this.fadeMode).length) {
                this.scrollEvent();
                this.scrollDOM.addEventListener("scroll", this.scrollEvent);
            } else {
                this.backgroundOpacity = 1;
                this.colorOpacity = 1;
                this.slotOpacity = 1;
                this.scrollDOM.removeEventListener("scroll", this.scrollEvent);
            }
        }
    }
</script>

<style lang="less" scoped>
    .loni-header-filling {
        width: 100%;
        height: 50px;
    }
    .loni-header {
        z-index: 990;
        top: 0;
        left: 0;
        width: 100%;
        background-color: #fff;
        &.transparent {
            background-color: transparent !important;
            .container.statusbar-hide {
                height: 1px;
            }
        }
        &.spacing {
            margin-bottom: 12px;
        }
        &.pointer-none,
        &.event-penetrate {
            pointer-events: none;
        }
        // event-penetrate 的情况不穿透icon按钮事件
        &.event-penetrate > .container > .control {
            > .back,
            > .home,
            > .icon > i {
                pointer-events: auto;
            }
        }
        > .container {
            .align(center);
            position: relative;
            width: 100%;
            height: 50px;
            &.text-shadow {
                text-shadow: 0 0 10px #000;
            }
            &.statusbar-hide {
                height: 0;
            }
            > .content {
                .absolute(cm);
                width: max-content;
                height: max-content;
                font-size: 16px;
            }
            > .control {
                display: flex;
                width: 100%;
                height: 100%;
                > .fill,
                > .full-content {
                    flex: 1;
                    height: 100%;
                }
                > .back,
                > .home {
                    .align(v-center);
                    .align(left);
                    min-width: 50px;
                    height: 50px;
                    padding-left: 18px;
                    padding-right: 10px;
                    font-size: 14px;
                    &::before {
                        margin-right: 4px;
                        font-size: 20px;
                    }
                }
                > .back.cover {
                    padding-left: 10px;
                    &::before {
                        .align(center);
                        width: 36px;
                        height: 36px;
                        border-radius: 50%;
                        background-color: rgba(0, 0, 0, .4);
                        font-size: 18px;
                        color: #fff;
                    }
                }
                > .icon {
                    display: flex;
                    > i {
                        position: relative;
                        min-width: 50px;
                        height: 50px;
                        &.caption {
                            width: auto;
                            padding: 0 10px;
                            font-size: 12px !important;
                        }
                        &::before {
                            font-size: 20px;
                        }
                    }
                }
                > .full-content {
                    position: relative;
                }
            }
        }
    }
</style>
