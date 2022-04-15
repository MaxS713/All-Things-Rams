//Library Imports
import React, {useState, useEffect} from "react";

import {BrowserRouter, Routes, Route} from "react-router-dom";

//Component Imports
import HomePage from "./components/Home/homePage";
import AdminApp from "./components/Admin/frontend/AdminApp";
import NewsPage from "./components/News/newsPage";
import SocialsPage from "./components/Social/socialsPage";
import ContactPage from "./components/Contact/contactPage";

//Style Imports
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/socials" element={<SocialsPage />} />
        <Route path="/admin-login" element={<AdminApp />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* <Route path="/about" element={<AboutPage />} /> */}
        {/* <Route path="/terms-of-use" element={<TermsPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
