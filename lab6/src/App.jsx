import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Markets from "./pages/Markets";
import News from "./pages/News";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
