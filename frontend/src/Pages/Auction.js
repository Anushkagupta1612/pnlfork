import React from 'react';
import { useState } from 'react';
import Navbar from '../components/Navbar'
import Footer from "../components/Footer";
import '../styles/auction.css'
import {iplData} from '../iplData'

const Auction = () => {

  const [ showPlayer, setshowPlayer ] = useState( false );
  const [ showButtons, setshowButtons ] = useState( false );
  const [ placeBid, setplaceBid ] = useState( false );
  const [ bidAmount, setbidAmount ] = useState( 0 );
  const [team, setTeam] = useState([]);

  const teamNameHandler = (e) => {
    setTeam(iplData[e])
    setshowPlayer( true );
  }

  const playerNameHandler = () => {
    setshowButtons( true );
  }

  const placeBidHandler = () => {
    setplaceBid( true );
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
        !showButtons ? <></> :
          <div className='Panel'>
            <div className='Bid'>
              <button className='tradingButton'>Highest Bid</button>
              <button className='tradingButton'>Lowest Bid</button>
            </div>

            <div className='Bid'>
              {/* <button className='tradingButton'>Base price</button> */}
              {/* <button className='tradingButton'>Place your</button> */ }
              <div class="input-block">
                    <input
                      type="text"
                      name="input-text"
                      id="input-text"
                      required
                      spellcheck="false"
                      onChange={ enterYourBidHandler }
                    />
                    <span class="placeholder">Enter your bid</span>
              </div>
            </div>
            <button onClick={ placeBidHandler } className='PlaceBid'>Place Bid</button>

            {
              !placeBid ? <></> :
                <div className='Bid'>
                  <button className='tradingButton'>Your bid placed</button>
                  <button className='tradingButton'>Update Bid</button>
                </div>
            }
          </div>
      }


      <Footer />
    </div >
  )
}

export default Auction