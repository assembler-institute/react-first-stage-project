import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router";

import CustomDiv from "../../components/Atoms/CustomDiv";
import { CryptoWebContext } from "../../context/CryptoWeb/reducer";
import withLayout from "../../HOC/withLayout";
import getCryptoList from "../../utils/getCryptoList";
import RegularButton from "../../components/Atoms/RegularButton/RegularButton";
import ModuleBuy from "../../components/Molecules/ModuleBuy";

function Transactions() {
  const {
    isAuth,
    cryptoFetching,
    cryptoError,
    cryptoSuccess,
    isLoading,
    hasError,
    cryptoList,
  } = useContext(CryptoWebContext);
  useEffect(async () => {
    cryptoFetching();
    const res = await getCryptoList();
    res.status === 200 ? cryptoSuccess(res.data.data) : cryptoError(res);
  }, []);
  return (
    <>
      {!isAuth && <Redirect to="/" />}
      <CustomDiv>
        <div className="table__info__font">
          <p>Crypto</p>
          <p>Symbol</p>
          <p>Price</p>
          <p>$</p>
        </div>
        {isLoading && (
          <div>
            <p>Loading cryptocurrencies...</p>
          </div>
        )}
        {!isLoading && hasError && (
          <div>
            <p>Something went wrong</p>
            <p>Sorry, we are having some problems now</p>
          </div>
        )}
        {cryptoList &&
          !hasError &&
          !isLoading &&
          cryptoList.map((crypto) => (
            <div key={crypto.id} id={crypto.id} className="table__info">
              <p>{crypto.name}</p>
              <p>{crypto.symbol}</p>
              <p>{parseFloat(crypto.quote.USD.price).toFixed(5)}</p>
              <div className="table__button">
                <ModuleBuy crypto={crypto} />
              </div>
            </div>
          ))}
        <div className="table__button">
          <RegularButton>Load more</RegularButton>
        </div>
      </CustomDiv>
    </>
  );
}

export default withLayout(Transactions);
