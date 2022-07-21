import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/leaderboard.css";

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [start, setstart] = useState(3);

  async function getData() {
    await fetch("http://localhost:3005/leaderboard/")
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

  console.log(data);

  return (
    <div className="Nav">
      <Navbar />
      <div className="leftright">
        <div className="left" id="style-14">
          <div className="toppers">
            <div className="leader-holder">
              <img src="./1.svg" />
              <div className="leader-p-holder">
                <p className="leader-p1">
                  {data.length != 0 ? data[0].score : null}
                </p>
                <p className="leader-p2">
                  {data.length != 0
                    ? data[0].address.substring(0, 5) +
                      "..." +
                      data[0].address.substring(
                        data[0].address.length - 5,
                        data[0].address.length
                      )
                    : null}
                </p>
              </div>
            </div>
            <div className="leader-holder">
              <img src="./2.svg" />
              <div className="leader-p-holder">
                <p className="leader-p1">
                  {data.length != 0 ? data[1].score : null}
                </p>
                <p className="leader-p2">
                  {data.length != 0
                    ? data[1].address.substring(0, 5) +
                      "..." +
                      data[1].address.substring(
                        data[1].address.length - 5,
                        data[1].address.length
                      )
                    : null}
                </p>
              </div>
            </div>
            <div className="leader-holder">
              <img src="./3.svg" />
              <div className="leader-p-holder">
                <p className="leader-p1">
                  {data.length != 0 ? data[2].score : null}
                </p>
                <p className="leader-p2">
                  {data.length != 0
                    ? data[2].address.substring(0, 5) +
                      "..." +
                      data[2].address.substring(
                        data[2].address.length - 5,
                        data[2].address.length
                      )
                    : null}
                </p>
              </div>
            </div>
          </div>

          <table class="table table-borderless text-white table">
            <tbody>
              {data
                .slice(start, Math.min(data.length, start + 6) + 1)
                .map((item, key) => (
                  <tr>
                    <th scope="row">{key + 4}</th>
                    <td>{item.score}</td>
                    <td>
                      {item.address.substring(0, 5) +
                        "..." +
                        item.address.substring(
                          item.address.length - 5,
                          item.address.length
                        )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/* <div className="d-flex table1 mt-5">
            <button className="load mr-5">LOAD MORE</button>
            <button className="load">JUMP TO MY POSITION</button>
          </div> */}
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item disabled">
                <a
                  class="page-link"
                  href="#"
                  tabindex="-1"
                  aria-disabled="true"
                >
                  Previous
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  1
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  2
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  3
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
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
            Radio signals transmitted from a controller device control the
            actions of a remote device. In radio communication, used in radio
            and television broadcasting, cell phoation, used in radio and
            television broadcasting, cell phones, two-way radios, wireless
            networking and satellite communication among numerous other uses.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Leaderboard;
