import { VerticalUserNavbar } from 'Components/VerticalUserNavbar'
import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserCalendarPage from './UserCalendarPage'
import UserDataPage from './UserDataPage'
import UserTicketsPage from './UserTicketsPage'
import './UserPage.scss'

export default function UserPage() {
    return (
        <div className='wholePageLayout userPage'>
            <div className='navBarDistance'></div>
            <div className='box'>
                <div className='userMenu'><VerticalUserNavbar /></div>
                <div className='userContent'>
                    <Routes>
                        <Route path="/calendar" element={<UserCalendarPage />} />
                        <Route path="/tickets" element={<UserTicketsPage />} />
                        <Route path="/tickets/:type" element={<UserTicketsPage />} />
                        <Route path="/data" element={<UserDataPage />} />
                        <Route path="/" element={<UserDataPage />} />
                    </Routes>
                </div>
            </div >
        </div>
    )
}
