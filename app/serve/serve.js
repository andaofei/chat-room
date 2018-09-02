/**
 * Created by 23535 on 2018/6/24.
 */
const express = require('express')
// const model = require('./model')

const userRouter = require('./user')

// mongoose.connection.on('connected', function () {
//     console.log('mongoose is connecting')
// })

// 新建app
const app = express()

app.use('/user',userRouter)

// 建表
// const User = mongoose.model(`user`, new mongoose.Schema({
//     user:{type:String,require:true},
//     age:{type:Number,require:true}
// }))

// 创建数据
// User.create({
//     user: `LQQ`,
//     age: 20
// }, function (err, doc) {
//     if(!err) {
//         console.log(doc)
//     } else {
//         console.log(err)
//     }
// })

// 删除数据
// User.remove({
//     user: 'LQQ'
// },function (err,doc) {
//     if(!err){
//         console.log(doc)
//     } else {
//         console.log(err)
//     }
// })

// 更新
// User.update({
//     user: `LQQ`
// },{'$set':{age:23}},function (err,doc) {
//     if(!err){
//         console.log(doc)
//     } else {
//         console.log(err)
//     }
// })

// 获取
app.get('/', function (req, res) {
    res.send(`<h1>hello world</h1>`)
})

// 删除
// app.get('/delete', function (req, res) {
//     res.send(`<h1>hello world</h1>`)
// })

// app.get('/data', function (req, res) {
//     User.findOne({user: 'LQQ'}, function (err,doc) {
//         if(!err){
//            return res.json(doc)
//         } else {
//             console.log(err)
//         }
//     })
// })

app.listen(9093,function(){
    console.log('Node app start at port 9093')
})
