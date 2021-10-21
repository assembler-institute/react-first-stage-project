import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CryptoWebContext } from "../../../context/CryptoWeb/reducer";
import CryptoInfo from "../../Atoms/CryptoInfo/CryptoInfo";
import RegularButton from "../../Atoms/RegularButton/RegularButton";
import "./CryptoTable.scss";

export default function CryptoTable() {
  const { user } = useContext(CryptoWebContext);

  return (
    <>
      <div className="table__info">
        <p>Crypto</p>
        <p>Symbol</p>
        <p>Quantity</p>
        <p>Price</p>
      </div>
      {user.cryptos.map((crypto) => {
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
