//导入自己需要的组件
import {
  Message,
  MessageBox,
  Loading,
  Notification,
  Menu,
  MenuItem,
  Submenu,
  Container,
  Header,
  Aside,
  Main,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Card,
  RadioGroup,
  RadioButton,
  Button,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Input,
  Table,
  TableColumn,
  Pagination,
  Upload,
  Dialog,
  Form,
  FormItem,
  Select,
  Option,
  DatePicker,
  Tree,
  Checkbox,
  InputNumber,
  Tooltip,
  Cascader,
  Switch,
  Radio,
  MenuItemGroup,
  Tabs, TabPane, Tag
} from 'element-ui'
const element = {
  install(Vue) {
    Vue.use(Menu)
    Vue.use(Header)
    Vue.use(MenuItemGroup)
    Vue.use(MenuItem)
    Vue.use(Container)
    Vue.use(Submenu)
    Vue.use(Aside)
    Vue.use(Main)
    Vue.use(Dropdown)
    Vue.use(DropdownMenu)
    Vue.use(DropdownItem)
    Vue.use(Col)
    Vue.use(Card)
    Vue.use(Row)
    Vue.use(RadioGroup)
    Vue.use(RadioButton)
    Vue.use(Radio)
    Vue.use(Button)
    Vue.use(Badge)
    Vue.use(Breadcrumb)
    Vue.use(BreadcrumbItem)
    Vue.use(Input)
    Vue.use(InputNumber)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Pagination)
    Vue.use(Upload)
    Vue.use(Dialog)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(DatePicker)
    Vue.use(Tree)
    Vue.use(Checkbox)
    Vue.use(Tooltip)
    Vue.use(Cascader)
    Vue.use(Switch)
    Vue.use(Tabs)
    Vue.use(TabPane)
    Vue.use(Tag)
    Vue.use(Loading)

    Vue.prototype.$notify = Notification
    Vue.prototype.$message = Message
    Vue.prototype.$messageBox = MessageBox
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.prototype.$alert = MessageBox.alert;
  }
}
export default element