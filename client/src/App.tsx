// ==> Libs imports <===
import React from "react";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
// ==> Components imports <===
import HomePage from "./pages/HomePage/HomePage";
import Layout from "./components/Layout/Layout";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import FullPostPage from "./pages/FullPostPage/FullPostPage";
import AddPostPage from "./pages/AddPostPage/AddPostPage";

// ==> Other imports <===
import { getMe } from "./redux/slices/authSlice";
import { AppDispatch } from "./redux/store";
import "react-toastify/dist/ReactToastify.css";

const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(getMe());
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/posts/:id" element={<FullPostPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/add-post" element={<AddPostPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <ToastContainer autoClose={3000} position="bottom-right" pauseOnHover={false} />
    </>
  );
};

export default App;
