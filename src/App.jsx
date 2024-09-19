import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { IndividualArticle } from "./components/IndividualArticle";
import AllArticles from "./components/AllArticles";
import Footer from "./components/Footer";
import "./App.css";
import { TopicArticles } from "./components/TopicArticles";

function App() {
  const [selectedTopic, setSelectedTopic] = useState("all");

  return (
    <div className="layout">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <AllArticles
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
            />
          }
        />
        <Route path="/articles/:articleid" element={<IndividualArticle />} />
        <Route
          path="/articles/topics/:topic"
          element={
            <TopicArticles
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
            />
          }
        />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
