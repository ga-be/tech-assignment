import React from "react";
import "./Popup.css";

const PopUp = ({ popUpImg, setPopUp, setPopUpImg }) => {
  const popUpCloseHandler = () => {
    setPopUp(false);
    setPopUpImg(null);
  };

  return (
    <div className="PopUp">
      <button className="popup-x" onClick={popUpCloseHandler}>
        X
      </button>
      <img
        className="pu-img"
        src={`data:image/jpeg;base64,${popUpImg}`}
        alt="bone"
      />
    </div>
  );
};

export default PopUp;
