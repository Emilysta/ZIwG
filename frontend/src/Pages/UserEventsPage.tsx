import * as React from 'react'
import { Link } from 'react-router-dom'
import { UserEventsList } from 'Components/UserEventsPage/UserEventsList'
import './UserEventsPage.scss'

export default function UserEventsPage() {
    const [isArchived, setIsArchived] = React.useState(false);


    function selectedListChanged(archived: boolean) {
        setIsArchived(archived);
    }

    return (
        <div className='userEventsPage'>
            <header>
                <nav>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a onClick={() => { selectedListChanged(false) }} > Active events </a>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a onClick={() => { selectedListChanged(true) }}> Archived events </a>
                </nav>
                <Link className='addEventLink' to='/user/userEvents/add'> + Add Event </Link>
            </header>
            <main>
                <UserEventsList isArchived={isArchived} />
            </main>
        </div >
    )
}


