import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { IndividualArticle } from "./components/IndividualArticle";
import { PathError } from "./components/Error-components/PathError";
import AllArticles from "./components/AllArticles";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="layout">
      <Header />
      <Routes>
        <Route path="/" element={<AllArticles />} />
        <Route path="/articles/:articleid" element={<IndividualArticle />} />
        <Route path="/articles/topics/:topic" element={<AllArticles />} />
        <Route path="*" element={<PathError />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
