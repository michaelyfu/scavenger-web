import React, { useState } from "react";
import { useEffect } from "react";
import "./Modal.css";

function Modal({ setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => setOpenModal(false)}> X </button>
        </div>
        <div className="title">
          <h1>Welcome to Scavenger AR!</h1>
        </div>
        <div className="body">
          <p>
            Scavenger AR is a  <span style={{color: "#e7964a", fontWeight: "bold"}}>personalized scavenger generator</span>
          </p>
        </div>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <p className="note" style={{justifyContent: "center", alignContent: "center"}}>
          Step 1. Click on map to select your Scavenger Hunt Locations<br></br>
          Step 2. Generate a link of <span style={{color: "#e7964a", fontWeight: "bold"}}>your Scavenger</span> you can send to your friends <br></br>
          Step 3. Have your users play your Scavenger Hunt <span style={{color: "#e7964a", fontWeight: "bold"}}>in real life!</span><br></br>
        </p>
        </div>
        {/* <p className="note">
            Hello World
        </p> */}

        <div className="footer">
          {/* <button onClick={() => setOpenModal(false)}>
              Log into Spotify
            </button> */}
          <button onClick={() => setOpenModal(false)} style={{backgroundColor: "#f7ba2a", color: "#0f0f0f", fontWeight: "bold"}}> Let's Go! </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
