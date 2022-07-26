import React from 'react';
import { useState,useEffect } from 'react';
import Navbar from '../components/Navbar'
import Footer from "../components/Footer";
import '../styles/trading.css';
import { ethers } from "ethers";
import { PlayerIdData } from "../playerToid";
import {iplData} from '../iplData'
import { CategoryData } from "../data";
import { useWeb3React } from "@web3-react/core"
import {injected} from '../components/wallet/connector'

const Trading = () => {
  const { active, account, library, connector, activate, deactivate } = useWeb3React()
  const [ showPlayer, setshowPlayer ] = useState( false );
  const [ showImage, setshowImage ] = useState( false );
  const [ showBut, setshowBut] = useState( true );
  const [ bidAmount, setbidAmount ] = useState( 0 );
  const [data, setData] = useState([]);
  const [team, setTeam] = useState([]);
  const [playerId, setPlayerId] = useState(0);
  const [sellerAddress, setsellerAddress ] = useState(0)
  const addr = ethers.utils.getAddress(account);

  const teamNameHandler = (e) => {
    setTeam(iplData[e])
    setshowPlayer( true );
  }

  const playerNameHandler = (e) => {
    setshowImage( true );
    setPlayerId(PlayerIdData[e]);
    getAddress(PlayerIdData[e])
    getData1(PlayerIdData[e]);
  }

  const enterYourBidHandler = ( event ) => {
    event.preventDefault();
    setbidAmount( event.target.value );
  }

  async function getData1(playerId) {
    await fetch(`http://localhost:3005/trading/${addr}/${playerId}`)
      .then((res) => {
        res.json().then((data1) => {
          setData(data1);
          return;
        });
      })
      .catch((e) => console.log(e.message));
  }

  async function getAddress(playerId) {
    await fetch(`http://localhost:3005/trading/${playerId}`)
      .then((res) => {
        res.json().then((data1) => {
          if(data1[0]===false){
            setshowBut(false);
          }else{
            setsellerAddress(data1[2])
            setshowBut(true);
          }
          return;
        });
      })
      .catch((e) => console.log(e.message));
  }

  const buy = async () => {
    await fetch(`http://localhost:3005/trading/${addr}/${playerId}/${sellerAddress}`, {
      method: "PATCH",
      headers: {
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{
        playerId:0,
        sell:false,
        sellAmount:0
    },{
        playerId:playerId
    }]),
    }).then((res) => {
      res.json().then((resp) => {
        console.log('Done!')
      });
    });
  };


  return (
    <div className="Nav">
      <Navbar />
      <div className='Details'>
        <div class="accordion" id="accordionExample">

          <div class="card">
            <h2 class="mb-0">
              <button class=" cardInnerBox btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                SELECT YOUR TEAM!
              </button>
            </h2>
          </div>

          <div id="collapseOne" class=" show collapse" aria-labelledby="headingOne" data-parent="#accordionExample" >
          <button className='teamName mt-3' onClick={() => teamNameHandler('CSK') }> CSK </button>
            <button className='teamName' onClick={() => teamNameHandler('MI') } > MI </button>
            <button className='teamName' onClick={() => teamNameHandler('GT') } > GT </button>
            <button className='teamName' onClick={() => teamNameHandler('RR') } > RR </button>
          </div>

        </div>
      </div>

      {
        !showPlayer ? <></> :
          <div className='Details'>
            <div class="accordion" id="accordionExample1">

              <div class="card">
                <h2 class="mb-0">
                  <button class=" cardInnerBox btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne1" aria-expanded="true" aria-controls="collapseOne">
                    SELECT YOUR PLAYER!
                  </button>
                </h2>
              </div>

              <div id="collapseOne1" class=" show collapse mt-3" aria-labelledby="headingOne" data-parent="#accordionExample1" >
              {team.map((item,val) =>(
                  <button className='teamName' onClick={() => playerNameHandler(item) }> {item} </button>)
                )}
              </div>

            </div>
          </div>
      }

      {
        !showImage ? <></> :
          <div className='NFTDetails'>
          {playerId != 0 ? (
          <img
            src={CategoryData[playerId][1]}
            className='PlayerNFT'
          />
        ) : (
          <div class="spinner-border text-warning" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        )}
            <div className='Price'>
              {data.map((item, val) => (
                <button
                  className="priceButton"           
                >
                  {item[1]}
                </button>
              ))}
            </div>
            {showBut && (<button class="button-75" role="button" ><span class="text" onClick={() =>buy()}>BUY IT NOW!</span></button>)}
  
          </div>
      }
      <Footer />
    </div >
  )
}

export default Trading;