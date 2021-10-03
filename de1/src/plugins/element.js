import Vue from 'vue'

//导入组件
import {Button,Form,FormItem,Input,Message} from "element-ui";

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

//Message 需要挂载到vue上
Vue.prototype.$message=Message