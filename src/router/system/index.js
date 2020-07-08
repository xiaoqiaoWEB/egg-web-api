import Layout from 'components/layout/content.vue'
import User from './user'
import Role from './role'
import Menu from './menu'
import Action from './action'

export default {
  path: '/system',
  name: 'System',
  component: Layout,
  redirect: { name: 'User' },
  children: [
    User,
    Role,
    Menu,
    Action
  ]
}
