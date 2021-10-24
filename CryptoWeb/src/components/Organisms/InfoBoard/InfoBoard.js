import React from "react";

import CustomDiv from "../../Atoms/CustomDiv";

import "./InfoBoard.scss";

export default function InfoBoard() {
  const local = JSON.parse(localStorage.getItem("Users"));
  const currentUser = local.find((e) => e.isCurrentUser);
  const totalCrypto = () => {
    if (currentUser.cryptos[0]) {
      return currentUser.cryptos
        .map((crypto) => crypto.quote.USD.price)
        .reduce((a, b) => a + b);
    } else return 0;
  };
  const totalInvestment = currentUser.USD + totalCrypto();
  const evolution = parseFloat(
    ((totalInvestment - 100000) * 100) / 100000
  ).toFixed(5);
  return (
    <CustomDiv>
      <ul className="info-list">
        <li>
          <strong>Your Account:</strong>
        </li>
        <li>
          <strong>USD:</strong>
          {currentUser.USD}
        </li>
        <li>
          <strong>Total Crypto:</strong>
          {totalCrypto() === 0 ? 0 : parseFloat(totalCrypto()).toFixed(5)}
        </li>
        <li>
          <strong>Total Investment:</strong>
          {parseFloat(totalInvestment).toFixed(2)}
        </li>
        <li>
          <strong>Evolution:</strong>
          <span className={evolution >= 0 ? "positive" : "negative"}>
            {totalCrypto() === 0 ? "0%" : `${evolution}%`}
          </span>
        </li>
      </ul>
    </CustomDiv>
  );
}
