import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/user.redux'
@connect(
    state=>state.user,
    {login}
)
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            pwd: ''
        };
        this.register =  this.register.bind(this)
        this.handerlogin =  this.handerlogin.bind(this)
    }
    // 输入框
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    register() {
        this.props.history.push('/register')
    }
    handerlogin() {
        this.props.login(this.state)
    }
    render () {
        return <div>
                    {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/>: null}
                    <Logo/>
                    <WingBlank>
                        <List>
                            {this.props.msg ?<p className="errorMsg">{this.props.msg}</p>:null}
                            <InputItem onChange={v=> this.handleChange('user', v)}>用户</InputItem>
                            <WhiteSpace/>
                            <InputItem type="password" onChange={v=> this.handleChange('pwd', v)}>密码</InputItem>
                        </List>
                        <Button type="primary" onClick={this.handerlogin}>登陆</Button>
                        <WhiteSpace/>
                        <Button type="primary" onClick={this.register}>注册</Button>
                    </WingBlank>
                </div>
    }
}
export default  Login