import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Flow from './views/FlowPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'flow',
          component: Flow
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
