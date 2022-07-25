import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/profile.css";
import { ethers } from "ethers";
import { CategoryData } from "../data";
import { useWeb3React } from "@web3-react/core"
import {injected} from '../components/wallet/connector'


const Profile = () => {
  const { ethereum } = window;
  let { active, account, library, connector, activate, deactivate } = useWeb3React()
  const [data, setData] = useState([]);
  const [sellVal, setsellVal] = useState(0);
  const addr = ethers.utils.getAddress(account);

  async function getData() {
    await fetch(`http://localhost:3005/profile/${addr}`)
      .then((res) => {
        res.json().then((data1) => {
          setData(data1);
        });
      })
      .catch((e) => console.log(e.message));
  }

  useEffect(() => {
    getData()
  }, [])
  

  // let {score,playerId,history} = data1
  // let transaction = history.length
  // let player = CategoryData.playerId

  const updateSellAmt = async () => {
    await fetch(`http://localhost:3005/profile/${addr}`, {
      method: "PATCH",
      headers: {
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sell: true,
        sellAmount: sellVal,
      }),
    }).then((res) => {
      res.json().then((resp) => {
        getData();
      });
    });
  };


  return (
    <div className="Nav">
      <Navbar />
      <div className="profile">
        {data.length != 0 ? (
          <img
            src={CategoryData[data[0].playerId][1]}
            className="profile-img"
          />
        ) : (
          <div class="spinner-border text-warning" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        )}
        <div className="profile-content">
          <div className="profile-info">
            <img src="./Ellipse2.svg" className="mt-2 ml-1" />
            <div className="profile-info2">
              <div className="profile-info1">
                <p className="username">this is godfather</p>
                <img src="./Vector.svg" className="ml-2" />
              </div>
              <p className="address">
                {account.substring(0, 5) +
                  "..." +
                  account
                    .substring(
                      account.length - 5,
                      account.length
                    )}
              </p>
            </div>
          </div>
          <h1 className="title1">You currently own</h1>
          <h1 className="title2">
            {data.length != 0 ? (
              CategoryData[data[0].playerId][0]
            ) : (
              <div class="spinner-border text-warning" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            )}
          </h1>
          <div className="icons-desc">
            <div className="icon1">
              <div>
                <img src="./Stats.svg" />
              </div>
              <p className="subtitle">
                {data.length != 0 ? (
                  data[0].score
                ) : (
                  <div class="spinner-border text-warning" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                )}{" "}
                Score
              </p>
            </div>
            <div className="icon2">
              <div>
                <img src="./Coin.svg" />
              </div>
              <p className="subtitle">
                {data.length != 0 ? (
                  data[0].history.length
                ) : (
                  <div class="spinner-border text-warning" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                )}{" "}
                Transactions
              </p>
            </div>
            <div className="icon3">
              <p className="subtitle">
                {data.length != 0 ? (
                  data.leaderboard
                ) : (
                  <div class="spinner-border text-warning" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                )}{" "}
                Rank
              </p>
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
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={() => updateSellAmt()}
                  >
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
              {data.length != 0 ? (
                data[0].history.map((item) => (
                  <tr>
                    <th scope="row">{item}</th>
                    <td>{CategoryData[item][0]}</td>
                  </tr>
                ))
              ) : (
                <div class="spinner-border text-warning" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
