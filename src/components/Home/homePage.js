import React, {useState, useEffect} from "react";

//Component Imports
import Header from "../Global/header";
import Bulletin from "./bulletin";
import Footer from "../Global/footer";
import LoadingScreen from "../Global/loadingScreen";

import "./styles/home-page.css";

export default function HomePage() {
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
    <>
      <Header />
      <div id={gridID}>
        <Bulletin />
      </div>
      <div id={loadingID}>
        <LoadingScreen />
      </div>
      <Footer />
    </>
  );
}
