import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PageNotFound from '../views/PageNotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/klasifikasi',
    name: 'Klasifikasi',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Klasifikasi.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: PageNotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let documentTitle = `${ process.env.VUE_APP_TITLE } - ${ to.name }`
  if(to.params.title){
    documentTitle += ` - ${to.params.title}`
  }
  document.title = documentTitle
  next()
})

export default router
