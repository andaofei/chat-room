import React, { Component } from 'react';
import Button from 'antd/lib/button';
import {connect} from 'react-redux';  //组合获取的数据
import {Redirect} from  'react-router-dom'
import {addGUN, removeGUN, addGunAsync} from '../redux/counter';
import {logout} from '../auth/Auth.redux'
// import {addGUN, removeGUN, addGunAsync, logout} from '../redux/reducer'
// App = connect(mapStatetoProps, actionCreators)(App)
@connect(
    // 属性
    state=>({num:state.counter,auth:state.auth}),
    // 方法
    {addGUN, removeGUN, addGunAsync, logout}
)

class Dashboard extends Component {
    constructor(props) {
        super(props)
        // console.log(this.props)
    }
    register(){
        console.log(this.context);
        // this.props.history.push('/auth')
    }
    render() {
        const num = this.props.num;
        const addGUN = this.props.addGUN;
        const removeGUN = this.props.removeGUN;
        const addGunAsync = this.props.addGunAsync;
        const logout = this.props.logout;
        console.log(this.props)
        const redirectTologin =  <Redirect to="/login" />
        const app = (
            <div className="App">
                {this.props.auth.isAuth?<Button type="primary" onClick={logout}>注销</Button>: null}
                <h1>现在有机关枪{num}把</h1>
                <div>
                    <Button type="primary" onClick={addGUN}>加机关枪</Button>
                    <br/>
                    <br/>
                    <br/>
                </div>
                <div>
                    <Button type="primary" onClick={removeGUN}>减机关枪</Button>
                    <br/>
                    <br/>
                    <br/>
                </div>
                <div>
                    <Button onClick={addGunAsync}>后交武器</Button>
                </div>
            </div>
        )
        return this.props.auth.isAuth ? app : redirectTologin;
    }
}

export default Dashboard;
