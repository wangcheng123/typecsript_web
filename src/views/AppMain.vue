<template>
  <div id="app-main">
    <div class="head"><Header></Header></div>
    <div class="body">
      <div class="menus">
        <Menus></Menus>
      </div>
      <div class="content">
        <transition name="fade-transform" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import Menus from "../components/menus";
import Header from "@/components/header";
export default {
  components: {
    Menus,
    Header
  }
};
</script>
<style>
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.head {
  background: black;
  color: #fff;
}
.body {
  display: flex;
}
.content {
  flex: 1;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
.menus {
  width: 245px;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
