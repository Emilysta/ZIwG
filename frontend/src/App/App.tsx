import * as React from "react";
import { Navbar } from "Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "Pages/HomePage";
import EventsPage from "Pages/EventsPage";
import LoginPage from 'Pages/LoginPage';
import RegisterPage from 'Pages/RegisterPage';
import UserPage from "Pages/UserPage";

type AppProps = { num: number };

function App({ num }: AppProps) {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route index element={<HomePage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="logIn" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="user/*" element={<UserPage />} />
            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export { App };
