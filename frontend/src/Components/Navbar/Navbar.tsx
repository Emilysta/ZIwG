import * as React from "react";
import './Navbar.css'
import { Logotype } from "../Logotype";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const onlyEvents = [{ link: "/events", name: "Events" }];
const onlyLogIn = [{ link: "/logIn", name: "Join Us" }];

export function Navbar() {
  const location = useLocation();
  let [list, setList] = React.useState(onlyLogIn.concat(onlyEvents));

  useEffect(() => {
    switch (location.pathname) {
      case '/logIn':
        setList(onlyEvents);
        break;
      case '/register':
        setList(onlyEvents);
        break;
      case '/events':
        setList(onlyLogIn);
        break;
      default:
        setList(onlyLogIn.concat(onlyEvents));
        break;
    }
  }, [location])

  const changeNavbar = (
    <div className='HeadBar'>
      <div className="logoTypeItem">
        <Logotype />
      </div>
      <ul className="navbarList">
        {list.map((singleLink) => {
          return (
            <li>
              <Link to={singleLink.link}>{singleLink.name}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
  return (
    <>
      {changeNavbar}
      <main id="main">
        <Outlet />
      </main>
    </>
  )
}
