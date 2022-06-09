import * as React from 'react'
import { TicketsList } from 'Components/UserTicketPage/TicketsList'
import './UserTicketPage.scss'
import { useGetUserEventsQuery } from 'Utils/EventAPISlice'
import { RootState, useAppSelector } from 'Utils/Store'

export default function UserTicketsPage() {
    const userId = useAppSelector((state: RootState) => state.userLogin.userId)
    const { data, isLoading } = useGetUserEventsQuery({ userId: userId });
    return (
        <>
            <div className='headerBox'>
                <h1>Tickets</h1>
            </div>
            <TicketsList list={data} isLoading={isLoading} />
        </>
    )
}
