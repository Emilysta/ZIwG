import * as React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CreditCard2Front, Person, Calendar } from 'react-bootstrap-icons'
import ButtonWithIcon from "./Input/ButtonWithIcon";
import './VerticalUserNavbar.scss';


export function VerticalUserNavbar() {
    const location = useLocation();
    const options = [
        { icon: <Person />, name: "UserData", link: 'data' },
        { icon: <Calendar />, name: "Calendar", link: 'calendar' },
        { icon: <CreditCard2Front />, name: "Tickets", link: 'tickets' }];
    let [list, setList] = React.useState([false, true, false]);

    useEffect(() => {
        switch (location.pathname) {
            case '/user/data':
                setList([true, false, false]);
                break;
            case '/user/calendar':
                setList([false, true, false]);
                break;
            case '/user/tickets':
                setList([false, false, true]);
                break;
        }
    }, [location])

    const changeNavbar = (
        <div className='userNavbarBox'>
            <ul className="userNavbarList">
                {options.map((row, i) => {
                    return (
                        <li><ButtonWithIcon icon={row.icon} text={row.name} isVisible={list[i]} link={row.link} /></li>
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
