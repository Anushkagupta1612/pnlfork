// user score 
// player id 
// tx history 
// sell state 
// sell amount

const mongoose = require('mongoose')

const user = mongoose.Schema(
    { 
        address: {type: String,required: true,unique: true},
        score: {type: Number,default:0},
        playerId: {type: Number},
        history : [
            {type: String},
        ],
        sell: {type: Boolean,default: false},
        sellAmount : {type: Number,default:0},
    },
    {
        timestamps: {type: Date,default: Date.now()},
    }
)

const User = mongoose.model('User',user)

module.exports = User;