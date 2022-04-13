import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AdminApp from "./components/Admin/frontend/AdminApp";
import NewsPage from "./components/News/newsPage";
import SocialsPage from "./components/Social/socialsPage";
import ContactPage from "./components/Contact/contactPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/socials" element={<SocialsPage />} />
        <Route path="/admin-login" element={<AdminApp />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
