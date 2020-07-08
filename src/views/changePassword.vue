<template>
  <div class="app-container">
    <!-- 修改密码 -->
    <h5 class="titleInfo">修改密码</h5>
    <el-form class="form" :model="form" :rules="rules" ref="form" label-width="130px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="旧密码">
            <el-input v-model="form.oldPassword"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="form.newPassword"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="确认密码">
            <el-input v-model="form.repeatNewPassword"></el-input>
          </el-form-item>
        </el-col>
        <el-button style="margin-top:30px;margin-left:130px" type="primary" @click="submitFn()">立即提交</el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import http from "../utils/request";
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
      form: {
        oldPassword: "",
        newPassword: "",
        repeatNewPassword: ""
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
  created() {
    // this.userName = this.$store.state.user.name
  },
  methods: {
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
        //   this.reload();
          // changeAdminPassword(datas).then(res=>{
          //     if(!res.data.code){
          //         this.$message({
          //             showClose: true,
          //             message: '密码修改成功',
          //             type: 'success'
          //         });
          //         localStorage.clear()
          //         this.$router.push('/')
          //         this.reload()
          //     }else{
          //         this.$message({
          //             showClose: true,
          //             message: res.data.msg,
          //             type: 'warning'
          //         });
          //     }
          // })
          // .catch(error =>{
          //     this.$message.error(error);
          // })
        } else {
          this.$message.error("密码长度需为6-20位字符");
        }
      } else {
        this.$message({
          message: "两次密码输入不一致",
          type: "warning"
        });
      }
    }
  }
};
</script>
<style scoped>
.app-container {
  padding: 0px !important;
}
</style>