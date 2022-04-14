//Library Imports
import React, { useState, useEffect } from "react";

//Component Imports
import LoadingScreen from "./components/Global/loadingScreen";
import Header from "./components/Global/header";
import Bulletin from "./components/Global/bulletin";
import Footer from "./components/Global/footer";
import PopUp from "./components/Donation/donateModal";

//Style Imports
import "./App.css";

function App() {
  return (
        <main>
          <Header />
          <Bulletin />
          <Footer />
        </main>
  );
}

export default App;
