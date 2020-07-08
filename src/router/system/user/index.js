import Layout from 'components/layout/index.vue'
import List from '../../../views/user/list/index.vue'

export default {
  path: 'user',
  name: 'User',
  component: Layout,
  redirect: { name: 'userList' },
  children: [
    {
      path: 'list',
      name: 'userList',
      component: List
    }
  ]
}
