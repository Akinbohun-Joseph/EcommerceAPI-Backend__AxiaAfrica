const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    gmail: {
        type: String, 
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    password: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    }

)
module.exports = mongoose.model('user', userModel)