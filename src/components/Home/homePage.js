import React, { useState, useEffect } from "react";

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
    completeLoading();
  }, []);

  function completeLoading() {
    setTimeout(() => setLoadingID("hidden"), 3000);
    setTimeout(() => setGridID(""), 3000);
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
