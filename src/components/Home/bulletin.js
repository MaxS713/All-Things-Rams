

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
import PopUp from "../Donation/donateModal";

//Style Imports
import "./styles/bulletin.css";

export default function Bulletin(props) {
  const { popUp, setPopUp } = props 
  const duringPopUp = popUp ? " during-popup" : ""  
  return (
    <>
      <div className="duringPopUp">
        <div id="grid">
          <FeaturedNewsCarousel />
          <LatestNews />
          <GoogleAdPlaceholder2 />
          <Survey />
          <Twitter />
          <Tiktok />
          <Instagram />
          <LatestVideos />
          <LatestPodcasts />
          <GoogleAdPlaceholder />
          <Picks />
          <CustomNews />
        </div>
        </div>
    </>
  );
}
