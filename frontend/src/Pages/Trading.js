import React from 'react';
import { useState } from 'react';
import Navbar from '../components/Navbar'
import Footer from "../components/Footer";
import '../styles/trading.css';
import {iplData} from '../iplData'

const Trading = () => {
  const [ showPlayer, setshowPlayer ] = useState( false );
  const [ showImage, setshowImage ] = useState( false );
  const [ bidAmount, setbidAmount ] = useState( 0 );
  const [team, setTeam] = useState([]);

  const teamNameHandler = (e) => {
    setTeam(iplData[e])
    setshowPlayer( true );
  }

  const playerNameHandler = () => {
    setshowImage( true );
  }

  const enterYourBidHandler = ( event ) => {
    event.preventDefault();
    setbidAmount( event.target.value );
    console.log( bidAmount );
  }

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
                  <button className='teamName' onClick={() => playerNameHandler() }> {item} </button>)
                )}
              </div>

            </div>
          </div>
      }

      {
        !showImage ? <></> :
          <div className='NFTDetails'>
            <img src='https://pbs.twimg.com/profile_images/1471139701025226752/oXOAz0JZ_400x400.jpg' className='PlayerNFT' />
            <div className='Price'>
              <button className='priceButton'>500</button>
              <button className='priceButton'>600</button>
              <button className='priceButton'>700</button>
              <button className='priceButton'>800</button>
              <button className='priceButton'>900</button>
            </div>
            <button class="button-75" role="button"><span class="text">BUY IT NOW!</span></button>
          </div>
      }
      <Footer />
    </div >
  )
}

export default Trading;