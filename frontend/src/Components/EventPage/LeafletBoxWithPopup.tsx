import * as React from 'react';
import LeafletMap, { LeafletMapProps } from 'Components/LeafletMap';
import Popup from 'Components/Popup';
import './LeafletBoxWithPopup.scss';
import ButtonWithIcon, { ButtonStyle } from 'Components/Input/ButtonWithIcon';
import { Map } from 'react-bootstrap-icons';
import { useModal } from 'Utils/Hooks';

interface LeafletBoxWithPopupProps extends LeafletMapProps {
    className?: string,
    isLoading?: boolean,
}

export default function LeafletBoxWithPopup(props: LeafletBoxWithPopupProps) {
    const [isModalOpen, setModalOpen, toggleModal] = useModal();

    if (props.isLoading)
        return (
            <div className='leafletMapBox'>
                <div className='leafletMapWrapper'>
                    <LeafletMap mapID={props.mapID} isLoading />
                </div>
                <div className='leafletButton'>
                    <ButtonWithIcon icon={<Map />} style={ButtonStyle.Filled} text={'Show popup'} isActive onClickAction={toggleModal} isLoading />
                </div>
            </div>
        )
    else
        return (
            <div className='leafletMapBox'>
                <div className='leafletMapWrapper'>
                    <LeafletMap mapID={props.mapID} />
                </div>
                <div className='leafletButton'>
                    <ButtonWithIcon icon={<Map />} style={ButtonStyle.Filled} text={'Show popup'} isActive onClickAction={toggleModal} />
                </div>
                <Popup open={isModalOpen} onClose={(state) => setModalOpen(false)}>
                    <h1 className='leafletMapPopupText'>Map</h1>
                    <div className='leafletMapPopupWrapper'>
                        <LeafletMap mapID='mapEventPopup' />
                    </div>
                </Popup>
            </div>
        )
}
