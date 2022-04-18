//Scraped Data Imports
import Instagram from "../Home/instagram";
import Twitter from "../Home/twitter";
import GoogleAdPlaceholder from "../Home/googleAds"
import GoogleAdPlaceholder2 from "../Home/googleAds2"

//Styling Imports
import "./styles/socialsBulletin.css"

export default function SocialsBulletin() {
  return (
    <>
      <div id="socials-grid">
        <div id="ad-space">
        <GoogleAdPlaceholder2 className='ad' />
        </div>
        <div id="insta-bulletin">
        <Instagram />
        </div>
        <div id="twitter-bulletin">
        <Twitter />
        </div>
        <div id="ad-space">
        <GoogleAdPlaceholder className='ad' />
        </div>
      </div>
    </>
  );
}
