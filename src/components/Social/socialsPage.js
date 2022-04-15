import React, { useState, useEffect } from "react";

//Component Imports
import Header from "../Global/header";
import SocialsBulletin from "./socialsBulletin";
import Footer from "../Global/footer";
import LoadingScreen from "../Global/loadingScreen";

export default function SocialsPage() {
  const [loadingID, setLoadingID] = useState("");
  const [gridID, setGridID] = useState("hidden");

  useEffect(() => {
    if (document.readyState === "complete") {
      completeLoading();
    } else {
      window.addEventListener("load", completeLoading);
    }
  });

  function completeLoading() {
    setTimeout(() => setLoadingID("hidden"), 2000);
    setTimeout(() => setGridID(""), 2000);
    window.removeEventListener("load", completeLoading);
  }

  return (
    <main>
      <Header />
      <div id={gridID}>
        <SocialsBulletin />
      </div>
      <div id={loadingID}>
        <LoadingScreen />
      </div>
      <Footer />
    </main>
  );
}
