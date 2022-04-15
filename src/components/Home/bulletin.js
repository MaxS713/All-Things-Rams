

//Component Imports
import FeaturedNewsCarousel from "./featuredNewsCarousel";
import LatestNews from "./news";
import Instagram from "./instagram";
import Twitter from "./twitter";
import Survey from "./survey";
import LatestVideos from "./videos";
import GoogleAdPlaceholder from "./googleAds";
import GoogleAdPlaceholder2 from "./googleAds2";

//Style Imports
import "./styles/bulletin.css";

export default function Bulletin() {

  return (
    <>
        <div id="grid">
          <FeaturedNewsCarousel />
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
