import { createApp } from "vue";
import App from './app.vue';
import router from './router';
import { browserVersion } from "@pecasha/util";

import global from "./utils/global";

import loni from "../src/main";

loni.config.popup.maskTriggerEvent = browserVersion().mobile ? "touchstart" : "click";

const app = createApp(App)
    .use(router)
    .use(loni)
    .use(global)
    .mount("#app");
(window as any).$vue = app;
