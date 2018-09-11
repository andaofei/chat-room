import React from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'
import {getMsgList, recvMsg} from "../../redux/chat";

@connect(
    state => state,
    {getMsgList, recvMsg}
)

class Msg extends React.Component {
    componentDidMount() {
        if (!this.props.chat.chatmsg) {
            return null
        }
    }

    getLast(arr) {
        return arr[arr.length - 1]
    }

    render() {
        const Item = List.Item;
        const Brief = Item.Brief;
        const userid = this.props.user._id;
        const userinfo = this.props.chat.users;
        const msgGroup = {};
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || [];
            msgGroup[v.chatid].push(v)
        });
        // console.log(msgGroup)
        // const chatList = Object.values(msgGroup)
        const chatList = Object.values(msgGroup).sort((a, b) => { // 从大到小排序
            const a_last = this.getLast(a).create_time;
            const b_last = this.getLast(b).create_time;
            return b_last - a_last
        });
        console.log(chatList)
        return <div>
            <h2>消息列表</h2>
            <List>
                {chatList.map(v => {
                    const lastItem = this.getLast(v)
                    const targetId = v[0].from===userid?v[0].to:v[0].from
                    const unreadNum = v.filter(v=>!v.read&&v.to===userid).length
                    if (!userinfo[targetId]) {
                        return null
                    }
                    return (
                        <Item key={lastItem._id}
                              thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                              extra={<Badge text={unreadNum}/>}
                              arrow="horizontal"
                              onClick={()=>{
                                  this.props.history.push(`/chat/${targetId}`)
                              }}>
                            {lastItem.content}
                            <Brief>{userinfo[targetId].name}</Brief>
                        </Item>
                    )
                })}
            </List>
        </div>
    }
}

export default Msg
