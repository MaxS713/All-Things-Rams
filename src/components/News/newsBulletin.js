//Scraped Data Imports
import FeaturedNewsCarousel from "../Home/featuredNewsCarousel";
import LatestNews from "../Home/news";
import LatestVideos from "../Home/videos";
import FeaturedVideo from "../Home/featuredVideo";
import LatestPodcasts from "../Home/podcasts";
import GoogleAdPlaceholder from "../Home/googleAds";

//Stylin Imports
import "./styles/newsBulletin.css";

export default function NewsBulletin() {
  return (
    <>
      <div id="news-grid">
        <FeaturedNewsCarousel />
        <LatestNews location={"news-page"}/>
        <GoogleAdPlaceholder id="ad"/>
        {/* <FeaturedVideo /> */}
        <LatestPodcasts />
        <LatestVideos/>
      </div>
    </>
  );
}
