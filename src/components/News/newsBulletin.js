//Scraped Data Imports
import FeaturedNewsCarousel from "../Home/featuredNewsCarousel";
import LatestNews from "../Home/news";
import LatestVideos from "../Home/videos";
import FeaturedVideo from "../Home/featuredVideo";
import LatestPodcasts from "../Home/podcasts";
import GoogleAdPlaceholder from "../Home/googleAds";
import GoogleAdPlaceholder2 from "../Home/googleAds2"

//Stylin Imports
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
        <LatestVideos/>
        <GoogleAdPlaceholder2 className="ad" />
      </div>
    </>
  );
}
