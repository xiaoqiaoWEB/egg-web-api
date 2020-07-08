import Layout from 'components/layout/index.vue'
import List from '../../../views/role/list/index.vue'

export default {
  path: 'role',
  name: 'Role',
  component: Layout,
  redirect: { name: 'roleList' },
  children: [
    {
      path: 'list',
      name: 'roleList',
      component: List
    }
  ]
}
