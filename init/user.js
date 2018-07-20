const mongoose = require('mongoose')
const User = require('./../models/User.model')
mongoose.connect('mongodb://127.0.0.1:27017/mis-node')

function initUser() {
    return new Promise(resolve => {
        User.create({
            "username": "admin",
            "password": "admin"
        }, (err) => {
            if (err) console.log('发生错误');
            resolve()
        })
    })
}
module.exports = initUser