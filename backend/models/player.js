// player score 
// array of user addresses

const mongoose = require('mongoose')

const player = mongoose.Schema(
    {
        score: {type: Number},
        history : [
          {
            type: String,
          },
        ]
    },
    {
        timestamps: true,
    }
);

const Player = mongoose.model('Player',player)

module.exports = Player;