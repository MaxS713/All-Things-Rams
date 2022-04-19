import * as React from "react";
// import {Card, CardContent, CardHeader} from "@material-ui/core";
import LogoutButton from "./logout-button";

export default function Dashboard() {
  return (
    <div>
      <h1>WELCOME TO THE 'ALL THINGS RAMS' ADMIN PORTAL</h1>
      <LogoutButton/>
    </div>
  );
}
