<!-- 该标签主要编写前端网页代码，网页标签在template模板中只能有一个根标签 -->
<template>
    <!-- 定义的卡片组件 -->
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <!-- 面包屑组件 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统信息管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户信息管理</el-breadcrumb-item>

            </el-breadcrumb>
        </div>
        <!-- elrow组件的布局  gutter 间隔距离 -->
        <el-row :gutter="20">
            <el-col :span="6">
                <el-input v-model="uname" clearable @clear="findPager" placeholder="请输入用户查询的名称"></el-input>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" @click="findPager" icon="el-icon-search">查询</el-button>
                <el-button type="success" @click="addDialog()" icon="el-icon-plus">添加</el-button>
            </el-col>
        </el-row>

        <!-- 定义表格组件  表格组件中过多：data属性绑定数据  数据是一个数组-->
        <el-table :data="tableData" style="width:100%">
            <el-table-column prop="uname" label="用户名称"></el-table-column>
            <el-table-column prop="password" label="密码"></el-table-column>
            <el-table-column prop="images" label="头像">
                <<template slot-scope="scope">
                    <img :src="scope.row.images" style="width:40px; height:40px;" />
                    </template>
            </el-table-column>
            <el-table-column prop="stats" label="状态">

                <template slot-scope="scope">
                    <el-switch v-model="scope.row.stats" :active-value="0" :inactive-value="1" active-color="#13ce66"
                        inactive-color="#ff4949" @change="changeStats(scope.row)">
                    </el-switch>
                </template>

            </el-table-column>
            <el-table-column label="操作">
                <!-- 作用域插槽 -->
                <template slot-scope="scope">
                    <!-- {{}}输出数据  加入组件 -->
                    <!-- {{scope.row}} -->
                    <el-tooltip content="修改" placement="left">
                        <el-button type="warning" @click=editDialog(scope.row) circle icon="el-icon-edit"></el-button>
                    </el-tooltip>
                    <el-tooltip content="删除" placement="right">
                        <el-button type="danger" @click="remove(scope)" circle icon="el-icon-delete"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页组件 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pager.page"
            :page-sizes="[5, 15, 20, 25]" :page-size="pager.limit" layout="total, sizes, prev, pager, next, jumper"
            :total="pager.total">
        </el-pagination>
        <!-- 定义添加对话框 -->
        <el-dialog title="添加用户信息" :visible.sync="addDialogFlag">
            <el-form :model="user" :rules="rules" ref="user">
                <el-form-item prop="uname">
                    <el-input v-model="user.uname" placeholder="请输入用户名称"></el-input>
                </el-form-item>
                <el-form-item prop=password>
                    <el-input v-model="user.password" placeholder="请输入用户密码"></el-input>
                </el-form-item>
                <el-form-item prop="imagqs">
                    <el-input v-model="user.images" placeholder="请输入图像"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialogFlag = false">取消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </div>
        </el-dialog>

        // 对应的选出框
        <el-dialog title="修改类别信息" :visible.sync="editDialogFlag">
            <el-form :model="user" :rules="rules" ref="user">
                <el-form-item prop="uname">
                    <el-input v-model="user.uname" placeholder="请输入用户名称"></el-input>
                </el-form-item>
                <el-form-item prop=password>
                    <el-input v-model="user.password" placeholder="请输入用户密码"></el-input>
                </el-form-item>
                <el-form-item prop="imagqs">
                    <el-input v-model="user.images" placeholder="请输入图像"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="reset">取消</el-button>
                <el-button type="primary" @click="update">修改</el-button>
            </div>
        </el-dialog>

    </el-card>
