import * as React from "react";
import { Navbar } from "Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "Pages/HomePage";
import EventsPage from "Pages/EventsPage";
import LoginPage from 'Pages/LoginPage';
import RegisterPage from 'Pages/RegisterPage';
import UserPage from "Pages/UserPage";
import EventPage from "Pages/EventPage";
import { NotFound } from "Pages/NotFound";

function App() {
  const [padding, setPadding] = React.useState('0px');
  React.useEffect(() => { calculateHeight(); },)

  let obs = new ResizeObserver(entries => {
    for (let entry of entries) {
      const cr = entry.contentRect;
      let pad = `${cr.height}px`;
      setPadding(pad);
    }
  });

  function calculateHeight() {
    let headBar = document.getElementById('HeadBar');
    if (headBar) {
      obs.observe(headBar);
    }
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route index element={<HomePage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="events/:id" element={<EventPage />} />
            <Route path="logIn" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="user/*" element={<UserPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export { App };
