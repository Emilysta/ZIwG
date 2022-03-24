import '../Assets/General.css'
import * as React from "react";
import { LoginPage } from '../Pages/LoginPage';
import { Navbar } from "../Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

type AppProps = { num: number };

function App({ num }: AppProps) {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path='/' element={<Navbar />}>
              <Route index element={<LoginPage />} />
              <Route path="logIn" element={<LoginPage />} />
              {/* <Route path="*" element={<NoPage />} /> */}
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export { App };
