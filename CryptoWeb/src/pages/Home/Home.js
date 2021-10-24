import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import FlexDiv from "../../components/Atoms/FlexDiv/FlexDiv";
import CryptoBoard from "../../components/Organisms/CryptoBoard/CryptoBoard";
import InfoBoard from "../../components/Organisms/InfoBoard/InfoBoard";
import { CryptoWebContext } from "../../context/CryptoWeb/reducer";
import withLayout from "../../HOC/withLayout";

function Home() {
  const { isAuth } = useContext(CryptoWebContext);
  const local = JSON.parse(localStorage.getItem("Users"));
  const currentUser = local.find((e) => e.isCurrentUser);
  return (
    <>
      {!isAuth && <Redirect to="/" />}
      {!currentUser && <Redirect to="/" />}

      <FlexDiv>
        <CryptoBoard currentUser={currentUser} />
        <InfoBoard />
      </FlexDiv>
    </>
  );
}
export default withLayout(Home);
