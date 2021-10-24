import React, { useContext } from "react";
import { Redirect } from "react-router";

import LogIn from "../../components/Organisms/LogIn/LogIn";
import SignUp from "../../components/Organisms/SignUp/SignUp";
import FlexDiv from "../../components/Atoms/FlexDiv/FlexDiv";
import CustomDiv from "../../components/Atoms/CustomDiv/CustomDiv";
import { CryptoWebContext } from "../../context/CryptoWeb/reducer";
import PhoneImg from "../../components/Molecules/PhoneImg/PhoneImg";

import "./Auth.scss";

export default function Auth() {
  const { isAuth } = useContext(CryptoWebContext);
  return (
    <>
      {isAuth && <Redirect to="/home" />}
      <FlexDiv style={{ margin: "10rem 15rem 9rem 6rem" }}>
        <h1 className="intro-title">
          Learn to manage your cryptowallet and take the next step
        </h1>
        <PhoneImg />
      </FlexDiv>
      <FlexDiv>
        <CustomDiv>
          <LogIn />
        </CustomDiv>
        <CustomDiv>
          <SignUp />
        </CustomDiv>
      </FlexDiv>
    </>
  );
}
