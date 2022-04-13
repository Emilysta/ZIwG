import * as React from 'react'
import { EditableProfileSection } from 'Components/UserDataPage/EditableProfileSection'
import { ProfileStats } from 'Components/UserDataPage/ProfileStats'
import './UserDataPage.scss'

export default function UserDataPage() {
    return (
        <>
            <div className='userDataSection'>
                <EditableProfileSection />
            </div>
            <div className='userDataSection'>
                <ProfileStats />
            </div>
        </>
    )
}
