import * as React from 'react';
import LeafletMap from 'Components/LeafletMap';
import SimpleEditableInput from './Input/SimpleEditableInput';
import './LocationPicker.scss';
import { Compass, Search } from 'react-bootstrap-icons';
import { nominatimApi } from 'Utils/NominatimAPISlice';
import { useAppDispatch } from 'Utils/Store';
import { ShortNominatimPlace } from 'Utils/NominatimPlace';
import { debounce } from 'lodash';
import { useCallback, useEffect } from 'react';
import { MarkerIcon, useMap } from 'Utils/Hooks';
import L from "leaflet";

let arr = [
    { lat: '51.1263106', lon: '16.97819633051261', display_name: 'Wrocław, Lower Silesian Voivodeship, Poland' },
    { lat: '51.1263106', lon: '16.97819633051261', display_name: 'Wrocław, Lower Silesian Voivodeship, Poland' },
    { lat: '51.1089776', lon: '17.0326689', display_name: 'Wroclaw, Wrocław, Lower Silesian Voivodeship, 50-001, Poland' },
    { lat: '51.1263106', lon: '16.97819633051261', display_name: 'Wrocław, Lower Silesian Voivodeship, Poland' },
    { lat: '51.1263106', lon: '16.97819633051261', display_name: 'Wrocław, Lower Silesian Voivodeship, Poland' },
    { lat: '51.1263106', lon: '16.97819633051261', display_name: 'Wrocław, Lower Silesian Voivodeship, Poland' },
    { lat: '51.1263106', lon: '16.97819633051261', display_name: 'Wrocław, Lower Silesian Voivodeship, Poland' },
    { lat: '51.1263106', lon: '16.97819633051261', display_name: 'Wrocław, Lower Silesian Voivodeship, Poland' }]


export default function LocationPicker() {
    const [resultsList, setResultsList] = React.useState<ShortNominatimPlace[]>(undefined);
    const [initializeMap, setViewMap, locateOnMap, removeMarkerMap, addMarkerMap] = useMap();
    const [currentMarker, setCurrentMarker] = React.useState(undefined);
    const dispatch = useAppDispatch();
    const delayCallApi = useCallback(debounce(search => callApi(search), 2000), []);

    useEffect(() => {
        initializeMap('locationPickerMap');
    }, []);

    useEffect(() => {
        if (currentMarker) {
            currentMarker.on('dragend', updateCurrentPoint);
        }
    }, [currentMarker])


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
        navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
            if (result.state === 'granted') {
                alert(result.state);
                navigator.geolocation.getCurrentPosition(positionMe);
            } else if (result.state === 'prompt') {
                alert(result.state);
                navigator.geolocation.getCurrentPosition(positionMe);
            } else if (result.state === 'denied') {
                alert(result.state);
            }
            result.addEventListener('change', function () {
                alert(result.state);
            });
        });
    }

    function positionMe(position) {
        locateOnMap(onLocationFound);
    }

    function onLocationFound(e: any) {
        //var radius = e.accuracy;
        if (currentMarker)
            removeMarkerMap(currentMarker);
        let marker = L.marker(e.latlng, { icon: MarkerIcon, draggable: 'true' })
            .bindPopup("Your location").openPopup();
        setCurrentMarker(marker);
        addMarkerMap(marker);
        //L.circle(e.latlng, radius).addTo(map);
    }

    function showPoint(event: React.MouseEvent<HTMLDivElement>, item: ShortNominatimPlace) {
        if (currentMarker) {
            removeMarkerMap(currentMarker);
        }
        let marker = L.marker({ lat: item.lat, lng: item.lon }, { icon: MarkerIcon, draggable: 'true' })
            .bindPopup(item.display_name);
        addMarkerMap(marker);
        setCurrentMarker(marker);

    }
    function updateCurrentPoint(e: any) {
        let loc = e.target._latlng;
        if (currentMarker) {
            currentMarker.setLatLng(loc);

        }

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
                    <div className='locateMeButton' title='Locate me' onClick={onLocateMeClick}> <Compass /></div>
                </div>
            </div>
        </div>
    )
}
