import React,{ useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/profile.css";
import { useMoralis } from "react-moralis";

const Profile = () => {

  const { authenticate, isAuthenticated, user, logout, isAuthenticating } = useMoralis();
  const [ data, setData ] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3005/profile/${user.get( 'ethAddress' )}`).then((res) => {
      res.json().then((data1) => {
        setData(data1);
      })
    }).catch((e)=> console.log(e.message));
    
  },[])
  console.log(data)

  return (
    <div className="Nav">
      <Navbar />
      <div className="profile">
        <img src="./Rectangle2.png" className="profile-img" />
        <div className="profile-content">
          <div className="profile-info">
            <img src='./Ellipse2.svg' className="mt-2 ml-1" />
            <div className="profile-info2">
              <div className="profile-info1">
                <p className="username">this is godfather</p>
                <img src='./Vector.svg' className="ml-2" />
              </div>
              <p className="address">{ user.get( 'ethAddress' ).substring( 0, 5 ) + "..." + user.get( 'ethAddress' ).substring( user.get( 'ethAddress' ).length - 5, user.get( 'ethAddress' ).length ) }</p>
            </div>
          </div>
          <h1 className="title1">You currently own</h1>
          <h1 className="title2">Pat Cummins</h1>
          <div className="icons-desc">
            <div className="icon1">
              <div>
                <img src="./Stats.svg" />
              </div>
              <p className="subtitle">52</p>
            </div>
            <div className="icon2">
              <div>
                <img src="./Coin.svg" />
              </div>
              <p className="subtitle">139</p>
            </div>
            <div className="icon3">
              <p className="subtitle">Bought for 2.2 ETH</p>
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
          <button className="sellbut">SELL NFT</button>
          <h1 className="transaction">Previous Transactions</h1>
          <table class="table table-borderless text-white mb-5">
            <thead>
              <tr className="tablehead">
                <th scope="col">Card Player</th>
                <th scope="col">Date of Transaction</th>
                <th scope="col">Nature of Transaction</th>
                <th scope="col">Value of Transaction</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
