<template>
  <div>
    <!--1.图书搜索-->
    <!--
      el-form 表单
      ：inline="true"  设置 inline 属性可以让表单域变为行内的表单域
      :model="formInline"  表单数据对象	object
      el-form-item 表单控件 每一项内容
      label	标签文本	string
      border 加边框
      stripe 悬浮

    -->
    <div class="header">
      <div class="form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="">
            <el-input v-model="formInline.IBNS" size="small" placeholder="请输入ISBN查询"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="formInline.bookname" size="small" placeholder="请输入图书名称查询"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="small" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="group">
        <el-button type="warning" icon="el-icon-plus" size="small" @click="onSubmit">添加图书</el-button>
        <el-button type="danger" icon="el-icon-delete" size="small" @click="onSubmit">批量删除</el-button>
      </div>
    </div>
    <!--2.图书列表-->
    <div class="content">
      <el-table :data="tableData" style="width: 100%" stripe border header-row-class-name="active-header"
        cell-class-name="table-centen">
        <el-table-column type=" selection" width="55"></el-table-column>

        <el-table-column prop="isbn" label="ISBN" width="180" header-align="center">
        </el-table-column>
        <el-table-column prop="bookName" label="图书名称" width="180" header-align="center">
        </el-table-column>
        <el-table-column prop="writer" label="作者" header-align="center">
        </el-table-column>
        <el-table-column prop="price" label="单价" header-align="center">
        </el-table-column>
        <el-table-column prop="number" label="数量" header-align="center">
        </el-table-column>
        <el-table-column prop="publisher" label="出版社"><!--这里写出版社还是图书类型？-->
        </el-table-column>
        <el-table-column prop="publishTime" label="出版时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <div>
        <!--el-pagination 分页组件
          想写在components里面然后引用的没成功 直接写在这里了
          说明：page-size	每页显示条目个数，支持 .sync 修饰符	number	—	10
              total	总条目数	number	—
              current-page	当前页数，支持 .sync 修饰符	number	—
        -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
          :current-page="currentPage"
          :page-size="50" layout="total, sizes, prev, pager, next, jumper"
          :total="0">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
//import Pagination from '@components/pagination/Pagination.vue';
export default {
  name: 'HomeView',

  created() {
    this.projectlist(this.booknum)
  },
  data() {
    return {
      booknum: {
        pageSize: 50,
        currentPage: 1,
      },
      formInline: {
        bookname: '',
        IBNS: '',
      },
      /*说明：当el-table元素中注入data对象数组后，
      在el-table-column中用prop属性来对应对象中的键名即可填入数据，用label属性来定义表格的列名。
      可以使用width属性来定义列宽。 */
      //这里是表格里的假数据   这里是表格里的假数据      这里是表格里的假数据      这里是表格里的假数据
      tableData: []
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    //编辑
    handleEdit(index, row) {
      console.log(index, row);
    },
    //删除
    handleDelete(index, row) {
      console.log(index, row);
    },
    //获取图书数据 router 和.js 的还没写
    projectlist: function (booknum) {
      this.axios
        .get("/api/manage/queryAll", {
          params: { pageSize: booknum.pageSize, currentPage:booknum.currentPage },
        })
        .then((resp) => {
          this.tableData=resp.data.data;
        });
    },
    //分页组件方法
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    handleCurrentChange(val) {
      this.booknum.currentPage=val;
      this.projectlist(this.booknum);
    }

  }

}
</script >
<style lang = "less" scoped >
.header {
  background: #fff;
  margin-bottom: 20px;
  padding: 16px;

  .el-form-item {
    margin-bottom: 8px;
  }

  .group {
    border: 1px solid #eee;
  }
}

.content {
  background: rgb(239, 221, 224);

  /depp/ .active-header {
    color: #17e190;
    text-align: center;

  }

  /deep/.table-centen {
    text-align: center;
  }

}
</style>

