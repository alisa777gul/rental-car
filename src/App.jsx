import { lazy } from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage.jsx"));
const CarPage = lazy(() => import("./pages/CarPage/CarPage.jsx"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cars" element={<CatalogPage />} />
        <Route path="/cars/:id" element={<CarPage />} />
      </Routes>
    </>
  );
}

export default App;
