/**
 * Created by 23535 on 2018/8/11.
 */
const mongoose = require('mongoose')

// 链接mongo 并且使用imooc这个集合
const DB_URL = 'mongodb://localhost:27017/imooc-chat'

mongoose.connect(DB_URL)