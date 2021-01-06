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
    component: Home
  },

  {
    path: "/supply",
    name: 'home',
    component: Home
  },
  {

    path: "/cart",
    name: "profile",
    component: Cart,
  },
  {

    path: "/profile",
    name: "profile",
    component: Account,

  }

]

const router = new VueRouter({
  routes
})

export default router
