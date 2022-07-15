const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Auction = require('../models/Auction')
const Player = require('../models/Player')

// GET request to the score and rank of the user
router.get('/', async function (req, res) {
    try {
        const leaderboardData = await User.find({},{address:1,score:1,_id:0}).sort({"score":-1}).limit(100)
        res.send(leaderboardData)
    } catch (error) {
        console.log(error.message)
        res.status(500).json("Some error occured!")      
    }
})

// Retrieve the top 20% bids of each playerId from Auction Table and send 
// POST request to User Table and 
// POST request to Player Table
router.post('/:id/:id1', async function (req, res) {
    try {
        Auction.find().distinct('playerId', async function(error, ids) {
            // ids is an array of all playerIds
            for (var i = 0; i < ids.length; i++) {
                let addressListByIdSize = await Auction.find({playerId:ids[i]},{address:1,playerId:1,_id:0}).count()
                let addressListById = await Auction.find({playerId:ids[i]},{address:1,playerId:1,_id:0}).sort({"bid":-1}).limit(Math.round(addressListByIdSize/5))

                let addressList = []
                for (var j = 0; j < addressListById.length; j++) {
                    addressList.push(addressListById[j].address)
                }
                let player = await Player.create({
                    playerId: ids[i],
                    score: 0,
                    history: addressList
                })
                player.save()

                for (var k = 0; k < addressList.length; k++) {
                    let user = await User.create({
                        address: addressList[k],
                        score: 0,
                        playerId: addressListById[k].playerId,
                        history: [addressListById[k].playerId],
                        sell: false,
                        sellAmount: 0
                    })
                    user.save()
                }
              }
        });
        res.send("Mission Complete!")
    } catch (error) {
        console.log(error.message)
        res.status(500).json("Some error occured!")
    }
})

module.exports = router