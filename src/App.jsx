import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import AllArticles from "./components/AllArticles";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="layout">
      <Header />
      <Routes>
        <Route path="/home" element={<AllArticles />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
