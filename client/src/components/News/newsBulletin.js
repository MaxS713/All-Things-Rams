//Scraped Data Imports
import FeaturedNewsCarousel from "../Home/featuredNewsCarousel";
import LatestNews from "../Home/news";
import LatestVideos from "../Home/videos";
// import FeaturedVideo from "../Home/featuredVideo";
import Picks from "../Home/picks"
import CustomNews from "../Home/customNews"
import LatestPodcasts from "../Home/podcasts";
import GoogleAdPlaceholder from "../Home/googleAds";
import GoogleAdPlaceholder2 from "../Home/googleAds2"

//Styling Imports
import "./styles/newsBulletin.css";

export default function NewsBulletin() {
  return (
    <>
      <div id="news-grid">
        <FeaturedNewsCarousel id='carousel'/>
        <LatestNews location={"news"} id='news' />
        <GoogleAdPlaceholder className="ad" />
        {/* <FeaturedVideo /> */}
        <LatestPodcasts />
        <CustomNews />
        <LatestVideos/>
        <GoogleAdPlaceholder2 className="ad" />
      </div>
    </>
  );
}
