import Vue from 'vue';
import App from './app.vue';
import router from './router';

import Global from "./utils/global";

import loni from "../src/main";

Vue.use(loni);

Vue.config.productionTip = false;

Vue.use(Global);

const global = new Global.Global();

new Vue({
    router,
    global,
    render: h => h(App),
}).$mount('#app');
