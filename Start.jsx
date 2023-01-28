import React, { useState } from "react";
import { useEffect } from "react";
import Modal from "./Modal.jsx";
import App from "./App.tsx";

function Start() {
  const [openModal, setOpenModal] = useState(true);
  // let visited = localStorage["alreadyVisited"];
  useEffect(() => {
    let isCancelled = false;

    // if (visited) {
    //   setOpenModal(false);
    //   //do not view Popup
    // } else {
      //this is the first time
      // localStorage["alreadyVisited"] = true;
      setOpenModal(true);
    // }
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <>
      {openModal && <Modal setOpenModal={setOpenModal} />}
      {!openModal && <App setOpenModal={!setOpenModal} />}
    </>
  );
}

export default Start;