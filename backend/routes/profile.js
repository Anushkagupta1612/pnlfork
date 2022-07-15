const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Auction = require('../models/Auction')
const Player = require('../models/Player')

// As he clicks the sell button 
// the user a PATCH request to the User table to change 
// the sell state to True and set the sell Amount
router.patch('/:id', async function (req, res) {
    try {
        const _id = req.params.id
        const updatedData = await User.findOneAndUpdate({address:_id},req.body,{ new: true})
        res.send(updatedData)
    } catch (error) {
        console.log(error.message)
        res.status(500).json("Some error occured!")      
    }
})

// GET request to User Table to get 
// Sell Amount, Position in Leaderboard, Player Owned, Score and Tx history
router.get('/:id', async function (req, res) {
    try {
        const _id = req.params.id
        const profileData = await User.find({address: _id})
        const allData = await User.find()
        let scores = []
        allData.map((item, index1) => {
            scores.push(item.score)
        })
        scores = scores.sort()
        let score1 = profileData[0].score
        let index1 = scores.indexOf(score1)
        let profileData1 = {...profileData,"leaderboard":index1+1}
        res.send(profileData1)
    } catch (error) {
        console.log(error.message)
        res.status(500).json("Some error occured!")      
    }
})

module.exports = router