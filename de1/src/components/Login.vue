<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 放置默认头像-->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <!--   登陆   表单区 ref引用-->
      <el-form  ref="loginFromRef"
                :rules="loginFormRules"
                :model="loginForm"
                label-width="0"
                class="login_form">
        <!--用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <!-- 密码-->
        <el-form-item prop="password">
          <el-input show-password v-model="loginForm.password" prefix-icon="iconfont icon-others"></el-input>
        </el-form-item>
        <!--按钮区域-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  methods: {
    //点击重置按钮 重置表单
    reset(){
      //通过loginFromRef 引用对象，重置表单
      console.log("重置表单");
      this.$refs.loginFromRef.resetFields();
    },
    //点击进行登陆前的预验证
    login(){
      this.$refs.loginFromRef.validate(async (val) => {
        if (!val) {
          return;
        } else {
          console.log("发起请求")
          const {data:res} = await this.$http.post("login", this.loginForm);
          if (res.meta.status!==200){
            //使用 挂载的 message
            this.$message.error("登陆失败")
          }else {
            this.$message.success("登陆成功")
            // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
            //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
            //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
            //console.log("获取到的token："+res.data.token)
            window.sessionStorage.setItem("token",res.data.token)
            // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
            await this.$router.push('/home')
          }
        }
      })
    }
  },
  data() {
    return {
      loginForm: {
        username: '',
        password: '',

      },
      //表单的验证规则对象
      loginFormRules: {
        //验证用户名是否合法
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 6, message: '用户名长度在 3 到 6 个字符之间', trigger: 'blur'}
        ],
        //验证密码是否合法
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 3, max: 16, message: '密码长度在3 到 16 个字符之间', trigger: 'blur'}
        ]
      }
    }

  }
}
</script>

<!--/* scoped控制样式只在当前组件生效*/-->
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: white;
  border-radius: 3px;
  /*设置盒子在正中央*/
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    /*设置图片边框线*/
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;

    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #dad3d3;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;

}
</style>