//Scraped Data Imports
import Instagram from "../Home/instagram";
import Twitter from "../Home/twitter";
import GoogleAdPlaceholder from "../Home/googleAds"

//Styling Imports
import "./styles/socialsBulletin.css"

export default function SocialsBulletin() {
  return (
    <>
      <div id="socials-grid">
        <div id="insta-bulletin">
        <Instagram />
        </div>
        <div id="twitter-bulletin">
        <Twitter />
        </div>
        <div id="ad-space">
        <GoogleAdPlaceholder />
        </div>
      </div>
    </>
  );
}
