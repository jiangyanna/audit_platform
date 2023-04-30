import Vue from 'vue'
import Router from 'vue-router'
let routes = []

const Home = () => import(/* webpackChunkName: "home" */ '../views/home');
const Audit = () => import(/* webpackChunkName: "audit" */ '../views/audit');
routes.push({ path: '/', name: 'home', meta: { title: '首页' }, component: Home })
routes.push({ path: '/audit', name: 'audit', meta: { title: '审核' }, component: Audit })

/* 通配符 */
routes.push({path: '*', redirect: () => ({path: '/'})})

Vue.use(Router)

let router = new Router({
  scrollBehavior: function (to, from, savePosition) {
    if (savePosition) {
      return savePosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
})

export default router
