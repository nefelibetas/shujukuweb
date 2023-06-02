<template>
  <div id="poster">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="0px"
      label-position="left"
      class="register-container"
    >
      <h3 class="register_title">欢迎注册</h3>
      <!--输入用户名-->
      <el-form-item
        type="text"
        label=""
        prop="username"
      >
        <el-input
          v-model="ruleForm.username"
          autocomplete="off"
          placeholder="请输入用户名"
          prefix-icon="el-icon-user-solid"
          ><!--输入框的图标-->
        </el-input>
      </el-form-item>
      <!--输入密码-->
      <el-form-item
        label=""
        prop="password"
      >
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          ><!--输入框的图标-->
        </el-input>
      </el-form-item>
      <!--确认密码-->
      <el-form-item
        label=""
        prop="checkPass"
      >
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
          placeholder="请确认密码"
          prefix-icon="el-icon-lock"
          ><!--输入框的图标-->
        </el-input>
      </el-form-item>
      <!--手机号-->
      <el-form-item
        layout="inline"
        label=""
        :colon="false"
        prop="phone"
      >
        <el-input
          placeholder="请输入电话号码"
          v-model="ruleForm.phone"
          :maxLength="11"
          style="width: 100%"
          allowClear
          prefix-icon="el-icon-phone"
        >
        </el-input>
      </el-form-item>
      <!--邮箱-->
      <el-form-item
        type="text"
        label=""
        prop="email"
      >
        <el-input
          v-model="ruleForm.email"
          autocomplete="off"
          placeholder="请输入邮箱"
          prefix-icon="el-icon-notebook-1"
          ><!--输入框的图标-->
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm(ruleForm)"
          >注册</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button
          type="primary"
          @click="toLogin()"
          >登录</el-button
        ><!---跳转到登录页面-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    var checkPhone = (rule, value, callback) => {
      if (value !== "") {
        let isPhone = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
        let reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
        // if () {
        //   cbfn("");
        // }

        if (!reg.test(value) && !isPhone.test(value) && value) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      } else {
        callback(new Error("电话号码不能为空"));
      }
    };

    var checkusername = (rule, value, callback) => {
      if (value !== "") {
        if (value.length < 12) callback();
        else callback(new Error("用户名太长"));
      } else {
        callback(new Error("用户名不能为空"));
      }
    };

    var checkemail = (rule, value, callback) => {
      if (value !== "") {
        if (!/^[\w\-]+@[a-zA-Z\d\-]+(\.[a-zA-Z]{2,8}){1,2}$/gi.test(value)) {
          callback(new Error("请输入正确的邮箱"));
        } else {
          callback();
        }
      } else {
        callback(new Error("邮箱不能为空"));
      }
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
        email: "",
        phone: "",
        is_admin: 0,
      },
      rules: {
        phone: [{ validator: checkPhone, trigger: "blur" }],

        username: [{ validator: checkusername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        email: [{ validator: checkemail, trigger: "blur" }],
        /* phone: [
                     { required: true, message: "请输入手机号码", trigger: 'blur' },//验证，为空时会提示
                     { min: 11, max: 11, message: "请正确输入手机号码", trigger: 'blur' }
                 ],*/
      },
    };
  },

  methods: {
    submitForm(ruleForm) {
      this.axios.post("/api/user/signUp", ruleForm).then((resp) => {
        //单引号里面写后端路径,传值
        let data = resp.data;
        if (data.code == 200) {
          this.$message({
            message: "注册成功，请登录" /*跳转到图书管理系统页面看这里*/,
            type: "success",
          });
          this.$router.push({ path: "/" });
        } else {
          this.$message({
            message:
              "用户已存在，请修改用户名" /*跳转到图书管理系统页面看这里*/,
            type: "fail",
          });
        }
      });
    },
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
    },
    toLogin() {
      this.$router.push({ path: "/" }); /*跳转到登录页面写在HomeView.vue里面*/
    },
  },
};
</script>

<style>
#poster {
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
  margin: 0px;
  padding: 0px;
}

.register-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  /*让四周都有边距 */
  padding: 35px 35px 35px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.register_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
