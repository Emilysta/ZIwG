import * as React from 'react'
import { EditableProfileSection } from './EditableProfileSection'
import { ProfileStats } from './ProfileStats'
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
