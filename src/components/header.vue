<template>
  <div class="header">
    <div class="info">
      <img
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565244103786&di=203bcb9e8131d96b29b63442b45d59aa&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F20%2F20160920211621_TwCPX.jpeg"
        alt
      />
      <span>admin</span>
    </div>
  </div>
</template>

<script lang='tsx' type='text/tsx'>
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class Header extends Vue {}
</script>
<style lang="less" scoped>
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.info {
  display: flex;
  align-items: center;
  width: 300px;
  height: 50px;
  justify-content: center;
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  span {
    margin-left: 10px;
  }
}
</style>
