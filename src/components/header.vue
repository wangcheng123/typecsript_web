<template>
  <div>
    <div class="header">
      <div class="info">
        <img
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565244103786&di=203bcb9e8131d96b29b63442b45d59aa&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F20%2F20160920211621_TwCPX.jpeg"
          alt
        />
        <span
          style="font-size: 12px;color: rgb(106, 123, 144);cursor: pointer;"
          @click="password"
        >需改密码</span>
        <el-dropdown style="margin-left:70px;">
          <span class="el-dropdown-link">
            <span style="color:#fff;" slot="reference">{{user.username}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span @click.stop="reset" style="width:100%;">退出登陆</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="nav">
      当前路由导航：
      <span v-if="faroute.parent">
        <router-link
          :to="faroute.parent.path"
          v-if="faroute.parent.meta.title"
        >{{faroute.parent.meta.title}}/</router-link>
      </span>
      <span>
        <router-link :to="$route.path">{{$route.meta.title}}</router-link>
      </span>

      <div>
        <el-tag :key="tag.path" v-for="tag in dynamicTags" closable @close="handleClose(tag)">
          <router-link :to="tag.path" :query="tag.query">{{tag.meta.title}}</router-link>
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script lang='tsx' type='text/tsx'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import http from "../utils/request";
@Component
export default class Header extends Vue {
  faroute: object = {};
  visible: boolean = false;
  public user:object={}
  mounted() {
    this.useinfo()
  }
  public beforeRouteLeave(to: any, from: any, next: any) {
    next();
    console.log(to, from);
  }
  //标签
  public dynamicTags: any[] = [];
  handleClose(tag: object) {
    this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
  }
  /**跳转 */
  jumfn(datas: object) {
    console.log(datas);
    this.$router.push(datas);
  }
  /**退出登陆*/
  reset() {
    sessionStorage.clear();
    this.$router.push({ name: "login" });
  }
  /**修改密码 */
  password() {
    this.$router.push({ name: "changePassword" });
  }
  /**用户信息 */
   async useinfo(){
    let res:any = await http.get('/userInfo',{})
    console.log('user',res)
    if(res.code==0){
      this.user= res.data
    }
  }
  /**watch */
  @Watch("$route", { immediate: true })
  private changeRouter(route: Route) {
    // console.log(route.matched, route);
    this.dynamicTags.map(res => {
      if (res.path == route.path ||res.path =='/Home' ) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(res), 1);
      }
    });
    this.dynamicTags.push(route);

    route.matched.map(res => {
      if (route.path == res.path) {
        this.faroute = res;
      }
    });
    // console.log(this.faroute, this.dynamicTags);
  }
}
</script>
<style lang="less" scoped>
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: black;
  color: #fff;
}
.nav {
  text-align: left;
}
.info {
  display: flex;
  align-items: center;
  width: 300px;
  height: 50px;
  justify-content: flex-start;
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  span {
    margin-left: 10px;
  }
}
a {
  text-decoration: none;
  color: #333;
}
.nav /deep/ .el-tag {
  background-color: #409eff;
  color: #fff;
  border-color: #409eff;
  margin: 5px;
  a {
    color: #fff;
  }
  .el-tag__close {
    color: #fff;
  }
}
</style>
