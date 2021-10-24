import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CryptoWebContext } from "../../../context/CryptoWeb/reducer";

import RegularButton from "../../Atoms/RegularButton/RegularButton";

import "./NoCryptoSign.scss";

export default function NoCryptoSign() {
  const { user } = useContext(CryptoWebContext);
  return (
    <div className="no-crypto">
      <p>Hi, {user.username}</p>
      <h2>Start creating your own cryptowallet</h2>
      <Link to="/transactions">
        <RegularButton>Check your options</RegularButton>
      </Link>
    </div>
  );
}

