import * as React from "react";
import { Navbar } from "../Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "../Pages/HomePage";
import EventsPage from "../Pages/EventsPage";
import LoginPage from '../Pages/LoginPage';

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
            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export { App };
