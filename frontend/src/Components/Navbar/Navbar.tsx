import * as React from "react";
import './Navbar.scss'
import Logotype from "../Logotype";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BlendedCircle } from "Components/BlendedCircle";
import { RootState, useAppDispatch, useAppSelector } from "Utils/Store";
import { userApi } from "Utils/UserApiSlice";
import { logout } from "Utils/UserSlice";

const onlyEvents = [{ link: "/events", name: "Events" }];
const onlyLogIn = [{ link: "/logIn", name: "Join Us" }];
type linkName = {
  link: string,
  name: string
}

export function Navbar() {
  const location = useLocation();
  const [logoutRequest] = userApi.useLogoutMutation()
  const navigate = useNavigate()
  let [list, setList] = React.useState(onlyLogIn.concat(onlyEvents));
  const dispatch = useAppDispatch();
  const isUserLoggedIn = useAppSelector((state: RootState) => state.userLogin.isLoggedIn);
  const userName = useAppSelector((state: RootState) => state.userLogin.userData?.firstName);

  function logoutFromApp() {
    logoutRequest().unwrap()
      .then((_) => {
        dispatch(logout());
        navigate('/')
      })
      .catch((err) => console.error(err))
  }


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
        if (isUserLoggedIn)
          tempList = onlyEvents
        else
          tempList = onlyLogIn.concat(onlyEvents)
        break;
    }
    setList(tempList);
  }, [location, isUserLoggedIn])

  const changeNavbar = location.pathname === "/events"
    ? <div className='HeadBar higher'>
      <BlendedCircle id="circle-1" size={160} left="210px" top="80px" />
      <div className="logoTypeItemCentered">
        <Logotype />
        {/* <a className="pageTitle" href="">
          Events
        </a> */}
      </div>
      <ul className="navbarList">
        {list.map((singleLink, i) => {
          return (
            <li key={i}>
              <Link to={singleLink.link}>{singleLink.name}</Link>
            </li>
          )
        })}
      </ul>
    </div>
    : <div className='HeadBar'>
      <div className="logoTypeItem">
        <Logotype />
        <BlendedCircle id="circle-1" size={160} left="210px" top="80px" />
      </div>
      <ul className="navbarList">
        {isUserLoggedIn && <li><Link to={"/user"}>Hi, {userName}</Link></li>}
        {list.map((singleLink, i) => {
          return (
            <li key={i}>
              <Link to={singleLink.link}>{singleLink.name}</Link>
            </li>
          )
        })}
        {isUserLoggedIn && <li><Link to={""} onClick={logoutFromApp}>Log out</Link></li>}
      </ul>
    </div>

  return (
    <>
      {changeNavbar}
      <main id="main">
        <Outlet />
      </main>
    </>
  )
}
