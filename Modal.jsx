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
            Scavenger AR is an scavenger generator
          </p>
        </div>
        <p className="note">
          Step 1. Log into Spotify Account <br></br>
          Step 2. Click Get Random Song <br></br>
          Step 3. Guess the first five letters of the song title! <br></br>
        </p>
        <p className="note">
            Hello World
        </p>

        <div className="footer">
          {/* <button onClick={() => setOpenModal(false)}>
              Log into Spotify
            </button> */}
          <button onClick={() => setOpenModal(false)}> Let's Go! </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
