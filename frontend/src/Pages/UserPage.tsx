import { VerticalUserNavbar } from 'Components/VerticalUserNavbar'
import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserCalendarPage from './UserCalendarPage'
import UserDataPage from './UserDataPage'
import UserTicketsPage from './UserTicketsPage'
import './UserPage.scss'
import UserEventsPage from './UserEventsPage'
import UserEventPage from './UserEventPage'
import UserAddEventPage from './UserAddEventPage'
import { RootState, useAppSelector } from 'Utils/Store'

export default function UserPage() {
    if (useUserValidation())
        return <></>

    return (
        <div className='userPageLayout navbarMargin'>
            <div className='box'>
                <div className='userMenu'><VerticalUserNavbar /></div>
                <div className='userContent'>
                    <Routes>
                        <Route path="/calendar" element={<UserCalendarPage />} />
                        <Route path="/tickets" element={<UserTicketsPage />} />
                        <Route path="/tickets/:type" element={<UserTicketsPage />} />
                        <Route path="/userEvents" element={<UserEventsPage />} />
                        <Route path="/userEvents/add" element={<UserAddEventPage />} />
                        <Route path="/userEvents/:id" element={<UserEventPage />} />
                        <Route path="/data" element={<UserDataPage />} />
                        <Route path="/" element={<UserDataPage />} />
                    </Routes>
                </div>
            </div >
        </div>
    )
}

const useUserValidation = (): boolean => {
    const isLogged = useAppSelector((state: RootState) => state.userLogin.isLoggedIn)
    if (!isLogged) {
        window.location.pathname = '/'
        return true
    }
    return false
}
