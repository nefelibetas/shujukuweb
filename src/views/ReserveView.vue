<template>
  <body id="poster">
    <el-form
      class="login-container"
      label-position="left"
      label-width="0px"
    >
      <h3 class="login_title">欢迎使用预约功能</h3>
      <el-form-item label="">
        <el-input
          type="text"
          v-model="loginForm.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input
          type="text"
          v-model="loginForm.bookid"
          placeholder="请输入图书编号"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <!---style="width:100%; 变宽--->
        <el-button
          type="primary"
          v-on:click="reserve()"
          >预约</el-button
        >
        <el-button v-on:click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </body>
</template>
<script>
export default {
  name: "ReserveView",
  data() {
    return {
      loginForm: {
        username: "",
        bookid: "",
      },
    };
  },
  methods: {
    reserve() {
      // if(bookid==)
      this.$message({
        message: "预约成功！", //预约成功则跳转至已预约信息页面？还没写
        type: "true",
      });
    },
    cancel() {
      this.$message({
        message: "已取消预约！", //感觉这里改成重置，取消在预约信息页面实现
        type: "true",
      });
    },
  },
};
</script>
