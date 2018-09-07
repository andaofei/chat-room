import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux'
@withRouter
@connect(
    null,
    {loadData}
)
class AuthRoute extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount () {
        const publicList = ['/login', '/register']
        const pathname = this.props.location.pathname
        if (publicList.indexOf((pathname) > -1)) {
            return null
        }
        axios.get('/user/info')
            .then((res) => {
            if (res.status === 200) {
                if (res.data.code === 0) {
                    this.props.loadData(res.data.data)
                } else {
                    console.log(this.props.history)
                    this.props.history.push('/login')
                }
                console.log(res.data)
            }
            })
        // 判断登陆
        // 现在得url地址，
        // 用户得type 身份是boss 还是牛人
        // 用户是否完善信息（选择头像， 个人简介）
    }
    render () {
        return null
    }
}
export default AuthRoute