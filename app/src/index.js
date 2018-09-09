import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'; // 组件
import './index.css';
import './config';
import 'antd-mobile/dist/antd-mobile.css';
// import App from './App';
// import Auth from './auth/index';
// import Dashboard from './dashboard';
import Dashboard from './component/dashboard/index'
import AuthRoute from './component/authroute/authroute'
import Login from './contanier/login/login';
import Register from './contanier/register/register';
import Boss from './contanier/boss/boss';
import GeniusInfo from './contanier/genius/index';
import registerServiceWorker from './registerServiceWorker';

import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './redux/reducer';
import thunk from 'redux-thunk';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

//判断调试工具是否存在
const reduxDevTools = window.devToolsExtension ? window.devToolsExtension() : f => f;

// 调试工具
const store = createStore(reducers,
    compose(applyMiddleware(thunk), reduxDevTools));
// console.log(store.getState());

// boss genius me msg 4个页面
ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute/>
                {/* Switch只会命中第一个*/}
                <Switch>
                    {/*<App />*/}
                    {/*<Route path="/app" component={App}/>*/}
                    <Route path="/bossinfo" component={Boss}/>
                    <Route path="/geniusinfo" component={GeniusInfo}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    {/*<Redirect to="/login"/>*/}
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>), document.getElementById('root'));
registerServiceWorker();
