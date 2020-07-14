<template>
  <div class="contain">
    <div
      class="login-container"
      style="background-image: url(https://mmk-sxy.oss-cn-beijing.aliyuncs.com/img/new_org/bg_login.png);"
    >
      <p class="title">新零售平台（机构端）</p>
      <div class="login">
        <img
          src="https://mmk-sxy.oss-cn-beijing.aliyuncs.com/img/new_org/bg_pic.png"
          class="img"
          alt
          srcset
        />
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          label-width="100px"
        >
          <p>机构登陆</p>
          <div class="xform">
            <el-form-item prop="username" label>
              <el-input placeholder="请输入手机号" v-if="!tflat" v-model="loginForm.username">
                <img
                  slot="prefix"
                  src="https://mmk-sxy.oss-cn-beijing.aliyuncs.com/img/new_org/account.png"
                  alt
                  srcset
                />
              </el-input>
              <el-input
                placeholder="请输入手机号"
                v-if="tflat"
                style="width:100% !important;"
                v-model="loginForm.username"
              >
                <img
                  slot="prefix"
                  src="https://mmk-sxy.oss-cn-beijing.aliyuncs.com/img/new_org/account.png"
                  alt
                  srcset
                />
              </el-input>
            </el-form-item>
            <el-form-item prop="password" v-if="!tflat">
              <el-input
                placeholder="请输入密码"
                v-model="loginForm.password"
                @keyup.enter.native="submin"
                show-password
              >
                <img
                  slot="prefix"
                  src="https://mmk-sxy.oss-cn-beijing.aliyuncs.com/img/new_org/lock.png"
                  alt
                  srcset
                />
              </el-input>
            </el-form-item>

            <el-form-item prop="code" v-if="tflat">
              <div style="display:flex;">
                <el-input placeholder="请输入验证码" v-model="loginForm.msg">
                  <img
                    slot="prefix"
                    src="https://mmk-sxy.oss-cn-beijing.aliyuncs.com/img/new_org/code_1.png"
                    alt
                    srcset
                  />
                </el-input>

                <el-button :disabled="disabled" @click="sendcode" class="sendcode">{{btntxt}}</el-button>
              </div>
            </el-form-item>

            <el-form-item label v-if="tflat">
              <div style="display:flex;">
                <el-input placeholder="请输入右图数字" v-model="loginForm.number">
                  <img
                    slot="prefix"
                    src="https://mmk-sxy.oss-cn-beijing.aliyuncs.com/img/new_org/code_1.png"
                    alt
                    srcset
                  />
                </el-input>
                <Sidentify ref="sidentify"></Sidentify>
              </div>
            </el-form-item>
            <div class="code" v-if="!tflat">
              <span @click="tflat=true">验证码登陆</span>
            </div>
            <div class="code" v-if="tflat" @click="tflat=false">账号密码登录</div>
            <div style="width:100%;text-align:right;margin-top: 30px;">
              <el-button
                @click="submin"
                :type="(!loginForm.password && !tflat) || (!loginForm.number && tflat) || (!loginForm.msg && tflat)?'':'primary'"
                class="sure"
                :style="(!loginForm.password && !tflat) || (!loginForm.number && tflat) || (!loginForm.msg && tflat)?'background:#E5E5E5;color:#999999':''"
                :disabled="(!loginForm.password && !tflat) || (!loginForm.number && tflat) || (!loginForm.msg && tflat)"
              >提交</el-button>
            </div>
          </div>
        </el-form>
      </div>
      <p class="cban">copyright © 2020 美美咖科技技术部出品</p>
    </div>
    <!-- {{input}}
    <el-input placeholder="请输入密码" v-model="input" show-password></el-input>
    <el-button @click="submin">提交</el-button>-->
  </div>
</template>

<script lang='tsx' type='text/tsx'>
import Sidentify from "@/components/SIdentify.vue";
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

