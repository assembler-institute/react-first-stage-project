import React from "react";

import "../../Molecules/UserCryptos/UserCryptos.scss";

export default function CryptoInfo(props) {
  const local = JSON.parse(localStorage.getItem("Users"));
  const currentUser = local.find((e) => e.isCurrentUser);
  const { id } = props;
  const { cryptos } = currentUser;
  const crypto = cryptos.find((crypto) => crypto.id === id);
  return (
    <div className="table__info">
      <p>{crypto.name}</p>
      <p>{crypto.symbol}</p>
      <p>{crypto.amount}</p>
      <p>{parseFloat(crypto.quote.USD.price).toFixed(5)}</p>
    </div>
  );
}
