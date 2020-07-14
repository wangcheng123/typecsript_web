<template>
  <div class="contain">
    <Mytable :tdata="tableData" :total="total" ref="Mytable" :thead="thead" :status="['收取尾款','线下收款']"></Mytable>
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
      this.thead = res.data.t_head;
      this.total = res.data.total
    }
  }
}
</script>
