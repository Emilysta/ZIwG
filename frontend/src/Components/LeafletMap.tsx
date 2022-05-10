import * as React from "react";
import L from "leaflet";
import { useEffect } from "react";
import './LeafletMap.scss';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from "react-router-dom";
import ZiwgSkeleton from "Utils/Skeletons";
import { Compass } from "react-bootstrap-icons";

export type LeafletMapProps = {
    currentPoint?: { lat: number, lon: number },
    isReadOnly?: boolean,
    mapID: string,
    zoom?: number,
    maxZoom?: number,
    isLoading?: boolean,
    isRevealed?: boolean,
}

export default function LeafletMap(props: LeafletMapProps) {
    const [currentPoint, setCurrentPoint] = React.useState(props.currentPoint ? props.currentPoint : [51.5, -0.11]);
    const [leafletMap, setLeafletMap] = React.useState();
    let currentMarker: any;
    const mapParams = {
        center: props.currentPoint ? props.currentPoint : currentPoint,
        zoom: props.zoom ? props.zoom : 17,
        zoomControl: true,
        //maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
        dragging: true,
        boxZoom: true,
    };

    const readonlyProperties = {
        dragging: false,
        boxZoom: false,
        touchZoom: false,
        doubleClickZoom: false,
        scrollWheelZoom: false,
        keyboard: false,
        zoomControl: false,
    }

    const myIcon = L.icon({
        iconUrl: '/images/map-pin.png',
        iconSize: [31, 41],
        iconAnchor: [16, 35],
        popupAnchor: [0, -35],
        shadowAnchor: [22, 94]
    });

    function checkPoint() {
        let point = props.currentPoint ? props.currentPoint : [51.5, -0.11]

    }

    function setMap() {
        let map: any;
        if (props.isReadOnly)
            map = L.map(props.mapID, { ...mapParams, ...readonlyProperties });
        else
            map = L.map(props.mapID, mapParams);

        L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: props.maxZoom ? props.maxZoom : 19,
        }).addTo(map);
        updateMarker(map);
        setLeafletMap(map);
        const resizeObserver = new ResizeObserver(() => map.invalidateSize());
        resizeObserver.observe(document.getElementById(props.mapID));

    }

    function updateMarker(map: any) {
        console.log('test' + currentMarker);
        if (map !== undefined) {
            if (currentMarker !== undefined) {
                currentMarker.setLatLng(currentPoint);
            }
            else {
                currentMarker = L.marker(L.latLng(currentPoint), { icon: myIcon }).addTo(map)
                    .bindPopup('Tu będzie text z nominatim');
            }
        }
    }

    useEffect(() => {
        if (!props.isLoading) {
            setMap();
        }
    }, []);


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
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setCurrentPoint({ lat: position.coords.latitude, lon: position.coords.longitude });
    }

    if (props.isLoading)
        return (
            <ZiwgSkeleton containerClassName="leaflet-skeleton" />
        )
    else {
        updateMarker(leafletMap);
        return (<>
            <div id={props.mapID} />
            <div className='locateMeButton' title='Locate me' onClick={onLocateMeClick}> <Compass /></div>
        </>
        )
    }
}
