import Popup from "./popup.vue";

Popup.install = function (Vue: Loni.VueConstructor) {
    Vue.component("loni-popup", Popup);
}

export default Popup;
