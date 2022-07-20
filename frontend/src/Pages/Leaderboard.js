import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/leaderboard.css";

const Leaderboard = () => {
  return (
    <div className="Nav">
      <Navbar />
      <div className="leftright">
        <div className="left" id="style-14">
          <div className="toppers">
            <div className="leader-holder">
              <img src="./1.svg" />
              <div className="leader-p-holder">
                <p className="leader-p1">150,000</p>
                <p className="leader-p2">AV5f...GL81</p>
              </div>
            </div>
            <div className="leader-holder">
              <img src="./2.svg" />
              <div className="leader-p-holder">
                <p className="leader-p1">120,000</p>
                <p className="leader-p2">AV5f...GJ81</p>
              </div>
            </div>
            <div className="leader-holder">
              <img src="./3.svg" />
              <div className="leader-p-holder">
                <p className="leader-p1">150,000</p>
                <p className="leader-p2">AV5f...GO81</p>
              </div>
            </div>
          </div>

          <table class="table table-borderless text-white ml-3">
            <tbody>
              <tr>
                <th scope="row">#4</th>
                <td>[username]</td>
                <td>1210</td>
                <td>AV5f...GL81</td>
              </tr>
              <tr>
                <th scope="row">#4</th>
                <td>[username]</td>
                <td>1210</td>
                <td>AV5f...GL81</td>
              </tr>
              <tr>
                <th scope="row">#4</th>
                <td>[username]</td>
                <td>1210</td>
                <td>AV5f...GL81</td>
              </tr>
              <tr>
                <th scope="row">#4</th>
                <td>[username]</td>
                <td>1210</td>
                <td>AV5f...GL81</td>
              </tr>
              <tr>
                <th scope="row">#4</th>
                <td>[username]</td>
                <td>1210</td>
                <td>AV5f...GL81</td>
              </tr>
              <tr>
                <th scope="row">#4</th>
                <td>[username]</td>
                <td>1210</td>
                <td>AV5f...GL81</td>
              </tr>
              <tr>
                <th scope="row">#4</th>
                <td>[username]</td>
                <td>1210</td>
                <td>AV5f...GL81</td>
              </tr>
              <tr>
                <th scope="row">#4</th>
                <td>[username]</td>
                <td>1210</td>
                <td>AV5f...GL81</td>
              </tr>
              <tr>
                <th scope="row">#4</th>
                <td>[username]</td>
                <td>1210</td>
                <td>AV5f...GL81</td>
              </tr>
              <tr>
                <th scope="row">#4</th>
                <td>[username]</td>
                <td>1210</td>
                <td>AV5f...GL81</td>
              </tr>
              <tr>
                <th scope="row">#4</th>
                <td>[username]</td>
                <td>1210</td>
                <td>AV5f...GL81</td>
              </tr>
              <tr>
                <th scope="row">#4</th>
                <td>[username]</td>
                <td>1210</td>
                <td>AV5f...GL81</td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex ml-5 mt-5">
            <button className="load mr-5">LOAD MORE</button>
            <button className="load">JUMP TO MY POSITION</button>
          </div>
        
      </div>
      <div className="right">
        <h1 className="head1">See who's on top</h1>
        <div className="d-flex flex-row justify-center home">
          <div className="liendiv">
            <hr className="line mr-2" />
          </div>
          <h1 className="head2"> of the game</h1>
        </div>
        <p className="para">
          Radio signals transmitted from a controller device control the actions
          of a remote device. In radio communication, used in radio and
          television broadcasting, cell phoation, used in radio and television
          broadcasting, cell phones, two-way radios, wireless networking and
          satellite communication among numerous other uses.
        </p>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Leaderboard;
