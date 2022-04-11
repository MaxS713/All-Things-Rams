//Library Imports
import React, { useState, useEffect } from "react";

import FeaturedVideo from "./Home/featuredVideo";
import LatestNews from "./Home/news";
import Instagram from "./Home/instagram";
import Twitter from "./Home/twitter";
import Survey from "./Home/survey";

import "./styles/bulletin.css"

export default function Bulletin() {
  return (
    <>
      <div id="grid">
        <FeaturedVideo />
        <LatestNews />
        <Survey />
        <Twitter />
        <Instagram />
      </div>
    </>
  );
}
