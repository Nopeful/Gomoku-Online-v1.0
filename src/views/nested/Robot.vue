<template>
    <div>
        <el-row v-if="!hasGoneTo" :gutter="20">
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-image :src="pic"></el-image>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-button type="primary" @click="startVSRobot">开始游戏</el-button>
                </div>
            </el-col>
        </el-row>
        <gomoku-board 
            v-if="hasGoneTo"
            :mode="mode"
            :wins="wins"
            :count="count"
            :myWin="myWin"
            :myWinLog="myWinLog"
            :computerWin="computerWin"
            :compWinLog="compWinLog"
            @computerAI="computerAI"
            @initRobot="initRobot"></gomoku-board>
    </div>
</template>

<script>
    import GomokuBoard from '../../components/GomokuBoard';

    export default {
        components: { GomokuBoard },
        name: 'Robot',
        props: [''],
        data() {
            return {
                mode: 'vsRobot',
                hasGoneTo: false,
                pic: require('../../assets/img/robot.png'),
                wins: [],   //赢法数组
                count: 0,   //赢法总数
                myWin: [],
                myWinLog: [],
                computerWin: [],
                compWinLog: []
            }
        },
        methods: {
            startVSRobot() {
                this.hasGoneTo = true;
            },
            initRobot() {
                this.wins = [];
                this.count = 0;
                this.myWin = [];
                this.myWinLog = [];
                this.computerWin = [];
                this.compWinLog = [];

                for (var i = 0; i < 15; i++) {
                    this.wins[i] = [];
                    for (var j = 0; j < 15; j++) {
                        this.wins[i][j] = [];
                    }
                }
                //横线赢法
                for (var i = 0; i < 15; i++) {
                    for (var j = 0; j < 11; j++) {
                        for (var k = 0; k < 5; k++) {
                            this.wins[i][j + k][this.count] = true;
                        }
                        this.count++;
                    }
                }
                //竖线赢法
                for (var i = 0; i < 15; i++) {
                    for (var j = 0; j < 11; j++) {
                        for (var k = 0; k < 5; k++) {
                            this.wins[j + k][i][this.count] = true;
                        }
                        this.count++;
                    }
                }
                //正斜线赢法
                for (var i = 0; i < 11; i++) {
                    for (var j = 0; j < 11; j++) {
                        for (var k = 0; k < 5; k++) {
                            this.wins[i + k][j + k][this.count] = true;
                        }
                        this.count++;
                    }
                }
                //反斜线赢法
                for (var i = 0; i < 11; i++) {
                    for (var j = 14; j > 3; j--) {
                        for (var k = 0; k < 5; k++) {
                            this.wins[i + k][j - k][this.count] = true;
                        }
                        this.count++;
                    }
                }
                // debugger;
                for (var i = 0; i < this.count; i++) {
                    this.myWin[i] = 0;
                    this.myWinLog[i] = 0;
                    this.computerWin[i] = 0;
                    this.compWinLog[i] = 0;
                }
            },
            computerAI(curBoard, callback) {
                var myScore = [];
                var computerScore = [];
                var max = 0;
                var u = 0,
                    v = 0;
                for (var i = 0; i < 15; i++) {
                    myScore[i] = [];
                    computerScore[i] = [];
                    for (var j = 0; j < 15; j++) {
                        myScore[i][j] = 0;
                        computerScore[i][j] = 0;
                    }
                }
                for (var i = 0; i < 15; i++) {
                    for (var j = 0; j < 15; j++) {
                        if (curBoard[i][j] == 0) {
                            for (var k = 0; k < this.count; k++) {
                                if (this.wins[i][j][k]) {
                                    if (this.myWin[k] == 1) {
                                        myScore[i][j] += 200;
                                    } else if (this.myWin[k] == 2) {
                                        myScore[i][j] += 400;
                                    } else if (this.myWin[k] == 3) {
                                        myScore[i][j] += 2000;
                                    } else if (this.myWin[k] == 4) {
                                        myScore[i][j] += 10000;
                                    }
                                    if (this.computerWin[k] == 1) {
                                        computerScore[i][j] += 220;
                                    } else if (this.computerWin[k] == 2) {
                                        computerScore[i][j] += 420;
                                    } else if (this.computerWin[k] == 3) {
                                        computerScore[i][j] += 2100;
                                    } else if (this.computerWin[k] == 4) {
                                        computerScore[i][j] += 20000;
                                    }
                                }
                            }
                            if (myScore[i][j] > max) {
                                max = myScore[i][j];
                                u = i;
                                v = j;
                            } else if (myScore[i][j] == max) {
                                if (computerScore[i][j] > computerScore[u][v]) {
                                    u = i;
                                    v = j;
                                }
                            }
                            if (computerScore[i][j] > max) {
                                max = computerScore[i][j];
                                u = i;
                                v = j;
                            } else if (computerScore[i][j] == max) {
                                if (myScore[i][j] > myScore[u][v]) {
                                    u = i;
                                    v = j;
                                }
                            }
                        }
                    }
                }
                callback([u, v]);
            }
        },
        mounted() {
            this.initRobot();
        }
    }
</script>

<style scoped>
    @import '../../assets/css/el-layout.css';
    .el-image {
        width: 300px;
        height: 180px;
    }
</style>