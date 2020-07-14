<template>
  <div>
    <div class="header">
      <img
        src="https://mmk-sxy.oss-cn-beijing.aliyuncs.com/img/new_org/ic_field.png"
        style="width:20px;"
        alt
        @click="changemenu"
      />
      <div class="info">
        <img
          class="icon"
          src="https://mmk-sxy.oss-cn-beijing.aliyuncs.com/img/new_org/ic_search.png"
          alt
        />
        <img
          class="icon"
          src="https://mmk-sxy.oss-cn-beijing.aliyuncs.com/img/new_org/ic_news.png"
          alt
        />
        <img
          @click="password"
          src="https://mmk-sxy.oss-cn-beijing.aliyuncs.com/img/new_org/head.png"
          alt
        />
        <span
          style="font-size: 12px;color: rgb(106, 123, 144);cursor: pointer;"
          @click="password"
        >{{$store.state.use.useinfo.realName}}</span>

        <!--  <el-dropdown style="margin-left:70px;">
          <span class="el-dropdown-link">
            
           <i class="el-icon-arrow-down el-icon--right"></i>
        </span>-->
        <!-- <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span @click.stop="reset" style="width:100%;">退出登陆</span>
            </el-dropdown-item>
          </el-dropdown-menu> 
        </el-dropdown>-->
      </div>
    </div>
    <div class="nav">
      <span v-if="faroute.parent">
        <router-link :to="faroute.parent.path" v-if="faroute.parent.meta.title">
          {{faroute.parent.meta.title}}
          <b style="font-weight: 500; padding: 0 8px;">/</b>
        </router-link>
      </span>
      <span>
        <router-link :to="$route.path">{{$route.meta.title}}</router-link>
      </span>
      <h5 style="color: #303133;font-size: 18px;">{{$route.meta.title}}</h5>
      <!-- 
      <div>
        <el-tag :key="tag.path" v-for="tag in dynamicTags" closable @close="handleClose(tag)">
          <router-link :to="tag.path" :query="tag.query">{{tag.meta.title}}</router-link>
        </el-tag>
      </div>-->
    </div>
  </div>
</template>

<script lang='tsx' type='text/tsx'>
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { Route } from "vue-router";
import http from "../utils/request";
@Component
export default class Header extends Vue {
  faroute: object = {};
  visible: boolean = false;
  public user: object = {};
  //菜单开关
  menubtn: boolean = false;
  created() {
    // this.saveuseinfoFN();
    // this.useinfo();
  }
  mounted() {}
 

  //菜单开关

  @Emit("childfun") send(msg: Boolean) {}
  changemenu() {
    this.menubtn = !this.menubtn;
    this.send(this.menubtn);
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
  async useinfo() {
    console.log(this.$store.state)
    this.user = this.$store.state.use.useinfo;
  }
  /**watch */
  @Watch("$route", { immediate: true })
  private changeRouter(route: Route) {
    // console.log(route.matched, route);
    this.dynamicTags.map(res => {
      if (res.path == route.path || res.path == "/Home") {
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
  justify-content: space-between;
  padding: 0 24px;
  align-items: center;
  background: #fff;
  color: #000000;
  height: 46px;
  border-bottom: 8px solid #e9e9e9;
}
.nav {
  text-align: left;
  height: 92px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  line-height: 22px;
  padding: 16px 0 0 24px;
  a {
    color: #909399;
  }
}
.info {
  display: flex;
  align-items: center;
  // width: 100px;
  .icon {
    width: 14px;
    height: 14px;
    margin-right: 30px;
  }
  img {
    width: 24px;
    height: 24px;
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
