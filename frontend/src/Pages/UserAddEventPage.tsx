import MainEventBox from 'Components/EventPage/MainEventBox';
import ToggleButtonWithText from 'Components/Input/ToggleButtonWithText';
import * as React from 'react';
import './UserAddEventPage.scss';

export default function UserAddEventPage() {
    return (
        <div className='userAddEventPage'>
            <MainEventBox isInEditing={false} className="mainBox" />
            <div className='sideBox'>
                <ToggleButtonWithText fieldDesc='Public event' startIsToggled={true} />
                <ToggleButtonWithText fieldDesc='Paid ticket' startIsToggled={false} />
                <ToggleButtonWithText fieldDesc='Limit tickets' startIsToggled={false} />
            </div>
        </div>
    )
}
