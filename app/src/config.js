/**
 * Created by 23535 on 2018/7/21.
 */
import axios from 'axios'
import {Toast} from 'antd-mobile'

// 拦截请求
axios.interceptors.request.use(function (config) {
    Toast.loading('加载中')
    return config
})

// 拦截响应
axios.interceptors.response.use(function (config) {
   setTimeout(() => {
       Toast.hide()
   }, 100)
    return config
})
