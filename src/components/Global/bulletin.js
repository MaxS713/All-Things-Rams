//Library Imports
import React, {useState, useEffect} from "react";

//Component Imports
import LoadingScreen from "./loadingScreen";
import FeaturedNewsCarousel from "../Home/featuredNewsCarousel";
import LatestNews from "../Home/news";
import Instagram from "../Home/instagram";
import Twitter from "../Home/twitter";
import Survey from "../Home/survey";
import LatestVideos from "../Home/videos";
import GoogleAdPlaceholder from "../Home/googleAds";
import GoogleAdPlaceholder2 from "../Home/googleAds2";

//Style Imports
import "./styles/bulletin.css";

export default function Bulletin() {

  const [loadingClassName, setLoadingClassName] = useState("");
  const [gridClassName, setGridClassName] = useState("hidden");

  useEffect(() => {
    setTimeout(() => setLoadingClassName("hidden"), 3000);
    setTimeout(() => setGridClassName(""), 3000);
  }, []);

  console.log(loadingClassName)
  console.log(gridClassName)

  return (
    <>
        <div id="grid" className={gridClassName}>
          <FeaturedNewsCarousel />
          <LatestNews />
          <GoogleAdPlaceholder2 />
          <Survey />
          <Twitter />
          <Instagram />
          <LatestVideos />
          <GoogleAdPlaceholder />
        </div>
        <div className={loadingClassName}>
          <LoadingScreen />
        </div>
    </>
  );
}
