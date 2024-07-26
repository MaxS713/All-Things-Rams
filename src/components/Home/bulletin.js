

//Component Imports
import FeaturedNewsCarousel from "./featuredNewsCarousel";
import LatestNews from "./news";
import Instagram from "./instagram";
import Twitter from "./twitter";
import Tiktok from "./tiktok"
import Survey from "./survey";
import LatestVideos from "./videos";
import LatestPodcasts from "./podcasts"
import GoogleAdPlaceholder from "./googleAds";
import GoogleAdPlaceholder2 from "./googleAds2";
import Picks from "./picks"
import CustomNews from "./customNews"

//Style Imports
import "./styles/bulletin.css";

export default function Bulletin() {
  return (
    <>
      <section>
        <div id="grid">
          <FeaturedNewsCarousel />
          <LatestNews />
          <GoogleAdPlaceholder2 />
          <Picks />
          <CustomNews />
          <LatestVideos />
          <LatestPodcasts />
          <Survey />
          <GoogleAdPlaceholder />
          <Twitter />
          <Tiktok />
          <Instagram />
        </div>
      </section>
    </>
  );
}
