// player score 
// array of user addresses

const mongoose = require( 'mongoose' )

const player = mongoose.Schema(
  {
    playerId: { type: Number },
    score: { type: Number },
    history: [
      {
        type: String,
      },
    ],
    tokenIds: [
      {
        type: Number,
      },
    ]
  },
  {
    timestamps: { type: Date, default: Date.now() },
  }
);

const Player = mongoose.model( 'Player', player )

module.exports = Player;