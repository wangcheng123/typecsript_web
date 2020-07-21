<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  padding: 0;
  margin: 0;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

/* title样式 */
.titleInfo {
  margin: 0;
  font-size: 16px;
  text-indent: 20px;
  font-weight: 500;
  color: #1d2023;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #e6e9f0;
  margin-bottom: 20px;
}
/* appMain样式 */
.app-container {
  min-height: calc(100vh - 188px);
  /* margin: 20px; */
  background: white;
}
h5{
  text-align: left;
}

.app-container /deep/ .el-input__inner , .el-input,.el-textarea{
  width: 234px !important;
  margin-right:10px ;
}
.app-container /deep/ .el-form-item__content{
  text-align: left;
}
.app-container /deep/ .el-form-item__label{
  font-weight: 700;
}
.app-container .el-button--primary{
      background-color: #437EEE;
    border-color: #437EEE;
}
</style>
