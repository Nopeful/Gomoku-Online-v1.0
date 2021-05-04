export default {
    setUser({ commit }, user) {
        commit('setUser', user)
    },
    addTab({ commit }, room) {
        commit('addTab', room)
    },
    removeTab({ commit }, roomId) {
        commit('removeTab', roomId)
    },
    changeTab({ commit }, roomId) {
        commit('changeTab', roomId)
    },
    setPlayer({ commit }, player) {
        commit('setPlayer', player)
    },
    playerRename({ commit }, name) {
        commit('playerRename', name)
    },
    setPlayerTable({ commit }, playerTable) {
        commit('setPlayerTable', playerTable)
    },
    setStep({ commit }, step) {
        commit('setStep', step)
    },
    setChessboard({ commit }, chessboard) {
        commit('setChessboard', chessboard)
    },
    setMatchDetails({ commit }, matchDetails) {
        commit('setMatchDetails', matchDetails)
    },
    setRoomChatDTO({ commit }, roomChatDTO) {
        commit('setRoomChatDTO', roomChatDTO)
    },
    setGameOverDTO({ commit }, gameOverDTO) {
        commit('setGameOverDTO', gameOverDTO)
    },
    setDrawDTO({ commit }, drawDTO) {
        commit('setDrawDTO', drawDTO)
    },
    setRetractDTO({ commit }, retractDTO) {
        commit('setRetractDTO', retractDTO)
    },
    setHallDialogMsg({ commit }, dialogMsg) {
        commit('setHallDialogMsg', dialogMsg)
    },
    setRooms({ commit }, rooms) {
        commit('setRooms', rooms)
    },
    addRoom({ commit }, room) {
        commit('addRoom', room)
    },
    delRoomById({ commit }, roomId) {
        commit('delRoomById', roomId)
    }
}