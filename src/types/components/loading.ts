declare namespace Loni {
    namespace Component {
        type LoadingInstance = typeof import("@/components/loading/loading.vue");
        interface Loading extends LoadingInstance {
            visible: boolean;
        }
        namespace Loading {
            interface Instance extends LoadingInstance, LoniComponent {
                show: (options?: Options) => void;
                hide: () => void;
            }
            interface Able extends Instance {
                newInstance: (data: Loni.AnyObject, prop: Loni.AnyObject) => any;
                remove: (callback: Function) => any;
            }
            interface Options {
                /** 铺满父级容器（宽高布满整个最近的position:relative父级元素） */
                fix?: boolean;
                /** 图标尺寸（default-默认、large-大、small-小） */
                size?: "default" | "large" | "small";
                /** 图标颜色 */
                color?: string;
                /** 背景色 */
                background?: string;
                /** 内容居中 */
                center?: boolean;
                /** 加载状态图标类型（spin-菊花转转转、point-小点闪闪闪） */
                type?: "spin" | "point";
                /** transition过渡名称（用于自定义显示隐藏的过渡动画） */
                transition?: string;
                /** 不显示过渡动画 */
                disTransition?: boolean;
                /** 动态渲染函数 */
                render?: (h: import("vue").CreateElement) => JSX.Element;
                /** 显示遮罩（全屏显示时有效） */
                cover?: boolean;
            }
        }
    }
}
