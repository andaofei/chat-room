/**
 * Created by 23535 on 2018/8/11.
 */
const mongoose = require('mongoose')

// 链接mongo 并且使用imooc这个集合
const DB_URL = 'mongodb://localhost:27017/chat_room'

mongoose.connect(DB_URL)

const models = {
    user: {
        'user': {
            type: String,
            require: true
        },
        'pwd': {
            type: String,
            require: true
        },
        'type': {
            type: String,
            require: true
        },
        'avatar': {
            type: String
        },
        // 个人简介
        'desc': {
            type: String
        },
        'title': {
            type: String
        },
        'company': {
            type: String
        },
        'money': {
            type: String
        }
    },
    chat: {
        'chatid': {'type': String, require: true},//聊天id
        'from': {'type': String, 'require': true},
        'to': {'type': String, 'require': true},
        'read': {'type': Boolean, default: false},
        'content': {'type': String, 'require': true, 'default': ''},
        'create_time': {'type': Number, 'default': Date.now}
    }
};

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name)
    }
};
