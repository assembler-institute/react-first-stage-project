import React from "react";

import CustomDiv from "../../Atoms/CustomDiv";
import NoCryptoSign from "../../Molecules/NoCryptoSign/NoCryptoSign";
import UserCryptos from "../../Molecules/UserCryptos";

export default function CryptoBoard() {
  const local = JSON.parse(localStorage.getItem("Users"));
  const currentUser = local.find((e) => e.isCurrentUser);
  return (
    <CustomDiv>
      {currentUser.cryptos[0] ? <UserCryptos /> : <NoCryptoSign />}
    </CustomDiv>
  );
}
