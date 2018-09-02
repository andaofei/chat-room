/**
 * Created by 23535 on 2018/8/11.
 */
const express = require('express')
const Router = express.Router()

Router.get('/info',function(req, res){
    return res.json({code:1})
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