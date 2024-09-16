import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import AllArticles from "./components/AllArticles";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="layout">
      <Header />
      <Routes>
        <Route path="/" element={<AllArticles />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
