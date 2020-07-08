import Layout from 'components/layout/index.vue'
import List from '../../../views/actions/list/index.vue'

export default {
  path: 'action',
  name: 'Action',
  component: Layout,
  redirect: { name: 'actionList' },
  children: [
    {
      path: 'list',
      name: 'actionList',
      component: List
    }
  ]
}
