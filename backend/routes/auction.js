const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Auction = require('../models/Auction')
const Player = require('../models/Player')

// POST request to send their bids to Auction Table, requires authentication using moralis
router.post('/:id/:id1', async function (req, res) {
    try {
        let bid  = await Auction.findOne({address: req.body.address})
        if(bid) {
            return res.status(400).json({ error: "Sorry a user with the address already exists"})
        }
        bid = await Auction.create({
            address: req.body.address,
            playerId: req.body.playerId,
            bid: req.body.bid
        })
        bid.save()
        res.send(bid)
    } catch (error) {
        console.log(error.message)
        res.status(500).json("Some error occured!")
    }
})

// GET request to see the top bids  , authentication required
// We are returning the array of bids
router.get('/:id/:id1', async function (req, res) {
    try {
        const _id1 = req.params.id1
        const bidData = await Auction.find({playerId: _id1})
        let bids = []
        bidData.map((item, index) => {
            bids.push(item.bid)
        })
        bids = bids.sort()
        res.send(bids)
    } catch (error) {
        console.log(error.message)
        res.status(500).json("Some error occured!")      
    }
})

// PATCH request to see the top bids  , requires authentication using moralis
// We are updating the bids

router.patch('/:id/:id1', async function (req, res) {
    try {
        const _id = req.params.id
        const _id1 = req.params.id1
        const updatedData = await Auction.findOneAndUpdate({playerId: _id1,address:_id},req.body,{ new: true})
        res.send(updatedData)
    } catch (error) {
        console.log(error.message)
        res.status(500).json("Some error occured!")      
    }
})

// Retrieve the top 20% bids of each playerId from Auction Table and send 
// POST request to User Table and 
// POST request to Player Table



module.exports = router