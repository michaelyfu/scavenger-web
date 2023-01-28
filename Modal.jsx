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
          <h1>Welcome to Spotifly!</h1>
        </div>
        <div className="body">
          <p>
            Spotifly is a Spotify-based Wordle-varient where you can guess your
            favorite songs on Spotify!
          </p>
        </div>
        <p className="note">
          Step 1. Log into Spotify Account <br></br>
          Step 2. Click Get Random Song <br></br>
          Step 3. Guess the first five letters of the song title! <br></br>
        </p>
        <p className="note">
          Note: If the song title is less than 5 letters long, replace the remaining
          letters with "1"{" "}
        </p>

        <div className="footer">
          {/* <button onClick={() => setOpenModal(false)}>
              Log into Spotify
            </button> */}
          <button onClick={() => setOpenModal(false)}> Let's Play! </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
