import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AdminApp from "./components/Admin/frontend/AdminApp";
import { BrowserRouter, Routes, Route, } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
  <Routes>
        <Route index element={<App />} />
        <Route path="/admin-login" element={<AdminApp />} />
        {/* need protected route to keep admin secure from laypeople */}
    </Routes>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
