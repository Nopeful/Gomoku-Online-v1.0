<template>
    <div>
        <el-row v-if="!hasGoneTo" :gutter="20">
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-image :src="pic"></el-image>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-button type="primary" @click="startBattle">开始匹配</el-button>
                </div>
            </el-col>
        </el-row>
        <!-- <gomoku-board v-if="hasGoneTo" :mode="mode"></gomoku-board> -->
        <el-tabs v-model="activeTabKey" v-if="hasGoneTo">
            <el-tab-pane v-for="item in tabs" :key="item.roomId" :label="setTitle(item.title)" :name="item.roomId">
                <Hall v-if="item.type === 'hall'" :roomId="item.roomId"/>
                <Room v-else-if="item.type === 'room'" :roomId="item.roomId"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    // import GomokuBoard from '../../components/GomokuBoard';
    import Hall from './Hall';
    import Room from './Robot';
    import { initWebSocket } from '../../network/websocket';
    import { playerRename } from '../../network/sendAPI';

    export default {
        name: 'Match',
        props: [''],
        components: {
            // GomokuBoard
            Hall, Room
        },
        data() {
            return {
                mode: 'vsPlayer',
                hasGoneTo: false,
                pic: require('../../assets/img/carousel-2.png'),
                timer: null
            }
        },
        methods: {
            startBattle() {
                this.hasGoneTo = true;
            },
            setTitle(title) {
                return title;
            }
        },
        computed: {
            tabs() {
                return this.$store.getters.tabs
            },
            activeTabKey: {
                get() {
                    return this.$store.getters.activeTabKey
                },
                set(roomId) {
                    this.$store.dispatch('changeTab', roomId)
                }
            }
        }, 
        mounted() {
            initWebSocket();
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                playerRename(this.$store.getters.user.account);
            }, 1000)
        }
    }
</script>

<style scoped>
    @import '../../assets/css/el-layout.css';
</style>