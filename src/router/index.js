import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const goods = (resolve) => {
  import('components/goods/goods').then((module) => {
    resolve(module)
  })
}
const ratings = (resolve) => {
  import('components/ratings/ratings').then((module) => {
    resolve(module)
  })
}
const seller = (resolve) => {
  import('components/seller/seller').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/ratings',
      component: ratings
    },
    {
      path: '/seller',
      component: seller
    }
  ]
})
