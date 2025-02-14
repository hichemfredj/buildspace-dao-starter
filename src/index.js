import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";

// import ThirdWeb
import { ThirdwebWeb3Provider } from '@3rdweb/hooks';

// Include what chains you wanna support.
// 4 = Rinkeby

const supportedChainId = [4];

// Include what type of wallet do you want to support.
// In this case, we support Metamask which is an "injected wallet"

const connectors = {
  injected: {},
};

// Render the App component to the DOM
// Finally, wrap App with ThirdwebWeb3Provider.
ReactDOM.render(
  <React.StrictMode>

    <ThirdwebWeb3Provider
      connectors={connectors}
      supportedChainId={supportedChainId}
    >
      <App />
    </ThirdwebWeb3Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
