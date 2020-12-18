import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NoMore from "../views/NoMore.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/Login.vue"),
  },
  {
    path: "/search",
    component: () =>
      import(/* webpackChunkName: "Search" */ "../views/Search.vue"),
  },
  {
    path: "/user",
    component: () => import(/* webpackChunkName: "Test */ "../views/User.vue"),
  },
  {
    path: "/*",
    component: NoMore,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
