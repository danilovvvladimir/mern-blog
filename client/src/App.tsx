// ==> Libs imports <===
import React from "react";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
// ==> Components imports <===
import HomePage from "./pages/HomePage/HomePage";
import Layout from "./components/Layout/Layout";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AboutPage from "./pages/AboutPage/AboutPage";

// ==> Other imports <===

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
