import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Register from '../views/Register'
import Main from '../views/Main'
import NotFound from '../views/NotFound'
import Home from '../views/nested/Home'
import User from '../views/nested/User'
import Robot from '../views/nested/Robot'
import Match from '../views/nested/Match'
import GomokuBoard from '../components/GomokuBoard'

Vue.use(Router)

export default new Router({
    // 路由模式 默认 'hash'
    mode: 'history',

    routes: [{ // 登录
        path: '/',
        name: 'Login',
        component: Login
    }, { // 注册
        path: '/register',
        name: 'Register',
        component: Register
    }, { // 主页
        path: '/main',
        name: 'Main',
        component: Main,
        redirect: '/home',
        children: [{
            path: '/home',
            name: 'Home',
            component: Home
        }, {
            path: '/user',
            name: 'User',
            component: User
        }, {
            path: '/match/vsplayer',
            name: 'Match',
            component: Match
        }, {
            path: '/match/vsrobot',
            name: 'Robot',
            component: Robot,
        }, {
            path: '/match/vsself',
            name: 'GomokuBoard',
            component: GomokuBoard,
        }]
    }, { // 重定向
        path: '/main',
        name: 'Main',
        redirect: '/main'
    }, { // 404
        path: '*',
        name: 'NotFound',
        component: NotFound
    }]
})



//         path: '/main',
//         name: 'Main',
//         component: Main,
//         // 嵌套路由
//         // <router-link to=""></router-link>
//         // <router-link :to="{ name: '', params: {id: 3} }"></router-link>
//         // <el-main>
//         //     <router-view></router-view>
//         // </el-main>
//         children: [{
//             path: '/nestedRouter/demoRouter',
//             // 路径传参 '/nestedRouter/demoRouter/:id',
//             // {{ this.$router.params.id }}
//             // 加了 props {{ id }}
//             name: 'demoRouter',
//             component: demoRouter,
//             props: true
//         }]