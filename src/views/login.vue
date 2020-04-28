<template>
  <div class="contain">
    {{input}}
    <el-input placeholder="请输入密码" v-model="input" show-password></el-input>
    <el-button @click="submin">提交</el-button>
  </div>
</template>

<script lang='tsx' type='text/tsx'>
import { Component, Prop, Vue } from "vue-property-decorator";
// import http from "../utils/request";
@Component
export default class login extends Vue {
  public input: string = "";
  created() {
    // console.log(112);
    // this.test();
  }
  submin(){
    this.$router.push({name:"Home"})
  }
  async test() {
    // let res = await http.post("/aaa", {});
    // console.log(res);
  }
}
</script>
