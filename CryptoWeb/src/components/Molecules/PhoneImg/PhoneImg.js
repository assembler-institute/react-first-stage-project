import React from "react";

import iphone from "../../../img/iphone_frame.png";
import bitcoin from "../../../img/bitcoin-pic.jpg";

import "./PhoneImg.scss";

export default function PhoneImg() {
  return (
    <>
      <div style={{ position: "relative", right: "10rem" }}>
        <img alt="Iphone Frame" className="iphone-frame" src={iphone} />
        <img alt="Bitcoin" className="bitcoin-img" src={bitcoin} />
      </div>
    </>
  );
}
