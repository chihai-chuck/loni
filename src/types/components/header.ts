declare namespace Loni {
    namespace Component {
        namespace Header {
            interface IconItem {
                icon: string;
                caption?: string;
                size?: string;
                style?: any;
                active?: Function;
                render?: import("vue").RootRenderFunction;
            }
        }
    }
}
