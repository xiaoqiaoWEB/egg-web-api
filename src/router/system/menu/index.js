import Layout from 'components/layout/index.vue'
import List from '../../../views/menu/list/index.vue'

export default {
  path: 'menu',
  name: 'Menu',
  component: Layout,
  redirect: { name: 'menuList' },
  children: [
    {
      path: 'list',
      name: 'menuList',
      component: List
    }
  ]
}
