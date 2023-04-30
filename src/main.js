import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import axios from "@/utils/axios";
import './mock/index.js'

import {
  Loading,
  Header,
  Main,
  Container,
  Table,
  TableColumn,
  Pagination,
  Input,
  Button,
  Form,
  FormItem,
  TimePicker,
  DatePicker,
  Col,
  Message,
  MessageBox
} from "element-ui";
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(Loading.directive);
Vue.use(Header);
Vue.use(Main);
Vue.use(Container);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Input);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(TimePicker);
Vue.use(DatePicker);
Vue.use(Col);

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

// Vue.use(router)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
