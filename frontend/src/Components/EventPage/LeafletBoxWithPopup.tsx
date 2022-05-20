import * as React from 'react';
import LeafletMap, { LeafletMapProps } from 'Components/LeafletMap';
import Popup from 'Components/Popup';
import './LeafletBoxWithPopup.scss';
import ButtonWithIcon, { ButtonStyle } from 'Components/Input/ButtonWithIcon';
import { Map } from 'react-bootstrap-icons';
import { MarkerIcon, useModal } from 'Utils/Hooks';
import { useMap } from 'Utils/Hooks';
import { useEffect } from 'react';
import ZiwgSkeleton from 'Utils/Skeletons';
import L from "leaflet";

interface LeafletBoxWithPopupProps extends LeafletMapProps {
    className?: string,
    isLoading?: boolean,
    point?: string;
}

export default function LeafletBoxWithPopup(props: LeafletBoxWithPopupProps) {
    const [isModalOpen, setModalOpen, toggleModal] = useModal();
    const [initializeMap, , , , addMarkerMap, map] = useMap();
    const [initializeMap2, , , , addMarkerMap2, map2] = useMap();

    const readonlyPropertiesForMap = {
        dragging: false,
        boxZoom: false,
        touchZoom: false,
        doubleClickZoom: false,
        scrollWheelZoom: false,
        keyboard: false,
        zoomControl: false,
    }

    useEffect(() => {
        if (!props.isLoading && !map) {
            try {
                initializeMap(props.mapID, readonlyPropertiesForMap);
                initializeMap2(`${props.mapID}Popup`);
            } catch (e) { console.error(e); }
        }

    }, [props.isLoading]);

    useEffect(() => {

        if (!props.point || !map || !map2) return;
        let location: any;
        try {
            location = JSON.parse(props.point);
        }
        catch (e) {
            console.warn(e);
        }

        if (location === undefined) return;
        let marker1 = L.marker([location.lat, location.lon], { icon: MarkerIcon })
            .bindPopup("").openPopup();
        let marker2 = L.marker([location.lat, location.lon], { icon: MarkerIcon })
            .bindPopup("").openPopup();
        addMarkerMap(marker1);
        addMarkerMap2(marker2);

    }, [props.point, map, map2])


    if (props.isLoading)
        return (
            <div className='leafletMapBox'>
                <div className='leafletMapWrapper'>
                    <ZiwgSkeleton />
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
                        <LeafletMap mapID={`${props.mapID}Popup`} />
                    </div>
                </Popup>
            </div>
        )
}