</template>
<!-- 行为区，编写的是和后端进行交互的js代码，vue代码 -->
<script>
export default {
    data() { //该属性中放置用户定义的变量，类似与类的属性定义
        return {
            addDialogFlag: false,  // 显示对话框 标记  默认是不显示
            editDialogFlag: false,
            cname: '',
            tableData: [],// 定义表格的数组  初始化表格数据
            pager: { //  封装分页对象
                page: 1,  // 分页起始数据
                limit: 5, // 分页显示最大条数
                total: 0 // 统计记录数字

            },
            category: {  // 定义对象   封装添加对象
                cateis: 0,
                catename: ''
            },
            rules: {
                uname: [{
                    required: true,
                    message: '请输入用户名称',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }],
                images: [{
                    required: true,
                    message: '请选择头像',
                    trigger: 'blur'
                }]
            },
            user: {   //定义用户对象  主要封装传递的数据 更改用户状态 修改或者添加用户信息
                uid: 0,
                uname: '',
                password: '',
                images: '',
                stats: ''
            },
            uname: ''
            // pager: { //封装的分页参数
            // page: 1, //分页起始数据
            // limit: 5, //每页显示最大条数
            // total: 0 //统计分页记录数
            // },
            //定义条件查询接收值的变量
            // tableData: [] //定义表格中填充的数据，该数据要从后端服务中获取

        }
    },
    methods: {
        changeStats(row) {
            this.user = row;   //用户定义的user对象赋值
            this.$http.post('http://localhost/user/changeStats', this.user)
                .then(res => {
                    if (res.data.data.code == 200) {
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                        this.findPager();
                    }
                }).catch(err => {
                    this.$message.error('错了哦, 网络异常')
                })
        },
        update() {
            this.$refs['user'].validate(valid => {
                if (valid) {
                    this.$http.post('http://localhost/user/update', this.user)
                        .then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    showClose: true,
                                    message: res.data.message,
                                    type: 'success'
                                })

                                this.editDialogFlag = !this.editDialogFlag // 关闭对话框
                                this.findPager();  // 再次调用查询
                            }
                        }).cath(err => {
                            this.$message.error('错了  有问题')
                        })
                }
            })
        },

        // 避免出现对应的 修改之后取消  之后再次添加依然对值进行填充
        rest() {
            this.user = {};
            this.editDialogFlag = !this.editDialogFlag;
        },
        //   用户自定义
        save() {
            this.$refs['user'].validate(valid => {
                if (valid) {
                    this.$http.post('http://localhost/user/save', this.user)
                        .then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    showClose: true,
                                    message: res.data.message,  // 获取返回对应的信息
                                    type: 'success'
                                });
                                this.addDialogFlag = !this.addDialogFlag // 关闭对话框
                                this.findPager();  // 再次调用查询
                            }
                        }).cath(err => {
                            this.$message.error('错了  有问题')
                        })
                }
            })
        },

        //  进行数据的填充
        editDialog(row) { // 点击改方法  是打开修改对话框  并不是保存
            this.user = row;  // 传入对应的参数
            this.editDialogFlag = !this.editDialogFlag;
        },
        addDialog() {
            this.addDialogFlag = !this.addDialogFlag;
        },

        //该标签中编写的是用户自定义的javascript方法
        // 定义方法  初始化表格中的数据  请求 ajax axios
        remove(scope) {
            this.$http.post('http://localhost/user/remove?uid=' + scope.row.uid)
                .then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                        this.findPager();
                    }
                })
        },
        handleSizeChange(val) {
            console.log('每页$(val)条');
            this.pager.limit = val;
            this.findPager();
        },
        handleCurrentChange(val) {
            console.log('每页$(val)条');
            this.pager.page = val;
            this.findPager();
        },

        findPager() {
            this.$http.get('http://localhost/user/findPager', {
                params: {
                    page: this.pager.page,
                    limit: this.pager.limit,
                    uname: this.uname
                }
            }).then(res => {
                console.info(res);
                this.tableData = res.data.data.data;
                this.pager.total = res.data.data.count;
            })

        }

    },

    created() {  //vue技术的生命周期  浏览器在加载当前页面 渲染数据
        this.findPager();
    }

}
</script>


<!-- 标签放置的样式CSS -->
<style scoped>
.el-pagination {
    margin-top: 10px;
}

.el-breadcrumb {
    margin-bottom: 20px;
}
</style>

