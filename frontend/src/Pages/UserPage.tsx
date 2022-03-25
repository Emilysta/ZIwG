import { VerticalUserNavbar } from 'Components/VerticalUserNavbar'
import * as React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import UserCalendarPage from './UserCalendarPage'
import UserDataPage from './UserDataPage'
import UserTicketsPage from './UserTicketsPage'

export default function UserPage() {
    return (
        <div>
            <div>dnrfu</div>
            <VerticalUserNavbar />
            <Routes>
                <Route path="/user/calendar" element={<UserCalendarPage />} />
                <Route path="/user/tickets" element={<UserTicketsPage />} />
                <Route path="/user/data" element={<UserDataPage />} />
            </Routes>
            <Outlet />
        </div >
    )
}
