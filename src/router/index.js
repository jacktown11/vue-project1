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
      path: '/projects/vue-project1/dist',
      name: 'Layout',
      component: IndexPage
    },
    {
    	path: '/projects/vue-project1/dist/detail',
      name: 'Detail',
    	component: DetailPage,
      redirect: '/projects/vue-project1/dist/detail/analysis',
      children: [
        {
          path: 'analysis',
          name: 'Analysis',
          component: DetailAnalysisPage
        },
        {
          path: 'count',
          name: 'Count',
          component: DetailCountPage
        },
        {
          path: 'forecast',
          name: 'Forecast',
          component: DetailForecastPage
        },
        {
          path: 'publish',
          name: 'Publish',
          component: DetailPublishPage
        }
      ]
    },
    {
      path: '/projects/vue-project1/dist/orderList',
      name: 'OrderList',
      component: OrderList
    }
  ]
})
