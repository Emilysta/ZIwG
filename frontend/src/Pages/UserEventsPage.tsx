import * as React from 'react'
import { Link, Route, Router, Routes, useMatch, useParams } from 'react-router-dom'
import { TicketsList } from './UserTicketPage/TicketsList'
import './UserTicketPage.scss'

export default function UserEventsPage() {
    const params = useParams()
    let typeString: string = params.type ?? "validated"

    return (
        <div className='ticketPage'>
            <h1> USER EVENTS PAGE -  TO DO</h1>
            {/* <header>
                <nav>
                    <LinkAbc to="validated" selected> Validated ticket </LinkAbc>
                    <LinkAbc to="archived"> Archived ticket </LinkAbc>
                </nav>
            </header>
            <main>
                <TicketsList type={typeString} />
            </main> */}
        </div>
    )
}

//type LinkAbcProps = { to: string, selected?: boolean, children: string }

// function LinkAbc(props: LinkAbcProps) {
//     const to = props.to
//     const urlParam = useParams()
//     const selected = urlParam.type ? urlParam.type === to : props.selected
//     return <Link to={"/user/tickets/" + to} className={selected ? "selected" : ""}> {props.children}</Link>
// }
