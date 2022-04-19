// Library Imports
import React from "react";
import ReactDOM from "react-dom/client";
import {Auth0Provider} from "@auth0/auth0-react";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-lu29zdkf.us.auth0.com"
    clientId="IS57Bbd6nrLhF6gQwgK8FmebmjvslKAs"
    redirectUri={window.location.origin + "/admin-login"}
  >
    <App />
  </Auth0Provider>
);
