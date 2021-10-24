import React, { createContext, useReducer } from "react";

import { signUpUser, logInUser } from "../../utils/authentication";
import buyCurrency from "../../utils/buyCurrency";
import logOut from "../../utils/logOut";

const actionTypes = {
  USER_LOGIN: "USER_LOGIN",
  USER_SIGNUP: "USER_SIGNUP",
  USER_LOGOUT: "USER_LOGOUT",
  CRYPTO_FETCHING: "CRYPTO_FETCHING",
  CRYPTO_SUCCESS: "CRYPTO_SUCCESS",
  CRYPTO_ERROR: "CRYPTO_ERROR",
  FETCHING_PRICES: "FETCHING_PRICES",
  BUY_CURRENCY: "BUY_CURRENCY",
  TYPING_INVESTMENT: "TYPING_INVESTMENT",
};

const CryptoWebContext = createContext();

const initialState = {
  user: {},
  isAuth: false,
  isLoading: false,
  hasError: false,
  errorMessage: null,
  cryptoAmount: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.USER_LOGIN: {
      const rightPassword = logInUser(action.payload);
      const local = JSON.parse(localStorage.getItem("Users"));
      const currentUser = local.find(
        (e) => e.username === action.payload.username
      );
      return {
        ...state,
        user: currentUser,
        isAuth: rightPassword ? true : false,
      };
    }
    case actionTypes.USER_SIGNUP: {
      let values = {
        ...action.payload,
        cryptos: [],
        USD: 100000,
      };

      signUpUser(values);
      return {
        ...state,
        user: values,
        isAuth: true,
      };
    }
    case actionTypes.USER_LOGOUT: {
      logOut();
      return {
        ...state,
        isAuth: false,
      };
    }
    case actionTypes.CRYPTO_FETCHING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actionTypes.CRYPTO_ERROR: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
        errorMessage: action.payload,
      };
    }
    case actionTypes.CRYPTO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        hasError: false,
        cryptoList: action.payload,
      };
    }
    case actionTypes.FETCHING_PRICES: {
      const cryptoList = action.payload.map((crypto) => crypto.data.data);
      return {
        ...state,
        isLoading: false,
        hasError: false,
        cryptos: cryptoList,
      };
    }
    case actionTypes.BUY_CURRENCY: {
      const { user } = state;
      const local = JSON.parse(localStorage.getItem("Users"));
      const currentUser = local.find((e) => e.username === user.username);
      const values = buyCurrency(action.payload, currentUser);

      return {
        ...state,
        user: values,
      };
    }
    case actionTypes.TYPING_INVESTMENT: {
      return {
        ...state,
        cryptoAmount: action.payload.newCryptoAmount,
        USDSpent: action.payload.USDSpent,
      };
    }
    default: {
      return state;
    }
  }
}

function CryptoWebProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = {
    ...state,
    logIn: (userData) =>
      dispatch({ type: actionTypes.USER_LOGIN, payload: userData }),
    signUp: (userData) =>
      dispatch({ type: actionTypes.USER_SIGNUP, payload: userData }),
    logOut: () => dispatch({ type: actionTypes.USER_LOGOUT }),
    cryptoFetching: () => dispatch({ type: actionTypes.CRYPTO_FETCHING }),
    cryptoError: (err) =>
      dispatch({ type: actionTypes.CRYPTO_ERROR, payload: err }),
    cryptoSuccess: (res) =>
      dispatch({ type: actionTypes.CRYPTO_SUCCESS, payload: res }),
    fetchingPrices: (res) =>
      dispatch({ type: actionTypes.FETCHING_PRICES, payload: res }),
    typingInvestment: (newCryptoAmount, USDSpent) =>
      dispatch({
        type: actionTypes.TYPING_INVESTMENT,
        payload: { newCryptoAmount: newCryptoAmount, USDSpent: USDSpent },
      }),
    buyCurrency: (buyInfo) =>
      dispatch({ type: actionTypes.BUY_CURRENCY, payload: buyInfo }),
  };

  return (
    <CryptoWebContext.Provider value={value}>
      {children}
    </CryptoWebContext.Provider>
  );
}

export { CryptoWebProvider, CryptoWebContext };
