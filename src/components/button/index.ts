import Button from "./button.vue";

Button.install = function (Vue: Loni.VueConstructor) {
    Vue.component("loni-button", Button);
}

export default Button;
