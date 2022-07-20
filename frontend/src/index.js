import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { MoralisProvider } from "react-moralis";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MoralisProvider serverUrl='https://v404ny7pouj0.usemoralis.com:2053/server' appId='yP4Uq4btquWcGxp6LQ9798gUEhnPSgdqfl9gaokz'>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MoralisProvider>
  </React.StrictMode>
);

