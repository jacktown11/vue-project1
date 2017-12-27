import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '../pages/Index'
import DetailPage from '../pages/Detail'
import DetailAnalysisPage from '../pages/detail/analysis'
import DetailCountPage from '../pages/detail/count'
import DetailForecastPage from '../pages/detail/forecast'
import DetailPublishPage from '../pages/detail/publish'
import OrderList from '../pages/OrderList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: IndexPage
    },
    {
    	path: '/detail',
    	component: DetailPage,
      redirect: '/detail/analysis',
      children: [
        {
          path: 'analysis',
          component: DetailAnalysisPage
        },
        {
          path: 'count',
          component: DetailCountPage
        },
        {
          path: 'forecast',
          component: DetailForecastPage
        },
        {
          path: 'publish',
          component: DetailPublishPage
        }
      ]
    },
    {
      path: '/orderlist',
      component: OrderList
    }
  ]
})
