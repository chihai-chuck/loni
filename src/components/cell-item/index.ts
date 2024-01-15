import CellItem from './cell-item.vue';

CellItem.install = function (Vue: Loni.VueConstructor) {
    Vue.component("loni-cell-item", CellItem);
}

export default CellItem;
