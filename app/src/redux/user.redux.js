/**
 * Created by 23535 on 2018/8/12.
 */
import axios from 'axios'
import {getRedirectPath} from '../util'

// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const initState = {
    redirectTo: '',
    msg: '',
    user: '',
    type: ''
}

// reducer
export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload}
        // case REGISTER_SUCCESS:
        //     return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload};
        // case LOGIN_SUCCESS:
        //     return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload};
        case LOAD_DATA:
            return {...state, ...action.payload};
        case ERROR_MSG:
            return {...state, msg: action.msg, isAuth: false};
        default:
            return state

    }
}

// // 注册成功
// function registerSuccess(data) {
//     return {type: AUTH_SUCCESS, payload: data}
// }
//
// // 登陆成功
// function loginSuccess(data) {
//     return {type: AUTH_SUCCESS, payload: data}
// }

// 存储信息
export function loadData(userinfo) {
    return {type: LOAD_DATA, payload: userinfo}
}

// 更新成功
function authSuccess(obj) {
    const {pwd, ...data} = obj // 过滤pwd
    return {type: AUTH_SUCCESS, payload: data}
}

// 错误信息
function errorMsg(msg) {
    return {msg, type: ERROR_MSG}
}

// 登陆
export function login({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('帐户名密码必须填入')
    }
    return dispatch => {
        axios.post('/user/login', {user, pwd})
            .then((res) => {
                if (res.status === 200 && res.data.code === 0) {
                    console.log(res.data.data)
                    dispatch(authSuccess(res.data.data))
                }
                else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

// 注册
export function regisger({user, pwd, repeatpwd, type}) {
    console.log({user, pwd, repeatpwd, type})
    if (!user || !pwd || !type) {
        return errorMsg('用户名密码必须填入')
    }
    if (pwd !== repeatpwd) {
        return errorMsg('密码和确认密码不一致')
    }
    return dispatch => {
        axios.post('/user/register', {user, pwd, type})
            .then((res) => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess({user, pwd, type}))
                }
                else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

// 更新信息
export function update(data) {
    return dispatch => {
        axios.post('/user/update', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}
