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
        <div className="ad-space">
        <GoogleAdPlaceholder2 className='ad' />
        </div>
        <div id="insta-bulletin">
        <Instagram className="insta-mobile"/>
        </div>
        <div id="twitter-bulletin">
        <Twitter />
        </div>
        <div className="ad-space">
        <GoogleAdPlaceholder className='ad' />
        </div>
      </div>
    </>
  );
}
