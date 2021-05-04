<template>
    <div>
        <el-container>
            <el-header>
                <el-menu
                    :default-active="activeIndex"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-menu-item index="0">
                        <el-avatar :size="55" :src="logoUrl"></el-avatar>
                    </el-menu-item>
                    <el-menu-item index="1"  @click="jumpTo('/home')"><i class="el-icon-s-home"></i>主页</el-menu-item>
                    <el-menu-item index="2" @click="jumpTo('/user')"><i class="el-icon-s-custom"></i>个人中心</el-menu-item>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-trophy"></i>对弈</template>
                        <el-menu-item index="3-1" @click="jumpTo('/match/vsrobot')">人机</el-menu-item>
                        <el-menu-item index="3-2" @click="jumpTo('/match/vsplayer')">匹配</el-menu-item>
                        <el-menu-item index="3-3" @click="jumpTo('/match/vsself')">自我对弈</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="3" disabled>消息中心</el-menu-item>
                </el-menu>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <div class="asideImgDiv"><el-image :src="asideImg" class="asideImgDiv"></el-image></div>
                    <el-popover
                        placement="top-start"
                        title="五子棋规则"
                        width="200"
                        trigger="hover"
                        content="双方轮流落子，黑先手，横、竖或者斜线方向先连成五子则胜利">
                        <el-button slot="reference" type="info">玩法简介</el-button>
                    </el-popover>
                    <el-popover
                        placement="right"
                        width="500"
                        trigger="click">
                        <el-card class="box-card">
                            <div v-for="(item, i) in rules" :key="item">
                                {{ '(' +  (i + 1) + ') ' + item }}
                            </div>
                        </el-card>
                        <el-button slot="reference" type="info">具体规则</el-button>
                    </el-popover>
                </el-aside>
                <el-container>
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                    <el-footer>
                        <el-image class="logo" :src="footerLogo"></el-image>
                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'Main',
    data() {
      return {
        activeIndex: '1',
        logoUrl: require('../assets/img/logo.png'),
        footerLogo: require('../assets/img/header-logo.jpg'),
        asideImg: require('../assets/img/help-sidebar.jpg'),
        drawer: false,
        rules: [
            "对局双方各执一色棋子",
            "空棋盘（15 * 15）开局",
            "黑先、白后，交替下子，每次只能下一子",
            "棋子下在棋盘的空白交叉点上",
            "黑方的第一枚棋子必须下在天元点（中心交叉点）上",
            "轮流下子是双方的权利，但允许任何一方放弃下子权"
        ]
      };
    },
    methods: {
        handleSelect(key, keyPath) {
            
        },
        jumpTo(url) {
            this.$router.push(url);
        }
    }
}
</script>

<style scoped>
    .el-header, .el-footer {
        background-color: #545c64;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }
    
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }
    
    body > .el-container {
        margin-bottom: 40px;
    }
    
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }
    
    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    .el-menu-item {
        width: 120px;
    }

    .el-submenu {
        width: 100px;
    }

    .box-card {
        width: 480px;
    }

    .logo {
        height: 60px;
    }

    .asideImgDiv {
        margin-top: 10px;
        height: 60px;
    }
</style>