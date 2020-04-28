<template>
  <div class>
    <Child hh="我是父组件过来的" @childfun="propMsg"></Child>
    {{msg}} 
  </div>
</template>

<script lang='tsx' type='text/tsx'>
import { Component, Prop, Vue } from "vue-property-decorator";
import Child from "@/components/child.vue";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
const someModule = namespace("test");
@Component({
  components: {
    Child
  }
})
export default class About extends Vue {
  msg: string = "我";
  @someModule.State(state => state.menulist) menulist:any;
  @someModule.Action("saveMenuListFN") saveMenuListFN:any;
  created() {
   console.log(this.menulist) 
  }
  propMsg(msg: string) {
    this.msg = msg;
    this.saveMenuListFN("1111")
    console.log(this.menulist)
  }
}
</script>
