import '../Assets/General.css'
import '../Assets/Input.css'
import * as React from "react";
import { LoginForm } from '../Components/LoginForm';
import { Navbar } from "../Components/Navbar/Navbar";

type AppProps = { num: number };

function App({ num }: AppProps) {
  return (
    <div>
      <Navbar />
      <main>
        <LoginForm />
      </main>
    </div>
  );
}

export { App };
