import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/user.redux'
import imoocFrom from '../../component/imooc-form/index'
// function hello() {
//     console.log('hello imooc I love React')
// }

// function WrapperHello(fn){
//     return function(){
//         console.log('before say hello')
//         fn()
//         console.log('after say hello')
//     }
// }

// class Hello extends React.Component{
// 	render(){
// 		return <h2>hello imooc I love React&Rdux</h2>
// 	}
// }

// function WrapperHello(Comp) {
    // 反向继承
    // 	class WrapComp extends Comp{
	// 		componentDidMount(){
	// 			console.log('高阶组件新增的生命周期，加载完成')
	// 		}
	// 		render(){
	// 			return <Comp></Comp>
	// 		}
	// }
	//属性代理
//     class WrapComp extends React.Component {
//         render() {
//             return (<div>
//                 <p>这是HOC高阶组件特有的元素</p>
//                 <Comp {...this.props}/>
//             </div>)
//         }
//     }
//     return WrapComp
// }

// Hello = WrapperHello(Hello)
// @WrapperHello
@connect(
    state => state.user,
    {login}
)
@imoocFrom
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            pwd: ''
        };
        this.handleRegister = this.handleRegister.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }

    // 输入框
    // handleChange(key, val) {
    //     this.setState({
    //         [key]: val
    //     })
    // }

    handleRegister() {
        this.props.history.push('/register')
    }

    handleLogin() {
        this.props.login(this.props.state)
    }

    render() {
        return <div>
            {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
            <Logo/>
            <WingBlank>
                <List>
                    {this.props.msg ? <p className="errorMsg">{this.props.msg}</p> : null}
                    <InputItem onChange={v => this.props.handleChange('user', v)}>用户</InputItem>
                    <WhiteSpace/>
                    <InputItem type="password" onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
                </List>
                <Button type="primary" onClick={this.handleLogin}>登陆</Button>
                <WhiteSpace/>
                <Button type="primary" onClick={this.handleRegister}>注册</Button>
            </WingBlank>
        </div>
    }
}

export default Login