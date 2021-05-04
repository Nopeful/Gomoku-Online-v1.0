export default {
    setUser(state, user) {
        state.user.account = user.account,
            state.user.token = user.token
    },
    addTab(state, room) {
        let newTab = {
            roomId: room.id,
            title: '【Room】' + room.host.name + ' vs ' + room.challenger.name,
            type: 'room',
        }
        for (let i in state.tabs) {
            if (state.tabs[i].roomId === room.id) {
                state.tabs[i].title = newTab.title
                return
            }
        }
        state.tabs.push(newTab)
    },
    removeTab(state, roomId) {
        let tabIndex = -1
        state.tabs.forEach((tab, i) => {
            if (tab.roomId === roomId) {
                tabIndex = i
            }
        })
        if (tabIndex !== -1) {
            state.tabs.splice(tabIndex, 1)
            state.activeTabKey = 'hall'
        }
    },
    changeTab(state, roomId) {
        state.activeTabKey = roomId
    },
    setPlayer(state, player) {
        state.player = player
    },
    playerRename(state, name) {
        state.player.name = name
    },
    setPlayerTable(state, playerTable) {
        state.playerTable = playerTable
    },
    setStep(state, step) {
        state.step = step
    },
    setChessboard(state, chessboard) {
        state.chessboard = chessboard
    },
    setMatchDetails(state, matchDetails) {
        state.matchDetails = matchDetails
    },
    setRoomChatDTO(state, roomChatDTO) {
        state.roomChatDTO = roomChatDTO
    },
    setGameOverDTO(state, gameOverDTO) {
        state.gameOverDTO = gameOverDTO
    },
    setDrawDTO(state, drawDTO) {
        state.drawDTO = drawDTO
    },
    setRetractDTO(state, retractDTO) {
        state.retractDTO = retractDTO
    },
    setHallDialogMsg(state, dialogMsg) {
        state.hallDialogMsg = dialogMsg
    },
    setRooms(state, rooms) {
        state.rooms = rooms
    },
    addRoom(state, room) {
        state.rooms.push(room)
    },
    delRoomById(state, roomId) {
        let i
        for (i in state.rooms) {
            if (state.rooms[i].id === roomId) {
                break
            }
        }
        state.rooms.splice(i, 1)
    }
}