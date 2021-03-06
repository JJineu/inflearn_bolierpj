// model은 스키마를 감싸는 역할
// 스키마는 특성들
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // 사용자가 놔둔 공백 없애는 역할
        unique: 1 // 똑같은 이메일 쓰지 못하게
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { // 관리자가 될수도 일반유저가 될수도
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }

})

const User = mongoose.model('User', userSchema)

module.exports = {User}

