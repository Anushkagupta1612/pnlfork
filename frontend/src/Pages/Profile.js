import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/profile.css";
import { ethers } from "ethers";
import { CategoryData } from "../data";
import { MetaData } from "../metadata";
import { useWeb3React } from "@web3-react/core";
import abi from "../artifacts/contracts/auction.sol/auction.json";
import abin from "../artifacts/contracts/nftMint.sol/pnl.json";
import { create } from "ipfs-http-client";

const Profile = () => {
  const { ethereum } = window;
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const [data, setData] = useState({});
  const [sellVal, setsellVal] = useState(0);
  const addr = ethers.utils.getAddress(account);
  let sendnftbut = useState(
    localStorage.getItem("getnft") ? localStorage.getItem("getnft") : false
  );
  const [editname, setname] = useState("");
  let name = localStorage.getItem("name")
    ? localStorage.getItem("name")
    : "silver_blue";
  let showbutton = useState(
    localStorage.getItem("withdraw") ? localStorage.getItem("withdraw") : true
  );
  const contractABI = abi.abi;
  const contractAddress = "0x77086505161c2eee97F07F0f49c5A5AD04aBe464"; //auction

  const nftABI = abin.abi;
  const nftAddress = "0x52B93e24BE8C760a12556AB8Ec0eb539D9d65696"; //nft

  async function getData() {
    await fetch(`http://localhost:3005/profile/${addr}`)
      .then((res) => {
        res.json().then((data1) => {
          setData(data1);
        });
      })
      .catch((e) => console.log(e.message));
  }

  async function topaddressfn() {
    await fetch("http://localhost:3005/leaderboard/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        res.json().then((resp) => {
          console.log(resp);
          if (resp.includes(addr)) {
            localStorage.setItem("getnft", true);
          }
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

  const updateSellAmt = async () => {
    await fetch(`http://localhost:3005/profile/${addr}`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
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

  const withdraw = async () => {
    if (typeof ethereum !== "undefined") {
      console.log("MetaMask is installed!");
      const provider = new ethers.providers.Web3Provider(ethereum);
      const tempSigner = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        tempSigner
      );
      const transaction = await contract.return_money(addr);
      await transaction.wait();
      showbutton = localStorage.setItem("withdraw", false);
      localStorage.setItem("withdraw", false);
    } else {
      console.log("Metamask not found!");
    }
  };

  const edit = () => {
    name = localStorage.setItem("name", editname);
  };

  const getUrlExtension = (url) => {
    return url.split(/[#?]/)[0].split(".").pop().trim();
  };

  const onImageEdit = async (imgUrl) => {
    var imgExt = getUrlExtension(imgUrl);

    const response = await fetch(imgUrl);
    const blob = await response.blob();
    const file = new File([blob], "profileImage." + imgExt, {
      type: blob.type,
    });
    return file;
  };

  const updateSell = async (amount) => {
    await fetch(`http://localhost:3005/profile/${data[0].playerId}/${addr}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playeerid: amount
      }),
    })
      .then((res) => {
        res.json().then((resp) => {
          console.log("hi");
        });
      })
      .catch((e) => console.log(e));
  };

  const claimNft = async () => {
    const client = create("https://ipfs.infura.io:5001/api/v0");
    const imageurl = CategoryData[data[0].playerId][1];
    console.log("Real Image ", imageurl);
    const file = await onImageEdit(imageurl);
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      const { ethereum } = window;

      if (typeof ethereum !== "undefined") {
        console.log("MetaMask is installed!");
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(nftAddress, nftABI, signer);
        console.log(url);

        const stringurl = url.toString();
        const tempMetadata = MetaData[data[0].playerId];
        tempMetadata.image = stringurl;
        console.log(tempMetadata);

        const metadata_string = JSON.stringify(tempMetadata);
        const textipfs = await client.add(metadata_string);
        const metadataurl = `https://ipfs.infura.io/ipfs/${textipfs.path}`;
        console.log(metadataurl);

        const transaction = await contract.mintToken(metadataurl);
        const trans = await transaction.wait(5)  //.then(console.log)
        console.log(trans)
        const {events} = trans;
        const x = events[0];
        const {args} = x 
        const num = args[2]._hex
        const id = Number(num);
        console.log(id);
        await updateSell(id);
        // 2 5 67 100 56
      } else {
        console.log("Metamask not found");
      }
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  return (
    <div className="Nav">
      <Navbar />
      <div className="profile">
        {Object.keys(data).length != 0 ? (
          <img
            src={CategoryData[data[0].playerId][1]}
            className="profile-img"
          />
        ) : (
          <img src="./logo.PNG" className="profile-img" />
        )}
        <div className="profile-content">
          <div className="profile-info">
            <img src="./Ellipse2.svg" className="mt-1 mr-2 ml-1" />
            <div className="profile-info2">
              <div className="profile-info1">
                <p className="username">{name}</p>
                <img
                  src="./Vector.svg"
                  className="ml-2"
                  data-toggle="modal"
                  data-target="#exampleModal1"
                />
              </div>

              <div
                class="modal fade"
                id="exampleModal1"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Enter your nickname
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
                          value={editname}
                          onChange={(e) => setname(e.target.value)}
                        />
                        <span class="placeholder">Enter your nickname</span>
                      </div>
                    </div>

                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                        onClick={() => setname("")}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={() => edit()}
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <p className="address">
                {account.substring(0, 5) +
                  "..." +
                  account.substring(account.length - 5, account.length)}
              </p>
            </div>
          </div>

          {Object.keys(data).length != 0 ? (
            <h1 className="title1">You currently own</h1>
          ) : (
            <h1 className="title1">Invest in cool player NFTs</h1>
          )}
          <h1 className="title2">
            {Object.keys(data).length != 0 ? (
              CategoryData[data[0].playerId][0]
            ) : (
              <h1 className="title3">
                Go the trading page and start your journey!
              </h1>
            )}
          </h1>

          <div className="icons-desc">
            <div className="icon1">
              <div></div>
              <p className="subtitle">
                {Object.keys(data).length != 0 ? data[0].score : " -- "}
                Score
              </p>
            </div>
            <div className="icon2">
              <div>
                <img src="./Coin.svg" />
              </div>
              <p className="subtitle mr-1">
                {Object.keys(data).length != 0
                  ? data[0].history.length
                  : " -- "}
                Transactions
              </p>
            </div>
            <div className="icon3">
              <div>
                <img src="./Stats.svg" />
              </div>
              <p className="subtitle">
                {Object.keys(data).length != 0 ? data.leaderboard : " -- "}
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

          {Object.keys(data).length != 0 ? (
            <button
              type="button"
              class="sellbut"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              SELL NFT
            </button>
          ) : null}

          <div className="d-flex mt-2">
            {Object.keys(data).length == 0 && showbutton[0] === "true" ? (
              <button class="sellbut" type="button" onClick={() => withdraw()}>
                Withdraw Funds!
              </button>
            ) : null}

            {account === "0xD502bE9BffE489dF94ad7F0a9b81E52d7731a5ad" ? (
              <button
                class="sellbut"
                type="button"
                onClick={() => topaddressfn()}
              >
                Get address
              </button>
            ) : null}

            {sendnftbut[0] === "true" ? (
              <button class="sellbut" type="button" onClick={() => claimNft()}>
                Claim NFT
              </button>
            ) : null}
          </div>

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
          {Object.keys(data).length != 0 ? (
            <>
              <h1 className="transaction">Previous Transactions</h1>
              <table class="table table-borderless text-white mb-5">
                <thead>
                  <tr className="tablehead">
                    <th scope="col">Card Player Id</th>
                    <th scope="col">Card Player Name</th>
                  </tr>
                </thead>
                <tbody>
                  {data[0].history.map((item) => (
                    <tr>
                      <th scope="row">{item}</th>
                      <td>{CategoryData[item][0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <h1 className="transaction mb-5">
              Your Transactions will be shown here!
            </h1>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
