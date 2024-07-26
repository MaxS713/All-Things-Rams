// import { useEffect } from "react";
import "./styles/googleAds.css";

export default function GoogleAdPlaceholder() {
  // useEffect(()=>{
  //   (window.adsbygoogle = window.adsbygoogle || []).push({});
  // }, [])
  // return (
  //   <div className="google-ad">
  //     <ins
  //       className="adsbygoogle"
  //       style={{ display: "block" }}
  //       data-ad-client="ca-pub-8913536052973892"
  //       data-ad-slot="1962789489"
  //     ></ins>
  //   </div>
  // );
  return (
    <>
      <div className="google-ad">
        {/* <div className="container-content"> */}
          <div className="ad-wrapper">
            <h1>Google Ad</h1>
          </div>
        {/* </div> */}
      </div>
    </>
  );
}
