const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Auction = require("../models/Auction");
const Player = require("../models/Player");

// POST request to send their bids to Auction Table, requires authentication using moralis
router.post("/:id/:id1", async function (req, res) {
  try {
    let bid = await Auction.findOne({ address: req.body.address });
    if (bid) {
      return res
        .status(400)
        .json({ error: "Sorry a user with the address already exists" });
    }
    bid = await Auction.create({
      address: req.body.address,
      playerId: req.body.playerId,
      bid: req.body.bid,
    });
    bid.save();
    res.send(bid);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Some error occured!");
  }
});

// GET request to see the top bids  , authentication required
// We are returning the array of bids
router.get("/:id/:id1", async function (req, res) {
  try {
    const _id1 = req.params.id1;
    const bidData = await Auction.find({ playerId: _id1 });
    let dummy = [];
    bidData.map((item, index) => {
      dummy.push(parseInt(item.bid));
    });

    var bids = new Int32Array(dummy);
    // for(let i = 0;i<bidData.length;i++) {
    //     bids[i] = bidData[i].bid;
    // }
    bids.sort();
    var bids1 = Object.values(bids)
    if (bids1.length == 0) {
        bids1 = [0,0]
    } 
    res.send(Object.values(bids1));
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Some error occured!");
  }
});

// PATCH request to see the top bids  , requires authentication using moralis
// We are updating the bids

router.patch("/:id/:id1", async function (req, res) {
  try {
    const _id = req.params.id;
    const _id1 = req.params.id1;
    const updatedData = await Auction.findOneAndUpdate(
      { playerId: _id1, address: _id },
      req.body,
      { new: true }
    );
    res.send(updatedData);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Some error occured!");
  }
});

// GET request to get the bidAmount of the user 
router.get("/:id/", async function (req, res) {
    try {
      const address = req.params.id;
      const bidData = await Auction.find({ address: address});
      let bidPlaced = true;
      let bidAmt = 0;
      let playerid=null;
      if (bidData.length != 0){
        bidAmt = bidData[0].bid
        playerid = bidData[0].playerId;
      }else{
        bidPlaced = false;
      }
      
      res.send([bidPlaced,bidAmt,playerid]);
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Some error occured!");
    }
  });

// Retrieve the top 20% bids of each playerId from Auction Table and send
// POST request to User Table and
// POST request to Player Table

module.exports = router;
