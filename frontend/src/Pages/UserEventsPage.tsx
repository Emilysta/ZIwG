import * as React from 'react'
import { Link } from 'react-router-dom'
import { UserEventsList } from 'Components/UserEventsPage/UserEventsList'
import './UserEventsPage.scss'

export default function UserEventsPage() {
    const [isArchived, setIsArchived] = React.useState(false);


    function selectedListChanged(event: React.MouseEvent<HTMLAnchorElement>, archived: boolean) {
        event.preventDefault();

        setIsArchived(archived);
    }

    return (
        <div className='userEventsPage'>
            <header>
                <nav>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a onClick={(e) => { selectedListChanged(e, false) }} > Validated ticket </a>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a onClick={(e) => { selectedListChanged(e, true) }}> Archived ticket </a>
                </nav>
                <Link className='addEventLink' to='/user/userEvents/add'> + Add Event </Link>
            </header>
            <main>
                <UserEventsList isArchived={isArchived} />
            </main>
        </div >
    )
}


