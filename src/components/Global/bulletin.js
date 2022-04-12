
import FeaturedVideo from "../Home/featuredVideo";
import LatestNews from "../Home/news";
import Instagram from "../Home/instagram";
import Twitter from "../Home/twitter";
import Survey from "../Home/survey";
import GoogleAdPlaceholder from "../Home/googleAds";

import "./styles/bulletin.css"

export default function Bulletin() {
  return (
    <>
      <div id="grid">
        <FeaturedVideo />
        <LatestNews />
        <Survey />
        <GoogleAdPlaceholder />
        <Twitter />
        <Instagram />
        <GoogleAdPlaceholder />
      </div>
    </>
  );
}
