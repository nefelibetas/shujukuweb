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
              @click="handleBorrow(scope.$index, scope.row)"
              >借阅</el-button
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
      title="数量不足，是否预约"
      :visible.sync="borrowDia"
      width="30%"
    >
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="borrowDia = false">取 消</el-button>
        <el-button
          type="primary"
          @click="bookingBook"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "BorrowView",
  data() {
    return {
      booknum: {
        pageSize: 50,
        currentPage: 1,
      },
      beSearchISBN: "",
      tableData: [],
      borrowDia: false,
      borrowISBN: "",
    };
  },
  methods: {
    handleSizeChange(value) {
      this.booknum.pageSize = value;
      this.queryAllBook();
    },
    handleCurrentChange(value) {
      this.booknum.currentPage = value;
      this.queryAllBook();
    },
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
    async handleBorrow(index, row) {
      this.borrowISBN = row.isbn;
      let borrowRes = await this.axios.post(
        `/api/borrow/borrowBook?userId=${this.userInfo.userId}&ISBN=${this.borrowISBN}`
      );
      if (borrowRes.data.code == 200) {
        this.$message.success("成功借出");
      } else {
        this.$message.warning("数量不足，仅可以预约");
        this.bookingBook();
      }
    },
    async bookingBook(borrowISBN) {
      this.borrowDia = true;
      let bookingRes = await this.axios.post("/api/booking/addBooking", {
        userId: this.userInfo.userId,
        ISBN: borrowISBN,
      });
      if (bookingRes.data.code == 200) {
        this.$message.success("成功借出");
      } else {
        this.$message.warning("数量不足，仅可以预约");
      }
      this.borrowDia = false;
    },
  },
  computed: {
    ...mapState(["userInfo"]),
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
