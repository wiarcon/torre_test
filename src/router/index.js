import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/people",
    name: "people",
    component: () => import(/* webpackChunkName: "People" */ "../views/People.vue"),
  },
  {
    path: "/jobs",
    name: "jobs",
    component: () => import(/* webpackChunkName: "Jobs" */ "../views/Jobs.vue"),
  },
  {
  path: "/organisations",
  name: "organisations",
  component: () => import(/* webpackChunkName: "Organisations" */ "../views/Organisations.vue"),
  },
  {
    path: "/dataanalysis",
    name: "dataanalysis",
    component: () => import(/* webpackChunkName: "DataAnalysis" */ "../views/DataAnalysis.vue"),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
