<template>
  <div class="app-container">
    <!-- 修改密码 -->
    <h5 class="titleInfo">
      <span>基本信息</span>
      <img @click="$router.go(-1)" src="https://mmk-sxy.oss-cn-beijing.aliyuncs.com/img/new_org/ic_return.png" alt />
    </h5>
    <div class="useinfo">
      <div class="head">
        <img
          v-if="params.avatar"
          :src="params.avatar.indexOf('http')==-1?imgsrc+params.avatar:params.avatar"
          alt
        />
        <img v-else src="https://mmk-sxy.oss-cn-beijing.aliyuncs.com/img/new_org/head2x.png" alt />
        <el-upload
          class="upload-demo"
          :action="httpUp"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :on-exceed="handleExceed"
          :on-success="uploadfn"
          :show-file-list="false"
        >
          <el-button size="small" type="primary" class="upbtn">上传头像</el-button>
        </el-upload>
      </div>
      <div class="formDev">
        <el-form ref="params" :model="params" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="params.realName" disabled></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="params.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <div style="display:flex;">
              <el-input value="*********" disabled></el-input>
              <el-button type="primary" @click="dialogVisible=true">修改密码</el-button>
            </div>
          </el-form-item>
          <el-form-item label="用户描述">
            <el-input v-model="params.description" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
        <p>
          <el-button type="primary" @click="reset">确定</el-button>
          <el-button type="info" plain @click="$router.go(-1)">取消</el-button>
        </p>
      </div>
    </div>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%">
      <div class="formDev diaform">
        <el-form class="form" :model="form" :rules="rules" ref="form" label-width="130px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="手机号">
                <div style="display:flex;">
                  <el-input v-model="form.oldPassword" disabled></el-input>
                  <el-button
                    style="margin-top:4px;"
                    :disabled="disabled"
                    @click="sendcode"
                    class="sendcode"
                  >{{btntxt}}</el-button>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="验证码">
                <el-input v-model="form.code"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="新密码" prop="newPassword">
                <el-input v-model="form.newPassword"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="再次输入">
                <el-input v-model="form.repeatNewPassword"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-button
              style="margin-top:30px;margin-left:130px"
              type="primary"
              @click="submitFn()"
            >立即提交</el-button>-->
          </el-row>
        </el-form>
        <p>
          <el-button type="primary" @click="wsure">确定</el-button>
          <el-button type="info" @click="dialogVisible = false" plain>取消</el-button>
        </p>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>-->
    </el-dialog>
  </div>
</template>
<script>
import http from "../utils/request";
import { service } from "../utils/request";

// 密码正则
const passwordReg = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入密码"));
  } else {
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    if (reg.test(value)) {
      callback();
    } else {
      return callback(
        new Error("新密码格式需为6-20位字母+数字，且不包含特殊字符")
      );
    }
  }
};

export default {
  data() {
    return {
      imgsrc: sessionStorage.getItem("imgUrl"),
      disabled: false,
      btntxt: "发送验证码",
      httpUp: service.defaults.baseURL + "/upload",
      dialogVisible: false,
      form: {
        oldPassword: "",
        newPassword: "",
        repeatNewPassword: ""
      },
      fileList: [],
      params: {
        avatar:
          "https://mmk-sxy.oss-cn-beijing.aliyuncs.com/img/new_org/head2x.png"
      },
      rules: {
        newPassword: [
          { required: true, validator: passwordReg, trigger: "blur" }
        ]
      }
    };
  },
  filters: {
    filterNull(e) {
      if (!e) {
        return "暂无";
      } else {
        return e;
      }
    }
  },
  mounted() {
    this.params = this.$store.state.use.useinfo;
    this.form.oldPassword = this.$store.state.use.useinfo.username;
  },
  methods: {
    async wsure() {
      //1校验 2提交
      if (this.form.newPassword != this.form.repeatNewPassword) {
        this.$message.warning("两次输入不一致");
        return;
      }
      if (!this.form.code) {
        this.$message.warning("验证码不能空");
        return;
      }
      let res = await http.post(
        "/com.mmk.reservation.api.AdminMsgProvider/1.0.0/checkVerify.html",
        { phone: this.form.oldPassword, verify: this.form.code }
      );
      if (res.code != 0) {
        this.$message.warning(res.msg);
        return;
      }
      let res2 = await http.post(
        "/com.mmk.admin.api.AdminUserProvider/1.0.0/changeOrganizationPassword.html",
        { newPassword: this.form.repeatNewPassword }
      );
      this.$message.warning(res.msg);
      if (res.code == 0) {
        this.dialogVisible = false;
      }
    },
    //发短信
    async sendcode() {
      this.time = 30;
      if (!this.form.oldPassword) {
        this.$message.warning("手机号能空");
        return;
      }
      let res = await http.post("/organization/sendMsg", {
        phone: this.form.oldPassword
      });
      this.timer();
    },
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
    },
    //修改内容
    async reset() {
      let res = await http.post(
        "/com.mmk.admin.api.AdminUserProvider/1.0.0/updateOrganizationUser.html",
        this.params
      );
      this.$message.warning(res.msg);
    },
    //上传头像
    uploadfn(res) {
      // console.log(res)
      this.$message.warning(res.msg);
      if (res.code == 0) this.params = { ...{ avatar: res.data } };
      // console.log(123, this.params);
    },
    async submitFn() {
      if (this.form.newPassword == this.form.repeatNewPassword) {
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
        if (reg.test(this.form.newPassword)) {
          let datas = this.form;
          let res = await http.post(
            "/com.mmk.admin.api.AdminUserProvider/1.0.0/changeAdminPassword.html",
            datas
          );
          console.log(res);
          this.$message({
            showClose: true,
            message: res.msg,
            type: "warning"
          });
          sessionStorage.clear();
          this.$router.push("/");
        } else {
          this.$message.error("密码长度需为6-20位字符");
        }
      } else {
        this.$message({
          message: "两次密码输入不一致",
          type: "warning"
        });
      }
    },
    //图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>
<style scoped>
.app-container {
  padding: 0px !important;
}
.formDev {
  max-width: 800px;
  margin: auto;
  height: 100%;
}
.el-form {
  margin: auto;
}
.el-form {
  padding-left: 10%;
}
.formDev .el-button + .el-button {
  margin-left: 90px;
  margin-top: 70px;
  margin-bottom: 82px;
}
.formDev .el-button {
  width: 100px;
  height: 32px;
  line-height: 32px;
  padding: 0;
}
.app-container /deep/ .el-dialog {
  min-width: 375px !important;
}
.formDev /deep/ .el-input__inner,
.el-input,
.el-textarea {
  width: 468px !important;
  height: 32px;
}
.diaform /deep/ .el-input__inner,
.el-input,
.el-textarea {
  width: 100% !important;
}
.diaform .el-form {
  padding: 0;
}
.diaform .el-button + .el-button {
  margin: auto;
  margin-left: 90px;
}
@media screen and (max-width: 980px) {
  .formDev /deep/ .el-input__inner,
  .el-input,
  .el-textarea {
    width: 100% !important;
    height: 32px;
  }
}
h5 {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
}
.head img {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
  border-radius: 50%;
}
.upbtn {
  width: 90px;
  height: 26px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  background: rgba(244, 244, 244, 1);
  border-radius: 4px;
  color: #606266;
  border: 0;
}
</style>