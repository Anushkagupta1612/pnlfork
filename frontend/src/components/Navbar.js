import React, { useState, useEffect } from 'react'
import { Container, Navbar, Button } from 'react-bootstrap'
import {
    NavLink
  } from "react-router-dom";
import "../styles/navbar.css"
import { useMoralis } from "react-moralis";

const Navbar1 = () => {

  const { authenticate, isAuthenticated, user, logout, isAuthenticating } = useMoralis();

  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
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
    { !isAuthenticated && (
    <button onClick={ authenticate } class="btn btn-outline-success my-2 my-sm-0 mr-3" type="submit">Connect Wallet</button>)}
    { isAuthenticated && (
            <>
            <Navbar.Text>
              Signed in as: <span className="heading">{ user.get( 'ethAddress' ).substring( 0, 5 ) + "..." + user.get( 'ethAddress' ).substring( user.get( 'ethAddress' ).length - 5, user.get( 'ethAddress' ).length ) }</span>
            </Navbar.Text>
            <Button variant="info" className="button1 mx-2" onClick={ logout } disabled={ isAuthenticating }>Logout</Button>
            </>
        ) }
  </div>
        </nav>
    </div>
  )
}

export default Navbar1