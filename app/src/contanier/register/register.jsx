import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, Radio, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {regisger} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import imoocFrom from '../../component/imooc-form/index'
import './register.css'
@connect(
    state => state.user,
    {regisger}
)
@imoocFrom
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius'
        };
        this.handleRegister = this.handleRegister.bind(this)
    }

    // 输入框
    // handleChange(key, val) {
    //     this.setState({
    //         [key]: val
    //     })
    // }

    // 注册
    handleRegister() {
        this.props.regisger(this.props.state)
    }
    componentDidMount(){
        this.props.handleChange('type','genius')
    }
    render() {
        const RadioItem = Radio.RadioItem
        return <div>
            {this.props.redirectTo? <Redirect to={this.props.redirectTo}/> : null}
            <Logo/>
            <WingBlank>
                <List>
                    {this.props.msg ? <p className="errorMsg">{this.props.msg}</p> : null}
                    <InputItem onChange={v => this.props.handleChange('user', v)}>用户名</InputItem>
                    <WhiteSpace/>

                    <InputItem type="password" onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
                    <WhiteSpace/>

                    <InputItem type="password" onChange={v => this.props.handleChange('repeatpwd', v)}>确认密码</InputItem>
                    <WhiteSpace/>

                    <RadioItem checked={this.props.state.type === 'genius'}
                               onChange={() => this.props.handleChange('type', 'genius')}>
                        牛人
                    </RadioItem>

                    <RadioItem checked={this.props.state.type === 'boss'}
                               onChange={() => this.props.handleChange('type', 'boss')}>
                        BOSS
                    </RadioItem>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </List>
            </WingBlank>
        </div>
    }
}
export default  Register