import * as React from 'react';
import LeafletMap from 'Components/LeafletMap';
import SimpleEditableInput from './Input/SimpleEditableInput';
import './LocationPicker.scss';
import { Compass, Search, Record } from 'react-bootstrap-icons';
import { nominatimApi } from 'Utils/NominatimAPISlice';
import { useAppDispatch } from 'Utils/Store';
import { ShortNominatimPlace } from 'Utils/NominatimPlace';
import { debounce } from 'lodash';
import { useCallback, useEffect } from 'react';
import { MarkerIcon, useMap } from 'Utils/Hooks';
import L from "leaflet";
import Throbber from './Throbber';

type LocationPickerProps = {
    onPinnedLocationChange?: (lat: number, lon: number) => void,
}

export default function LocationPicker(props: LocationPickerProps) {
    const [resultsList, setResultsList] = React.useState<ShortNominatimPlace[]>(undefined);
    const [initializeMap, _, locateOnMap, removeMarker, addMarker, map, panToMap] = useMap();
    const [throbberVisibility, setThrobberVisibility] = React.useState(false);
    const dispatch = useAppDispatch();
    const delayCallApi = useCallback(debounce(search => callApi(search), 2000), []);
    const [currentMarker, setCurrentMarker] = React.useState<{ lat: number, lon: number }>(undefined);

    useEffect(() => {
        initializeMap('locationPickerMap');
    }, []);

    useEffect(() => {
        if (map !== undefined) {
            map.on('dblclick', updatePoint);
        }
    }, [map]);

    async function callApi(search: string) {
        let promise = dispatch(nominatimApi.endpoints.getLocationBy.initiate({ q: search, format: "json" }));
        let result = await promise;

        if (result.isSuccess)
            setResultsList(result.data)
    }

    function onSearchFieldChange(id: string, value: string) {
        delayCallApi(value);
    }

    function onLocateMeClick() {
        setThrobberVisibility(true);
        navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
            if (result.state === 'granted') {
                //alert(result.state);
                navigator.geolocation.getCurrentPosition(positionMe);
            } else if (result.state === 'prompt') {
                navigator.geolocation.getCurrentPosition(positionMe);
            } else if (result.state === 'denied') {
                alert('If you want to use geolocation please give us access to your computer location');
                setThrobberVisibility(false);
            }
            //SetThrobberVisibility(false);
            result.addEventListener('change', function () {
                alert(result.state);
            });
        });
    }

    function onCenterClick() {
        let location = currentMarker;

        panToMap([location.lat, location.lon]);
    }

    function positionMe() {
        locateOnMap(onLocationFound);
    }

    function onLocationFound(e: any) {
        setThrobberVisibility(false);
        createNewMarker(e.latlng.lat, e.latlng.lng);
    }

    function createNewMarker(lat: number, lon: number) {
        let current = L.marker({ lat: lat, lng: lon }, { icon: MarkerIcon, draggable: 'true' })
            .bindPopup("Your location");
        removeMarker();

        addMarker(current);
        setCurrentMarker({ lat: lat, lon: lon })

        if (props.onPinnedLocationChange) {
            props.onPinnedLocationChange(lat, lon);
        }
    }

    function showPoint(event: React.MouseEvent<HTMLDivElement>, item: ShortNominatimPlace) {
        createNewMarker(parseFloat(item.lat), parseFloat(item.lon));
    }

    function updatePoint(e: any) {
        let loc = e.latlng;
        createNewMarker(loc.lat, loc.lng);
    }

    return (
        <div className='pickerBox'>
            <h2 className='pickerBoxMapTitle'>Map</h2>
            <div className='locationPickerBox'>
                <div className='searchColumn'>
                    <div className='addressSearchFieldBox'>
                        <SimpleEditableInput id='addressSearchField' onChangeAction={onSearchFieldChange} isClearOnEnter={true} inputClassName='addressSearchField' />
                        <Search />
                    </div>
                    <p className='addressResultsText'>Results</p>
                    {resultsList && <div className='addressResultsStack'>
                        {resultsList?.map((item, index) => {
                            return (
                                <div key={index} className='addressResultElement' onClick={(event) => showPoint(event, item)}>
                                    {item.display_name}
                                </div>
                            )
                        })}
                    </div>
                    }
                </div>
                <div className="mapBox">
                    <LeafletMap mapID='locationPickerMap' />
                    <div className='locateMeButton' title='Locate me' onClick={onLocateMeClick}>

                        {!throbberVisibility && <Compass />}
                        {throbberVisibility && <Throbber className='locateMeThrobber' />}
                    </div>
                    <div className='centerButton' title='Center' onClick={onCenterClick}>
                        <Record />
                    </div>
                </div>
            </div>
        </div>
    )
}
