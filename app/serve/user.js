/**
 * Created by 23535 on 2018/8/11.
 */
const express = require('express')
const Router = express.Router()
const model = require('./module')
const User = model.getModel('user')

// 查询用户列表
Router.get('/list', function (req, res) {
    User.find({}, function (err, doc) {
        return res.json(doc)
    })

})
// 注册
Router.post('/register', function (req, res) {
    console.log(req.body)
    const {user, pwd, type} = req.body
    User.findOne({user}, function (err,doc) {
        if (doc) {
            return res.json({code: 1, msg:'用户名重复'})
        }
        User.create({user,pwd,type}, function (e, d) {
            if (e) {
                return res.json({code:1, msg:'后端出错了'})
            }
            return res.json({code:0})
        })
    })
})

Router.get('/info', function (req, res) {
    return res.json({code: 1})
    // const {userid} = req.cookies
    // if (!userid) {
    //     return res.json({code:1})
    // }
    // User.findOne({_id:userid} ,_filter , function(err,doc){
    //     if (err) {
    //         return res.json({code:1, msg:'后端出错了'})
    //     }
    //     if (doc) {
    //         return res.json({code:0,data:doc})
    //     }
    // })
    // 用户有没有cookie
})
module.exports = Router