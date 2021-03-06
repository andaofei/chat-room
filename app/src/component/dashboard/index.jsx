import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'
import {Switch, Route} from 'react-router-dom'
import Boss from '../boss/index'
import Genius from '../genius/index'
import User from '../UserCenter/index'
import Msg from '../msg/index'
import {getMsgList, recvMsg} from '../../redux/chat'

@connect(
    state => state,
    {getMsgList, recvMsg}
)
class Dashboard extends React.Component {
    componentDidMount() {
        if (!this.props.chat.chatmsg.length) { // 判断是都有数据
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    render() {
        const user = this.props.user
        const {pathname} = this.props.location
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'boss',
                icon: 'job',
                title: 'BOSS列表',
                component: Genius,
                hide: user.type === 'boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User
            }
        ];
        return <div>
            <NavBar className='fixd-header' mode='dard'>{navList.find(v => v.path === pathname).title}</NavBar>
            <div style={{marginTop: 45, overflow: 'hidden',paddingBottom:60}}>
                <Switch>
                    {navList.map(v => (
                        <Route key={v.path} path={v.path} component={v.component}/>
                    ))}
                </Switch>
            </div>
            <NavLinkBar className='fixd-footer' data={navList}/>
        </div>
    }
}

export default Dashboard
