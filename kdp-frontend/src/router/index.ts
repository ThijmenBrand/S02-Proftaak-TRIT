import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import InformationPage from "../views/Tribe-Information-Page/InformationPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Tribe-Information",
    name: "InformationPage",
    component: InformationPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
