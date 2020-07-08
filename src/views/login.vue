<template>
  <div class="contain">
    <div
      class="login-container"
      style="background-image: url(https://mmkapp.oss-cn-beijing.aliyuncs.com/h5_images/mmkAdmin/loginBg.png);"
    >
      <p class="title">美美咖总平台管理系统</p>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        label-width="100px"
      >
        <div class="xform">
          <el-form-item prop="username" label="用户名">
            <el-input placeholder="请输入用户名" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input
              placeholder="请输入密码"
              v-model="loginForm.password"
              @keyup.enter.native="submin"
              show-password
            ></el-input>
          </el-form-item>
          <el-button @click="submin" type="primary">提交</el-button>
        </div>
      </el-form>
    </div>
    <!-- {{input}}
    <el-input placeholder="请输入密码" v-model="input" show-password></el-input>
    <el-button @click="submin">提交</el-button>-->
  </div>
</template>

<script lang='tsx' type='text/tsx'>
const validateUsername = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error("账号不能为空"));
  } else {
    callback();
  }
};
const validatePassword = (rule: void, value: string, callback: any) => {
  if (!value) {
    callback(new Error("密码不能为空"));
  } else {
    callback();
  }
};
import { Component, Prop, Vue } from "vue-property-decorator";
import http from "../utils/request";

@Component
export default class login extends Vue {
  public input: string = "";
  public loginForm: object = {};
  public loginRules: object = {
    username: [
      { required: true, trigger: "blur", validator: validateUsername }
    ],
    password: [{ required: true, trigger: "blur", validator: validatePassword }]
  };
  created() {
    // console.log(112);
    // this.test();
  }
  submin() {
    let el: any = this.$refs["loginForm"];
    el.validate(async (valid: any) => {
      if (valid) {
        console.log(this.loginForm);
        let res: any = await http.post("/login", this.loginForm);
        // console.log(res);
        if (res.code == 0) {
          sessionStorage.setItem("usetoken", res.data);
           this.$router.push({ name: "Home" });
        }
      }
    });
    // sessionStorage.setItem("token", "4545454545");
    // this.$router.push({ name: "Home" });
  }
 
  async test() {
    // let res = await http.post("/aaa", {});
    // console.log(res);
  }
}
</script>
<style lang="less" scoped>
/* reset element-ui css */
.xform {
  width: 90%;
  position: absolute;
  top: 100px;
}
.login-container {
  min-height: 100%;
  width: 100%;
  height: 100vh;
  background-color: #2d3a4b;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  .title {
    font-size: 32px;
    color: #eee;
    margin: 0px auto 104px auto;
    text-align: center;
    font-weight: 400;
    margin-top: 210px;
  }
  .login-form {
    position: relative;
    width: 480px;
    max-width: 100%;
    margin: 0 auto;
    // overflow: hidden;
    height: 318px;
    background: white;
    border-radius: 16px;
  }
}
</style>