//Scraped Data Imports
import Instagram from "../Home/instagram";
import Twitter from "../Home/twitter";
import Tiktok from "../Home/tiktok"
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
        <Instagram location={"socials"} className="insta-mobile"/>
        </div>
        <div id="twitter-bulletin">
        <Twitter location={"socials"}/>
        </div>
        <div id="tiktok-bulletin">
        <Tiktok location={"socials"}/>
        </div>
        <div className="ad-space">
        <GoogleAdPlaceholder className='ad' />
        </div>
      </div>
    </>
  );
}
