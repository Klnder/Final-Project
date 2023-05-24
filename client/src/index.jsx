import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-wyizzwty7lxay4ib.uk.auth0.com"
    clientId="im1thmsTMnw9UWLTw7uJwRGqQcVnStUy"
    authorizationParams={{
      redirect_uri: window.location.origin + "/home",
    }}
  >
    <App />
  </Auth0Provider>
);
