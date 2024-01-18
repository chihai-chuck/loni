import "./types";

import "./styles/default.less";

import config from "./config";

import Button from "./components/button";
import Cell from "./components/cell";
import CellItem from "./components/cell-item";
import Checkbox from "./components/checkbox";
import CheckboxGroup from "./components/checkbox-group";
import Header from "./components/header";
import Icon from "./components/icon";
import Loading from "./components/loading";
import Popup from "./components/popup";
import Scroll from "./components/scroll";
import Dialog from "./components/dialog";
import Toast from "./components/toast";
import Switch from "./components/switch";
import Swipeout from "./components/swipeout";

import loni from "./instance";

const components = {
    "loni-button": Button,
    "loni-cell": Cell,
    "loni-cell-item": CellItem,
    "loni-checkbox": Checkbox,
    "loni-checkbox-group": CheckboxGroup,
    "loni-header": Header,
    "loni-icon": Icon,
    "loni-loading": Loading,
    "loni-popup": Popup,
    "loni-scroll": Scroll,
    "loni-dialog": Dialog,
    "loni-switch": Switch,
    "loni-swipeout": Swipeout
};

loni.Loading = Loading as Loni.Component.Loading.Instance;
loni.Dialog = Dialog as Loni.Component.Dialog.Instance;
loni.Toast = Toast.instance;

const install: any = function (Vue: Loni.App) {
    if(install.installed) return;

    for(let componentName of Object.keys(components)) {
        Vue.component(componentName, components[componentName as keyof typeof components]);
    }

    // 这边只有通过完全引入才会执行，按需引入的是在组件index导出中的install中执行，所以有方法或属性需要挂载到$loni暴露的，还需要在组件index的install中再赋值一次
    Vue.config.globalProperties.$loni = loni;
}

if(typeof window !== "undefined" && (window as any).Vue) {
    install((window as any).Vue);
}

export {
    config,
    Button,
    Cell,
    CellItem,
    Checkbox,
    CheckboxGroup,
    Header,
    Icon,
    Loading,
    Popup,
    Scroll,
    Dialog,
    Toast,
    Switch,
    Swipeout
}
export default {
    install,
    config,
    Button,
    Cell,
    CellItem,
    Checkbox,
    CheckboxGroup,
    Header,
    Icon,
    Loading,
    Popup,
    Scroll,
    Dialog,
    Toast,
    Switch,
    Swipeout
}
