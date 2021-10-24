import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { CryptoWebProvider } from "./context/CryptoWeb/reducer";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <CryptoWebProvider>
      <App />
    </CryptoWebProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
