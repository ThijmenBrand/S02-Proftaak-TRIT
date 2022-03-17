import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import tribes from "@/views/tribes/Tribes.vue";
import tribe from "@/views/tribes/Tribe-Information-Page/InformationPage.vue";
import article from "@/views/tribes/article/Article.vue";
import ExploreArticles from "@/views/tribes/Explore-Articles-Page/ExploreArticles.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/tribes",
    name: "tribes",
    component: tribes,
  },
  {
    path: "/tribe/:tribe",
    name: "tribe",
    component: tribe,
  },
  {
    path: "/tribe/:tribe/article/:articleId",
    name: "article",
    component: article,
  },
  {
    path: "/explore",
    name: "explore",
    component: ExploreArticles,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
