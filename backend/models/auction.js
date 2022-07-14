// address of user 
// playerId 
// bid amount

const mongoose = require('mongoose')

const auction = mongoose.Schema(
    {
        address: {type: String,required: true,unique: true},
        playerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
        },
        bid: {type: Number}
    },
    {
        timestamps: {type: Date,default: Date.now()},
    }
)

const Auction = mongoose.model('Auction',auction)

module.exports = Auction;