import * as React from "react";
import './Navbar.css'
import { Logotype } from "../Logotype";
import { Outlet, Link } from "react-router-dom";


export class Navbar extends React.Component {
  render() {
    return (
      <>
        <div className='HeadBar'>
          <div className="logoTypeItem">
            <Logotype />
          </div>
          <ul className="navbarList">
            <li>
              <Link to="/">Events</Link>
            </li>
            <li>
              <Link to="/">Join Us</Link>
            </li>
            <li>
              <Link to="/">Sign Up</Link>
            </li>
          </ul>
        </div>
        <Outlet />
      </>
    )
  }
}
