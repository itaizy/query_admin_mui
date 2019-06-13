import Vue from "vue";
import VueRouter from "vue-router";

import Index from "./view/index.vue";
// import Detail from "./view/detail.vue";
// import Nutui from "./view/nutui-demo.vue";

const carefree = process.env.NODE_ENV === "carefree";

// 懒加载（按需加载）
// const Detail2 = () => import("./view/detail2.vue");
const Detail3 = () => import("./view/detail3.vue");


Vue.use(VueRouter);

const routes = [
    { path: "/", component: Index },
    // { path: "/detail", component: Detail },
    // { path: "/detail2", component: Detail2 },
    { path: "/detail3", component: Detail3 },
    // { path: "/nutui", component: Nutui }
];

const router = new VueRouter({
    base: process.env.NODE_ENV === 'development' ? '/' : '/kg/',
    mode: carefree ? "hash" : "history",
    // mode: carefree ? "history" : "hash",
    routes
});

export default router;
