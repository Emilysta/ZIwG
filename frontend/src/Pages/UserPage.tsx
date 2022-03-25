import { VerticalUserNavbar } from 'Components/VerticalUserNavbar'
import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserCalendarPage from './UserCalendarPage'
import UserDataPage from './UserDataPage'
import UserTicketsPage from './UserTicketsPage'

export default function UserPage() {
    return (
        <div className='box'>
            <div className='boxItem'><VerticalUserNavbar /></div>
            <div className='boxItem'>
                <Routes>
                    <Route path="/calendar" element={<UserCalendarPage />} />
                    <Route path="/tickets" element={<UserTicketsPage />} />
                    <Route path="/data" element={<UserDataPage />} />
                </Routes>
            </div>
        </div >
    )
}
