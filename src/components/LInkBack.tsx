import React from "react";
import { useNavigate } from "react-router-dom";
import back from "/images/backk.svg";

const LInkBack = () => {
  const location = useNavigate();
  const goBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    location(-1);
  };
  return (
    <button className="linkback" onClick={goBack}>
      <img className="linkback_img" src={back} alt="back" />
    </button>
  );
};

export default LInkBack;
