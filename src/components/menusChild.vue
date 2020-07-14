<template>
<div class="navMenu">
     <template v-for="navMenu in mdata">
      <!-- 一级菜单 -->
      <el-menu-item
        v-if="!navMenu.children"
        :key="navMenu.name"
        :data="navMenu"
        :index="navMenu.name"
      >
        <i :class="navMenu.meta.icon"></i>
        <span slot="title">{{navMenu.meta.title}}</span>
      </el-menu-item>

      <!-- 此菜单下还有子菜单 -->
      <el-submenu v-if="navMenu.children" :key="navMenu.name" :data="navMenu" :index="navMenu.name">
        <template slot="title">
          <i :class="navMenu.meta.icon"></i>
          <span v-if="navMenu.meta">{{navMenu.meta.title}}</span>
        </template>
        <!-- 递归 -->
        <NavMenu :mdata="navMenu.children"></NavMenu>
      </el-submenu>
      
    </template>
</div>
   

</template>

<script>
export default {
  name: "NavMenu",
  props: ["mdata"],
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less">
.el-menu--collapse span{
        height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
}
</style>