import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '../pages/Index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: IndexPage
    }
  ]
})
