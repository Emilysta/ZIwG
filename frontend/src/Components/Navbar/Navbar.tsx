import * as React from "react";
import './Navbar.scss'
import Logotype from "../Logotype";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { BlendedCircle } from "Components/BlendedCircle";
import { RootState, useAppDispatch, useAppSelector } from "Utils/Store";
import { userApi } from "Utils/UserApiSlice";
import { logout } from "Utils/UserSlice";

const Events = { link: "/events", name: "Events" };
const LogIn = { link: "/logIn", name: "Join Us" };


export function Navbar() {
  const [logoutRequest] = userApi.useLogoutMutation()
  const navigate = useNavigate()
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

  const changeNavbar = <div className='HeadBar'>
    <div className="logoTypeItem">
      <Logotype />
      <BlendedCircle id="circle-1" size={160} left="210px" top="80px" />
    </div>
    <ul className="navbarList">
      {isUserLoggedIn && <li><Link to={"/user"}>Hi, {userName}</Link></li>}
      {!isUserLoggedIn &&
        <li>
          <Link to={LogIn.link}>{LogIn.name}</Link>
        </li>
      }
      <li>
        <Link to={Events.link}>{Events.name}</Link>
      </li>
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
