import Vue from "vue";
import VueRouter from "vue-router";
import BookManage from "../views/BookManageView.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Main from "../views/Main.vue";
import BorrowView from "../views/BorrowView.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/Register",
    name: "Register",
    component: Register,
  },
  {
    path: "/main",
    name: "main",
    component: Main,
  },
  {
    path: "/manage",
    name: "mangae",
    component: BookManage,
  },
  {
    path: "/borrow",
    name: "borrow",
    component: BorrowView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
