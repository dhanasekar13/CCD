import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: 'upload',
      name: 'upload',
      component: require('@/components/upload/upload')
    },
    {
      path: '/sop',
      name: 'sop',
      component: require('@/components/sop').default
    },
    {
      path: '/login',
      name: 'login_page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/assign',
      name: 'assign',
      component: require('@/components/assign/assign').default
    },
    {
      path: '/enquiry/register',
      name: 'register',
      component: require('@/components/register/register').default
    },
    {
      path: '/enquiry/review',
      name: 'review',
      component: require('@/components/review/review').default
    },
    {
      path: '/history',
      name: 'history',
      component: require('@/components/history/history').default
    },
    {
      path: '/quote',
      name: 'quote',
      component: require('@/components/quote/generation').default
    }
  ]
})
