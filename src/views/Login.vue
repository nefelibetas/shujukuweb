<template>
    <body id="poster">
        <el-form class="login-container" label-position="left" label-width="0px">
            <h3 class="login_title">
                系统登录
            </h3>
            <el-form-item label="">
                <el-input type="text" v-model="loginForm.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
            </el-form-item>

            <!-- 权限-->
            <el-form-item prop="authority">
                <span class="svg-container">
                    <svg-icon icon-class="user" />
                </span>
                <el-select v-model="loginForm.isadmin" placeholder="请选择" style="width: 100%">
                    <el-option :key="0" label="读者" :value="'0'"></el-option>
                    <el-option :key="1" label="管理员" :value="'1'"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <!---style="width:100%; 变宽--->
                <el-button type="primary" v-on:click="Login()">登录</el-button>
                <el-button type="primary" @click="toRegister()">注册</el-button><!---跳转到注册页面-->
            </el-form-item>
        </el-form>
    </body>
</template>

<script>
//import { axios } from 'vue/types/umd'

// const service=axios.create({
//     baseURL:'http://10.34.83.57:8080/api/'
// })
export default {
    name: 'Login',
    data() {
        return {
            loginForm: {
                username: '',
                password: '',
                isadmin: ''
            }
        }
    },
    methods: {
        Login() {
            //console.log('submit!', this.loginForm);
            //用this.axio实现前后端关联
            this.axios.post('/api/user/login', this.loginForm).then((resp) => {//单引号里面写后端路径,传值
                let data = resp.data;
                // console.log(data);
                if (data.code == 200) {  //如果这个data值是正确的
                    //成功了就跳转
                    this.$message({
                        message: '登录成功，欢迎来到后台管理页面！',/*跳转到图书管理系统页面看这里*/
                        type: 'success'
                    });
                    if (this.loginForm.isadmin == 0)
                        this.$router.push({ path: '/Home' })/*Home做例子 改为用户跳转的页面*/
                    else
                        this.$router.push({ path: '/about' })/*about做例子 改为管理员跳转的页面*/
                    //清空loginForm
                    this.loginForm = {};
                }
                else if (data.code == -221) {
                    this.$message({
                        message: '用户不存在',
                        type: 'fail'
                    });
                }
                else if (data.code == -222) {
                    this.$message({
                        message: '用户账号或者密码错误',
                        type: 'fail'
                    });
                }
                else if (data.code == -223) {
                    this.$message({
                        message: '用户身份错误',
                        type: 'fail'
                    });
                }
            })
        },
        toRegister() {
            //使用跳转方法使其跳转,看index.js里面的路径
            this.$router.push({ path: '/Register' })
        }
    }

}
</script>

<style>
#poster {
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
}

body {
    margin: 0px;
    padding: 0px;
}

.login-container {
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

.login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
}
</style>
