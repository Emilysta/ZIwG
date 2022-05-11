import * as React from "react";
import './Navbar.scss'
import Logotype from "../Logotype";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BlendedCircle } from "Components/BlendedCircle";
import { useAppDispatch, useAppSelector } from "Utils/Store";
import { userApi } from "Utils/UserApiSlice";

const onlyEvents = [{ link: "/events", name: "Events" }];
const onlyLogIn = [{ link: "/logIn", name: "Join Us" }];
type linkName = {
  link: string,
  name: string
}

export function Navbar() {
  const location = useLocation();
  const { data: userData, error, isLoading } = userApi.useGetUserDataQuery()
  const [logoutRequest, logoutResult] = userApi.useLogoutMutation()
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  let [list, setList] = React.useState(onlyLogIn.concat(onlyEvents));

  const isUserLoggedIn = () => userData
  const logout = () => logoutRequest().unwrap()
    .then((_) => navigate('/'))
    .catch((err) => console.error(err))

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
        if (userData)
          tempList = onlyEvents
        else
          tempList = onlyLogIn.concat(onlyEvents)
        break;
    }
    setList(tempList);
  }, [location])

  const changeNavbar = location.pathname === "/events"
    ? <div className='HeadBar higher'>
      <BlendedCircle id="circle-1" size={160} left="210px" top="80px" />
      <div className="logoTypeItemCentered">
        <Logotype />
        <a className="pageTitle">
          Events
        </a>
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
        {userData && <li><Link to={"/user"}>Hi, {userData.displayName}</Link></li>}
        {list.map((singleLink, i) => {
          return (
            <li key={i}>
              <Link to={singleLink.link}>{singleLink.name}</Link>
            </li>
          )
        })}
        {isUserLoggedIn() && <li><Link to={""} onClick={logout}>Log out</Link></li>}
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
