<template>
  <div class>
    <Child hh="我是父组件过来的" @childfun="propMsg" ref="child"></Child>
     {{msg}}
<Sidentify></Sidentify>
   
    <Mytable></Mytable>
  </div>
</template>

<script lang='tsx' type='text/tsx'>
 import Sidentify from '@/components/SIdentify.vue'
import { Component, Prop, Vue } from "vue-property-decorator";
import Child from "@/components/child.vue";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
const someModule = namespace("test");
@Component({
  components: {
    Child,
    Sidentify
  }
})
export default class About extends Vue {
  msg: string = "我";
  //vuex 获取 状态 + 调用他的方法
  @someModule.State(state => state.menulist) menulist: any;
  @someModule.Action("saveMenuListFN") saveMenuListFN: any;

  mounted() {
    let child: any = this.$refs["child"];
    console.log(this.menulist, child.hh);
  }
  //子传父方法
  propMsg(msg: string) {
    this.msg = msg;
    this.saveMenuListFN("1111");
    console.log(this.menulist);
  }
}
</script>
