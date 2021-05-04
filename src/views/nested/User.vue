<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="16">
                <div class="grid-content bg-purple">
                    <el-table
                        :data="tableData"
                        style="width: 100%"
                        height="600px"
                        border>
                        <el-table-column
                            label="日期"
                            width="150">
                            <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span style="margin-left: 10px">{{ scope.row.date }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="黑方"
                            width="150">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                <p>昵称: {{ scope.row.black }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <i class="el-icon-user-solid"></i>
                                    <el-tag size="medium">{{ scope.row.black }}</el-tag>
                                </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="白方"
                            width="150">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                <p>昵称: {{ scope.row.white }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <i class="el-icon-user"></i>
                                    <el-tag size="medium">{{ scope.row.white }}</el-tag>
                                </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="胜利方"
                            width="150">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                <p>昵称: {{ scope.row.winner }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <i class="el-icon-s-check"></i>
                                    <el-tag size="medium">{{ scope.row.winner }}</el-tag>
                                </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="220">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    @click="handlePlayBack(scope.$index, scope.row)">查看回放</el-button>
                                <el-button
                                    size="mini"
                                    :type="(scope.row.favorites? 'success': 'info')"
                                    @click="handleFavorites(scope.$index, scope.row)">
                                    <i class="el-icon-star-off" ></i> 收藏
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-avatar :size="75" :src="avatarUrl"></el-avatar>
                    <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="40px" class="userInfoForm">
                        <el-form-item label="昵称" prop="account">
                            <el-input v-model="userInfo.account" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-radio-group v-model="userInfo.gender" prop="gender" disabled>
                                <el-radio label="male"><i class="el-icon-male"> 男</i></el-radio>
                                <el-radio label="female"><i class="el-icon-female"> 女</i></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-row :gutter="20">
                                <el-col :span="14" :pull="4">
                                    <el-button type="primary" @click="submitForm('userInfo')" disabled>立即修改</el-button>
                                </el-col>
                                <el-col :span="8">
                                    <el-button @click="resetForm('userInfo')" disabled>重置</el-button>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="logout" type="danger">退出账号</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'User',
        data() {
            return {
                avatarUrl: "",
                tableData: [],
                userInfo: {},
                rules: {
                    name: [
                        { required: true, message: '请输入昵称', trigger: 'blur' },
                        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                console.log(this.userInfo);
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handlePlayBack(index, row) {
                console.log(index, row);
            },
            handleFavorites(index, row) {
                this.tableData[index].favorites = !this.tableData[index].favorites;
            },
            logout() {
                window.sessionStorage.clear();
                this.$router.push('/');
            }
        },
        mounted() {
            this.userInfo = this.$store.getters.user;
        },
        created() {
            
        }
    }
</script>

<style scoped>
    @import '../../assets/css/el-layout.css';

    .userInfoForm {
        width: 200px;
        border: 1px solid #DCDFE6;
        padding: 40px;
        border-radius: 10px;
        box-shadow: 0 0 30px #DCDFE6;
    }
</style>