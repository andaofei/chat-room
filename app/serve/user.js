/**
 * Created by 23535 on 2018/8/11.
 */
const express = require('express')
const Router = express.Router()
const model = require('./module')
const User = model.getModel('user')
const utils = require('utility')
const _filter = {'pwd': 0, '__v': 0}
// 查询用户列表
Router.get('/list', function (req, res) {
    // User.remove({}, function (e,d) {}); //清除list列表
    User.find({}, function (err, doc) {
        return res.json(doc)
    })

});

// 登陆
Router.post('/login', function (req, res) {
    console.log(req.body)
    const {user, pwd} = req.body
    User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function (err, doc) {
        if (!doc) {
            return res.json({code: 1, msg: '用户名不存在或密码错误'})
        }
        res.cookie('userid', doc._id)
        return res.json({code: 0, data: doc})
    })
});

// 注册
Router.post('/register', function (req, res) {
    console.log(req.body)
    const {user, pwd, type} = req.body
    User.findOne({user}, function (err, doc) {
        if (doc) {
            return res.json({code: 1, msg: '用户名重复'})
        }
        const userModel = new User({user, type, pwd: md5Pwd(pwd)})
        userModel.save(function (e, d) {
            if (e) {
                return res.json({code: 1, msg: '后端出错了'})
            }
            const {user, type, _id} = d
            res.cookie('userid', _id)
            return res.json({code: 0, data: {user, type, _id}})
        })
    })
});

// 获取登陆状态
Router.get('/info', function (req, res) {
    // return res.json({code: 1})
    const {userid} = req.cookies
    if (!userid) {
        return res.json({code: 1})
    }
    User.findOne({_id: userid}, _filter, function (err, doc) {
        if (err) {
            return res.json({code: 1, msg: '后端出错了'})
        }
        if (doc) {
            return res.json({code: 0, data: doc})
        }
    })
    // 用户有没有cookie
});

function md5Pwd(pwd) {
    const salt = 'lasdoiqw2131@!!'
    return utils.md5(utils.md5(pwd + salt))
}
module.exports = Router