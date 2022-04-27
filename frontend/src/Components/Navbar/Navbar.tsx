import * as React from "react";
import './Navbar.scss'
import Logotype from "../Logotype";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { BlendedCircle } from "Components/BlendedCircle";
import { useAppDispatch, useAppSelector } from "Utils/Store";
import { logout } from "Utils/UserSlice";

const onlyEvents = [{ link: "/events", name: "Events" }];
const onlyLogIn = [{ link: "/logIn", name: "Join Us" }];
type linkName = {
  link: string,
  name: string
}

export function Navbar() {
  const location = useLocation();
  const isUserLoggedIn = useAppSelector(state => state.userLogin.isLoggedIn);
  const dispatch = useAppDispatch();
  let [list, setList] = React.useState(onlyLogIn.concat(onlyEvents));

  useEffect(() => {
    let tempList: linkName[];
    switch (location.pathname) {
      case '/logIn':
        tempList = onlyEvents;
        break;
      case '/register':
        tempList = onlyEvents;
        break;
      case '/events':
        tempList = onlyLogIn;
        break;
      default:
        tempList = onlyLogIn.concat(onlyEvents)
        break;
    }
    setList(tempList);
  }, [location])

  const changeNavbar = (
    <div className='HeadBar'>
      <div className="logoTypeItem">
        <Logotype />
        <BlendedCircle id="circle-1" size={160} left="210px" top="80px" />
      </div>
      <ul className="navbarList">
        {list.map((singleLink, i) => {
          return (
            <li key={i}>
              <Link to={singleLink.link}>{singleLink.name}</Link>
            </li>
          )
        })}
        {isUserLoggedIn && <li><Link to={""} onClick={() => dispatch(logout())}>Log out</Link></li>}
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
