import Vue from 'vue'
import { Button } from 'element-ui'
import {Form,FormItem} from "element-ui";
import {Input} from "element-ui";
//导入消息弹框提示组件 需要全局挂载
import {Message} from "element-ui";

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

//挂载到vue上
Vue.prototype.$message=Message