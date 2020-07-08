<template>
  <div id="app-main">
    <div class="body">
      <div class="menus">
        <Menus></Menus>
      </div>
      <div class="content">
        <div>
          <Header></Header>
        </div>
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
  
/*fade-transform*/
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
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
