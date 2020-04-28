<template>
  <div class="">
aa {{hh}}
<el-button @click="pp">发送</el-button>
  </div>
</template>

<script lang='tsx' type='text/tsx'>
import {Component, Prop, Vue,Emit} from 'vue-property-decorator';
@Component
 export default class child extends Vue {
     @Prop() private hh!: string;
     @Emit('childfun') send(msg:string){};
     pp(){
         this.send('aaaaa我来自子组件')
     }
}
</script>
