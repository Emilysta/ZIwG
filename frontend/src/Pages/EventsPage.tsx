import * as React from 'react';
import Popup from 'Components/Popup';

function EventsPage() {
    const [popupOpened, openPopup] = React.useState(false);

    return (
        <>
            <div>EventsPage</div>
            <input type='button' value="open popup" onClick={() => openPopup(true)} />
            <Popup open={popupOpened} onClose={() => openPopup(false)}>
                <header> Ipsam ad voluptatem quasi voluptas </header>
                <main> Ipsam ad voluptatem quasi voluptas non culpa explicabo consequatur dolores. Voluptas a et enim similique sapiente tempore. Aut et commodi vel quia. Ut molestiae sint. Quia repellendus voluptatem sed. Tenetur harum aliquam mollitia officiis molestias voluptatum officiis. </main>
                <footer> Voluptas a et enim similique sapiente tempore </footer>
            </Popup>
        </>
    )
}

export default EventsPage;