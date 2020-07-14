<template>
  <div class="menu">
    <div class="logo" v-if="!menubtn">
      <img src="https://mmk-sxy.oss-cn-beijing.aliyuncs.com/img/new_org/bg_top.png" alt />
      <p>新零售平台机构端</p>
    </div>
    <el-menu
      :collapse="menubtn"
      router
      :default-active="$route.name"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#5694FF"
    >
      <el-menu-item index="/Home">
        <i class="el-icon-menu"></i>
        <span slot="title">主页</span>
      </el-menu-item>
      <!-- <el-submenu index="/mangeList">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>列表管理</span>
        </template>
        <el-menu-item index="/mangeListHome">
          <i class="el-icon-menu"></i>
          <span slot="title">mangeListHome</span>
        </el-menu-item>
        <el-menu-item index="/mangeListTwo">
          <i class="el-icon-menu"></i>
          <span slot="title">mangeListTwo</span>
        </el-menu-item>
      </el-submenu>-->
      <!-- <el-submenu index="/mangeList">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>列表管理</span>
        </template>
        <el-menu-item index="/mangeListHome">
          <i class="el-icon-menu"></i>
          <span slot="title">mangeListHome</span>
        </el-menu-item>
        <el-menu-item index="/mangeListTwo">
          <i class="el-icon-menu"></i>
          <span slot="title">mangeListTwo</span>
        </el-menu-item>
      </el-submenu>
    
      <el-menu-item index="/Home">
        <i class="el-icon-menu"></i>
        <span slot="title">主页</span>
      </el-menu-item>
      <el-menu-item index="/About">
        <i class="el-icon-document"></i>
        <span slot="title">关于我们</span>
      </el-menu-item>
      -->
      <MenusChild :mdata="mdata"></MenusChild>
    </el-menu>
  </div>
</template>

<script>
import store from "../store/index";
import MenusChild from "./menusChild.vue";
export default {
  components: {
    MenusChild: MenusChild
  },
  props: {
    menubtn: {
      type: Boolean,
      default: false
    }
  },
  name: "",
  data() {
    return {
      index: "",
      isCollapse: this.menubtn,
      mdata: [
        {
          component: "Layout",
          id: 1,
          meta: { title: "订单管理",icon: "user" },
          children: [
            {
              component: "mangeListHome",
              id: 2,
              meta: { title: "订单管理列表" },
              name: "mangeListHome",
              noCache: true,
              parentId: 1,
              path: "/mangeListHome"
            }
          ],
          name: "mangeList",
          parentId: 0,
          path: "/mangeList",
          redirect: "/mangeList",
          subSys: 0
        }
      ]
    };
  },
  created() {
    store.commit("SET_menusList", [1, 2]);
  },

  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  }
};
</script>
<style lang="less">
.menu {
  height: 100%;
  /deep/ .el-submenu__title,
  /deep/ .el-menu-item {
    text-align: left;
  }
  /deep/ .el-menu {
    width: 230px;
    height: 100%;
  }
  /deep/ .el-menu--collapse {
    width: 64px !important;
  }
  .logo {
    position: relative;
    img {
      display: block;
    }
    p {
      padding: 0;
      margin: 0;
      position: absolute;
      left: 50%;
      z-index: 99;
      color: #fff;
      width: 230px;
      margin-left: -115px;
      top: 28px;
    }
  }
}
@media screen and (max-width: 980px) {
  .menu .logo {
    display: none;
  }
}
</style>