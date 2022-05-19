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
        <>
            <div className='headerBox'>
                <h1>Active events</h1>
                {/* <div onClick={() => { selectedListChanged(false) }} > Active events </div> */}
                <Link to='/user/userEvents/add'> + Add Event </Link>
            </div>
            <UserEventsList isArchived={isArchived} />
        </>
    )
}


