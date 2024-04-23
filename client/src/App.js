import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
