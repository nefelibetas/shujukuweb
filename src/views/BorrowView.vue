<template>
    <body id="poster">
        <el-form class="login-container" label-position="left" label-width="10px">
            <h3 class="login_title">
                欢迎使用借阅功能
            </h3>
            <el-form-item label="">
                <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input type="text" v-model="loginForm.bookid" placeholder="请输入图书编号"></el-input>
            </el-form-item>
            <div class="block">
                <el-date-picker v-model="value1" type="datetime" placeholder="借书日期时间">
                </el-date-picker>
                <el-date-picker v-model="value1" type="datetime" placeholder="还书日期时间">
                </el-date-picker>
            </div>


            <el-form-item>
                <!---style="width:100%; 变宽--->
                <el-button size="small" type="primary" v-on:click="borrow()">借阅</el-button>
                <el-button size="small" @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </body>
</template>
<script>
export default {
    name: 'ReserveView',
    data() {
        return {
            loginForm: {
                username: '',
                bookid: '',
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                value1: '',
                value2: '',
                value3: ''
            }

        }
    },
    methods: {
        borrow() {
            // if(bookid==)
            this.$message({
                message: '借阅成功！',//借阅成功则跳转至已借阅页面，页面中显示所有已经借阅的图书信息？还没写
                type: 'true'
            });
        },
        resetForm(ruleForm) {
            this.$refs[ruleForm].resetFields()
        },
    }
}
</script>
