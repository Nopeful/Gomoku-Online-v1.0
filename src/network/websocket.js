import code from '../common/msgCode';
import receive from './receiveAPI';
import store from '../store';

// const url = 'ws://' + location.host;
const url = 'ws://127.0.0.1:8000/game/v1/ws';
let ws = {};

export function initWebSocket() {
    ws = new WebSocket(url);
    ws.onopen = onOpen;
    ws.onmessage = onMessage;
    ws.onerror = onError;
    ws.onclose = onClose;
}

export function send(code, data) {
    ws.send(JSON.stringify({
        code,
        data
    }))
}

function onOpen() {
    ws.send(JSON.stringify({
        "code": code.Login,
        "token": store.getters.user.token
    }));
}

function onMessage(e) {
    let msg = JSON.parse(e.data);
    let data = msg.data;
    switch (msg.code) {
        case code.Fail:
            receive.fail(data)
            break
        case code.HallChat:
            receive.hallChat(data)
            break
        case code.GetHallDialog:
            receive.getHallDialog(data)
            break
        case code.GetRooms:
            receive.getRooms(data)
            break
        case code.CreateRoom:
            receive.createRoom(data)
            break
        case code.EnterRoom:
            receive.enterRoom(data)
            break
        case code.LeaveRoom:
            receive.leaveRoom(data)
            break
        case code.DelRoom:
            receive.delRoom(data)
            break
        case code.RoomChat:
            receive.roomChat(data)
            break
        case code.GetPlayer:
            receive.getPlayer(data)
            break
        case code.GetPlayers:
            receive.getPlayers(data)
            break
        case code.SetReady:
            receive.setReady(data)
            break
        case code.MakeStep:
            receive.makeStep(data)
            break
        case code.GameOver:
            receive.gameOver(data)
            break
        case code.AskDraw:
            receive.askDraw(data)
            break
        case code.RetractStep:
            receive.retractStep(data)
            break
        default:
            break
    }
}

function onError() {
    console.log('WebSocket ' + url + ' error');
}

function onClose() {
    ws.send(JSON.stringify({
        "code": code.Logout,
        "token": store.getters.user.token
    }));
}