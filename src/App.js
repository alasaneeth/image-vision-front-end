import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import TitumAuthorization from "./@titum/core/TitumAuthorization";
import AppContext from "./AppContext";
import Layout from "./titum-layouts/Layout";
import store from "./Redux/store";
import routes from "./titum-configs/routesConfig";
import { Auth } from "./auth";
// import history from "./@history";
import "./App.css";

function App() {
  var pjson = require("../package.json");

  return (
    <AppContext.Provider
      value={{
        routes,
      }}
    >
      <Provider store={store}>
        <Auth>
          <BrowserRouter
            basename={pjson.url}
          >
            <TitumAuthorization>
              <Layout />
            </TitumAuthorization>
          </BrowserRouter>
        </Auth>
      </Provider>
    </AppContext.Provider>
  );
}

export default App;
