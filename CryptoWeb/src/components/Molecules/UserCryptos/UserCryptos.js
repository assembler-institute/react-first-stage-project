import React, { useContext, useEffect } from "react";

import { Link } from "react-router-dom";

import { CryptoWebContext } from "../../../context/CryptoWeb/reducer";
import getCryptoPrices from "../../../utils/getCryptoPrices";
import CryptoInfo from "../../Atoms/CryptoInfo/CryptoInfo";
import RegularButton from "../../Atoms/RegularButton/RegularButton";
import "./UserCryptos.scss";

export default function UserCryptos() {
  const {
    isLoading,
    hasError,
    errorMessage,
    cryptoFetching,
    cryptoError,
    fetchingPrices,
  } = useContext(CryptoWebContext);
  const local = JSON.parse(localStorage.getItem("Users"));
  const currentUser = local.find((e) => e.isCurrentUser);

  useEffect(() => {
    cryptoFetching();
    getCryptoPrices(currentUser.cryptos).then((res) => {
      res[0].status === 200 ? fetchingPrices(res) : cryptoError(res[0]);
    });
  }, []);
  return (
    <>
      <div className="table__info">
        <p>Crypto</p>
        <p>Symbol</p>
        <p>Quantity</p>
        <p>Price</p>
      </div>
      {isLoading && (
        <div>
          <p>Updating your cryptocurrencies...</p>
        </div>
      )}
      {!isLoading && hasError && (
        <div>
          <p>Something went wrong</p>
          <p>{errorMessage}</p>
        </div>
      )}
      {currentUser.cryptos[0] &&
        !isLoading &&
        !hasError &&
        currentUser.cryptos.map((crypto) => {
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