@Component({
  components: {
    Sidentify
  }
})
export default class login extends Vue {
  disabled: boolean = false;
  tflat: boolean = false;
  time: number = 30;
  btntxt: string = "发送验证码";
  public input: string = "";
  public loginForm: any = {};
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
  //发短信
  async sendcode() {
    this.time = 30;
    if (!this.loginForm.username) {
      this.$message.warning("手机号能空");
      return;
    }
    let res = await http.post("/organization/sendMsg", {
      phone: this.loginForm.username
    });
    this.timer();
  }
  //发送手机验证码倒计时
  timer() {
    if (this.time > 0) {
      this.disabled = true;
      this.time--;
      this.btntxt = this.time + "秒";
      setTimeout(this.timer, 1000);
    } else {
      this.time = 0;
      this.btntxt = "发送验证码";
      this.disabled = false;
    }
  }
  submin() {
    let el: any = this.$refs["loginForm"];
    el.validate(async (valid: any) => {
      if (valid) {
        //普通登陆
        let sidentify: any = this.$refs["sidentify"];
        let url = "/organization/login";
        if (this.tflat) {
          //验证登陆
          if (this.loginForm.number != sidentify.identifyCode) {
            this.$message.warning("图形验证输入错误！");
            return;
          }
          url = "/organization/msgLogin";
        }
        let res: any = await http.post(url, this.loginForm);
        // console.log(res);
        if (res.code == 0) {
          sessionStorage.setItem("usetoken", res.data.token);
          sessionStorage.setItem("use",JSON.stringify( res.data));
          // https://mmkapp.oss-cn-beijing.aliyuncs.com/
          sessionStorage.setItem(
            "imgUrl",
            "https://mmkapp.oss-cn-beijing.aliyuncs.com/"
          );
          this.$router.push({ name: "Home" });
        } else {
          this.$message.warning(res.msg);
        }
      }
    });
  }
}
</script>
<style lang="less" scoped>
/* reset element-ui css */
.xform {
  width: 340px;
  margin: 40px auto;
}
.sendcode {
  width: 85px;
  height: 42px;
  background: rgba(67, 126, 238, 1);
  border-radius: 4px;
  color: #fff;
  font-size: 10px;
  margin-left: 10px;
  padding: 10px;
  text-align: center;
}
.sure {
  width: 340px;
  height: 48px;
  background: rgba(67, 126, 238, 1);
  border-radius: 4px;
}
.code {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #437eee;
  line-height: 20px;
  text-align: right;
  width: 100%;
  cursor: pointer;
}
.login {
  height: 580px;
  background: #fff;
  border-radius: 30px;
  max-width: 1140px;
  margin: auto;
  display: flex;
  overflow: hidden;
  box-shadow: 0px 16px 42px 3px rgba(68, 120, 237, 0.72);
  /deep/ .el-form-item__content {
    margin: 0 !important;
  }
  /deep/ .el-input__prefix,
  /deep/ .el-input__prefix-inner {
    display: flex;
    align-items: center;
    img {
      width: 18px;
      height: 18px;
    }
  }
  p {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 700;
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
    margin-top: 114px;
  }
}
.login-container {
  min-height: 100%;
  width: 100%;
  height: 100vh;
  background-color: #2d3a4b;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  .cban {
    position: fixed;
    bottom: 0;
    width: 100%;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.45);
    line-height: 20px;
  }
  .title {
    font-size: 32px;
    font-family: PingFangSC-Semibold, PingFang SC;
    color: #ffffff;
    line-height: 45px;
    padding: 0;
    margin-top: 70px;
    margin-bottom: 55px;
  }
  .login-form {
    position: relative;
    width: 50%;
    max-width: 100%;
    // margin: 0 auto;
    overflow: hidden;
    // height: 318px;
    background: white;
    // border-radius: 16px;
  }
}
@media screen and (max-width: 980px) {
  .img {
    display: none;
  }
  .login-container .login-form {
    width: 100%;
  }
  .login {
    height: 400px;
  }
  .login p {
    margin-top: 10px;
  }
}
</style>