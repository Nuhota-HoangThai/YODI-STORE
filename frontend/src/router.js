import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import ProductPage from "@/pages/ProductPage.vue";
import ProductDetail from "@/pages/ProductDetail.vue";
import AboutPage from "@/pages/AboutPage.vue";
import ProfilePage from "@/pages/admin/ProfilePage.vue";
import SearchProductPage from "@/pages/SearchProductPage.vue";
import HistoryOrderPage from "@/pages/admin/HistoryOrderPage.vue";
import AdminProductPage from "@/pages/admin/AdminProductPage.vue";
import AdminReceiptPage from "@/pages/admin/AdminReceiptPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import CheckoutPage from "@/pages/CheckoutPage.vue";
import ContactPage from "@/pages/ContactPage.vue";
//
import VnpayReturn from "@/pages/VnpayReturn.vue";
import StatisticalPage from "@/pages/admin/StatisticalPage.vue";
//
import jwt_decode from "jwt-decode";
import CartPage from "@/pages/CartPage.vue";
import { ACCESS_TOKEN_WEB_YODI_SHOP } from "./utils/settingSystem";
// Auth Guards
const requireLogout = (to, from, next) => {
  const token = localStorage.getItem(ACCESS_TOKEN_WEB_YODI_SHOP);
  if (token) next({ name: "Home", params: {} });
  else next();
};

const requireLogin = (to, from, next) => {
  const token = localStorage.getItem(ACCESS_TOKEN_WEB_YODI_SHOP);
  if (!token) next({ name: "Login", params: {} });
  else next();
};

const requireAdmin = (to, from, next) => {
  const token = localStorage.getItem(ACCESS_TOKEN_WEB_YODI_SHOP);
  if (!token) next({ name: "Login", params: {} });
  else {
    const { user } = jwt_decode(token);

    if (user?.role === "ADMIN") next();
    else {
      next({ name: "Home", params: {} });
    }
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      layout: "default",
    },
    component: HomePage,
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      layout: "default",
    },
    component: LoginPage,
    beforeEnter: requireLogout,
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      layout: "default",
    },
    component: RegisterPage,
    beforeEnter: requireLogout,
  },
  {
    path: "/product",
    name: "Product",
    meta: {
      layout: "default",
    },
    component: ProductPage,
  },
  {
    path: "/contact",
    name: "Contact",
    meta: {
      layout: "default",
    },
    component: ContactPage,
    // beforeEnter: requireLogin,
  },
  {
    path: "/product/search",
    name: "Product-search",
    meta: {
      layout: "default",
    },
    component: SearchProductPage,
  },
  {
    path: "/product/:id",
    name: "Product-detail",
    meta: {
      layout: "default",
    },
    component: ProductDetail,
  },
  {
    path: "/about",
    name: "About",
    meta: {
      layout: "default",
    },
    component: AboutPage,
  },
  {
    path: "/profile",
    name: "Profile",
    meta: {
      layout: "default",
    },
    component: ProfilePage,
    beforeEnter: requireLogin,
  },
  {
    path: "/cart",
    name: "Cart",
    meta: {
      layout: "default",
    },
    component: CartPage,
    beforeEnter: requireLogin,
  },
  {
    path: "/checkout",
    name: "Checkout",
    meta: {
      layout: "default",
    },
    component: CheckoutPage,
    beforeEnter: requireLogin,
  },
  {
    path: "/order/payment_vnpay_return",
    name: "VnpayReturn",
    meta: {
      layout: "default",
    },
    component: VnpayReturn,
    beforeEnter: requireLogin,
  },
  {
    path: "/statistical",
    name: "Statistical",
    meta: {
      layout: "default",
    },
    component: StatisticalPage,
    beforeEnter: requireLogin,
  },
  {
    path: "/history",
    name: "History-cart",
    meta: {
      layout: "default",
    },
    component: HistoryOrderPage,
    beforeEnter: requireLogin,
  },
  {
    path: "/admin/product",
    name: "Admin-product",
    meta: {
      layout: "default",
    },
    component: AdminProductPage,
    beforeEnter: requireAdmin,
  },
  {
    path: "/admin/receipt",
    name: "Admin-receipt",
    meta: {
      layout: "default",
    },
    component: AdminReceiptPage,
    beforeEnter: requireAdmin,
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundPage },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
