import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: {
            account: '',
            gender: 'male',
            token: ''
        },
        player: {
            id: "x",
            name: "x",
            status: "x"
        },
        playerTable: {
            roomId: '',
            players: []
        },
        step: {},
        chessboard: {
            roomId: '',
            steps: []
        },
        matchDetails: {
            roomId: '',
            host: {
                name: 'Tom',
                color: 'black',
                turn: true,
                roomStatus: 'ready'
            },
            challenger: {
                name: 'Ann',
                color: 'white',
                turn: false,
                roomStatus: 'unready'
            }
        },
        roomChatDTO: {},
        gameOverDTO: {},
        drawDTO: {},
        retractDTO: {},
        hallDialogMsg: {
            "time": "2020-03-31 16:43:00",
            "from": "sys",
            "content": "Welcome to Gobang Online!"
        },
        activeTabKey: 'hall',
        tabs: [{
            roomId: 'hall',
            title: '【Hall】',
            type: 'hall'
        }],
        rooms: []
    },
    getters: getters,
    mutations: mutations,
    actions: actions
})

export default store