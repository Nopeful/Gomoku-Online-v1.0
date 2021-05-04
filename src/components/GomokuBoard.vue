<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <canvas id="board" @click="onClick" width="495px" height="495px"></canvas>
                </div>
            </el-col>
            <el-col :span="12">
                <el-row :gutter="20">
                    <el-col :span="10">
                        <div class="grid-content bg-purple">
                            <el-avatar :size="50" :src="circleUrl">You</el-avatar>
                            <el-radio-group v-model="radioUser" :disabled="isStarted">
                                <el-radio-button label="black">执黑</el-radio-button>
                                <el-radio-button label="white">执白</el-radio-button>
                            </el-radio-group>
                        </div>
                    </el-col>
                    <el-col :span="10" :offset="0">
                        <div class="grid-content bg-purple">
                            <el-avatar :size="50" :src="circleUrl">Robot</el-avatar>
                            <el-radio-group v-model="radioRobot" :disabled="isStarted">
                                <el-radio-button label="black">执黑</el-radio-button>
                                <el-radio-button label="white">执白</el-radio-button>
                            </el-radio-group>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <i class="el-icon-user-solid"> {{ myTurn? radioUser: radioRobot }}方执棋</i>
                        </div>
                    </el-col>
                    <el-col :span="10" :push="2">
                        <div class="grid-content bg-purple">
                            <el-progress type="circle" :percentage="50" status="warning"></el-progress>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">
                        <div class="grid-content bg-purple">
                            <el-button type="warning" @click="onRetract">悔棋</el-button>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple">
                            <el-button type="danger" @click="onSurrender">认输</el-button>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-button type="info" @click="onDraw">求和</el-button>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-button type="success" @click="onRestart">重新开始</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {request} from '../network/request';

    const size = 495;
    // 棋盘格子边长
    const d = 33;
    //棋盘格子距离棋盘边缘的距离
    const m = d / 2;
    //棋子半径
    const r = 15;

    export default {
        name: 'GomokuBoard',
        props: ['mode', 'wins', 'count', 'myWin', 'myWinLog', 'computerWin', 'compWinLog'],
        data() {
            return {
                context: {},
                myTurn: true,
                curBoard: [],   // 0: void; 1: black; 2: white
                steps: [],
                win: false,
                gameOver: false,
                circleUrl: '',
                isStarted: false,
                radioUser: 'black',
                radioRobot: 'white',
                radioPlayer: 'white',
                playerAction: null
            }
        },
        methods: {
            initBoard() {
                let canvas = document.getElementById('board');
                canvas.width = size;
                canvas.height = size;
                this.context = canvas.getContext('2d');
                this.drawBoard();
                this.initData();
            },
            initData() {
                for (let i = 0; i < 15; i++) {
                    this.curBoard[i] = [];
                    for (let j = 0; j < 15; j++) {
                        this.curBoard[i][j] = 0;
                    }
                }
            },
            drawBoard() {
                let ctx = this.context;
                for (let i = 0; i < 15; i++) {
                    ctx.moveTo(m + i * d , m);
                    ctx.lineTo(m + i * d , size - m);
                    ctx.stroke();
                    ctx.moveTo(m , m + i * d);
                    ctx.lineTo(size - m, m + i * d);
                    ctx.stroke();
                }
            },
            drawPiece(x, y, color) {
                let ctx = this.context;
                ctx.beginPath();
                ctx.arc(m + x * d, m + y * d, r, 0, 2 * Math.PI);
                ctx.closePath();
                if (color == 'black') {
                    ctx.fillStyle = '#000000';
                    ctx.fill();
                } else {
                    ctx.stroke();
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fill();
                }
                return true;
            },
            removePiece(x, y) {
                this.context.clearRect((x) * d, (y) * d, d, d);
            },
            onClick(e) {
                if (this.gameOver) {
                    return;
                }
                if (this.myTurn) {
                    this.makeAMove(e);
                } else if(!this.myTurn && !this.mode) {
                    let [i, j] = this.calcPos(e);
                    if (this.curBoard[i][j] === 0) {
                        let curColor = (this.radioUser == 'black')? 2: 1
                        this.curBoard[i][j] = curColor;
                        this.drawPiece(i, j, curColor);
                        this.steps.push([i, j]);
                        this.isWon(i, j, this.curBoard[i][j]);
                        this.myTurn = true;
                    }
                }
            },
            playerEvent() {
                if (this.playerAction.draw === true) {
                    alert('request draw');
                } else if (this.playerAction.surrender === true) {
                    this.gameOver = true;
                    this.win = true;
                } else if (this.playerAction.retract === true) {
                    alert('request retract');
                } else {
                    let [i, j] = this.playerAction.step;
                    this.curBoard[i][j] = (this.radioPlayer == 'black')? 1: 2;
                    this.drawPiece(i, j, this.radioPlayer);
                    this.steps.push([i, j]);
                    this.isWon(i, j, this.curBoard[i][j]);
                    this.myTurn = true;
                }
            },
            robotEvent() {
                let coordi = [];
                this.$emit('computerAI', this.curBoard, res => { coordi = res });
                let [i, j] = coordi;
                this.curBoard[i][j] = (this.radioRobot == 'black')? 1: 2;
                this.drawPiece(i, j, this.radioRobot);
                this.steps.push([i, j]);
                this.isWon(i, j, this.curBoard[i][j]);
                this.myTurn = true;
                this.isStarted = true;
            },
            calcPos(e) {
                let x = e.offsetX;
                let y = e.offsetY;
                let i = Math.floor(x / d);
                let j = Math.floor(y / d);
                return [i, j];
            },
            makeAMove(e) {
                let [i, j] = this.calcPos(e);
                if (this.curBoard[i][j] === 0) {
                    this.curBoard[i][j] = (this.radioUser == 'black')? 1: 2;
                    this.drawPiece(i, j, this.radioUser);
                    this.steps.push([i, j]);
                    this.myTurn = false;
                    for (let k = 0; k < this.count; k++) {
                        // 将可能赢的情况都加1
                        if (this.wins[i][j][k]) {
                            // debugger;
                            this.myWin[k]++;
                            this.compWinLog[k] = this.computerWin[k];
                            this.computerWin[k] = 6; //这个位置对方不可能赢了
                        }
                    }
                    if (this.isWon(i, j, this.curBoard[i][j])) {
                        this.win = true;
                    }
                }
                this.isStarted = true;
            },
            /**
             * 判断胜负
             */
            isWon(x, y, color) {
                let cnt = [1, 1, 1, 1];
                let keepOn = [true, true, true, true, true, true, true, true];
                let flag = false;
                for (let i = 0; i < 4; i++) {
                    if (keepOn[0] && x + (i + 1) <= 14 && this.curBoard[x + (i + 1)][y] == color) {
                        cnt[0]++;
                    } else {
                        keepOn[0] = false;
                    }
                    if (keepOn[1] && x - (i + 1) >= 0 && this.curBoard[x - (i + 1)][y] == color) {
                        cnt[0]++;
                    } else {
                        keepOn[1] = false;
                    }
                    if (keepOn[2] && y + (i + 1) <= 14 && this.curBoard[x][y + (i + 1)] == color) {
                        cnt[1]++;
                    }  else {
                        keepOn[2] = false;
                    }
                    if (keepOn[3] && y - (i + 1) >= 0 && this.curBoard[x][y - (i + 1)] == color) {
                        cnt[1]++;
                    }  else {
                        keepOn[3] = false;
                    }
                    if (keepOn[4] && x + (i + 1) <= 14 && y + (i + 1) <= 14 && this.curBoard[x + (i + 1)][y + (i + 1)] == color) {
                        cnt[2]++;
                    }  else {
                        keepOn[4] = false;
                    }
                    if (keepOn[5] && x - (i + 1) >= 0 && y - (i + 1) >= 0 && this.curBoard[x - (i + 1)][y - (i + 1)] == color) {
                        cnt[2]++;
                    }  else {
                        keepOn[5] = false;
                    }
                    if (keepOn[6] && x + (i + 1) <= 14 && y - (i + 1) >= 0 && this.curBoard[x + (i + 1)][y - (i + 1)] == color) {
                        cnt[3]++;
                    }  else {
                        keepOn[6] = false;
                    }
                    if (keepOn[7] && x - (i + 1) >= 0 && y + (i + 1) <= 14 && this.curBoard[x - (i + 1)][y + (i + 1)] == color) {
                        cnt[3]++;
                    }  else {
                        keepOn[7] = false;
                    }
                }
                for (let i = 0; i < 4; i++) {
                    if (cnt[i] >= 5) {
                        flag = true;
                        this.gameOver = true;
                        if (this.curBoard[x][y] == 1) {
                            setTimeout("alert('黑方胜！'), 0.5");
                        } else {
                            setTimeout("alert('白方胜！')", 10);
                        }
                        break;
                    }
                }
                return flag;
            },
            onRetract() {
                if (this.gameOver || this.steps.length === 0) {
                    return;
                }
                let lastStep = this.steps[this.steps.length - 1];
                let x = lastStep[0], y = lastStep[1];
                this.removePiece(x, y);
                this.curBoard[x][y] = 0;
                this.steps.length--;
                this.myTurn = !this.myTurn;
            },
            onSurrender() {
                if (this.steps.length === 0 || this.gameOver) {
                    return;
                }
                this.gameOver = true;
                setTimeout("alert('You sucked!');", 0);
            },
            onRestart() {
                this.gameOver = false;
                this.win = false;
                this.initBoard();
                this.steps.length = 0;
                this.isStarted = false;
                if (this.mode == 'vsRobot') {
                    this.$emit('initRobot');
                }
                this.myTurn = true;
            },
            onDraw() {
                
            }
        },
        watch: {
            radioUser(radioUser) {
                if (radioUser == 'black') {
                    this.radioRobot = 'white';
                } else {
                    this.radioRobot = 'black';
                }
            },
            radioRobot(radioRobot) {
                if (radioRobot == 'black') {
                    this.radioUser = 'white';
                } else {
                    this.radioUser = 'black';
                }
            },
            myTurn(myTurn) {
                if (!this.gameOver) {
                    if (this.mode == 'vsRobot') {
                        if (myTurn == false) {
                            this.robotEvent();
                        }
                    } else if (this.mode == 'vsPlayer') {
                        request({
                            url: '../../../static/data/vsPlayer.json'
                        }).then(res => {
                            this.playerAction = res.data;
                            this.playerEvent();
                        }).catch(err => {
                            console.log(err);
                        })
                    }
                }
            }
        },
        mounted() {
            this.initBoard();
        }
    }
</script>

<style scoped>
    @import '../assets/css/el-layout.css';
    
    canvas {
        display: block;
        margin: 0px auto;
        box-shadow: -2px -2px 2px #EFEFEF, 5px 5px 5px #B9B9B9;
        cursor: pointer;
        pointer-events: auto;
        background-image: url("../assets/img/chessboard.jpg");
        background-size: 100% 100%;
    }

    .el-image {
        height: 600px;
        width: 600px;
    }
</style>