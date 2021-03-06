import * as React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CreditCard2Front, Person, Calendar } from 'react-bootstrap-icons'
import ButtonWithIcon, { ButtonStyle } from "./Input/ButtonWithIcon";
import './VerticalUserNavbar.scss';


export function VerticalUserNavbar() {
    const location = useLocation();
    const options = [
        { icon: <Person />, name: "UserData", link: 'data' },
        { icon: <Calendar />, name: "Calendar", link: 'calendar' },
        { icon: <CreditCard2Front />, name: "Tickets", link: 'tickets' },
        { icon: <Calendar />, name: "My Events", link: 'userEvents' }];
    let [list, setList] = React.useState([true, false, false, false]);

    useEffect(() => {
        switch (location.pathname) {
            case '/user/data':
                setList([true, false, false, false]);
                break;
            case '/user/calendar':
                setList([false, true, false, false]);
                break;
            case '/user/tickets':
                setList([false, false, true, false]);
                break;
            case location.pathname.match(/\/user\/userEvents/)?.input:
                setList([false, false, false, true]);
                break;
        }
    }, [location])

    const changeNavbar = (
        <div className='userNavbarBox'>
            <ul className="userNavbarList">
                {options.map((row, i) => {
                    return (
                        <li key={i}><ButtonWithIcon style={ButtonStyle.Simple} icon={row.icon} text={row.name} isActive={list[i]} link={row.link} /></li>
                    )
                })}
            </ul>
        </div>
    )

    return (
        <>
            {changeNavbar}
        </>
    )
}
