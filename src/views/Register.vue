<template>
   <div>
       <el-image :src="loginLogo" class="loginLogo"></el-image>
        <el-row :gutter="20">
            <el-col :span="14">
                <el-image :src="picUrl" class="loginPic"></el-image>
            </el-col>
            <el-col :span="6">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-box">
                    <h3 class="login-title">注册</h3>
                    <el-form-item prop="account">
                        <el-input type="text" v-model="ruleForm.account" autocomplete="off" placeholder="输入账号"></el-input>
                    </el-form-item>
                    <el-form-item prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="输入密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="再次确认密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
   </div>
</template>

<script>
    import {request} from '../network/request';

    export default {
        name: 'Register',
        data() {
            var validAccount = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('账号不能为空'));
                } else {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                picUrl: require('../assets/img/carousel-1.jpg'),
                loginLogo: require('../assets/img/loginLogo.png'),
                ruleForm: {
                    account: '',
                    pass: '',
                    checkPass: ''
                },
                rules: {
                    account: [
                        { validator: validAccount, trigger: 'blur' },
                        { min: 3, max: 20, message: '长度为 3 到 20 个字符', trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' },
                        { min: 6, max: 16, message: '长度为 6 到 16 个字符', trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        request({
                            url: '/auth/operators/create',
                            method: 'post',
                            params: {
                                uname: this.ruleForm.account,
                                upassword: this.ruleForm.pass
                            }
                        }).then(res => {
                            // console.log(res);   //
                        }).catch(err => {
                            console.log(err);   //
                        })
                        alert('success!');
                        this.$router.push('/');
                    } else {
                        alert('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
  }
</script>

<style lang="scss" scoped>
    @import '../assets/css/login-page.css';
</style>