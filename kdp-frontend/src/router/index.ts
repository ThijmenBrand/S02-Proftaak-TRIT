import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import tribes from "@/views/tribes/Tribes.vue";
import tribe from "@/views/tribes/tribePage/TribePage.vue";
import article from "@/views/article/Article.vue";
import RockstarInformationPage from "@/views/rockstar/InformationPage.vue";
import ExploreArticles from "@/views/explore/ExploreArticles.vue";
import Account from "@/views/login/Login.vue";
import { useIsAuthenticated } from "@/services/msal/msal";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/account",
    name: "Account",
    component: Account
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
    path: "/article/:articleId",
    name: "article",
    component: article,
  },
  {
    path: "/explore",
    name: "explore",
    component: ExploreArticles,
  },
  {
    path: "/rockstar/:rockstarId",
    name: "rockstar",
    component: RockstarInformationPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const privatePages = ["/account"];
//   const authRequired = privatePages.includes(to.path);
//   const loggedIn = localStorage.getItem('user')

//   if (authRequired && !loggedIn) {
//     return next("/");
//   }

//   next();
// });

export default router;
