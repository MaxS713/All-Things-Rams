import React, { useState, useEffect } from "react";

//Component Imports
import Header from "../Global/header";
import NewsBulletin from "./newsBulletin";
import Footer from "../Global/footer";
import LoadingScreen from "../Global/loadingScreen";

export default function NewsPage() {
  const [loadingID, setLoadingID] = useState("");
  const [gridID, setGridID] = useState("hidden");

  useEffect(() => {
      completeLoading();
  }, []);

  function completeLoading() {
    setTimeout(() => setLoadingID("hidden"), 2000);
    setTimeout(() => setGridID(""), 2000);
  }

  return (
    <main>
      <Header />
      <div id={gridID}>
        <NewsBulletin />
      </div>
      <div id={loadingID}>
        <LoadingScreen />
      </div>
      <Footer />
    </main>
  );
}
