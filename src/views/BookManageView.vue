<template>
  <div>
    <div class="header">
      <div class="form">
        <el-form
          :inline="true"
          class="demo-form-inline"
        >
          <el-form-item>
            <el-input
              v-model="beSearchISBN"
              size="small"
              placeholder="请输入ISBN查询"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="small"
              @click="searchStart"
              >查询
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="group">
        <el-button
          type="warning"
          icon="el-icon-plus"
          size="small"
          @click="addDia = true"
          >添加图书</el-button
        >
      </div>
    </div>
    <div class="content">
      <el-table
        :data="tableData"
        style="width: 100%"
        stripe
        border
        header-row-class-name="active-header"
        cell-class-name="table-centen"
      >
        <el-table-column
          type=" selection"
          width="55"
        ></el-table-column>
        <el-table-column
          prop="isbn"
          label="ISBN"
          width="180"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="bookName"
          label="图书名称"
          width="180"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="writer"
          label="作者"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="price"
          label="单价"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="number"
          label="数量"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="publisher"
          label="出版社"
        >
        </el-table-column>
        <el-table-column
          prop="publishTime"
          label="出版时间"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="booknum.currentPage"
          :page-size="booknum.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="确认修改项目"
      :visible.sync="updateDia"
      width="30%"
    >
      数量：<el-input v-model="beEdit.number" /> <br />
      价格：<el-input v-model="beEdit.price" />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="updateDia = false">取 消</el-button>
        <el-button
          type="primary"
          @click="updateRow"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="请填写相关信息"
      :visible.sync="addDia"
      width="30%"
    >
      ISBN：<el-input v-model="beInsert.ISBN" /> <br />
      书名：<el-input v-model="beInsert.bookName" /> <br />
      作者：<el-input v-model="beInsert.writer" /> <br />
      出版社：<el-input v-model="beInsert.publisher" /> <br />
      出版日期：<el-date-picker
        v-model="beInsert.publishTime"
        type="date"
        placeholder="选择日期"
        format="yyyy-MM-dd mm:DD:ss"
        value-format="yyyy-MM-dd mm:DD:ss"
      ></el-date-picker>
      <br />
      数量：<el-input v-model="beInsert.number" /> <br />
      价格：<el-input v-model="beInsert.price" />

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addDia = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addBookList"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="确定删除？"
      :visible.sync="deleteDia"
      width="30%"
    >
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="deleteDia = false">取 消</el-button>
        <el-button
          type="primary"
          @click="deleteBookList"
        >
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BookManage",
  data() {
    return {
      booknum: {
        pageSize: 50,
        currentPage: 1,
      },
      beSearchISBN: "",
      tableData: [],
      updateDia: false,
      addDia: false,
      beEdit: {
        ISBN: "",
        number: "",
        price: "",
      },
      beInsert: {
        ISBN: "",
        bookName: "",
        writer: "",
        publisher: "",
        publishTime: "",
        number: "",
        price: "",
      },
      deleteDia: false,
      beDeleteISBN: "",
    };
  },
  methods: {
    //编辑
    handleEdit(index, row) {
      this.updateDia = true;
      this.beEdit.ISBN = row.isbn;
      this.beEdit.number = row.number;
      this.beEdit.price = row.price;
    },
    async updateRow() {
      let res = await this.axios.put("/api/manage/updateBookList", this.beEdit);
      if (res.data.code == 200) {
        this.$message.success("修改成功");
      } else {
        this.$message.warning("修改失败");
      }
      this.updateDia = false;
      this.queryAllBook();
    },
    //删除
    handleDelete(index, row) {
      this.deleteDia = true;
      this.beDeleteISBN = row.isbn;
    },
    async deleteBookList() {
      let res = await this.axios.post("/api/manage/deleteBookList", {
        ISBN: this.beDeleteISBN,
      });
      if (res.data.code == 200) {
        this.$message.success("删除成功");
      } else {
        this.$message.warning("删除失败");
      }
      this.deleteDia = false;
      this.queryAllBook();
    },
    // 页数选择框
    handleSizeChange(value) {
      this.booknum.pageSize = value;
      this.queryAllBook();
    },
    handleCurrentChange(value) {
      this.booknum.currentPage = value;
      this.queryAllBook();
    },
    // 加书
    async addBookList() {
      let res = await this.axios.post("/api/manage/addBookList", this.beInsert);
      console.log(res);
      if (res.data.code == 200) {
        this.$message.success("添加成功");
      } else {
        this.$message.warning("添加失败");
      }
      this.addDia = false;
    },
    // 查书
    async searchStart() {
      if (this.beSearchISBN != "") {
        let res = await this.axios.get(
          `/api/manage/query/${this.beSearchISBN}`
        );
        console.log(res);
        if (res.data.code == 200) {
          this.tableData = [];
          let obj = {
            bookName: res.data.data.bookName,
            ISBN: res.data.data.isbn,
            number: res.data.data.number,
            price: res.data.data.price,
            publishTime: res.data.data.publishTime,
            publisher: res.data.data.publisher,
            writer: res.data.data.writer,
          };
          this.tableData.push(obj);
        } else {
          this.$message.warning("获取失败");
        }
      } else {
        this.queryAllBook();
      }
    },
    async queryAllBook() {
      let res = await this.axios.get(
        `/api/manage/queryAll/${this.booknum.pageSize}/${this.booknum.currentPage}`
      );
      if (res.data.code === 200) {
        this.tableData = res.data.data;
      } else {
        this.$message.warning("获取失败");
      }
    },
  },
  mounted() {
    this.queryAllBook();
  },
};
</script>
<style lang="less" scoped>
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
