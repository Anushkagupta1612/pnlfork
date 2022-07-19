import React from 'react'
import {
    NavLink
  } from "react-router-dom";
import "../styles/navbar.css"

const Navbar = () => {
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
    <button class="btn btn-outline-success my-2 my-sm-0 mr-3" type="submit">Connect Wallet</button>
  </div>
</nav>
    </div>
  )
}

export default Navbar