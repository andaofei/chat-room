const ADD_GUN='加机关枪';
const REMOVE_GUN = '减机关枪';
//reducer
//通过老的state和action 生成新的state
export function counter(state=110,action) {
    switch (action.type) {
        case ADD_GUN:
            return state+1;
        case REMOVE_GUN:
            return state-1;
        default:
            return state
    }
}

//action create
export function addGUN() {
        return {type:ADD_GUN}
}

export function removeGUN() {
    return {type:REMOVE_GUN}
}
//异步提交

export function addGunAsync() {
    return dispatch=>{
        setTimeout(()=>{
            dispatch(addGUN())
        },1000)
    }
}