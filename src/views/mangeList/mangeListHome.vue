<template>
  <div class="contain">
    <Mytable :tdata="tableData" :total="total" ref="Mytable" :thead="thead"></Mytable>
  </div>
</template>

<script lang='tsx' type='text/tsx'>
import http from "@/utils/request";
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class mangeListHome extends Vue {
  tableData: any = [];
  Mytable: any;
  thead: any = [];
  form: any;
  total:number=0;
  mounted() {
    this.list();
  }
  async list() {
    this.Mytable = this.$refs["Mytable"];
    console.log(this.Mytable.params);
    let res: any = await http.get("/agency/order/index", {
      ...this.Mytable.params,
      ...this.form,
      typeurl: "php"
    });
    console.log(res);
    if (res.code == 0) {
      this.tableData = res.data.list;
      let arr =[];
      for(let item in  res.data.t_head){
        // console.log(item)
        let obj={
          lab:res.data.t_head[item],
          val : item,
          width: item=="project_name"?300:'auto'
        }
        arr.push(obj)
      }
      console.log(arr)
      this.thead = arr;
      this.total = res.data.total
    }
  }
}
</script>
