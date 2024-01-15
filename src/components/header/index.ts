import Header from './header.vue';

Header.install = function (Vue: Loni.VueConstructor) {
    Vue.component("loni-header", Header);
}

export default Header;
