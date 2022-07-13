// address of user 
// playerId 
// bid amount

const mongoose = require('mongoose')

const auction = mongoose.Schema(
    {
        address: {type: String,trim: true},
        playerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
        },
        bid: {type: Number}
    },
    {
        timestamps: true,
    }
)

const Auction = mongoose.model('Auction',auction)

module.exports = Auction;