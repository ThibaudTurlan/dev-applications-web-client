import Vue from 'vue'
import App from './App.vue'


import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import Artist from "./views/Artist.vue";
import Home from "./views/Home.vue";
import Resultats from "./views/Resultats.vue";

import NotFound from './components/notfound.vue'

Vue.use(VueAxios, axios)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/artist",
      name: "Artist",
      component: Artist,
    },
    {
      path: "/resultats",
      name: "Resultats",
      component: Resultats,
    },
    {
      path: "*",
      component: NotFound,
    }
  ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

import "bootstrap/dist/css/bootstrap.css"