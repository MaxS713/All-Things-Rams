// Current Roster
// Current Stats
// Links to Rams OFFICIAL Web page


import React, { useState, useEffect } from "react";

//Component Imports
import Header from "../Global/header";
import Footer from "../Global/footer";
import LoadingScreen from "../Global/loadingScreen";

export default function TeamPage() {
  // const [loadingID, setLoadingID] = useState("");
  // const [gridID, setGridID] = useState("hidden");

  // useEffect(() => {
  //   if (document.readyState === "complete") {
  //     completeLoading();
  //   } else {
  //     window.addEventListener("load", completeLoading);
  //   }
  // });

  // function completeLoading() {
  //   setTimeout(() => setLoadingID("hidden"), 2000);
  //   setTimeout(() => setGridID(""), 2000);
  //   window.removeEventListener("load", completeLoading);
  // }

//   <div id={loadingID}>
//   <LoadingScreen />
// </div>

{/* <div id={gridID}>
<NewsBulletin />
</div> */}

  return (
    <main>
      <Header />
        
      <Footer />
    </main>
  );
}
