/**
 * Created by 23535 on 2018/6/24.
 */
const express = require('express')
// const model = require('./model')
const bodyParser = require('body-parser') // 接收post
const cookieParser = require('cookie-parser')
const userRouter = require('./user')
const model = require('./module')
const Chat = model.getModel('chat')

// mongoose.connection.on('connected', function () {
//     console.log('mongoose is connecting')
// })


// 新建app
const app = express()

// work with express
const server = require('http').Server(app)

const io = require('socket.io')(server)

io.on('connection', function (socket) {
    // console.log('user login')
    socket.on('sendmsg', function (data) {
        console.log('接收到：', data)
        const {from, to, msg} = data
        const chatid = [from, to].sort().join('_'); // 聊天id
        Chat.create({chatid, from, to, content: msg}, function (err, doc) {
            io.emit('recvmsg', Object.assign({}, doc._doc))
        })
        // io.emit('recvmsg', data) // 全局广播
    })
});

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

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
});

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

// app.listen(9093, function () {
//     console.log('Node app start at port 9093')
// });
server.listen(9093, function () {
    console.log('Node app start at port 9093')
})
