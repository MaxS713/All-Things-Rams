
import FeaturedVideo from "../Home/featuredVideo";
import FeaturedNewsCarousel from "../Home/featuredNewsCarousel"
import LatestNews from "../Home/news";
import Instagram from "../Home/instagram";
import Twitter from "../Home/twitter";
import Survey from "../Home/survey";
import LatestVideos from "../Home/videos";
import GoogleAdPlaceholder from "../Home/googleAds";
import GoogleAdPlaceholder2 from "../Home/googleAds2";

import "./styles/bulletin.css"

export default function Bulletin() {
  return (
    <>
      <div id="grid">
        <FeaturedNewsCarousel />
        {/* <FeaturedVideo /> */}
        <LatestNews />
        <GoogleAdPlaceholder2 />
        <Survey />
        <Twitter />
        <Instagram />
        <LatestVideos />
        <GoogleAdPlaceholder />
      </div>
    </>
  );
}
