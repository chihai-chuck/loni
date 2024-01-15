import Icon from './icon.vue';

Icon.install = function (Vue: Loni.VueConstructor) {
    Vue.component("loni-icon", Icon);
}

export default Icon;
