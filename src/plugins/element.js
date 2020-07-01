import Vue from 'vue'
import {
  Button,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Message,
  Notification,
  Input,
  Form,
  FormItem,
  Pagination,
  Card,
  Table,
  TableColumn
} from 'element-ui'

Vue.prototype.$ELEMENT = { size: 'samll', zIndex: 5000 }
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Card)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
