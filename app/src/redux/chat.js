import io from 'socket.io-client'
import axios from 'axios'

const socket = io('ws://localhost:9093')

// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_READ = 'MSG_READ'

const initState = {
    chatmsg: [],
    users: {},
    unread: 0
}

export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {
                ...state,
                chatmsg: action.payload.msgs,
                users: action.payload.users,
                unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length
            };
        case MSG_RECV:
            const n = action.payload.to === action.userid ? 1 : 0;
            return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + n};
        case MSG_READ:
            const {from, num} = action.payload;
            return {
                ...state,
                chatmsg: state.chatmsg.map(v => ({...v, read: from === v.from ? true : v.read})),
                unread: state.unread - num
            }
        default:
            return state;
    }
}

function msgList(msgs, users, userid) {
    return {type: MSG_LIST, payload: {msgs, users, userid}}
}

// 获取信息列表
// export function getMsgList() {
//     return dispatch => {
//         axios.get('/user/getmsglist')
//             .then(res => {
//                 if (res.status === 200 && res.data.code === 0) {
//                     dispatch(msgList(res.data.msgs))
//                 }
//             })
//     }
// }

export function getMsgList() {
    return (dispatch, getState) => {
        axios.get('/user/getmsglist')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    const userid = getState().user._id; // 过滤未读信息
                    dispatch(msgList(res.data.msgs, res.data.users, userid))
                }
            })
    }
}

// 发送信息
export function sendMsg({from, to, msg}) {
    // console.log(from, to, msg)
    return dispatch => {
        socket.emit('sendmsg', {from, to, msg})
    }
}

// 接受信息
function msgRecv(msg, userid) {
    return {userid, type: MSG_RECV, payload: msg}
}

export function recvMsg() {
    return (dispatch, getState) => {
        socket.on('recvmsg', function (data) {
            // console.log(data)
            const userid = getState().user._id
            dispatch(msgRecv(data, userid))
        })
    }
}

// 已读消息
function msgRead({from, userid, num}) {
    return {type: MSG_READ, payload: {from, userid, num}}
}

// export function readMsg(from) {
//     return (dispatch, getState) => {
//         axios.post('/user/readmsg', {from})
//             .then(res => {
//                 const userid = getState().user._id
//                 if (res.status === 200 && res.data.code === 0) {
//                     dispatch(msgRead({userid, from, num: res.data.num}))
//                 }
//             })
//     }
// }

export function readMsg(from) {
    return async (dispatch, getState) => {
        const res = await axios.post('/user/readmsg', {from})
        const userid = getState().user._id
        if (res.status === 200 && res.data.code === 0) {
            dispatch(msgRead({userid, from, num: res.data.num}))
        }
        // axios.post('/user/readmsg', {from})
        //     .then(res => {
        //         const userid = getState().user._id
        //         if (res.status === 200 && res.data.code === 0) {
        //             dispatch(msgRead({userid, from, num: res.data.num}))
        //         }
        //     })
    }
}
