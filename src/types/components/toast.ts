declare namespace Loni {
    namespace Component {
        type ToastInstance = typeof import("@/components/toast/toast.vue");
        interface Toast extends ToastInstance {
            visible: boolean;
        }
        namespace Toast {
            type Instance = (data: Loni.AnyObject, prop: Loni.AnyObject, callback?: Function) => any;
            type Able = (options: Options | string) => Toast;
            interface Options {
                /** 消息内容 */
                message?: string;
                /** 出现位置 */
                position?: "top" | "middle" | "bottom";
                /** 显示时长 */
                duration?: number;
                /** 背景色 */
                background?: string;
                /** 点击事件穿透 */
                eventPenetrate?: boolean;
                /** 是否在页面切换时自动关闭 */
                closeOnPopstate?: boolean;
                /** 动态渲染函数 */
                render?: (h: import("vue").CreateElement) => JSX.Element;
            }
        }
    }
}
