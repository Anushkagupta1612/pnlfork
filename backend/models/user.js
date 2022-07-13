// user score 
// player id 
// tx history 
// sell state 
// sell amount

const mongoose = require('mongoose')

const user = mongoose.Schema(
    {
        score: {type: Number},
        playerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
        },
        history : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Player",
            },
        ],
        sell: {type: Boolean},
        sellAmount : {type: Number},
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model('User',user)

module.exports = User;