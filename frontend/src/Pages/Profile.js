import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/profile.css";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";
import { CategoryData } from "../data";

const Profile = () => {
  const { authenticate, isAuthenticated, user, logout, isAuthenticating } =
    useMoralis();
  const [data, setData] = useState([]);
  const [sellVal, setsellVal] = useState(0);
  const address1 = user.get("ethAddress");
  const addr = ethers.utils.getAddress(address1);

  async function getData(){
    await fetch(`http://localhost:3005/profile/${addr}`)
    .then((res) => {
      res.json().then((data1) => {
        setData(data1);
      });
    })
    .catch((e) => console.log(e.message));
  }

  useEffect(() => {
    getData();
  }, []);

  // let {score,playerId,history} = data1
  // let transaction = history.length
  // let player = CategoryData.playerId


  const updateSellAmt = () => {
    fetch(`http://localhost:3005/profile/${addr}`,{
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sell:true,
        sellAmount:sellVal
    })
    }).then((res) => {
      res.json().then((resp) => {
        getData()
      })
    })
  }

  return (
    <div className="Nav">
      <Navbar />
      <div className="profile">
        {data.length != 0 ? (<img src={CategoryData[data[0].playerId][1]} className="profile-img" />): null}
        <div className="profile-content">
          <div className="profile-info">
            <img src="./Ellipse2.svg" className="mt-2 ml-1" />
            <div className="profile-info2">
              <div className="profile-info1">
                <p className="username">this is godfather</p>
                <img src="./Vector.svg" className="ml-2" />
              </div>
              <p className="address">
                {user.get("ethAddress").substring(0, 5) +
                  "..." +
                  user
                    .get("ethAddress")
                    .substring(
                      user.get("ethAddress").length - 5,
                      user.get("ethAddress").length
                    )}
              </p>
            </div>
          </div>
          <h1 className="title1">You currently own</h1>
          <h1 className="title2">{data.length != 0 ? CategoryData[data[0].playerId][0] : null}</h1>
          <div className="icons-desc">
            <div className="icon1">
              <div>
                <img src="./Stats.svg" />
              </div>
              <p className="subtitle">{data.length != 0 ? data[0].score: null} Score</p>
            </div>
            <div className="icon2">
              <div>
                <img src="./Coin.svg" />
              </div>
              <p className="subtitle">{data.length != 0 ? data[0].history.length: null} Transactions</p>
            </div>
            <div className="icon3">
              <p className="subtitle">{data.length != 0 ? data.leaderboard : null} Rank</p>
            </div>
          </div>
          <p className="subtitle5 mt-4 ml-5">
            In radio communication, used in radio and television broadcasting,
            cell phones, two-way radios, wireless networking and satellite
            communication among numerous other uses.In radio communication, used
            in radio and television broadcasting, cell phones, two-way radios,
            wireless networking and satellite communication among numerous other
            uses.
          </p>
          <button
            type="button"
            class="sellbut"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            SELL NFT
          </button>

          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Sell or Update Price
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div class="modal-body">
                  <div class="input-block">
                    <input
                      type="text"
                      name="input-text"
                      id="input-text"
                      required
                      spellcheck="false"
                      value={sellVal}
                      onChange={(e) => setsellVal(e.target.value)}
                    />
                    <span class="placeholder">Enter Price</span>
                  </div>
                </div>

                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={() => setsellVal(0)}
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-primary" onClick={()=> updateSellAmt()}>
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <h1 className="transaction">Previous Transactions</h1>
          <table class="table table-borderless text-white mb-5">
            <thead>
              <tr className="tablehead">
                <th scope="col">Card Player Id</th>
                <th scope="col">Card Player Name</th>
              </tr>
            </thead>
            <tbody>
              {data.length != 0 ? data[0].history.map((item) => 
                <tr>
                <th scope="row">{item}</th>
                <td>{CategoryData[item][0]}</td>
              </tr>
              ): null}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
