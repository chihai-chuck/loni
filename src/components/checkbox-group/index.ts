import CheckboxGroup from "./checkbox-group.vue";

CheckboxGroup.install = function (Vue: Loni.VueConstructor) {
    Vue.component(CheckboxGroup.name, CheckboxGroup);
}

export default CheckboxGroup;
