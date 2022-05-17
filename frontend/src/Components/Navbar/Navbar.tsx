import * as React from "react";
import './Navbar.scss'
import Logotype from "../Logotype";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { BlendedCircle } from "Components/BlendedCircle";
import { RootState, useAppDispatch, useAppSelector } from "Utils/Store";
import { userApi } from "Utils/UserApiSlice";
import { logout } from "Utils/UserSlice";
import { useMediaQuery } from "react-responsive";
import { List } from 'react-bootstrap-icons';

const Events = { link: "/events", name: "Events" };
const LogIn = { link: "/logIn", name: "Join Us" };


export function Navbar() {
  const [logoutRequest] = userApi.useLogoutMutation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const isUserLoggedIn = useAppSelector((state: RootState) => state.userLogin.isLoggedIn);
  const userName = useAppSelector((state: RootState) => state.userLogin.userData?.displayName);
  const isMobile = useMediaQuery({ query: '(max-width: 685px)' })

  function logoutFromApp() {
    logoutRequest().unwrap()
      .then((_) => {
        dispatch(logout());
        navigate('/')
      })
      .catch((err) => console.error(err))
  }

  function toggleDisplay(id: string) {
    let x = document.getElementById(id);
    if (x.style.display === "none") {
      x.style.display = "flex";
    } else {
      x.style.display = "none";
    }
  }

  const changeNavbar =
    <div className="HeadBar">
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

  const mediaNavbar =
    <>
      <div className="HeadBar">
        <div className="logoTypeItem">
          <Logotype />
        </div>
        <List className='menuBurgerButton' onClick={() => toggleDisplay('burgerNavbarList')} />
      </div>
      <ul className="burgerNavbarList" id="burgerNavbarList" style={{ display: 'none' }}>
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
    </>

  return (
    <>
      <div className='HeadBarBox theme-light' id='HeadBar'>
        {isMobile && mediaNavbar}
        {!isMobile && changeNavbar}
      </div>
      <main id="main" className='theme-light'>
        <Outlet />
      </main>
    </>
  )
}
