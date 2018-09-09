import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'
import {Switch, Route} from 'react-router-dom'
import Boss from '../boss/index'


function Genius() {
    return <h2>Genius</h2>
}

function Msg() {
    return <h2>Msg</h2>
}

function User() {
    return <h2>User</h2>
}

@connect(
    state => state
)
class Dashboard extends React.Component {
    render() {
        const user = this.props.user
        const {pathname} = this.props.location
        const navList = [
            {
                path: '/genius',
                text: '牛人',
                icon: 'job',
                title: '牛人列表',
                component: Genius,
                hide: user.type === 'boss'
            },
            {
                path: '/boss',
                text: 'boss',
                icon: 'boss',
                title: 'BOSS列表',
                component: Boss,
                hide: user.type === 'genius'
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
        // console.log(user)
        // console.log(navList)
        return<div>
                <NavBar className='fixd-header' mode='dard'>{navList.find(v => v.path === pathname).title}</NavBar>
                <div style={{marginTop:45, overflow: 'hidden'}}>
                    <Switch>
                        {navList.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>
                <NavLinkBar className='fixd-footer' data={navList}/>
              </div>
    }
}

export default Dashboard