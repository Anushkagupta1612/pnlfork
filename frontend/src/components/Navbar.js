import React, { useState, useEffect } from 'react'
import { Container, Navbar, Button } from 'react-bootstrap'
import {
    NavLink
  } from "react-router-dom";
import "../styles/navbar.css"
import { ethers } from "ethers";


const Navbar1 = () => {
  const { ethereum } = window;
  const [account, setaccount] = useState('')

  const connect = async () => {
    try {
      const [ account1 ] = await ethereum.request( { method: 'eth_requestAccounts' } )
      setaccount(account1);
    } catch (e) {
      console.log("error in request", e);
    }
  };

  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
  <div className="margined">
    <NavLink to="/">Pro NFT League</NavLink>
  </div>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item mr-4">
        <NavLink to="/profile">Profile</NavLink>
      </li>
      <li class="nav-item mr-4">
        <NavLink to="/leaderboard">Leaderboard</NavLink>
      </li>
      <li class="nav-item mr-4">
        <NavLink to="/auction">Auction</NavLink>
      </li>
      <li class="nav-item mr-4">
        <NavLink to="/trading">Trading</NavLink>
      </li>
    </ul>
    { typeof ethereum !== "undefined" && (!account) && (
    <button onClick={() => connect() } class="btn btn-outline-success my-2 my-sm-0 mr-3" type="submit">Connect Wallet</button>)}
    { typeof ethereum !== "undefined" && account && (
            <>
            <Navbar.Text>
              Signed in as: <span className="heading">{ account.substring( 0, 5 ) + "..." + account.substring( account.length - 5, account.length ) }</span>
            </Navbar.Text>
            {/* <Button variant="info" className="button1 mx-2" onClick={ logout }>Logout</Button> */}
            </>
        ) }
  </div>
        </nav>
    </div>
  )
}

export default Navbar1