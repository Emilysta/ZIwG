import * as React from 'react';
import Popup from 'Components/Popup';
import { GaleryPopup } from "Components/GaleryPopup";

function EventsPage() {
    const [popupOpened, openPopup] = React.useState(true);

    return (
        <>
            <div>EventsPage</div>
            <input type='button' value="open popup" onClick={() => openPopup(true)} />
            <GaleryPopup open={popupOpened} onClose={() => openPopup(false)}/>
        </>
    )
}

export default EventsPage;