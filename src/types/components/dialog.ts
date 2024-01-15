declare namespace Loni {
    namespace Component {
        type DialogInstance = typeof import("@/components/dialog/dialog.vue");
        interface Dialog extends DialogInstance {
            visible: boolean;
        }
        namespace Dialog {
            interface Instance extends DialogInstance, LoniComponent {
                alert: (props: Options | string) => Promise<string>;
                confirm: (props: Options | string) => Promise<string>;
                close: () => void;
            }
            interface Able extends Instance {
                newInstance: (data: Loni.AnyObject, prop: Loni.AnyObject, callback?: Function) => any;
            }
            interface Options {
                /** 标题 */
                title?: string;
                /** 消息内容 */
                message?: string;
                /** 是否显示取消按钮 */
                showCancelButton?: boolean;
                /** 是否显示确认按钮 */
                showConfirmButton?: boolean;
                /** 确认按钮文字内容 */
                confirmButtonText?: string;
                /** 确认按钮文字颜色 */
                confirmButtonColor?: string;
                /** 取消按钮文字内容 */
                cancelButtonText?: string;
                /** 取消按钮文字颜色 */
                cancelButtonColor?: string;
                /** 点击弹窗背景区域是否关闭弹窗 */
                closeOnClickOverlay?: boolean;
                /** 是否在页面切换时自动关闭 */
                closeOnPopstate?: boolean;
                /** 动态渲染函数 */
                render?: (h: import("vue").CreateElement) => JSX.Element;
            }
        }
    }
}
