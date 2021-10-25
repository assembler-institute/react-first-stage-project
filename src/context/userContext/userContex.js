import React, { createContext, useContext, useReducer } from "react";

export const actionTypes = {
  SUBMIT_ONE_PAGE: "SUBMIT_ONE_PAGE",
  SUBMIT_SECOND_PAGE: "SUBMIT_SECOND_PAGE",
  SUBMIT_THIRD_PAGE: "SUBMIT_THIRD_PAGE",
};


const initialState = {

  name: "",
  email: "",
  countryCode: "+34",
  phone: "",

  address: "",
  city: "",
  zip: "",
  country: "Cat",

  cardHolder: "",
  cardNumber: "",
  expiryDate: "",
  nameOnCard:"",
  cvc: "",
  
  acceptedTerms: false,
  userDataValidPage1:false,
  userDataValidPage2:false,
  userDataValidPage3:false,
}
const userContext = createContext(initialState);
function checkoutReducer(state, action) {
  switch (action.type) {
    case actionTypes.SUBMIT_ONE_PAGE: {
      // console.log(action.payload)
      const { name, email, phone, countryCode,userDataValidPage1 } = action.payload
      const data = action.payload
      console.log(data);
      return {
        ...state,
        name: name,
        email: email,
        phone: phone,
        countryCode: countryCode,
        userDataValidPage1:true
      };
    }
    case actionTypes.SUBMIT_SECOND_PAGE: {
      const { address, city, zip, country,userDataValidPage2 } = action.payload
      const data = action.payload
      console.log(action.payload)
      return {
        ...state,
        address: address,
        city: city,
        zip: zip,
        country: country,
        userDataValidPage2:true
      };
    }
    case actionTypes.SUBMIT_THIRD_PAGE: {
      const { cardHolder, cardNumber, expiryDate, cvv,acceptedTerms } = action.payload
      const data = action.payload
      console.log(action.payload)
      return {
        ...state,
        cardHolder: cardHolder,
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        cvv: cvv,
        userDataValidPage3:true,
      }
    }
    default: {
      return state;
    }
  }
}

function UserContextProvider({ children }) {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  const value = {
    ...state,
    submitStepOne: (data) => dispatch({
      type: actionTypes.SUBMIT_ONE_PAGE,
      payload: data
    }),
    submitStepTwo: (data) => dispatch({
      type: actionTypes.SUBMIT_SECOND_PAGE,
      payload: data
    }),
  
    submitStepThree: (data) => dispatch({
      type: actionTypes.SUBMIT_THIRD_PAGE,
      payload: data
    })
  }


  return (
    <userContext.Provider
      value={value}
    >
      {children}
    </userContext.Provider>
  );
}

function useUser() {
  const context = useContext(userContext);
  if (!context) return null;
  return context;
}
export { UserContextProvider, useUser };
