import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth0-provider-with-history";

import AdminApp from "./adminApp";

import "./index.css";

export default function AdminIndex() {
  return (
      <Auth0ProviderWithHistory>
        <AdminApp />
      </Auth0ProviderWithHistory>
  );
}
