import * as React from 'react';
import LeafletMap, { LeafletMapProps } from 'Components/LeafletMap';
import Popup from 'Components/Popup';
import './LeafletBoxWithPopup.scss';
import ButtonWithIcon, { ButtonStyle } from 'Components/Input/ButtonWithIcon';
import { Map } from 'react-bootstrap-icons';
import { useModal } from 'Utils/Hooks';

interface LeafletBoxWithPopupProps extends LeafletMapProps {
    className?: string,
}

export default function LeafletBoxWithPopup(props: LeafletBoxWithPopupProps) {
    const [isModalOpen, setModalOpen, toggleModal] = useModal();

    return (
        <div className='leafletMapBox'>
            <div className='leafletMapWrapper'><LeafletMap currentPoint={props.currentPoint} isReadOnly={props.isReadOnly} /></div>
            <div className='leafletButton'><ButtonWithIcon icon={<Map />} style={ButtonStyle.Filled} text={'Show popup'} isActive onClickAction={toggleModal} /></div>
            <Popup open={isModalOpen} onClose={(state) => setModalOpen(false)}>
                {/* <LeafletMap currentPoint={props.currentPoint} isReadOnly={false} /> */}
            </Popup>
        </div>
    )
}
