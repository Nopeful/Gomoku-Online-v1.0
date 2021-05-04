export default {
    user: state => state.user,
    tabs: state => state.tabs,
    activeTabKey: state => state.activeTabKey,
    player: state => state.player,
    playerTable: state => state.playerTable,
    step: state => state.step,
    chessboard: state => state.chessboard,
    matchDetails: state => state.matchDetails,
    roomChatDTO: state => state.roomChatDTO,
    gameOverDTO: state => state.gameOverDTO,
    drawDTO: state => state.drawDTO,
    retractDTO: state => state.retractDTO,
    hallDialogMsg: state => state.hallDialogMsg,
    rooms: state => state.rooms
}