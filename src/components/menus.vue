<template>
  <div class="menu">
    {{index}}{{$route.path}}
    <el-menu
    router
     :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
    <!-- 二级菜单 -->
      <el-submenu index="/mangeList">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>列表管理</span>
        </template>
        <!-- 二级菜单 -->
        
      <el-menu-item index="/mangeListHome">
        <i class="el-icon-menu"></i>
        <span slot="title">mangeListHome</span>
      </el-menu-item>
       <el-menu-item index="/mangeListTwo">
        <i class="el-icon-menu"></i>
        <span slot="title">mangeListTwo</span>
      </el-menu-item>
        <!-- 三级菜单 -->
        <!-- <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu> -->
      </el-submenu>

      <el-menu-item index="/Home">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="/About">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <!-- <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
        index:""
    };
  },
  created(){
     
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
