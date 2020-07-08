import Vue from 'vue'
import {
  Button,
  ButtonGroup,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Message,
  Notification,
  Input,
  Radio,
  RadioGroup,
  RadioButton,
  Select,
  Option,
  OptionGroup,
  Form,
  FormItem,
  Pagination,
  Card,
  Table,
  TableColumn,
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup,
  Dialog,
  MessageBox,
  Tree,
  Cascader
} from 'element-ui'

Vue.prototype.$ELEMENT = { size: 'samll', zIndex: 5000 }
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt

Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Input)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Select)
Vue.use(Option)
Vue.use(RadioButton)
Vue.use(OptionGroup)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Card)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(Dialog)
Vue.use(Tree)
Vue.use(Cascader)
