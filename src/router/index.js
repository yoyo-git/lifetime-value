import Vue from 'vue'
import Router from 'vue-router'
import ComputePage from '@/components/compute/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ComputePage',
      component: ComputePage
    }
  ]
})
