<template>
    <div>
        <el-image :src="loginLogo" class="loginLogo"></el-image>
        <el-row :gutter="20">
            <el-col :span="14">
                <el-image :src="picUrl" class="loginPic"></el-image>
            </el-col>
            <el-col :span="6">
                <el-form class="login-box" ref="form" :model="form" :rules="rules">
                    <h3 class="login-title">欢迎登录</h3>
                    <el-form-item prop="account">
                        <el-input v-model="form.account" placeholder="账号"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password"
                            v-model="form.password" 
                            placeholder="密码"
                            v-on:keyup.enter="submitForm('form')"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('form')">登录</el-button>
                        <el-button type="primary" @click="goRegister()">注册</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { request } from '../network/request';

export default {
    name: "Login",
    data() {
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
        return {
            picUrl: require('../assets/img/carousel-1.jpg'),
            loginLogo: require('../assets/img/loginLogo.png'),
            form: {
                account: '',
                password: ''
            },
            rules: {
                account: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码（6-16位）', trigger: 'blur' },
                    { min: 6, max: 16, message: '长度为 6 到 16 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    request({
                        url: '/auth',
                        method: 'get',
                        params: {
                            uname: this.form.account,
                            upassword: this.form.password
                        }
                    }).then(res => {
                        // window.sessionStorage.setItem('token', res.data.token);
                        window.sessionStorage.setItem('isLogin', 'true');
                        this.$store.dispatch('setUser', {
                            account: this.form.account,
                            token: res.data.token
                        });
                        this.$router.push('/main');
                    }).catch(err => {
                        console.log(err);   //
                    })
                    
                    // this.$router.push({
                    //     name: '/main',
                    //     params: {name: this.form.name}
                    // });
                    // 首页中， {{ this.$router.params.name }}
                } else {
                    alert('error submit!!');
                    return false;
                }
            })
        },
        goRegister() {
            this.$router.push('/register');
        }
    },
    mounted() {
        
    }
}
</script>

<style lang="scss" scoped>
    @import '../assets/css/el-layout.css';
    @import '../assets/css/login-page.css';
</style>