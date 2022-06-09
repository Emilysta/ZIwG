import * as React from 'react'
import { Link } from 'react-router-dom'
import { UserEventsList } from 'Components/UserEventsPage/UserEventsList'
import './UserEventsPage.scss'

export default function UserEventsPage() {

    return (
        <>
            <div className='headerBox'>
                <h1>Active events</h1>
                <Link to='/user/userEvents/add'> + Add Event </Link>
            </div>
            <UserEventsList isArchived={false} />
        </>
    )
}


