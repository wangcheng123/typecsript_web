<template>
  <div id="app-main">
    <div class="body">
      <div class="menus">
        <Menus :menubtn="menubtn"></Menus>
      </div>
      <div class="content" :style="menubtn?'margin-left: 70px;':''">
        <div style="background:#fff;">
          <Header @childfun="childfun"></Header>
        </div>
        <div class="App_main">
          <transition name="fade-transform" mode="out-in">
            <router-view />
          </transition>
        </div>
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
  },
  data() {
    return {
      menubtn: false
    };
  },
  methods: {
    childfun(data) {
      console.log(data);
      this.menubtn = data
    }
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

.body {
  display: flex;
}
.content {
  flex: 1;
  background: #f4f6f9;
  margin-left:230px ;
}
.App_main {
  background: #fff;
  margin: 20px;
  padding: 20px;
  min-height: calc(100vh - 188px);
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
.menus {
  max-width: 245px;
  /* min-height: 100vh; */
}
#nav a.router-link-exact-active {
  color: #42b983;
}
.el-pagination{
  padding: 20px;
  text-align: right;
}
/*fade-transform*/
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
