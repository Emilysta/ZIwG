import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { TicketsList } from 'Components/UserTicketPage/TicketsList'
import './UserTicketPage.scss'
import { useGetUserEventsQuery } from 'Utils/EventAPISlice'
import { useEffect, useState } from 'react'
import { RootState, useAppSelector } from 'Utils/Store'
import { EventDataSimple } from 'Utils/EventData'

export default function UserTicketsPage() {
    const userId = useAppSelector((state: RootState) => state.userLogin.userId)
    const { data, error, isLoading } = useGetUserEventsQuery({ userId: userId });

    return (
        <>
            <div className='headerBox'>
                <h1>Tickets</h1>
            </div>
            <TicketsList list={data} isLoading={isLoading} />
        </>
    )
}
