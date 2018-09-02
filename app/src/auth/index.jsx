import React, { Component } from 'react';
import {connect} from 'react-redux'
import Button from 'antd/lib/button';
import {login, getUserData} from './Auth.redux'
import {Redirect} from  'react-router-dom'

@connect(
    state=>state.auth,
    {login, getUserData}
)

class Login extends React.Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     user:'',
        //     age:''
        // }
    }

    componentDidMount() {
        this.props.getUserData()
    }

    register(){
        // this.props.history.push('/auth')
    }

    render() {
        console.log(this.props)
        return (
            <div>
                {this.props.isAuth?<Redirect to="/dashboard" />:null}
                <h1>需要登陆</h1>
                <h1>名字{this.props.user}</h1>
                <h1>年纪{this.props.age}</h1>
                <Button onClick={ this.props.login} type='primary'>登陆</Button>
            </div>
        )
    }
}
export default Login