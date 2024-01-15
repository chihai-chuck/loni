import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import type { Position } from "vue-router/types/router";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        path: '/',
        component: () => import("#/views/home.vue")
    },
    {
        path: "/components/button",
        component: () => import("#/views/components/button.vue")
    },
    {
        path: "/components/cell",
        component: () => import("#/views/components/cell.vue")
    },
    {
        path: "/components/checkbox",
        component: () => import("#/views/components/checkbox.vue")
    },
    {
        path: "/components/header",
        component: () => import("#/views/components/header.vue")
    },
    {
        path: "/components/header/fade-background",
        component: () => import("#/views/components/header/fade-background.vue")
    },
    {
        path: "/components/header/fade-base",
        component: () => import("#/views/components/header/fade-base.vue")
    },
    {
        path: "/components/header/fade-color",
        component: () => import("#/views/components/header/fade-color.vue")
    },
    {
        path: "/components/header/fade-color-gradient",
        component: () => import("#/views/components/header/fade-color-gradient.vue")
    },
    {
        path: "/components/header/fade-demo",
        component: () => import("#/views/components/header/fade-demo.vue")
    },
    {
        path: "/components/header/fade-slot",
        component: () => import("#/views/components/header/fade-slot.vue")
    },
    {
        path: "/components/header/fade-slot-color",
        component: () => import("#/views/components/header/fade-slot-color.vue")
    },
    {
        path: "/components/header/fade-line",
        component: () => import("#/views/components/header/fade-line.vue")
    },
    {
        path: "/components/icon",
        component: () => import("#/views/components/icon.vue")
    },
    {
        path: "/components/loading",
        component: () => import("#/views/components/loading.vue")
    },
    {
        path: "/components/popup",
        component: () => import("#/views/components/popup.vue")
    },
    {
        path: "/components/scroll",
        component: () => import("#/views/components/scroll.vue")
    },
    {
        path: "/components/dialog",
        component: () => import("#/views/components/dialog.vue")
    },
    {
        path: "/components/toast",
        component: () => import("#/views/components/toast.vue")
    },
    {
        path: "/components/switch",
        component: () => import("#/views/components/switch.vue")
    },
    {
        path: "/components/swipeout",
        component: () => import("#/views/components/swipeout.vue")
    },
    {
        path: "/components/button/doc",
        component: () => import("#/views/docs/button.vue")
    },
    {
        path: "/components/cell/doc",
        component: () => import("#/views/docs/cell.vue")
    },
    {
        path: "/components/checkbox/doc",
        component: () => import("#/views/docs/checkbox.vue")
    },
    {
        path: "/components/dialog/doc",
        component: () => import("#/views/docs/dialog.vue")
    },
    {
        path: "/components/header/doc",
        component: () => import("#/views/docs/header.vue")
    },
    {
        path: "/components/icon/doc",
        component: () => import("#/views/docs/icon.vue")
    },
    {
        path: "/components/loading/doc",
        component: () => import("#/views/docs/loading.vue")
    },
    {
        path: "/components/popup/doc",
        component: () => import("#/views/docs/popup.vue")
    },
    {
        path: "/components/scroll/doc",
        component: () => import("#/views/docs/scroll.vue")
    },
    {
        path: "/components/swipeout/doc",
        component: () => import("#/views/docs/swipeout.vue")
    },
    {
        path: "/components/switch/doc",
        component: () => import("#/views/docs/switch.vue")
    },
    {
        path: "/components/toast/doc",
        component: () => import("#/views/docs/toast.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    linkActiveClass: "active",
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            const position = {} as Position;
            // if (to.hash) position.selector = to.hash;
            if (!to.matched.some(m => m.meta.scrollDefault)) {
                position.x = 0;
                position.y = 0;
            }
            return position;
        }
    },
    routes,
});

export default router;
