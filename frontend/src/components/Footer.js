import React from 'react'
import '../styles/footer.css'
import { FaInstagram,FaTwitter,FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="footer">
        <div className="sidebar">
            <FaInstagram className="icons"/>
            <FaTwitter  className="icons"/>
            <FaLinkedinIn className="icons"/>
        </div>
        <div className="footer-content">
            <h1 className="head3">Ready to start earning? Connect your wallet and get 50 coins for free.</h1>
            <p className="para3 mt-5 mb-5">Radio signals transmitted from a controller device control the actions of a remote device. In radio communication, used in radio and television broadcasting, cell phones, two-way radios, wireless networking.Radio signals transmitted from a controller device control the actions of a remote device. In radio communication, used in radio and television broadcasting, cell phones, two-way radios, wireless networking.</p>
            <img src='./iplwinner.jpg' className="img-footer"/>
        </div>
    </div>
  )
}

export default Footer