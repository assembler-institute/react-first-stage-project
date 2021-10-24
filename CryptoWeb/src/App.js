import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { CryptoWebContext } from "./context/CryptoWeb/reducer";
import Auth from "./pages/Auth";
import Home from "./pages/Home/Home";
import Transactions from "./pages/Transactions/Transactions";

function App() {
  // const state = useContext(CryptoWebContext);

  return (
    <Router>
      <Switch>
        <Route path="/transactions">
          <Transactions />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/">
          <Auth />
          {/* <Home/> */}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
