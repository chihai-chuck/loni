import Cell from './cell.vue';

Cell.install = function (Vue: Loni.VueConstructor) {
    Vue.component("loni-cell", Cell);
}

export default Cell;
