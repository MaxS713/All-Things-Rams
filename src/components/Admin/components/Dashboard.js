import * as React from "react";
// import {Card, CardContent, CardHeader} from "@material-ui/core";
import LogoutButton from "./logout-button";

import "./Styles/Admin.css"

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <button classname='dashButton'></button>
      <h1 className="admin-h1"> All Things Rams Admin Portal</h1>
      <LogoutButton/>
    </div>
  );
}
