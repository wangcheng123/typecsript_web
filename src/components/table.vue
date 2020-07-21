<template>
  <div class="Mytable">
    <el-table :data="tdata" border style="width: 100%;" height="650">
      <el-table-column type="index" fixed label="#" width="50"></el-table-column>
      <el-table-column
        :prop="item.val"
        :label="item.lab"
        v-for="(item,index) in thead"
        :key="index"
        :width="item.width?item.width:'auto'" 
        align="center"
      ></el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="200" v-if="status">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            v-for="(item, index) in status"
            @click="sfn(scope.row)"
            :key="index"
          >{{item}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="params.pageNum"
      :page-sizes="[10, 20, 50, 100,1000]"
      :page-size="params.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang='tsx' type='text/tsx'>
import http from "@/utils/request";
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class tableComponent extends Vue {
  // @Prop() public tableData:any ;
  @Prop({ default: 0 }) total: number = 0;
  @Prop({ default: [] }) tdata: any;
  @Prop({ default: [] }) thead: any;
  @Prop({ default: null }) status: any;
  tableData: any = this.tdata;
  head: any = this.thead;
  params: any = {
    pageNum: 1,
    page: 1,
    pageSize: 10
  };
  // total: number = 0;
  //    public tableData:Array<object>;

  created() {}
  sfn(data?: any) {
    console.log(data);
  }
  handleSizeChange(val: number) {
    this.params.pageNum = 1;
    this.params.page = 1;
    this.params.pageSize = val;
  }
  handleCurrentChange(val: number) {
    this.params.pageNum = val;
    this.params.page = val;
  }
}
</script>
<style scoped>
.Mytable{
  width: 100%;
}
.Mytable /deep/ .el-input {
  width: 100px !important;
}
.Mytable /deep/ .el-pagination__editor.el-input {
  width: 50px !important;
}
@media screen and (max-width: 1281px) {
  .Mytable {
    width: 900px;
  }
}
@media screen and (max-width: 1025px) {
  .Mytable {
    width: 800px;
  }
}
</style>