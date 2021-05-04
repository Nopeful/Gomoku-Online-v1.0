// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router';
import router from './router';
import axios from 'axios';
import Vuex from 'vuex';
import store from './store';
import VueI18n from 'vue-i18n';
import locale from 'element-ui/lib/locale/lang/en';

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use({ locale });

// 全局调用
Vue.prototype.axios = axios;

Vue.config.productionTip = false;

const i18n = new VueI18n({
    locale: 'zh',
    messages: {
        'en': require('./common/lang/en'),
        'zh': require('./common/lang/zh')
    }
});

// 路由钩子函数
router.beforeEach((to, from, next) => {
    let isLogin = window.sessionStorage.getItem('isLogin');
    if (isLogin) {
        if (to.name == 'Login') {
            next('/home');
        } else {
            next();
        }
    } else if (isLogin === null) {
        if (to.name == 'Register' || to.name == 'Login') {
            next();
        } else {
            next('/');
        }
    }
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    // components: { App },
    // template: '<App/>'
    router,
    store,
    i18n,
    render: h => h(App)
})