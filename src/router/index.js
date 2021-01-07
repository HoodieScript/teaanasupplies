import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cart from '../views/Cart.vue'
import Account from '../views/Account.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { title: "Anna Supplies" }
  },

  {
    path: "/supply",
    name: 'home',
    component: Home, meta: { title: "Anna Supplies" }

  },
  {

    path: "/cart",
    name: "profile",
    component: Cart,
    meta: { title: "Anna Supplies" }

  },
  {

    path: "/profile",
    name: "profile",
    component: Account,
    meta: { title: "Anna Supplies" }


  }

]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
});
export default router
