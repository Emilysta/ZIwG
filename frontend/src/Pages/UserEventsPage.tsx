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
                    <h1>Active events</h1>
                    {/* <div onClick={() => { selectedListChanged(false) }} > Active events </div> */}
                </nav>
                <Link className='addEventLink' to='/user/userEvents/add'> + Add Event </Link>
            </header>
            <main>
                <UserEventsList isArchived={isArchived} />
            </main>
        </div >
    )
}


