import Layout from 'components/layout/index.vue'
import List from '../../views/user/list/index.vue'
import Add from '../../views/user/add-edit/index.vue'

export default {
  path: '/user',
  name: 'User',
  component: Layout,
  redirect: { name: 'userList' },
  children: [
    {
      path: 'list',
      name: 'userList',
      component: List
    },
    {
      path: 'add',
      name: 'userAdd',
      component: Add
    },
    {
      path: 'edit',
      name: 'userEdit',
      component: Add
    }
  ]
}
