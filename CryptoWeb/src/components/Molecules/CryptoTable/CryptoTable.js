import React from "react";

import { Link } from "react-router-dom";

import CryptoInfo from "../../Atoms/CryptoInfo/CryptoInfo";
import RegularButton from "../../Atoms/RegularButton/RegularButton";
import "../UserCryptos/UserCryptos.scss";

export default function CryptoTable() {
  const local = JSON.parse(localStorage.getItem("Users"));
  const currentUser = local.find((e) => e.isCurrentUser);

  return (
    <>
      <div className="table__info">
        <p>Crypto</p>
        <p>Symbol</p>
        <p>Quantity</p>
        <p>Price</p>
      </div>
      {currentUser.cryptos.map((crypto) => {
        return <CryptoInfo key={crypto.id} id={crypto.id} />;
      })}
      <div className="table__button">
        <Link to="/transactions">
          <RegularButton>Check more options</RegularButton>
        </Link>
      </div>
    </>
  );
}
